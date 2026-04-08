import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Operacional() {
  const [viagens, setViagens] = useState([]);
  const [custo, setCusto] = useState({ viagem_id: '', desc: '', valor: '' });

  const carregarViagens = async () => {
    const { data } = await supabase.from('viagens').select('*').eq('status', 'agendado');
    setViagens(data);
  };

  const lancarCusto = async () => {
    await supabase.from('custos_operacao').insert([
      { viagem_id: custo.viagem_id, descricao: custo.desc, valor_custo: parseFloat(custo.valor) }
    ]);
    alert("Custo Lançado!");
    setCusto({ viagem_id: '', desc: '', valor: '' });
  };

  useEffect(() => { carregarViagens(); }, []);

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl text-yellow-400 font-bold mb-5">OPERACIONAL - LANÇAR CUSTOS</h1>
      <select className="p-2 bg-gray-800 mb-4 w-full max-w-md" onChange={e => setCusto({...custo, viagem_id: e.target.value})}>
        <option>Selecione a Viagem</option>
        {viagens.map(v => <option key={v.id} value={v.id}>{v.cliente_nome} ({v.destino})</option>)}
      </select>
      <div className="flex flex-col gap-4 max-w-md">
        <input placeholder="Ex: Diesel ou Pedágio" className="p-2 bg-gray-800 border border-yellow-500" onChange={e => setCusto({...custo, desc: e.target.value})} />
        <input type="number" placeholder="Valor do Gasto R$" className="p-2 bg-gray-800 border border-yellow-500" onChange={e => setCusto({...custo, valor: e.target.value})} />
        <button onClick={lancarCusto} className="bg-yellow-600 p-3 font-bold hover:bg-yellow-400">REGISTRAR GASTO</button>
      </div>
    </div>
  );
}
