
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Financeiro() {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    const puxarDados = async () => {
      const { data } = await supabase.from('relatorio_financeiro').select('*');
      setRelatorio(data);
    };
    puxarDados();
  }, []);

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl text-green-400 font-bold mb-5">FINANCEIRO - RELATÓRIO DE LUCRO</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">Cliente</th>
            <th className="p-2">Venda (R$)</th>
            <th className="p-2">Custos (R$)</th>
            <th className="p-2 text-green-400">Lucro Líquido</th>
          </tr>
        </thead>
        <tbody>
          {relatorio.map(r => (
            <tr key={r.viagem_id} className="border-b border-gray-800 hover:bg-gray-800">
              <td className="p-2">{r.cliente_nome}</td>
              <td className="p-2">{r.valor_venda}</td>
              <td className="p-2 text-red-400">{r.total_custos}</td>
              <td className="p-2 font-bold text-green-400">{r.lucro_liquido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
