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
    if (error) { 
      alert("Erro: " + error.message); 
      setCarregando(false); 
      return; 
    }
    router.push('/'); 
  };

  return (
    /* Centralização total na tela com fundo preto profundo */
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-6 font-sans">
      
      {/* Efeito de brilho sutil atrás do card */}
      <div className="absolute w-[300px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Card Principal - Inspirado na Imagem Enviada */}
      <div className="relative w-full max-w-[400px] bg-[#161616] border border-white/5 p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        
        {/* Título com a cor exata da imagem */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tight text-[#0084ff] uppercase">
            JOBREN TRANSPORTES
          </h1>
          <div className="h-1 w-12 bg-[#0084ff]/20 mx-auto mt-2 rounded-full"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <input 
              type="email" 
              placeholder="Nome de usuário" 
              className="w-full bg-[#222] border border-white/5 p-4 rounded-2xl text-white placeholder:text-gray-500 outline-none focus:border-[#0084ff]/50 focus:bg-[#282828] transition-all"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <input 
              type="password" 
              placeholder="Sua senha" 
              className="w-full bg-[#222] border border-white/5 p-4 rounded-2xl text-white placeholder:text-gray-500 outline-none focus:border-[#0084ff]/50 focus:bg-[#282828] transition-all"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botão Azul Vibrante conforme a imagem */}
          <button 
            disabled={carregando}
            className="w-full bg-[#0084ff] hover:bg-[#0074e0] text-white font-bold py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(0,132,255,0.2)] active:scale-[0.98] uppercase tracking-wider text-sm mt-4"
          >
            {carregando ? 'VERIFICANDO...' : 'ACESSAR PAINEL'}
          </button>
        </form>

        {/* Rodapé discreto do card */}
        <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-bold text-gray-600 uppercase tracking-widest">
          <span>SÃO PAULO, BR</span>
          <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
          <span>SISTEMA V2.6</span>
        </div>
      </div>
    </div>
  );
}
