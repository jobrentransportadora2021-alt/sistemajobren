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
      
      {/* Círculos de Brilho de Fundo (Efeito Cyber) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-[450px] relative">
        {/* Bordas que brilham atrás do card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-20"></div>
        
        {/* Card de Vidro */}
        <div className="relative bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black italic tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">JOBREN</span>
              <span className="text-white ml-2 text-3xl">LOGIN</span>
            </h1>
            <div className="h-[2px] w-20 bg-cyan-500 mx-auto mt-2 shadow-[0_0_10px_#06b6d4]"></div>
            <p className="mt-4 text-gray-500 text-[10px] uppercase font-bold tracking-[0.3em]">Autenticação de Segurança</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-widest">Credenciais</label>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="E-mail Corporativo" 
                  className="w-full bg-black/50 border border-white/10 p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all duration-300 text-sm group-hover:border-white/20"
                  onChange={e => setEmail(e.target.value)} 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <input 
                  type="password" 
                  placeholder="Senha de Acesso" 
                  className="w-full bg-black/50 border border-white/10 p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all duration-300 text-sm group-hover:border-white/20"
                  onChange={e => setPassword(e.target.value)} 
                  required
                />
              </div>
            </div>

            <button 
              disabled={carregando}
              className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-500 relative overflow-hidden group
                ${carregando 
                  ? 'bg-gray-800 cursor-not-allowed text-gray-500' 
                  : 'bg-cyan-600 hover:bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-cyan-500/50 active:scale-95'
                }`}
            >
              <span className="relative z-10">{carregando ? 'Verificando...' : 'Entrar no Sistema'}</span>
              
              {/* Efeito de brilho passando no botão ao passar o mouse */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
            </button>
          </form>

          <div className="mt-10 flex items-center justify-between text-[9px] font-bold text-gray-600 uppercase tracking-tighter border-t border-white/5 pt-6">
            <span>SÃO PAULO (HQ)</span>
            <div className="h-1 w-1 bg-cyan-800 rounded-full"></div>
            <span>LOGÍSTICA 4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
