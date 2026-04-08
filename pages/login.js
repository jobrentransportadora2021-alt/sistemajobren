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
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      margin: 0,
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      <div style={{
        backgroundColor: '#161616',
        width: '100%',
        maxWight: '400px',
        padding: '40px',
        borderRadius: '30px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        
        <h1 style={{
          color: '#0084ff',
          fontSize: '28px',
          fontWeight: '900',
          letterSpacing: '-1px',
          marginBottom: '30px',
          textTransform: 'uppercase'
        }}>
          JOBREN TRANSPORTES
        </h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Nome de usuário" 
            style={{
              backgroundColor: '#222',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '15px',
              borderRadius: '12px',
              color: 'white',
              outline: 'none'
            }}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Sua senha" 
            style={{
              backgroundColor: '#222',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '15px',
              borderRadius: '12px',
              color: 'white',
              outline: 'none'
            }}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button 
            disabled={carregando}
            style={{
              backgroundColor: '#0084ff',
              color: 'white',
              border: 'none',
              padding: '18px',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {carregando ? 'VERIFICANDO...' : 'ACESSAR PAINEL'}
          </button>
        </form>

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: '#444',
          fontWeight: 'bold'
        }}>
          <span>SÃO PAULO, BR</span>
          <span>SISTEMA V2.6</span>
        </div>
      </div>
    </div>
  );
}
