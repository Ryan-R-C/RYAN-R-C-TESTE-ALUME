export interface Simulation {
    id: number;
    idEstudante: number;
    valor_total: number;
    quantidade_parcelas: number;
    juros_ao_mes: number;
    valor_parcela_mensal: number;
    data_criacao: string;
}

export interface SimulacaoInputDto {
  valor_total: number;
  quantidade_parcelas: number;
  juros_ao_mes: number;
}

export interface SimulacaoOutputDto {
  id: number;
  idEstudante: number;
  valor_total: number;
  quantidade_parcelas: number;
  juros_ao_mes: number;
  valor_parcela_mensal: number;
  data_criacao: Date;
}