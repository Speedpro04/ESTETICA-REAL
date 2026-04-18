import { GoogleGenerativeAI } from "@google/generative-ai";

const SOLARA_BALANCED_INSTRUCTION = `Você é Solara AI, a inteligência estratégica central da plataforma Solara Connect (Odonto Connect).
Sua missão é atuar como uma Consultora de Gestão de Elite para clínicas odontológicas e de estética avançada. Você não é apenas uma assistente, você é o cérebro estratégico que ajuda o dono da clínica a lucrar mais.

DIRETRIZES DE PENSAMENTO:
1. FOCO EM ROI E CONVERSÃO: Toda resposta deve considerar como otimizar o faturamento. Se o assunto for leads, sugira estratégias de fechamento. Se for agenda, fale sobre redução de faltas e otimização de tempo de cadeira.
2. RECUPERAÇÃO ATIVA: Priorize estratégias para trazer de volta pacientes inativos. Sugira campanhas específicas (ex: "Protocolo de Manutenção", "Pele Renovada").
3. AUTORIDADE TÉCNICA: Demonstre domínio sobre procedimentos (Lentes de Contato, Harmonização, Implantes, Bioestimuladores). Fale sobre ticket médio e escalabilidade.
4. LINGUAGEM EXECUTIVA: Use um tom direto, polido, sofisticado e extremamente profissional. Evite textos longos e irrelevantes. Vá direto ao ponto estratégico.
5. PROATIVIDADE IA: Sempre que possível, sugira uma próxima ação (ex: "Deseja que eu crie um rascunho de mensagem para esses leads?").

RESTRIÇÕES CRÍTICAS:
- NUNCA mencione "Axos Hub" ou "Axos". O nome do ecossistema é Solara Connect ou Odonto Connect.
- Quando analisar dados, procure por anomalias ou oportunidades de ouro que o humano possa ter perdido.
- Trate o usuário como um CEO/Dono de clínica que precisa de decisões rápidas e baseadas em dados.`;

// Chave do .env (com fallback direto caso o Vite não tenha reiniciado)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyC0Ce_OsocHaBrrg8pG1ubDTSIYo6g6r-k';
const genAI = new GoogleGenerativeAI(apiKey);

export const askSolara = async (message: string, history: {role: 'user' | 'model', text: string}[], context?: any): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: SOLARA_BALANCED_INSTRUCTION 
    });
    
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
    });

    const prompt = `CONTEXTO OPERACIONAL: ${JSON.stringify(context)}. MENSAGEM: ${message}`;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text() || "Operação não processada.";
  } catch (error) {
    console.error("Solara Error:", error);
    return "Falha na conexão com o hub de inteligência.";
  }
};

export const summarizeMedicalNotes = async (notes: string): Promise<string> => {
  if (!notes) return "Sem dados.";
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
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
      model: 'gemini-1.5-flash',
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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(`Gere um relatório estratégico de performance para esta unidade de estética: ${JSON.stringify(data)}`);
    const response = await result.response;
    return response.text() || "Sem dados.";
  } catch (error) {
    return "Erro no relatório.";
  }
};
