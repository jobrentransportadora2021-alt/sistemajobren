"use client";
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Comercial() {
  const [form, setForm] = useState({ cliente: '', origem: '', destino: '', valor: '' });

  const salvar = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('viagens').insert([
      { cliente_nome: form.cliente, origem: form.origem, destino: form.destino, valor_venda: parseFloat(form.valor), status: 'Pendente' }
    ]);
    if (error) alert("Erro: " + error.message);
    else { alert("✅ Frete Lançado!"); setForm({ cliente: '', origem: '', destino: '', valor: '' }); }
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white flex flex-col items-center">
      <h1 className="text-3xl text-cyan-400 font-bold mb-8 border-b-2 border-cyan-500">NOVO FRETE (VENDAS)</h1>
      <form onSubmit={salvar} className="flex flex-col gap-4 w-full max-w-md bg-gray-900 p-8 rounded border border-cyan-900">
        <input placeholder="Cliente" className="p-3 bg-black border border-gray-700 text-cyan-400" value={form.cliente} onChange={e => setForm({...form, cliente: e.target.value})} />
        <input placeholder="Origem" className="p-3 bg-black border border-gray-700" value={form.origem} onChange={e => setForm({...form, origem: e.target.value})} />
        <input placeholder="Destino" className="p-3 bg-black border border-gray-700" value={form.destino} onChange={e => setForm({...form, destino: e.target.value})} />
        <input type="number" placeholder="Valor do Frete R$" className="p-3 bg-black border border-gray-700 text-green-400 font-bold" value={form.valor} onChange={e => setForm({...form, valor: e.target.value})} />
        <button className="bg-cyan-600 p-4 font-bold hover:bg-cyan-400 uppercase">Salvar Frete</button>
      </form>
    </div>
  );
}
