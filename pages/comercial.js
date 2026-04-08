"use client";
import { useState } from 'react';

export default function Comercial() {
  // Estados para os cálculos em tempo real
  const [valorFrete, setValorFrete] = useState(0);
  const [custoDireto, setCustoDireto] = useState(0);

  // Lógica JS: Cálculo automático
  const lucroPrevisto = valorFrete - custoDireto;
  const margem = valorFrete > 0 ? ((lucroPrevisto / valorFrete) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Robusto */}
        <header className="flex justify-between items-center border-b border-cyan-900 pb-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-cyan-400 italic">MÓDULO COMERCIAL</h1>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Jobren v2.0 | Inteligência de Carga</p>
          </div>
          <div className="text-right">
            <span className="bg-cyan-900/30 text-cyan-400 text-[10px] px-3 py-1 rounded-full border border-cyan-500/30">CONECTADO AO SUPABASE</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulário de Lançamento (HTML) */}
          <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-cyan-500 rounded-full"></span> Lançar Novo Contrato
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Cliente / Tomador</label>
                <input type="text" className="w-full bg-black border border-gray-700 p-3 rounded-lg focus:border-cyan-500 outline-none transition" placeholder="Ex: Ambev S/A" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Rota / Destino</label>
                <input type="text" className="w-full bg-black border border-gray-700 p-3 rounded-lg focus:border-cyan-500 outline-none transition" placeholder="São Paulo -> Aracaju" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Valor do Frete (R$)</label>
                <input 
                  type="number" 
                  onChange={(e) => setValorFrete(Number(e.target.value))}
                  className="w-full bg-black border border-gray-700 p-3 rounded-lg focus:border-cyan-500 text-cyan-400 font-bold outline-none" 
                  placeholder="0.00" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Custo Estimado (R$)</label>
                <input 
                  type="number" 
                  onChange={(e) => setCustoDireto(Number(e.target.value))}
                  className="w-full bg-black border border-gray-700 p-3 rounded-lg focus:border-red-500 text-red-400 font-bold outline-none" 
                  placeholder="0.00" 
                />
              </div>
            </div>

            <button className="w-full mt-8 bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all uppercase tracking-tighter">
              Confirmar e Lançar no Sistema
            </button>
          </div>

          {/* Painel de Resultados em Tempo Real (JS funcionando aqui) */}
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
              <p className="text-gray-500 text-[10px] font-bold uppercase mb-2">Lucro Bruto Previsto</p>
              <h3 className={`text-3xl font-black ${lucroPrevisto >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                R$ {lucroPrevisto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
              <p className="text-gray-500 text-[10px] font-bold uppercase mb-2">Margem de Operação</p>
              <div className="flex items-end gap-2">
                <h3 className="text-4xl font-black text-white">{margem}%</h3>
                <span className="text-[10px] text-gray-400 mb-2">DO TOTAL</span>
              </div>
              {/* Barra de progresso visual */}
              <div className="w-full bg-gray-800 h-2 mt-4 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-500 h-full transition-all duration-500" 
                  style={{ width: `${Math.min(Math.max(margem, 0), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
