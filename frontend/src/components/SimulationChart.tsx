import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Simulation } from '../types/simulationTypes';

interface ChartProps {
  simulations: Simulation[];
}

export const SimulationChart: React.FC<ChartProps> = ({ simulations }) => {
  const data = simulations.map(sim => ({
    date: new Date(sim.data_criacao).toLocaleDateString(),
    value: sim.valor_parcela_mensal,
  }));

  return (
    <div className="my-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};