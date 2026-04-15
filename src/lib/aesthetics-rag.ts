import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Recupera o contexto de Estética Avançada da Knowledge Base no Supabase
 */
export const retrieveAestheticsContext = async (message: string) => {
  const normalizedMessage = message.toLowerCase();
  
  const { data, error } = await supabase
    .from('aesthetics_knowledge_base')
    .select('*');

  if (error || !data) {
    console.error("Erro RAG Estética:", error);
    return { context: "", isUrgent: false };
  }

  const matches = data.filter(entry => 
    entry.keywords.some((kw: string) => normalizedMessage.includes(kw.toLowerCase()))
  );

  if (matches.length === 0) {
    return { context: "Contexto estético geral. Abordagem elegante e focada em resultados naturais.", isUrgent: false };
  }

  // Prioridade 3 indica alta intenção de conversão ou urgência
  const isUrgent = matches.some(m => m.priority_level === 3);
  const context = matches.map(m => `[PROCEDIMENTO: ${m.topic}] ${m.context}`).join("\n");

  return { context, isUrgent };
};
