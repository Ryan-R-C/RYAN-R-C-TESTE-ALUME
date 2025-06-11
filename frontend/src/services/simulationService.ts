import type { SimulationInput } from '../validators/schemas/simulationSchemas';
import api from './api';

interface FetchSimulationsParams {
  valor_total?: string;
  quantidade_parcelas?: string;
  juros_ao_mes?: string;
  valor_parcela_mensal?: string;
  data_criacao?: string;
  page?: number;
  order?: 'asc' | 'desc';
}

export const fetchSimulations = (params?: FetchSimulationsParams) => {
  return api.get('/simulations', { params });
};

export const createSimulation = (data: SimulationInput) => {
  return api.post('/simulations', data);
};