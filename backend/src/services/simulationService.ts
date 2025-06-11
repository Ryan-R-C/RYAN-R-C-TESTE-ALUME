import { calculateInstallment } from '../utils/calculateInstallment';
import { SimulacaoInputDto, SimulacaoOutputDto } from '../models/Simulacao';
import { simulacaoRepository as defaultSimulacaoRepository } from '../repositories/simulacaoRepository';
import { SimulationFilters } from '../types/SimulationFilters';

export async function createSimulation(
  idEstudante: number,
  data: SimulacaoInputDto,
  repository = defaultSimulacaoRepository
): Promise<SimulacaoOutputDto> {
  try {
    const juros_a_cada_mes = data.juros_ao_mes / 100 / 12;
    const valor_parcela_mensal = calculateInstallment(data.valor_total, juros_a_cada_mes, data.quantidade_parcelas);
    const simulacao = await repository.create({
      idEstudante,
      valor_total: data.valor_total,
      quantidade_parcelas: data.quantidade_parcelas,
      juros_ao_mes: data.juros_ao_mes,
      valor_parcela_mensal
    });
    return simulacao as SimulacaoOutputDto;
  } catch (err: any) {
    throw { status: 500, message: 'Erro ao criar simulação' };
  }
}

export async function listSimulations(
  idEstudante: number,
  filters: SimulationFilters,
  page: number,
  limit: number,
  repository = defaultSimulacaoRepository
): Promise<{ data: SimulacaoOutputDto[]; total: number; page: number; limit: number; totalPages: number }> {
  try {
    const { data, total } = await repository.findManyByEstudanteWithFilters(
      idEstudante,
      filters,
      page,
      limit
    );
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  } catch (err: any) {
    throw { status: 500, message: 'Erro ao listar simulações' };
  }
}
