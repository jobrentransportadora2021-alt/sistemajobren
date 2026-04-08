"use client";
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { alert("Erro: " + error.message); setCarregando(false); return; }
    router.push('/'); 
  };

  return (
    /* h-screen e flex items-center justify-center garantem a centralização total */
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4">
      
      {/* Card Moderno */}
      <div className="w-full max-w-md bg-[#111] border border-white/10 p-10 rounded-[2rem] shadow-2xl text-center">
        <h1 className="text-4xl font-black italic text-cyan-500 mb-2">JOBREN</h1>
        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-10">Logística de Próxima Geração</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input 
            type="email" 
            placeholder="E-mail" 
            className="w-full bg-black border border-white/5 p-4 rounded-xl text-white outline-none focus:border-cyan-500 transition"
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className="w-full bg-black border border-white/5 p-4 rounded-xl text-white outline-none focus:border-cyan-500 transition"
            onChange={e => setPassword(e.target.value)}
          />
          <button 
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-black py-4 rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            {carregando ? 'CARREGANDO...' : 'AUTENTICAR ACESSO'}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/5 text-[10px] text-gray-600 flex justify-between">
          <span>SÃO PAULO, BR</span>
          <span>V2.6.0-PRO</span>
        </div>
      </div>
    </div>
  );
}
