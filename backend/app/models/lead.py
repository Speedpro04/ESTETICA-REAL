from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime, Float, Integer, JSON, Boolean
from datetime import datetime
from app.models.base import TenantBase


class Lead(TenantBase):
    """
    Representa um Lead (Potencial Cliente) do Solara Estética.
    Sistema Multi-tenant: Isolado por tenant_id (Clínica).
    """
    __tablename__ = "leads"

    # Dados Básicos
    name: Mapped[str] = mapped_column(String(255), nullable=True)
    phone: Mapped[str] = mapped_column(String(50), nullable=False, index=True) # ID Único no WhatsApp
    email: Mapped[str] = mapped_column(String(255), nullable=True)
    
    # Status do Funil: 'onboarding', 'qualificado', 'agendado', 'recuperacao', 'perdido'
    status: Mapped[str] = mapped_column(
        String(50), default="onboarding", index=True
    )

    # Dados de Estética
    interest_areas: Mapped[list] = mapped_column(JSON, nullable=True) # Ex: ['Botox', 'Preenchimento']
    notes: Mapped[str] = mapped_column(String(2000), nullable=True)
    
    # LGPD e Origem
    consent_lgpd: Mapped[bool] = mapped_column(Boolean, default=False)
    lead_source: Mapped[str] = mapped_column(String(100), default="whatsapp", nullable=True)

    # ── Módulo de Recuperação e IA ──────────────────────────────────────────
    risk_score: Mapped[str] = mapped_column(
        String(20), default="ALTO", index=True, nullable=True
    )

    last_contact_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    expected_value: Mapped[float] = mapped_column(
        Float, default=0.0, nullable=True
    )

    # Histórico de Conversa (Resumo para o Gemini)
    ai_summary: Mapped[str] = mapped_column(String(4000), nullable=True)
