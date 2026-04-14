import os
import google.generativeai as genai
import logging
from app.core.supabase_client import supabase
from app.services.intelligence_service import (
    get_recovery_stats,
)

logger = logging.getLogger(__name__)

# Configurar chave
api_key = os.getenv("GEMINI_API_KEY", "")
if api_key:
    genai.configure(api_key=api_key)

# ──────────────────────────────────────────────
# Funções de ferramenta para a IA chamar
# ──────────────────────────────────────────────

def obter_resumo_campanhas(clinic_id: str):
    """Retorna o resumo das campanhas da clínica."""
    # Como ainda não migramos as campanhas para o Supabase (estavam Mock), vamos manter Mock por agora ou buscar real
    return "Temos 2 campanhas ativas: 'Recuperação Outubro' e 'Lembrete Limpeza'. Conversão média de 12%."

def obter_resumo_agendamentos(clinic_id: str):
    """Retorna o total de pacientes."""
    try:
        res = supabase.table("patients").select("id", count="exact").eq("clinic_id", clinic_id).execute()
        total = res.count or 0
        return f"Temos no momento {total} pacientes cadastrados na base."
    except Exception as e:
        logger.error(f"AI Service Error (agendamentos): {e}")
        return "Erro ao consultar base de pacientes."

def obter_pacientes_em_risco(clinic_id: str):
    """Retorna o relatório de risco de abandono do Solara Intelligence."""
    try:
        stats = get_recovery_stats(clinic_id=clinic_id)
        return (
            f"Resumo de risco de abandono: "
            f"{stats['criticos']} pacientes CRÍTICOS (>90 dias ausentes), "
            f"{stats['pacientes_em_risco'] - stats['criticos']} pacientes em risco ALTO (60-90 dias), "
            f"Taxa de abandono atual: {stats['taxa_abandono']}. "
            f"Faturamento potencial recuperável: R$ {stats['faturamento_potencial']:,.2f}."
        )
    except Exception as e:
        logger.error(f"AI Service Error (risco): {e}")
        return "Erro ao calcular estatísticas de risco."

# Mapa de ferramentas seguras
SECURITY_TOOLS_MAP = {
    "obter_resumo_campanhas": obter_resumo_campanhas,
    "obter_resumo_agendamentos": obter_resumo_agendamentos,
    "obter_pacientes_em_risco": obter_pacientes_em_risco,
}

# Declaração das ferramentas
tools_declaration = [
    {
        "function_declarations": [
            {
                "name": "obter_resumo_campanhas",
                "description": "Obtém um resumo das campanhas de WhatsApp ativas."
            },
            {
                "name": "obter_resumo_agendamentos",
                "description": "Obtém um resumo e contagem total de pacientes."
            },
            {
                "name": "obter_pacientes_em_risco",
                "description": (
                    "Retorna a quantidade de pacientes em risco de abandono e o faturamento potencial recuperável. "
                    "Use para responder sobre abandono e impacto financeiro."
                )
            },
        ]
    }
]

def consult_ai(message: str, tenant_id: str, user_name: str, custom_instruction: str = "", **kwargs):
    """
    Interface unificada para consulta ao Gemini.
    """
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada."
    
    # Base da instrução de sistema - Agora focada em Estética
    system_instruction = (
        f"Você é a Solara, uma assistente virtual e especialista em estética avançada para a clínica. "
        f"Seja educada, proativa, elegante e use uma linguagem que transmita confiança e beleza. "
        f"Sempre tente ajudar o cliente ({user_name}) a entender os benefícios dos procedimentos. "
        f"Se solicitado, use as ferramentas de consulta disponíveis. "
        f"\n\nINSTRUÇÃO ESPECÍFICA DE CONTEXTO: {custom_instruction}"
    )
    
    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            tools=tools_declaration,
            system_instruction=system_instruction
        )
        
        chat = model.start_chat()
        response = chat.send_message(message)
        
        if response.candidates and response.candidates[0].content.parts:
            part = response.candidates[0].content.parts[0]
            if part.function_call:
                func_name = part.function_call.name
                tool_func = SECURITY_TOOLS_MAP.get(func_name)
                
                if tool_func:
                    tool_result = tool_func(clinic_id=tenant_id)
                else:
                    tool_result = "Erro: Ferramenta não encontrada."
                    
                response = chat.send_message(
                    genai.types.ContentDict(
                        role="function",
                        parts=[
                            genai.types.Part.from_function_response(
                                name=func_name,
                                response={"result": tool_result}
                            )
                        ]
                    )
                )
        
        return response.text
    except Exception as e:
        logger.error(f"Gemini API Error: {e}")
        return f"Desculpe {user_name}, tive um problema técnico momentâneo. Pode repetir?"
