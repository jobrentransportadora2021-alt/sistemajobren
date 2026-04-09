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

    try {
      // 1. Tenta a autenticação no Supabase Auth
      // O .trim() em ambos evita erros de espaços invisíveis ao copiar/colar
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password: password.trim() 
      });

      if (error) {
        // Se der erro 401 aqui, é e-mail/senha errado ou falta confirmar e-mail no painel
        alert("Falha na autenticação: " + error.message);
        setCarregando(false);
        return;
      }

      if (data?.user) {
        // 2. Busca o cargo na tabela 'perfis' usando o ID do usuário logado
        const { data: perfil, error: perfilError } = await supabase
          .from('perfis')
          .select('cargo')
          .eq('id', data.user.id)
          .single();

        if (perfilError || !perfil) {
          console.error("Erro ao buscar perfil:", perfilError);
          alert("Perfil não encontrado na tabela 'perfis'. Verifique o UID no banco.");
          setCarregando(false);
          return;
        }

        // 3. Redirecionamento baseado no cargo (case-sensitive)
        const cargo = perfil.cargo?.toLowerCase();
        
        if (cargo === 'vendedor') {
          router.push('/comercial');
        } else if (cargo === 'operacional') {
          router.push('/operacional');
        } else if (cargo === 'financeiro') {
          router.push('/financeiro');
        } else {
          // Se tiver cargo mas não for um dos três, vai para a home
          router.push('/'); 
        }
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Ocorreu um erro inesperado no sistema.");
    } finally {
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
        <h1 style={{ 
          color: '#0084ff', 
          fontWeight: '900', 
          marginBottom: '30px', 
          textTransform: 'uppercase', 
          letterSpacing: '1px' 
        }}>
          JOBREN TRANSPORTES
        </h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            style={{ 
              padding: '15px', borderRadius: '12px', border: '1px solid #333', 
              backgroundColor: '#222', color: 'white', outline: 'none' 
            }}
            onChange={e => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password}
            style={{ 
              padding: '15px', borderRadius: '12px', border: '1px solid #333', 
              backgroundColor: '#222', color: 'white', outline: 'none' 
            }}
            onChange={e => setPassword(e.target.value)} 
            required
          />
          <button 
            disabled={carregando}
            style={{ 
              backgroundColor: '#0084ff', color: 'white', padding: '18px', 
              borderRadius: '12px', border: 'none', fontWeight: 'bold', 
              cursor: carregando ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase', marginTop: '10px', transition: '0.3s',
              opacity: carregando ? 0.7 : 1
            }}
          >
            {carregando ? 'PROCESSANDO...' : 'ACESSAR PAINEL'}
          </button>
        </form>

        <div style={{ 
          marginTop: '30px', color: '#444', fontSize: '10px', 
          display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' 
        }}>
          <span>SÃO PAULO, BR</span>
          <span>SISTEMA V2.6</span>
        </div>
      </div>
    </div>
  );
}
