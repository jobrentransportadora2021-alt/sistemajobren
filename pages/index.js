"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6 bg-black min-h-screen text-white flex flex-col items-center justify-center font-sans">
      {/* Header Estilizado */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tighter italic">
          JOBREN <span className="text-white">TRANSPORTES</span>
        </h1>
        <div className="h-1 w-32 bg-cyan-500 mx-auto mt-2 shadow-[0_0_15px_#22d3ee]"></div>
        <p className="mt-4 text-gray-400 uppercase tracking-[0.3em] text-xs font-bold">Logística de Alta Performance</p>
      </div>
      
      {/* Grid de Departamentos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        
        {/* Card Comercial */}
        <Link href="/login" className="group relative p-1 bg-gray-900 rounded-2xl transition-all hover:scale-105 active:scale-95">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
          <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800 flex flex-col items-center">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">📊</div>
            <h2 className="text-2xl font-black text-cyan-400 tracking-tight">COMERCIAL</h2>
            <p className="text-[10px] text-gray-500 mt-2 font-bold tracking-widest uppercase">Gestão de Fretes e Rotas</p>
          </div>
        </Link>

        {/* Card Operacional */}
        <Link href="/login" className="group relative p-1 bg-gray-900 rounded-2xl transition-all hover:scale-105 active:scale-95">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
          <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800 flex flex-col items-center">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">🚚</div>
            <h2 className="text-2xl font-black text-yellow-500 tracking-tight">OPERACIONAL</h2>
            <p className="text-[10px] text-gray-500 mt-2 font-bold tracking-widest uppercase">Controle de Viagens e Gastos</p>
          </div>
        </Link>

        {/* Card Financeiro */}
        <Link href="/login" className="group relative p-1 bg-gray-900 rounded-2xl transition-all hover:scale-105 active:scale-95">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
          <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800 flex flex-col items-center">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">💰</div>
            <h2 className="text-2xl font-black text-green-500 tracking-tight">FINANCEIRO</h2>
            <p className="text-[10px] text-gray-500 mt-2 font-bold tracking-widest uppercase">Lucro Líquido e Dashboard</p>
          </div>
        </Link>

      </div>

      <footer className="mt-20 text-gray-600 text-[10px] font-bold tracking-widest uppercase">
        © 2026 Jobren Transportes | São Paulo - Aracaju
      </footer>
    </div>
  );
}"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-10 bg-black min-h-screen text-white flex flex-col items-center justify-center font-sans">
      <h1 className="text-4xl font-bold text-cyan-400 mb-2 tracking-tighter">JOBREN TRANSPORTES</h1>
      <p className="text-gray-500 mb-12 uppercase tracking-widest text-sm font-bold">Sistema de Gestão Integrado</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Link href="/comercial" className="group p-8 bg-gray-900 border-2 border-cyan-500 hover:bg-cyan-500 transition-all rounded-xl text-center shadow-lg shadow-cyan-500/20">
          <h2 className="text-2xl font-black group-hover:text-black">1. COMERCIAL</h2>
          <p className="text-xs mt-2 text-gray-400 group-hover:text-black font-bold">LANÇAR NOVOS FRETES</p>
        </Link>

        <Link href="/operacional" className="group p-8 bg-gray-900 border-2 border-yellow-500 hover:bg-yellow-500 transition-all rounded-xl text-center shadow-lg shadow-yellow-500/20">
          <h2 className="text-2xl font-black group-hover:text-black">2. OPERACIONAL</h2>
          <p className="text-xs mt-2 text-gray-400 group-hover:text-black font-bold">GASTOS DE VIAGEM</p>
        </Link>

        <Link href="/financeiro" className="group p-8 bg-gray-900 border-2 border-green-500 hover:bg-green-500 transition-all rounded-xl text-center shadow-lg shadow-green-500/20">
          <h2 className="text-2xl font-black group-hover:text-black">3. FINANCEIRO</h2>
          <p className="text-xs mt-2 text-gray-400 group-hover:text-black font-bold">LUCRO LÍQUIDO REAL</p>
        </Link>
      </div>
    </div>
  );
}
