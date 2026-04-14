import logging
from fastapi import APIRouter, Request, BackgroundTasks
from app.services.evolution_service import get_evolution_service
from app.services.ai_service import consult_ai
from app.core.supabase_client import supabase

router = APIRouter()
logger = logging.getLogger(__name__)

async def handle_whatsapp_message(payload: dict):
    """
    Processa a mensagem recebida via background task.
    1. Identifica a clínica (pela instância do Evolution)
    2. Identifica o Lead (pelo número de telefone) - RECORRE AO BANCO PRIMEIRO
    3. Chama a IA Solara (Gemini) com contexto específico
    4. Envia resposta via Evolution API
    5. Salva histórico no Supabase
    """
    try:
        data = payload.get("data", {})
        message = data.get("message", {})
        
        # Ignorar mensagens enviadas por mim (para evitar loop)
        if data.get("key", {}).get("fromMe"):
            return

        instance_id = payload.get("instance")
        remote_jid = data.get("key", {}).get("remoteJid")
        # Formato: 5511999999999@s.whatsapp.net
        phone = remote_jid.split("@")[0]
        
        # Extrair texto da mensagem
        user_text = message.get("conversation") or \
                    message.get("extendedTextMessage", {}).get("text") or \
                    message.get("imageMessage", {}).get("caption")

        if not user_text:
            return

        # 1. Buscar clínica vinculada a esta instância
        clinic_res = supabase.table("clinics") \
            .select("id, clinic_name") \
            .eq("whatsapp_instance_id", instance_id) \
            .limit(1) \
            .execute()
        
        if not clinic_res.data:
            logger.warning(f"Instância {instance_id} não vinculada a nenhuma clínica.")
            return

        clinic_id = clinic_res.data[0]["id"]
        clinic_name = clinic_res.data[0]["clinic_name"]

        # 2. RECORRE AO BANCO DE DADOS PRIMEIRO: Buscar Lead no Supabase
        lead_res = supabase.table("leads") \
            .select("*") \
            .eq("tenant_id", clinic_id) \
            .eq("phone", phone) \
            .limit(1) \
            .execute()

        context_type = "retencao" # Default: já é cliente/lead
        
        if not lead_res.data:
            # CASO NÃO ESTEJA NOS REGISTROS: Inicia Onboarding
            context_type = "onboarding"
            push_name = data.get("pushName") or "Cliente Novo"
            
            new_lead = supabase.table("leads").insert({
                "tenant_id": clinic_id,
                "name": push_name,
                "phone": phone,
                "status": "onboarding",
                "lead_source": "whatsapp"
            }).execute()
            
            lead_id = new_lead.data[0]["id"]
            lead_name = push_name
            lead_status = "onboarding"
        else:
            lead_id = lead_res.data[0]["id"]
            lead_name = lead_res.data[0]["name"]
            lead_status = lead_res.data[0]["status"]
            # Ajustar contexto se for lead antigo mas sem status definido
            if lead_status == "onboarding":
                context_type = "onboarding"

        # 3. Chamar IA Solara (Gemini)
        # Adaptamos o prompt com base no CONTEXTO (Novo Lead vs Cliente Existente)
        custom_prompt = ""
        if context_type == "onboarding":
            custom_prompt = (
                f"Este é um NOVO LEAD que acabou de entrar em contato. "
                f"Aja como Solara, atendente da {clinic_name}. "
                f"Objetivo: Ser acolhedora, captar o nome do cliente (se ele não disse) e "
                f"descobrir qual procedimento estético ele tem interesse (Botox, Preenchimento, etc.)."
            )
        else:
            custom_prompt = (
                f"Você está atendendo o cliente {lead_name} da {clinic_name}. "
                f"Status atual: {lead_status}. "
                f"Objetivo: Tirar dúvidas sobre procedimentos e levar o cliente ao agendamento."
            )

        ai_response = consult_ai(
            message=user_text,
            tenant_id=clinic_id,
            user_name=lead_name,
            custom_instruction=custom_prompt
        )

        # 4. Enviar resposta via Evolution API
        evo = get_evolution_service()
        await evo.send_text_message(
            instance_id=instance_id,
            number=phone,
            text=ai_response
        )

        # 5. Salvar histórico de conversa no Supabase
        supabase.table("messages").insert({
            "tenant_id": clinic_id,
            "lead_id": lead_id,
            "sender_type": "customer",
            "content": user_text
        }).execute()

        supabase.table("messages").insert({
            "tenant_id": clinic_id,
            "lead_id": lead_id,
            "sender_type": "ai",
            "content": ai_response
        }).execute()

    except Exception as e:
        logger.error(f"Erro ao processar webhook do WhatsApp: {str(e)}")

@router.post("/webhook")
async def evolution_webhook(request: Request, background_tasks: BackgroundTasks):
    """
    Recebe os eventos da Evolution API.
    Recomenda-se processar em BackgroundTask para responder logo a Evolution API (Avoid Timeout).
    """
    payload = await request.json()
    event = payload.get("event")

    # Somente processar novas mensagens
    if event in ["messages.upsert", "messages.set"]:
        background_tasks.add_task(handle_whatsapp_message, payload)
        return {"status": "processing"}

    return {"status": "ignored", "event": event}

@router.get("/status/{instance_id}")
async def get_status(instance_id: str):
    """Retorna o status da conexão da instância."""
    evo = get_evolution_service()
    return await evo.get_instance_status(instance_id)

@router.get("/qrcode/{instance_id}")
async def get_qrcode(instance_id: str):
    """Retorna o QR Code base64 para conexão."""
    evo = get_evolution_service()
    # Assume que o service tem o método _request que pode buscar o qrcode
    # Endpoint do Evolution API para QR Code base64 costuma ser instance/connect/{instance_id}
    return await evo._request("GET", f"instance/connect/{instance_id}")
