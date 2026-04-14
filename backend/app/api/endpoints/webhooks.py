from typing import Any
from fastapi import APIRouter, Request, HTTPException
from app.core.supabase_client import supabase

router = APIRouter()

@router.post("/pagbank")
async def pagbank_webhook(request: Request) -> Any:
    """
    Webhook endpoint para receber eventos do PagBank.
    """
    try:
        payload = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Payload inválido.")

    # PagBank v2 costuma enviar 'charges' no plural ou 'charge' no singular
    charges = payload.get("charges", [])
    charge = charges[0] if charges else payload.get("charge", {})
    
    reference_id = payload.get("reference_id") or charge.get("reference_id") # clinic_id/tenant_id
    transaction_id = charge.get("id")
    status = charge.get("status", "").upper()

    if not reference_id:
        return {"message": "Evento ignorado — sem reference_id."}

    # Mapear status
    status_map = {
        "PAID": "approved",
        "AUTHORIZED": "approved",
        "DECLINED": "failed",
        "CANCELED": "failed",
    }
    
    our_status = status_map.get(status, "pending")

    # 1. Buscar assinatura (usando tenant_id conforme nosso SQL)
    sub_result = supabase.table("subscriptions") \
        .select("id, tenant_id, price") \
        .eq("tenant_id", reference_id) \
        .limit(1) \
        .execute()

    if not sub_result.data:
        return {"message": "Assinatura não encontrada."}

    sub = sub_result.data[0]

    # 2. Atualizar status e reativar clínica/assinatura se aprovado
    if our_status == "approved":
        supabase.table("subscriptions").update({
            "payment_status": "active"
        }).eq("id", sub["id"]).execute()

        supabase.table("clinics").update({
            "is_active": True
        }).eq("id", sub["tenant_id"]).execute()

    # 3. Audit log para LGPD
    supabase.table("audit_logs").insert({
        "clinic_id": sub["tenant_id"],
        "action": f"payment_{our_status}",
        "details": {
            "transaction_id": str(transaction_id),
            "gateway": "pagbank",
            "status_original": status
        }
    }).execute()

    return {"message": f"PagBank Webhook Processado: {our_status}"}

@router.post("/pagbank/cancel")
async def pagbank_cancel_webhook(request: Request) -> Any:
    """Webhook para cancelamento de assinatura no PagBank."""
    try:
        payload = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Payload inválido.")

    reference_id = payload.get("reference_id")
    if not reference_id:
        return {"message": "Evento ignorado."}

    # Suspender clínica e assinatura
    supabase.table("subscriptions").update({
        "payment_status": "suspended"
    }).eq("tenant_id", reference_id).execute()

    supabase.table("clinics").update({
        "is_active": False
    }).eq("id", reference_id).execute()

    return {"message": "Assinatura cancelada no sistema."}
