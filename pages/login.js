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
      alert("Erro no acesso: " + error.message);
      setCarregando(false);
      return;
    }

    const { data: perfil } = await supabase
      .from('perfis')
      .select('cargo')
      .eq('id', data.user.id)
      .single();

    if (perfil?.cargo === 'vendedor') router.push('/comercial');
    else if (perfil?.cargo === 'operacional') router.push('/operacional');
    else if (perfil?.cargo === 'financeiro') router.push('/financeiro');
    else router.push('/');

    setCarregando(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* 1. Detalhes de Fundo (Glow Neon Sutil) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[440px] relative z-10">
        
        {/* 2. Brilho de Borda (Glow) atrás do Card */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl blur opacity-30"></div>
        
        {/* 3. Card Principal (Efeito de Vidro Escuro) */}
        <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.1)]">
          
          {/* Header Robusto */}
          <div className="text-center mb-12 relative">
            <h1 className="text-4xl font-extrabold italic tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">JOBREN</span>
              <span className="text-white ml-2 text-3xl font-black">LOG</span>
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-2 shadow-[0_0_15px_#06b6d4]"></div>
            <p className="mt-5 text-gray-500 text-[10px] uppercase font-bold tracking-[0.35em]">Central de Autenticação</p>
          </div>

          {/* Formulário Profissional */}
          <form onSubmit={handleLogin} className="space-y-7">
            
            {/* Campo E-mail com Efeito Focus */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
              <input 
                type="email" 
                placeholder="exemplo@jobren.com" 
                className="w-full bg-black/60 border border-white/10 p-4.5 rounded-xl text-sm placeholder:text-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all duration-300 hover:border-white/20"
                onChange={e => setEmail(e.target.value)} 
                required
              />
            </div>

            {/* Campo Senha */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Senha de Acesso</label>
              <input 
                type="password" 
                placeholder="••••••••••" 
                className="w-full bg-black/60 border border-white/10 p-4.5 rounded-xl text-sm placeholder:text-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all duration-300 hover:border-white/20"
                onChange={e => setPassword(e.target.value)} 
                required
              />
            </div>

            {/* Botão Robustocom Efeito de Brilho */}
            <button 
              disabled={carregando}
              className={`w-full py-4.5 mt-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 relative overflow-hidden group
                ${carregando 
                  ? 'bg-gray-800 cursor-not-allowed text-gray-500' 
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-cyan-500/60 active:scale-95'
                }`}
            >
              <span className="relative z-10">{carregando ? 'Verificando Credenciais...' : 'Acessar Painel de Controle'}</span>
              
              {/* Efeito Shine (Brilho que percorre o botão) */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/25 opacity-40 group-hover:animate-shine" />
            </button>
          </form>

          {/* Rodapé do Card com Detalhes da Jobren */}
          <div className="mt-12 flex items-center justify-between text-[9px] font-bold text-gray-600 uppercase tracking-tighter border-t border-white/5 pt-8">
            <span className="hover:text-cyan-600 transition cursor-default">Logística 4.0</span>
            <div className="h-1.5 w-1.5 bg-cyan-900 rounded-full shadow-[0_0_5px_#164e63]"></div>
            <span className="hover:text-cyan-600 transition cursor-default">Jobren v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
