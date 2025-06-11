import React from 'react';
import { SummaryCards } from '../components/SummaryCards';
import { RecentSimulations } from '../components/RecentSimulations';
import { SimulationChart } from '../components/SimulationChart';
import { SimulationFilters } from '../components/SimulationFilters';
import { Pagination } from '../components/Pagination';
import { useSimulationsWithFilters } from '../hooks/useSimulationsWithFilters';

const Dashboard: React.FC = () => {
  const {
    simulations,
    page,
    totalPages,
    pendingFilters,
    handleFilterChange,
    handleApplyFilters,
    handleClearFilters,
    setPage,
  } = useSimulationsWithFilters({ limit: 6, initialOrder: 'desc' });

  return (
    <div className="p-6 flex flex-col gap-6 max-w-4xl mx-auto">
      <h2 className="page_title mb-0">Dashboard</h2>
      <SimulationFilters
        pendingFilters={pendingFilters}
        onFilterChange={handleFilterChange}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
      <SummaryCards simulations={simulations} />
      <SimulationChart simulations={simulations} />
      <div className="flex flex-col gap-3">
        <h2 className="page_subtitle mb-0">Últimas simulações</h2>
        <RecentSimulations
          simulations={simulations}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;