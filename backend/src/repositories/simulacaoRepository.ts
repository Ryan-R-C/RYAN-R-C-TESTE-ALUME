import { Prisma, PrismaClient } from '@prisma/client';
import { Simulation } from '../models/Simulacao';
import { SimulationFilters } from '../types/SimulationFilters';

const prisma = new PrismaClient();

type SimulacaoInputDto = Omit<Simulation, 'id' | 'data_criacao'>;

export const simulacaoRepository = {
  async create(data: SimulacaoInputDto) {
    return prisma.simulacao.create({ data });
  },

  async findManyByEstudante(idEstudante: number) {
    return prisma.simulacao.findMany({
      where: { idEstudante: idEstudante },
      orderBy: { data_criacao: 'desc' }
    });
  },

  async findManyByEstudanteWithFilters(
    idEstudante: number,
    filters: SimulationFilters,
    page: number,
    limit: number
  ) {
    const where: Prisma.SimulacaoWhereInput = { idEstudante };

    const allowedFilters = [
      'id',
      'valor_total',
      'quantidade_parcelas',
      'juros_ao_mes',
      'valor_parcela_mensal',
      'data_criacao',
    ] as const;

    for (const key of allowedFilters) {
      if (filters[key] !== undefined) {
        where[key] = filters[key];
      }
    }

    const [data, total] = await Promise.all([
      prisma.simulacao.findMany({
        where,
        orderBy: { data_criacao: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.simulacao.count({ where })
    ]);

    return { data, total };
  }
};
