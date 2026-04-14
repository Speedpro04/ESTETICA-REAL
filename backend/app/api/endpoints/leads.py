from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.api import deps
from app.core.supabase_client import supabase

router = APIRouter()

class LeadCreate(BaseModel):
    name: str = None
    phone: str
    status: str = "onboarding"
    notes: str = None
    interest_areas: List[str] = []
    lead_source: str = "painel"

@router.get("/")
async def read_leads(
    skip: int = 0,
    limit: int = 100,
    clinic_id: str = Depends(deps.get_current_clinic_id),
) -> Any:
    """Lista os leads da clínica logada."""
    res = supabase.table("leads") \
        .select("*") \
        .eq("tenant_id", clinic_id) \
        .order("created_at", descending=True) \
        .range(skip, skip + limit - 1) \
        .execute()
    
    return res.data or []

@router.post("/")
async def create_lead(
    data: LeadCreate,
    clinic_id: str = Depends(deps.get_current_clinic_id),
    user_id: str = Depends(deps.get_current_user_id),
) -> Any:
    """Cria um novo lead manualmente via painel."""
    # Formatar telefone
    clean_phone = "".join(filter(str.isdigit, data.phone))
    
    res = supabase.table("leads").insert({
        "tenant_id": clinic_id,
        "name": data.name,
        "phone": clean_phone,
        "status": data.status,
        "notes": data.notes,
        "interest_areas": data.interest_areas,
        "lead_source": data.lead_source,
        "consent_lgpd": True # Se criado no painel, assumimos consentimento
    }).execute()

    if not res.data:
        raise HTTPException(status_code=400, detail="Erro ao criar lead.")

    # Audit Log
    supabase.table("audit_logs").insert({
        "clinic_id": clinic_id,
        "user_id": user_id,
        "action": "lead_create",
        "details": {"id": res.data[0]["id"], "name": data.name}
    }).execute()

    return res.data[0]

@router.get("/{lead_id}")
async def read_lead(
    lead_id: str,
    clinic_id: str = Depends(deps.get_current_clinic_id),
) -> Any:
    """Obtém detalhes de um lead específico."""
    res = supabase.table("leads") \
        .select("*") \
        .eq("tenant_id", clinic_id) \
        .eq("id", lead_id) \
        .single() \
        .execute()
    
    if not res.data:
        raise HTTPException(status_code=404, detail="Lead não encontrado.")
    
    return res.data
