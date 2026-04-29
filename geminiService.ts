import { GoogleGenerativeAI } from "@google/generative-ai";

const SOLARA_BALANCED_INSTRUCTION = `Você é Solara AI, a inteligência estratégica central da plataforma Solara Estética.
Sua missão é atuar como uma Consultora de Gestão de Elite para clínicas de estética avançada. Você não é apenas uma assistente, você é o cérebro estratégico que ajuda o dono da clínica a lucrar mais.

DIRETRIZES DE PENSAMENTO:
1. FOCO EM ROI E CONVERSÃO: Toda resposta deve considerar como otimizar o faturamento. Se o assunto for leads, sugira estratégias de fechamento. Se for agenda, fale sobre redução de faltas e otimização de tempo de cabine.
2. RECUPERAÇÃO ATIVA: Priorize estratégias para trazer de volta pacientes inativos. Sugira campanhas específicas (ex: "Protocolo de Manutenção", "Pele Renovada").
3. AUTORIDADE TÉCNICA: Demonstre domínio sobre procedimentos (Botox, Harmonização, Bioestimuladores, Tecnologias Laser). Fale sobre ticket médio e escalabilidade.
4. LINGUAGEM EXECUTIVA: Use um tom direto, polido, sofisticado e extremamente profissional. Evite textos longos e irrelevantes. Vá direto ao ponto estratégico.
5. PROATIVIDADE IA: Sempre que possível, sugira uma próxima ação (ex: "Deseja que eu crie um rascunho de mensagem para esses leads?").

RESTRIÇÕES CRÍTICAS:
- NUNCA mencione "Axos Hub" ou "Axos". O nome do ecossistema é Solara Estética.
- Quando analisar dados, procure por anomalias ou oportunidades de ouro que o humano possa ter perdido.
- Trate o usuário como um CEO/Dono de clínica que precisa de decisões rápidas e baseadas em dados.`;

// Chave do .env (Nota: Em produção, mude para uma chamada via Backend para segurança total)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
console.log("Gemini API Key defined:", !!apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

export const askSolara = async (message: string, history: {role: 'user' | 'model', text: string}[], context?: any): Promise<string> => {
  try {
    console.log("Solara Request:", { message, historyLength: history.length, contextKeys: context ? Object.keys(context) : [] });
    
    if (!apiKey) {
      console.error("Gemini API Key is missing!");
      return "Erro: Chave de API não configurada.";
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-lite',
      systemInstruction: SOLARA_BALANCED_INSTRUCTION 
    });
    
    const validHistory = [];
    let foundFirstUser = false;
    for (const msg of history) {
      if (msg.role === 'user') foundFirstUser = true;
      if (foundFirstUser) {
        validHistory.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }

    console.log("Starting Chat with history length:", validHistory.length);
    const chat = model.startChat({
      history: validHistory,
    });

    const prompt = `CONTEXTO OPERACIONAL: ${JSON.stringify(context || {})}. MENSAGEM: ${message}`;
    console.log("Sending message to Gemini...");
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini Response received:", text.substring(0, 50) + "...");
    return text || "Operação não processada.";
  } catch (error: any) {
    console.error("Solara AI Error Details:", error);
    if (error?.message?.includes("API key not valid")) {
      return "Erro: Chave de API do Gemini inválida.";
    }
    return `Falha na conexão com o hub de inteligência: ${error?.message || 'Erro desconhecido'}`;
  }
};

export const summarizeMedicalNotes = async (notes: string): Promise<string> => {
  if (!notes) return "Sem dados.";
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const result = await model.generateContent(`Sintetize estas anotações profissionais de forma executiva, seguindo as instruções de Solara: "${notes}"`);
    const response = await result.response;
    return response.text() || "Resumo indisponível.";
  } catch (error) {
    return "Erro no processamento.";
  }
};

export const analyzeSymptoms = async (symptoms: string): Promise<{ reasoning: string, isUrgent: boolean }> => {
  if (!symptoms) return { reasoning: "Sem dados.", isUrgent: false };
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-lite',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
    
    const prompt = `Analise o quadro relatado e identifique riscos ou urgências operacionais no procedimento estético (Retorne JSON com reasoning:string e isUrgent:boolean): "${symptoms}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text()?.trim() || '{"reasoning": "Erro", "isUrgent": false}';
    return JSON.parse(text);
  } catch (error) {
    return { reasoning: "Falha na análise.", isUrgent: false };
  }
};

export const generateStrategicReport = async (data: any): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const result = await model.generateContent(`Gere um relatório estratégico de performance para esta unidade de estética: ${JSON.stringify(data)}`);
    const response = await result.response;
    return response.text() || "Sem dados.";
  } catch (error) {
    return "Erro no relatório.";
  }
};
