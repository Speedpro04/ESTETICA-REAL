import polars as pl
import json
import time
import logging
from datetime import datetime
from celery import shared_task
from app.core.celery_app import celery_app

logger = logging.getLogger(__name__)


# ═══════════════════════════════════════════════════
# TAREFAS DE TESTE
# ═══════════════════════════════════════════════════

@celery_app.task(name="tasks.test_task")
def test_task(name: str):
    """Tarefa de teste para verificar se o Celery está funcionando."""
    logger.info(f"[TEST] Iniciando tarefa para: {name}")
    time.sleep(3)
    logger.info(f"[TEST] Tarefa para {name} concluída!")
    return {"status": "ok", "message": f"Olá {name}, o Celery está funcionando!"}


# ═══════════════════════════════════════════════════
# ASSINATURAS & PAGAMENTOS (PagBank)
# ═══════════════════════════════════════════════════

@celery_app.task(
    name="tasks.check_expired_subscriptions",
    bind=True,
    max_retries=3,
    default_retry_delay=300,  # 5 min entre retries
)
def check_expired_subscriptions(self):
    """
    Verifica assinaturas expiradas e notifica clínicas.
    Roda todo dia às 6h via Celery Beat.
    """
    try:
        logger.info("[SUBSCRIPTIONS] Verificando assinaturas expiradas...")

        # TODO: Implementar lógica real com Supabase
        # 1. Buscar assinaturas com data de expiração <= hoje
        # 2. Para cada assinatura expirada:
        #    a) Atualizar status no banco → 'expired'
        #    b) Enviar notificação via WhatsApp (Evolution API)
        #    c) Desabilitar funcionalidades premium da clínica
        # 3. Registrar log de auditoria

        logger.info("[SUBSCRIPTIONS] Verificação concluída.")
        return {"status": "completed", "checked_at": datetime.now().isoformat()}

    except Exception as exc:
        logger.error(f"[SUBSCRIPTIONS] Erro: {exc}")
        raise self.retry(exc=exc)


@celery_app.task(name="tasks.process_payment_webhook")
def process_payment_webhook(webhook_data: dict):
    """
    Processa webhook do PagBank de forma assíncrona.
    Chamada quando a API recebe um POST do PagBank.
    """
    try:
        event_type = webhook_data.get("event", "unknown")
        logger.info(f"[PAGBANK] Processando webhook: {event_type}")

        # TODO: Implementar lógica real
        # - PAYMENT_CONFIRMED → ativar/renovar assinatura
        # - PAYMENT_CANCELLED → marcar como cancelado
        # - PAYMENT_REFUNDED  → processar reembolso

        return {"status": "processed", "event": event_type}

    except Exception as exc:
        logger.error(f"[PAGBANK] Erro ao processar webhook: {exc}")
        raise


# ═══════════════════════════════════════════════════
# CONSULTAS & LEMBRETES
# ═══════════════════════════════════════════════════

@celery_app.task(
    name="tasks.send_appointment_reminders",
    bind=True,
    max_retries=2,
)
def send_appointment_reminders(self):
    """
    Envia lembretes de consulta via WhatsApp (Evolution API).
    Roda todo dia às 8h via Celery Beat.
    """
    try:
        logger.info("[APPOINTMENTS] Enviando lembretes de consultas do dia...")

        # TODO: Implementar com Supabase + Evolution API
        # 1. Buscar consultas de amanhã
        # 2. Para cada consulta com paciente ativo:
        #    a) Montar mensagem personalizada
        #    b) Enviar via Evolution API
        #    c) Registrar envio no banco

        logger.info("[APPOINTMENTS] Lembretes enviados.")
        return {"status": "completed", "sent_at": datetime.now().isoformat()}

    except Exception as exc:
        logger.error(f"[APPOINTMENTS] Erro: {exc}")
        raise self.retry(exc=exc)


@celery_app.task(name="tasks.send_single_reminder")
def send_single_reminder(appointment_id: str, patient_phone: str, message: str):
    """Envia um lembrete individual para um paciente específico."""
    try:
        logger.info(f"[REMINDER] Enviando para {patient_phone} | Consulta: {appointment_id}")

        # TODO: Chamar Evolution API
        # response = httpx.post(f"{EVOLUTION_URL}/message/sendText/...")

        return {"status": "sent", "appointment_id": appointment_id}

    except Exception as exc:
        logger.error(f"[REMINDER] Erro ao enviar para {patient_phone}: {exc}")
        raise


# ═══════════════════════════════════════════════════
# RECUPERAÇÃO DE LEADS COM IA (Gemini)
# ═══════════════════════════════════════════════════

@celery_app.task(
    name="tasks.process_inactive_leads",
    bind=True,
    max_retries=2,
    default_retry_delay=600,  # 10 min entre retries
)
def process_inactive_leads(self):
    """
    Busca leads inativos e dispara recuperação via IA.
    Roda 2x ao dia (10h e 15h) via Celery Beat.
    """
    try:
        logger.info("[AI-LEADS] Processando leads inativos...")

        # TODO: Implementar com Supabase
        # 1. Buscar leads com status 'inactive' e última interação > 48h
        # 2. Para cada lead, disparar tarefa individual de recuperação
        # 3. Limitar a N leads por ciclo para não exceder cota da API Gemini

        # Exemplo de encadeamento:
        # for lead in inactive_leads:
        #     recover_lead_ai.delay(lead["id"], lead)

        logger.info("[AI-LEADS] Processamento concluído.")
        return {"status": "completed", "processed_at": datetime.now().isoformat()}

    except Exception as exc:
        logger.error(f"[AI-LEADS] Erro: {exc}")
        raise self.retry(exc=exc)


@celery_app.task(
    name="tasks.recover_lead_ai",
    bind=True,
    max_retries=3,
    rate_limit="10/m",  # Máximo 10 chamadas por minuto (respeitar limites do Gemini)
)
def recover_lead_ai(self, lead_id: str, lead_data: dict):
    """
    Recupera um lead específico usando IA (Gemini) + WhatsApp (Evolution API).
    Usa metodologia SPIN para gerar mensagem personalizada.
    """
    try:
        logger.info(f"[AI-RECOVER] Processando lead: {lead_id}")

        # TODO: Implementar lógica real
        # 1. Montar prompt SPIN com dados do lead
        # 2. Chamar Gemini API para gerar mensagem personalizada
        # 3. Enviar mensagem via Evolution API (WhatsApp)
        # 4. Atualizar status do lead no Supabase → 'contacted'
        # 5. Registrar interação no histórico

        return {
            "status": "recovered",
            "lead_id": lead_id,
            "processed_at": datetime.now().isoformat(),
        }

    except Exception as exc:
        logger.error(f"[AI-RECOVER] Erro no lead {lead_id}: {exc}")
        raise self.retry(exc=exc)


# ═══════════════════════════════════════════════════
# RELATÓRIOS
# ═══════════════════════════════════════════════════

@celery_app.task(name="tasks.generate_weekly_report")
def generate_weekly_report():
    """
    Gera relatório semanal de performance da clínica.
    Roda toda segunda-feira às 7h via Celery Beat.
    """
    try:
        logger.info("[REPORTS] Gerando relatório semanal...")

        # TODO: Implementar com Supabase
        # 1. Consultar métricas da semana (novos leads, consultas, conversões, etc.)
        # 2. Gerar resumo com Gemini
        # 3. Enviar via WhatsApp para o admin da clínica
        # 4. Salvar relatório no banco

        logger.info("[REPORTS] Relatório gerado com sucesso.")
        return {"status": "generated", "generated_at": datetime.now().isoformat()}

    except Exception as exc:
        logger.error(f"[REPORTS] Erro ao gerar relatório: {exc}")
        raise


# ═══════════════════════════════════════════════════
# MENSAGENS EM MASSA (WhatsApp)
# ═══════════════════════════════════════════════════

@celery_app.task(
    name="tasks.send_bulk_whatsapp",
    bind=True,
    max_retries=1,
    rate_limit="30/m",  # 30 mensagens por minuto para evitar bloqueio
)
def send_bulk_whatsapp(self, campaign_id: str, contacts: list, message_template: str):
    """
    Envia mensagens em massa via WhatsApp com rate limiting.
    Útil para campanhas de marketing da clínica.
    """
    try:
        logger.info(f"[BULK-WA] Campanha {campaign_id} | {len(contacts)} contatos")

        results = []
        for contact in contacts:
            # TODO: Enviar via Evolution API com delay entre mensagens
            # send_single_reminder.delay(...)
            results.append({"phone": contact, "status": "queued"})

        return {
            "campaign_id": campaign_id,
            "total": len(contacts),
            "status": "completed",
        }

    except Exception as exc:
        logger.error(f"[BULK-WA] Erro na campanha {campaign_id}: {exc}")
        raise self.retry(exc=exc)

# ═══════════════════════════════════════════════════
# ANÁLISE DE DADOS (Polars Engine)
# ═══════════════════════════════════════════════════

@celery_app.task(name="tasks.analyze_estetica_lead_conversion")
def analyze_estetica_lead_conversion(leads_json: str):
    """
    Analisa conversão de leads de estética usando Polars.
    Identifica quais procedimentos (Botox vs Preenchimento) têm maior taxa de fechamento.
    """
    try:
        leads = json.loads(leads_json)
        df = pl.DataFrame(leads)
        
        # Análise por procedimento
        analysis = (
            df.group_by("interested_procedure")
              .agg([
                  pl.len().alias("count"),
                  pl.col("converted").mean().alias("conversion_rate")
              ])
              .sort("conversion_rate", descending=True)
        )
        
        return {"success": True, "results": analysis.to_dicts()}
    except Exception as e:
        logger.error(f"[POLARS] Erro na análise: {e}")
        return {"success": False, "error": str(e)}

@celery_app.task(name="tasks.identify_inactive_patients_estetica")
def identify_inactive_patients_estetica(appointments_json: str):
    """
    Identifica pacientes que fizeram Botox há mais de 5 meses e ainda não voltaram.
    """
    try:
        df = pl.DataFrame(json.loads(appointments_json))
        
        # Filtra por Botox e intervalo de tempo
        recalls = (
            df.filter(
                (pl.col("procedure") == "Botox") & 
                (pl.col("months_since_last") >= 5)
            )
            .select(["patient_name", "last_date", "phone"])
        )
        
        return recalls.to_dicts()
    except Exception as e:
        logger.error(f"[POLARS] Erro ao identificar inativos: {e}")
        return []
