"use client";
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
