import { useEffect, useState, useContext } from 'react';
import { fetchSimulations } from '../services/simulationService';
import type { Simulation } from '../types/simulationTypes';
import { AuthContext } from '../contexts/AuthContext';
import { inserToken } from '../utils/inserToken';

const initialFilters = {
  valor_total: '',
  quantidade_parcelas: '',
  juros_ao_mes: '',
  valor_parcela_mensal: '',
  data_criacao: ''
};

type UseSimulationsWithFiltersOptions = {
  limit?: number;
  initialOrder?: 'asc' | 'desc';
};

export function useSimulationsWithFilters(options: UseSimulationsWithFiltersOptions = {}) {
  const { token } = useContext(AuthContext);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [filters, setFilters] = useState(initialFilters);
  const [pendingFilters, setPendingFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState<'asc' | 'desc'>(options.initialOrder || 'desc');
  const limit = options.limit;

  useEffect(() => {
    if (token) {
      inserToken(token);

      fetchSimulations({
        ...filters,
        page,
        ...(limit ? { limit } : {}),
        order,
      }).then(res => {
        setSimulations(res.data?.data || res.data);
        setTotalPages(res.data?.meta?.totalPages || 1);
      });
    }
  }, [token, filters, page, limit, order]);

  const handleFilterChange = (field: string, value: string) => {
    setPendingFilters({ ...pendingFilters, [field]: value });
  };

  const handleApplyFilters = () => {
    setFilters(pendingFilters);
    setPage(1);
  };

  const handleClearFilters = () => {
    setPendingFilters(initialFilters);
    setFilters(initialFilters);
    setPage(1);
  };

  const handleOrderChange = (newOrder: 'asc' | 'desc') => {
    setOrder(newOrder);
    setPage(1);
  };

  return {
    simulations,
    page,
    totalPages,
    pendingFilters,
    handleFilterChange,
    handleApplyFilters,
    handleClearFilters,
    setPage,
    order,
    handleOrderChange,
  };
}
