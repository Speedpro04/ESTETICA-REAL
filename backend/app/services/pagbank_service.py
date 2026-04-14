import httpx
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class PagBankService:
    """
    Integração com PagBank para assinaturas e pagamentos recorrentes.
    Documentação: https://pagseguro.uol.com.br/checkout-transparente/
    """
    def __init__(self):
        self.base_url = settings.PAGBANK_API_URL
        self.headers = {
            "Authorization": f"Bearer {settings.PAGBANK_TOKEN}",
            "Content-Type": "application/json",
            "accept": "application/json"
        }

    async def create_checkout(self, clinic_id: str, plan_name: str, amount: float):
        """
        Cria uma sessão de checkout para a clínica assinar um plano.
        """
        url = f"{self.base_url}/checkouts"
        
        # Payload simplificado para o exemplo (ajustar conforme documentação v2)
        payload = {
            "reference_id": f"SUBSCRIPTION_{clinic_id}",
            "customer": {
                "name": "Plano " + plan_name,
                "email": f"clinic_{clinic_id}@solara.com" # Exemplo, ideal pegar real
            },
            "items": [
                {
                    "reference_id": f"PLAN_{plan_name}",
                    "name": f"Assinatura Solara Estética - {plan_name}",
                    "quantity": 1,
                    "unit_amount": int(amount * 100) # Centavos no PagBank
                }
            ],
            "payment_methods": [
                {"type": "CREDIT_CARD"},
                {"type": "PIX"},
                {"type": "BOLETO"}
            ],
            # URLs de retorno após o pagamento
            "redirect_url": "https://dashboard.solaraestetica.com/checkout/success",
            "notification_urls": [
                "https://api.solaraestetica.com/api/v1/webhooks/pagbank"
            ]
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(url, headers=self.headers, json=payload)
                response.raise_for_status()
                return response.json()
            except Exception as e:
                logger.error(f"Erro PagBank Checkout: {e}")
                return None

    async def verify_payment(self, transaction_id: str):
        """
        Verifica o status de um pagamento específico.
        """
        url = f"{self.base_url}/orders/{transaction_id}"
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(url, headers=self.headers)
                response.raise_for_status()
                return response.json()
            except Exception as e:
                logger.error(f"Erro PagBank Verify: {e}")
                return None

# Singleton
pagbank = PagBankService()
