import { GoogleGenerativeAI } from "@google/generative-ai";

const SOLARA_BALANCED_INSTRUCTION = `Você é Solara, a inteligência central do Hub de Gestão de Clínicas.
Seu papel é fornecer suporte executivo e clínico para centros de saúde, estética, odontologia e bem-estar.

CARACTERÍSTICAS:
- Linguagem neutra, polida e técnica.
- Capaz de analisar dados de diversas especialidades (odontológica, estética, fisioterapia, etc).
- Foco em otimização de tempo e segurança do paciente.

RESTRIÇÕES:
- Proibido pronunciar "Axos Hub" ou "Axos". Use "este hub" ou "o sistema".
- Respostas curtas. Sem emojis.`;

export const askSolara = async (message: string, history: {role: 'user' | 'model', text: string}[], context?: any): Promise<string> => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: SOLARA_BALANCED_INSTRUCTION 
    });
    
    // Convert history to Gemini format
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
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
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
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
    
    const prompt = `Analise o quadro relatado e identifique riscos ou urgências operacionais/clínicas (Retorne JSON com reasoning:string e isUrgent:boolean): "${symptoms}"`;
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
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(`Gere um relatório estratégico de performance para esta unidade: ${JSON.stringify(data)}`);
    const response = await result.response;
    return response.text() || "Sem dados.";
  } catch (error) {
    return "Erro no relatório.";
  }
};
