"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Operacional() {
  const [viagens, setViagens] = useState([]);
  const [gasto, setGasto] = useState({ id: '', valor: '', desc: '' });

  useEffect(() => {
    const buscar = async () => {
      const { data } = await supabase.from('viagens').select('*').eq('status', 'Pendente');
      setViagens(data || []);
    };
    buscar();
  }, []);

  const lancarGasto = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('gastos').insert([
      { viagem_id: gasto.id, valor_gasto: parseFloat(gasto.valor), descricao: gasto.desc }
    ]);
    if (error) alert(error.message);
    else alert("✅ Gasto Registrado!");
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl text-yellow-500 font-bold mb-8">OPERACIONAL (GASTOS)</h1>
      <form onSubmit={lancarGasto} className="max-w-md flex flex-col gap-4">
        <select className="p-3 bg-gray-900 border border-yellow-600" onChange={e => setGasto({...gasto, id: e.target.value})}>
          <option>Selecione a Viagem</option>
          {viagens.map(v => <option key={v.id} value={v.id}>{v.cliente_nome} - {v.destino}</option>)}
        </select>
        <input placeholder="Valor do Gasto R$" type="number" className="p-3 bg-gray-900 border border-yellow-600" onChange={e => setGasto({...gasto, valor: e.target.value})} />
        <input placeholder="Descrição (Diesel, Pedágio...)" className="p-3 bg-gray-900 border border-yellow-600" onChange={e => setGasto({...gasto, desc: e.target.value})} />
        <button className="bg-yellow-600 p-4 font-bold hover:bg-yellow-400 uppercase text-black">Registrar Gasto</button>
      </form>
    </div>
  );
}
