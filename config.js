// config.js - Conexão Real Jobren Logística
const SUPABASE_URL = 'https://mcspwmajxfjzqfoxzvqu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_QJG8VV2XRNfghNiylDQWcg_zUS8kQvE';

// Inicializa o cliente do Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
