import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Solara Estética API"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    
    # SUPABASE
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_KEY: str = ""

    # REDIS
    REDIS_URL: str = "redis://localhost:6379"

    # SECURITY
    SECRET_KEY: str = "SECRET_KEY_ALTAMENTE_SEGURA"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 dias

    # GEMINI
    GEMINI_API_KEY: str = ""

    # EVOLUTION API (WhatsApp)
    EVOLUTION_URL: str = "http://localhost:8080"
    EVOLUTION_API_KEY: str = ""
    EVOLUTION_INSTANCE: str = "MainInstance"

    # PAGBANK
    PAGBANK_TOKEN: str = ""
    PAGBANK_API_URL: str = "https://api.pagseguro.com"

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
