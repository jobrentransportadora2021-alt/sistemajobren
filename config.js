// config.js
const SUPABASE_URL = 'https://sua-url.supabase.co';
const SUPABASE_KEY = 'sua-anon-key';

// MUDAMOS O NOME AQUI PARA EVITAR O ERRO DE REDECLARAÇÃO
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
