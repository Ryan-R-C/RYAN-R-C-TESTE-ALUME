import React from 'react';
import type { Simulation } from '../types/simulationTypes';

interface RecentSimulationsProps {
  simulations: Simulation[];
}

export const RecentSimulations: React.FC<RecentSimulationsProps> = ({
  simulations,
}) => {

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {simulations.map(sim => (
          <div key={sim.id} className="p-4 bg-white rounded-lg shadow">
            <p><strong>ID:</strong> {sim.id}</p>
            <p><strong>Valor Total:</strong> {sim.valor_total.toFixed(2)}</p>
            <p><strong>Quantidade de Parcelas:</strong> {sim.quantidade_parcelas}</p>
            <p><strong>Juros ao Mês:</strong> {sim.juros_ao_mes.toFixed(2)}</p>
            <p><strong>Parcela Mensal:</strong> {sim.valor_parcela_mensal.toFixed(2)}</p>
            <p><strong>Data de Criação:</strong> {new Date(sim.data_criacao).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};