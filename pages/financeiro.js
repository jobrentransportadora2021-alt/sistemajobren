"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Financeiro() {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const { data } = await supabase.from('viagens').select('*, gastos(*)');
      setRelatorio(data || []);
    };
    carregar();
  }, []);

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl text-green-500 font-bold mb-8 underline">FINANCEIRO - LUCRO LÍQUIDO</h1>
      <div className="grid grid-cols-1 gap-4">
        {relatorio.map(v => {
          const totalGastos = v.gastos?.reduce((acc, curr) => acc + curr.valor_gasto, 0) || 0;
          const lucro = v.valor_venda - totalGastos;
          return (
            <div key={v.id} className="p-6 bg-gray-900 border-l-8 border-green-500 flex justify-between items-center rounded">
              <div>
                <h3 className="text-xl font-bold uppercase">{v.cliente_nome}</h3>
                <p className="text-xs text-gray-400">{v.origem} ➔ {v.destino}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Venda: R$ {v.valor_venda}</p>
                <p className="text-sm text-red-400">Gastos: R$ {totalGastos}</p>
                <p className="text-xl font-black text-green-400">LUCRO: R$ {lucro}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
