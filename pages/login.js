"use client";

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [focusField, setFocusField] = useState(null);
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
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* 1. Background Dinâmico (Orbes de Luz) */}
      <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-[450px] relative z-10">
        
        {/* 2. Glow de Fundo do Card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2.5rem] blur-2xl opacity-20 transition duration-1000"></div>
        
        {/* 3. Card Principal com Efeito Glassmorphism Profundo */}
        <div className="relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6">
              <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">Acesso Restrito</span>
            </div>
            
            <h1 className="text-5xl font-black italic tracking-tighter mb-2 leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-400 to-blue-600">JOBREN</span>
            </h1>
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em]">Logística de Próxima Geração</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Campo E-mail */}
            <div className="relative group">
              <input 
                type="email" 
                placeholder="E-mail Corporativo" 
                className={`w-full bg-black/40 border ${focusField === 'email' ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-white/5'} p-5 rounded-2xl text-sm transition-all duration-500 outline-none placeholder:text-gray-700`}
                onFocus={() => setFocusField('email')}
                onBlur={() => setFocusField(null)}
                onChange={e => setEmail(e.target.value)} 
                required
              />
              <div className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-700 ${focusField === 'email' ? 'w-full' : 'w-0'}`}></div>
            </div>

            {/* Campo Senha */}
            <div className="relative group">
              <input 
                type="password" 
                placeholder="Chave de Segurança" 
                className={`w-full bg-black/40 border ${focusField === 'pass' ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-white/5'} p-5 rounded-2xl text-sm transition-all duration-500 outline-none placeholder:text-gray-700`}
                onFocus={() => setFocusField('pass')}
                onBlur={() => setFocusField(null)}
                onChange={e => setPassword(e.target.value)} 
                required
              />
              <div className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-700 ${focusField === 'pass' ? 'w-full' : 'w-0'}`}></div>
            </div>

            {/* Botão de Ação Robusto */}
            <button 
              disabled={carregando}
              className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 relative overflow-hidden active:scale-[0.98]
                ${carregando 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]'
                }`}
            >
              <span className="relative z-10">{carregando ? 'Validando...' : 'Autenticar Acesso'}</span>
            </button>
          </form>

          {/* Rodapé Industrial */}
          <div className="mt-14 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest">Sede</span>
              <span className="text-[10px] font-bold">São Paulo, BR</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex flex-col text-right">
              <span className="text-[8px] font-black uppercase tracking-widest">Versão</span>
              <span className="text-[10px] font-bold">2.6.0-PRO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
