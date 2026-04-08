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
    /* h-screen, w-screen e flex são obrigatórios para o centro */
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 overflow-hidden">
      
      {/* Luz de fundo para dar profundidade */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Card centralizado inspirado na sua imagem */}
      <div className="relative w-full max-w-[400px] bg-[#161616] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl text-center z-10">
        
        <h1 className="text-3xl font-black tracking-tighter text-[#0084ff] uppercase mb-8">
          JOBREN TRANSPORTES
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Nome de usuário" 
            className="w-full bg-[#222] border border-white/5 p-4 rounded-2xl text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#0084ff]/50 transition-all"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Sua senha" 
            className="w-full bg-[#222] border border-white/5 p-4 rounded-2xl text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#0084ff]/50 transition-all"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button 
            disabled={carregando}
            className="w-full bg-[#0084ff] hover:bg-[#0074e0] text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm mt-4"
          >
            {carregando ? 'CARREGANDO...' : 'ACESSAR PAINEL'}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/5 text-[9px] text-gray-600 flex justify-between font-bold">
          <span>SÃO PAULO, BR</span>
          <span>SISTEMA V2.6</span>
        </div>
      </div>
    </div>
  );
}
