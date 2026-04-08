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

    // Busca o cargo na tabela 'perfis' conforme você configurou no Supabase
    const { data: perfil, error: perfilError } = await supabase
      .from('perfis')
      .select('cargo')
      .eq('id', data.user.id)
      .single();

    if (perfil) {
      // Redirecionamento baseado no cargo inserido no banco
      if (perfil.cargo === 'vendedor') router.push('/comercial');
      else if (perfil.cargo === 'operacional') router.push('/operacional');
      else if (perfil.cargo === 'financeiro') router.push('/financeiro');
      else router.push('/'); 
    } else {
      alert("Perfil não encontrado. Verifique se o ID está correto na tabela 'perfis'.");
      setCarregando(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      margin: 0
    }}>
      <div style={{
        backgroundColor: '#161616',
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        borderRadius: '25px',
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        border: '1px solid #333'
      }}>
        <h1 style={{ color: '#0084ff', fontWeight: '900', marginBottom: '30px', textTransform: 'uppercase' }}>
          JOBREN TRANSPORTES
        </h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Nome de usuário" 
            style={{ padding: '15px', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#222', color: 'white' }}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Sua senha" 
            style={{ padding: '15px', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#222', color: 'white' }}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button 
            style={{ 
              backgroundColor: '#0084ff', color: 'white', padding: '18px', 
              borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
              textTransform: 'uppercase', marginTop: '10px'
            }}
          >
            {carregando ? 'VERIFICANDO...' : 'ACESSAR PAINEL'}
          </button>
        </form>

        <div style={{ marginTop: '30px', color: '#444', fontSize: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>SÃO PAULO, BR</span>
          <span>SISTEMA V2.6</span>
        </div>
      </div>
    </div>
  );
}
