"""
Motor de Inteligência de Leads — Solara Estética
Calcula o Score de Risco e gera sugestões de ação para recuperação de orçamentos e retenção.
"""

from datetime import datetime, timedelta, timezone
from app.core.supabase_client import supabase


# ─── REGRAS DE SCORE DE RISCO (ESTÉTICA) ───
REGRAS_RISCO = {
    "CRITICO": {"dias_ausencia": 120, "label": "Crítico",  "prioridade": 1},
    "ALTO":    {"dias_ausencia": 90,  "label": "Alto",     "prioridade": 2},
    "MEDIO":   {"dias_ausencia": 60,  "label": "Médio",    "prioridade": 3},
    "BAIXO":   {"dias_ausencia": 0,   "label": "Baixo",    "prioridade": 4},
}


def calcular_score_risco(last_visit: str | datetime | None) -> str:
    """Calcula o risco de abandono (necessidade de nova aplicação/sessão)."""
    if last_visit is None:
        return "CRITICO"

    if isinstance(last_visit, str):
        last_visit = datetime.fromisoformat(last_visit.replace('Z', '+00:00'))

    agora = datetime.now(timezone.utc)
    if last_visit.tzinfo is None:
        last_visit = last_visit.replace(tzinfo=timezone.utc)

    dias_ausente = (agora - last_visit).days

    if dias_ausente >= 120: return "CRITICO"
    elif dias_ausente >= 90: return "ALTO"
    elif dias_ausente >= 60: return "MEDIO"
    else: return "BAIXO"


def gerar_sugestao_acao(score: str, status: str) -> str:
    """Gera sugestões focadas em procedimentos estéticos."""
    sugestoes = {
        "CRITICO": {
            "onboarding": "Lead esfriou. Enviar convite para avaliação VIP gratuita.",
            "recuperacao": "Oferecer bônus em preenchimento para retorno imediato.",
            "default": "Campanha de reativação: Protocolo de Rejuvenescimento.",
        },
        "ALTO": {
            "qualificado": "Lembrar lead sobre os benefícios do Botox preventivo.",
            "agendado": "Confirmar presença e enviar orientações pré-procedimento.",
            "default": "Enviar antes e depois (autorizados) para inspirar o lead.",
        },
        "MEDIO": {
            "default": "Check-up de resultados da última sessão.",
        },
        "BAIXO": {
            "default": "Manter lead nutrido com dicas de cuidados pós-procedimento.",
        },
    }

    status_lower = status.lower() if status else "default"
    mapa = sugestoes.get(score, {})
    return mapa.get(status_lower, mapa.get("default", "Manter monitoramento Solara"))


def calcular_ticket_medio_estetica(score: str) -> float:
    """Ajustado para tickets de estética (mais altos que odonto clinica)."""
    valores = {
        "CRITICO": 1200.0,
        "ALTO":    850.0,
        "MEDIO":   550.0,
        "BAIXO":   350.0,
    }
    return valores.get(score, 600.0)


def get_recovery_stats(clinic_id: str) -> dict:
    """KPIs de recuperação para o Dashboard."""
    res = supabase.table("leads").select("*").eq("tenant_id", clinic_id).execute()
    leads = res.data or []

    if not leads:
        return {
            "taxa_abandono": "0%", "leads_em_risco": 0, "criticos": 0,
            "leads_inativos": 0, "faturamento_potencial": 0.0, "total_leads": 0,
        }

    total = len(leads)
    criticos = sum(1 for l in leads if calcular_score_risco(l.get("last_contact_date")) == "CRITICO")
    em_risco = sum(1 for l in leads if calcular_score_risco(l.get("last_contact_date")) in ["CRITICO", "ALTO"])
    
    # Simulação de inativos baseada no status
    inativos = sum(1 for l in leads if l["status"] in ["recuperacao", "perdido"])
    taxa = round((inativos / total) * 100, 1) if total > 0 else 0

    potencial = sum(
        calcular_ticket_medio_estetica(calcular_score_risco(l.get("last_contact_date")))
        for l in leads if l["status"] == "recuperacao"
    )

    return {
        "taxa_abandono": f"{taxa}%",
        "leads_em_risco": em_risco,
        "criticos": criticos,
        "leads_inativos": inativos,
        "faturamento_potencial": round(potencial, 2),
        "total_leads": total,
    }

def get_priority_leads(clinic_id: str, limit: int = 50) -> list[dict]:
    """Lista de leads prioritários para o Painel de Recuperação."""
    res = supabase.table("leads") \
        .select("*") \
        .eq("tenant_id", clinic_id) \
        .in_("status", ["recuperacao", "onboarding"]) \
        .execute()
    
    leads = res.data or []
    resultado = []
    for l in leads:
        score = calcular_score_risco(l.get("last_contact_date"))
        resultado.append({
            "id": l["id"],
            "name": l["name"] or "Lead sem nome",
            "phone": l["phone"],
            "status": l["status"],
            "score": score,
            "score_label": REGRAS_RISCO[score]["label"],
            "sugestão": gerar_sugestao_acao(score, l["status"]),
            "faturamento_potencial": calcular_ticket_medio_estetica(score),
        })
    return resultado[:limit]
