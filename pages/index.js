import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-10 bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8 underline">JOBREN TRANSPORTES - SISTEMA INTEGRADO</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link href="/comercial" className="p-6 bg-gray-900 border-2 border-cyan-500 hover:bg-cyan-900 transition rounded-lg text-center">
          <h2 className="text-xl font-bold">1. COMERCIAL</h2>
          <p className="text-sm text-gray-400">Cadastrar novos fretes e rotas</p>
        </Link>

        <Link href="/operacional" className="p-6 bg-gray-900 border-2 border-yellow-500 hover:bg-yellow-900 transition rounded-lg text-center">
          <h2 className="text-xl font-bold">2. OPERACIONAL</h2>
          <p className="text-sm text-gray-400">Lançar gastos de viagem (Diesel/Pedágio)</p>
        </Link>

        <Link href="/financeiro" className="p-6 bg-gray-900 border-2 border-green-500 hover:bg-green-900 transition rounded-lg text-center">
          <h2 className="text-xl font-bold">3. FINANCEIRO</h2>
          <p className="text-sm text-gray-400">Relatório de Lucro Líquido Real</p>
        </Link>
      </div>
    </div>
  );
}
