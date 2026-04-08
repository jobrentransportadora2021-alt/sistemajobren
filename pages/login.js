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

    // Busca o cargo na tabela 'perfis' que criamos no Supabase
    const { data: perfil } = await supabase
      .from('perfis')
      .select('cargo')
      .eq('id', data.user.id)
      .single();

    if (perfil?.cargo === 'vendedor') router.push('/comercial');
    else if (perfil?.cargo === 'operacional') router.push('/operacional');
    else if (perfil?.cargo === 'financeiro') router.push('/financeiro');
    else router.push('/'); // Se não tiver cargo, vai pro menu geral

    setCarregando(false);
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-sm bg-gray-900 p-8 rounded-2xl border border-cyan-500 shadow-2xl shadow-cyan-500/20">
        <h1 className="text-2xl font-black text-center text-cyan-400 mb-2">JOBREN LOGIN</h1>
        <p className="text-center text-gray-500 text-xs mb-8 uppercase font-bold tracking-widest">Acesso Restrito</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input 
            type="email" 
            placeholder="E-mail Corporativo" 
            className="p-4 bg-black border border-gray-700 rounded focus:border-cyan-400 outline-none transition" 
            onChange={e => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder="Sua Senha" 
            className="p-4 bg-black border border-gray-700 rounded focus:border-cyan-400 outline-none transition" 
            onChange={e => setPassword(e.target.value)} 
            required
          />
          <button 
            className={`p-4 font-black rounded transition-all ${carregando ? 'bg-gray-700' : 'bg-cyan-600 hover:bg-cyan-400 hover:text-black shadow-lg shadow-cyan-500/40'}`}
            disabled={carregando}
          >
            {carregando ? 'AUTENTICANDO...' : 'ENTRAR NO SISTEMA'}
          </button>
        </form>
      </div>
    </div>
  );
}
