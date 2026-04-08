import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return alert("Erro: " + error.message);

    // Busca o cargo do usuário na tabela perfis
    const { data: perfil } = await supabase
      .from('perfis')
      .select('cargo')
      .eq('id', data.user.id)
      .single();

    // Redirecionamento Inteligente
    if (perfil?.cargo === 'vendedor') router.push('/comercial');
    else if (perfil?.cargo === 'operacional') router.push('/operacional');
    else if (perfil?.cargo === 'financeiro') router.push('/financeiro');
    else router.push('/'); // Admin ou Geral
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">LOGIN - JOBREN TRANSPORTES</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input type="email" placeholder="Seu Email" className="p-3 bg-gray-900 border border-cyan-500" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Sua Senha" className="p-3 bg-gray-900 border border-cyan-500" onChange={e => setPassword(e.target.value)} />
        <button className="bg-cyan-600 p-3 font-bold hover:bg-cyan-400">ENTRAR NO SISTEMA</button>
      </form>
    </div>
  );
}
