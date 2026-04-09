import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log de segurança (remova depois)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ ERRO: Variáveis de ambiente não carregadas!")
  console.log("URL encontrada:", supabaseUrl)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
