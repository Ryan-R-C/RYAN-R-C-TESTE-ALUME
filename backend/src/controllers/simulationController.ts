import { Request, Response } from 'express';
import * as simulationService from '../services/simulationService';
import { simulationSchema } from '../validators/schemas/simulationSchemas';
import { parseFiltersFromQuery } from '../utils/parseFiltersFromQuery';
import { SimulationFilters } from '../types/SimulationFilters';

interface AuthRequest extends Request {
  userId?: number;
}

export async function createSimulation(req: AuthRequest, res: Response) {
  const idEstudante = req.userId!;
  try {
    const data = simulationSchema.parse(req.body);
    const simulacao = await simulationService.createSimulation(idEstudante, data);
    return res.status(201).json(simulacao);
  } catch (err: any) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    if (err.errors) return res.status(400).json({ message: err.errors });
    return res.status(500).json({ message: 'Erro ao criar simulação' });
  }
}

export async function listSimulations(req: AuthRequest, res: Response) {
  const idEstudante = req.userId!;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const filterConfig: Record<keyof SimulationFilters, (value: string) => any> = {
    id: Number,
    valor_total: Number,
    quantidade_parcelas: Number,
    juros_ao_mes: Number,
    valor_parcela_mensal: Number,
    data_criacao: (v) => new Date(v),
  };

  const filters = parseFiltersFromQuery<SimulationFilters>(req.query, filterConfig);
  
  try {
    const result = await simulationService.listSimulations(idEstudante, filters, page, limit);
    return res.json({
      data: result.data,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages
      }
    });
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro ao listar simulações' });
  }
}