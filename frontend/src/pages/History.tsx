import React from 'react';
import { Pagination } from '../components/Pagination';
import { SimulationFilters } from '../components/SimulationFilters';
import { useSimulationsWithFilters } from '../hooks/useSimulationsWithFilters';

const History: React.FC = () => {
  const {
    simulations,
    page,
    totalPages,
    pendingFilters,
    handleFilterChange,
    handleApplyFilters,
    handleClearFilters,
    setPage,
  } = useSimulationsWithFilters();

  return (
    <div className="p-6 flex flex-col gap-6 max-w-4xl mx-auto">
      <h1 className="page_title mb-0">Histórico de Simulações</h1>
      <SimulationFilters
        pendingFilters={pendingFilters}
        onFilterChange={handleFilterChange}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
      <table className="w-full table-auto bg-white rounded shadow overflow-hidden shadow-md">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Valor Total</th>
            <th className="px-4 py-2">Parcelas</th>
            <th className="px-4 py-2">Parcela (R$)</th>
          </tr>
        </thead>
        <tbody>
          {simulations.map(sim => (
            <tr key={sim.id} className="text-center border-b">
              <td className="px-4 py-2">{new Date(sim.data_criacao).toLocaleDateString()}</td>
              <td className="px-4 py-2">{sim.valor_total.toFixed(2)}</td>
              <td className="px-4 py-2">{sim.quantidade_parcelas}</td>
              <td className="px-4 py-2">{sim.valor_parcela_mensal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default History;
