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

    // O erro 400 acontece aqui se o email/senha estiverem errados
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: email.trim(), 
      password: password 
    });

    if (error) {
      alert("Falha na autenticação: " + error.message);
      setCarregando(false);
      return;
    }

    // Busca o cargo na tabela 'perfis'
    const { data: perfil, error: perfilError } = await supabase
      .from('perfis')
      .select('cargo')
      .eq('id', data.user.id)
      .single();

    if (perfil) {
      if (perfil.cargo === 'vendedor') router.push('/comercial');
      else if (perfil.cargo === 'operacional') router.push('/operacional');
      else if (perfil.cargo === 'financeiro') router.push('/financeiro');
      else router.push('/'); 
    } else {
      alert("Perfil não configurado no banco de dados.");
      setCarregando(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a', minHeight: '100vh', width: '100vw',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'sans-serif', margin: 0, position: 'fixed', top: 0, left: 0
    }}>
      <div style={{
        backgroundColor: '#161616', width: '90%', maxWidth: '400px',
        padding: '40px', borderRadius: '25px', textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid #333'
      }}>
        <h1 style={{ color: '#0084ff', fontWeight: '900', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          JOBREN TRANSPORTES
        </h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" placeholder="E-mail" 
            style={{ padding: '15px', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#222', color: 'white', outline: 'none' }}
            onChange={e => setEmail(e.target.value)} required
          />
          <input 
            type="password" placeholder="Senha" 
            style={{ padding: '15px', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#222', color: 'white', outline: 'none' }}
            onChange={e => setPassword(e.target.value)} required
          />
          <button 
            disabled={carregando}
            style={{ 
              backgroundColor: '#0084ff', color: 'white', padding: '18px', 
              borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
              textTransform: 'uppercase', marginTop: '10px', transition: '0.3s'
            }}
          >
            {carregando ? 'PROCESSANDO...' : 'ACESSAR PAINEL'}
          </button>
        </form>

        <div style={{ marginTop: '30px', color: '#444', fontSize: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>SÃO PAULO, BR</span>
          <span>SISTEMA V2.6</span>
        </div>
      </div>
    </div>
  );
}
