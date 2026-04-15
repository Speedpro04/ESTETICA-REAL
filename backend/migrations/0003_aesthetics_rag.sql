-- Ativação da extensão pgvector para embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabela oficial de Knowledge Base RAG do Solara Estética Real
CREATE TABLE IF NOT EXISTS public.aesthetics_knowledge_base (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    keywords TEXT[] NOT NULL,
    context TEXT NOT NULL,
    priority_level INT DEFAULT 1, -- 1-Rotina, 2-Estratégico, 3-Urgência/Conversão
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ativa RLS
ALTER TABLE public.aesthetics_knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso de leitura público para IA Estética"
    ON public.aesthetics_knowledge_base FOR SELECT
    USING (true);

-- Injeção de RAG focado em Estética Avançada e Bem-estar
INSERT INTO public.aesthetics_knowledge_base (topic, keywords, context, priority_level) VALUES
('Toxina Botulínica (Botox)', ARRAY['botox', 'toxina botulínica', 'rugas', 'testa', 'pés de galinha', 'rejuvenescimento', 'aplicação botox', 'dysport', 'xeomin'], 'Tratamento carro-chefe. Focar em prevenção de rugas dinâmicas e aspecto natural. Lembrar a paciente que o efeito dura de 4 a 6 meses. Gerar gatilho de retorno preventivo.', 2),
('Preenchimento com Ácido Hialurônico', ARRAY['preenchimento', 'lábio', 'boca', 'olheira', 'malise', 'mandíbula', 'mento', 'queixo', 'sulco nasogeniano', 'bigode chinês', 'ácido hialurônico'], 'Tratamento de volumização e contorno. Focar na segurança do produto (reversível) e na hidratação da pele. Leads de lábios são altamente engajados, oferecer avaliação de harmonia facial completa.', 3),
('Bioestimuladores de Colágeno', ARRAY['sculptra', 'radiesse', 'elleva', 'colágeno', 'flacidez', 'estimular colágeno', 'bioestimulador', 'rosto caído', 'firmeza'], 'Tratamento Premium de Longo Prazo. Focar no "banco de colágeno". Vender pacotes de 3 sessões para resultados ótimos. Ideal para pacientes acima de 35 anos.', 2),
('Limpeza de Pele e Hidratação', ARRAY['limpeza de pele', 'cravo', 'espinha', 'cuidar do rosto', 'esfoliação', 'hidratação facial', 'detox facial'], 'Porta de entrada da clínica. Serviço de alta recorrência. Usar como "isca" para avaliar a pele e sugerir procedimentos invasivos (Botox/Preenchimento). Recomendar a cada 30 dias.', 1),
('Peelings Químicos', ARRAY['peeling', 'mancha', 'clarear rosto', 'renovação celular', 'melasma', 'ácido retinoico', 'peeling diamante'], 'Tratamento para textura e manchas. Alertar sobre cuidados pós-sol. Ideal para realizar no inverno. Focar no rejuvenescimento visível logo na primeira semana.', 2),
('Bioestimulação Corporal', ARRAY['celulite', 'estria', 'gordura localizada', 'corpo', 'abdômen', 'glúteo', 'bumbum na nuca', 'lipo sem corte', 'enzimas'], 'Foco em protocolos corporais. Vender pacotes fechados de 5 a 10 sessões para garantir resultados. Cruzar com orientações de estilo de vida.', 1),
('Microagulhamento e IPCA', ARRAY['microagulhamento', 'dermaroller', 'cicatriz de acne', 'poros abertos', 'viço da pele', 'drug delivery'], 'Tratamento de renovação profunda. Explicar o conceito de drug delivery (aproveitar os canais para injetar vitaminas). Ótimo para fechar poros e tratar cicatrizes.', 1),
('Protocolos de Emagrecimento', ARRAY['emagrecer', 'perder peso', 'soroterapia', 'metabolismo', 'zero gordura', 'estética integrativa'], 'Abordagem integrativa. Focar na saúde de dentro para fora. Vender como um estilo de vida Solara Estética.', 2);
