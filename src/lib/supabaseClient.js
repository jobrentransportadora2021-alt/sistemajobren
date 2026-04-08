
import { createClient } from '@supabase/supabase-js'

// Estas variáveis buscam os dados do seu arquivo .env.local no PC
// Ou das "Environment Variables" que você vai cadastrar na Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validação simples para evitar erros de conexão vazia
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERRO: As chaves do Supabase não foram encontradas. Verifique seu arquivo .env")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
