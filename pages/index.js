"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6 bg-black min-h-screen text-white flex flex-col items-center justify-center font-sans">
      
      {/* Header com Brilho Neon */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tighter italic">
          JOBREN <span className="text-white">TRANSPORTES</span>
        </h1>
        <div className="h-1 w-32 bg-cyan-500 mx-auto mt-2 shadow-[0_0_15px_#22d3ee]"></div>
        <p className="mt-4 text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold">Logística de Alta Performance</p>
      </div>
      
      {/* Grid de Departamentos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        
        {/* Card Comercial - Acesso via Login */}
        <Link href="/login" className="group relative p-1 bg-gray-900 rounded-2xl transition-all hover:scale-105">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
          <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800 flex flex-col items-center">
            <span className="text-4xl mb-4">📊</span>
            <h2 className="text-2xl font-black text-cyan-400 tracking-tight">1. COMERCIAL</h2>
            <p className="text-[10px] text-gray-500 mt-2 font-bold tracking-widest uppercase">Lançar Novos Fretes</p>
          </div>
        </Link>

        {/* Card Operacional - Acesso via Login */}
        <Link href="/login" className="group relative p-1 bg-gray-900 rounded-2xl transition-all hover:scale-105">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
          <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800 flex flex-col items-center">
            <span className="text-4xl mb-4">🚚</span>
            <h2 className="text-2xl font-black text-yellow-500 tracking-tight">2. OPERACIONAL</h2>
            <p className="text-[10px] text-gray-500 mt-2 font-bold tracking-widest uppercase">Gastos de Viagem</p>
          </div>
        </Link>

        {/* Card Financeiro - Acesso via Login */}
        <Link href="/login" className="group relative p-1 bg-gray-900 rounded-2xl transition-all hover:scale-105">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
          <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800 flex flex-col items-center">
            <span className="text-4xl mb-4">💰</span>
            <h2 className="text-2xl font-black text-green-500 tracking-tight">3. FINANCEIRO</h2>
            <p className="text-[10px] text-gray-500 mt-2 font-bold tracking-widest uppercase">Lucro Líquido Real</p>
          </div>
        </Link>

      </div>

      <footer className="mt-20 text-gray-700 text-[9px] font-bold tracking-widest uppercase">
        Sistema Jobren v2.0 | Conectado ao Supabase
      </footer>
    </div>
  );
}
