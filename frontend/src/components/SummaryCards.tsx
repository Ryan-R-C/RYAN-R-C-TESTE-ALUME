import React from 'react';
import type { Simulation } from '../types/simulationTypes';
import { Link } from 'react-router-dom';
import { PlusCircleIcon } from '@phosphor-icons/react';

interface SummaryCardsProps {
  simulations: Simulation[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ simulations }) => {
  const total = simulations.length;
  const avg = total
    ? simulations?.reduce((sum, s) => sum + s.valor_parcela_mensal, 0) / total
    : 0;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium">Total de simulações</h3>
        <p className="text-2xl">{total}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium">Média das parcelas</h3>
        <p className="text-2xl">{avg.toFixed(2)}</p>
      </div>
      <div className='flex flex-col gap-1 justify-center p-4 bg-white rounded-lg shadow'>
        <h3 className="text-lg font-medium">Criar novas simulações</h3>
        <Link to="/app/simulation" className="button flex justify-center gap-1">Simulação <PlusCircleIcon className='text-white font-bold' size={24}/></Link>
      </div>
    </div>
  );
};