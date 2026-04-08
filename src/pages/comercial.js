import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Comercial() {
  const [form, setForm] = useState({ cliente: '', origem: '', destino: '', valor: '' });

  const salvar = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('viagens').insert([
      { cliente_nome: form.cliente, origem: form.origem, destino: form.destino, valor_venda: parseFloat(form.valor) }
    ]);
    if (error) alert(error.message);
    else { alert("Frete Lançado!"); setForm({ cliente: '', origem: '', destino: '', valor: '' }); }
  };

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2 dark:text-cyan-400 font-bold mb-5">VENDAS - NOVO FRETE</h1>
      <form onSubmit={salvar} className="flex flex-col gap-4 max-w-md">
        <input placeholder="Cliente" className="p-2 bg-gray-800 border border-cyan-500" value={form.cliente} onChange={e => setForm({...form, cliente: e.target.value})} />
        <input placeholder="Origem" className="p-2 bg-gray-800 border border-cyan-500" value={form.origem} onChange={e => setForm({...form, origem: e.target.value})} />
        <input placeholder="Destino" className="p-2 bg-gray-800 border border-cyan-500" value={form.destino} onChange={e => setForm({...form, destino: e.target.value})} />
        <input type="number" placeholder="Valor R$" className="p-2 bg-gray-800 border border-cyan-500" value={form.valor} onChange={e => setForm({...form, valor: e.target.value})} />
        <button className="bg-cyan-600 p-3 font-bold hover:bg-cyan-400">ENVIAR PARA OPERACIONAL</button>
      </form>
    </div>
  );
}
