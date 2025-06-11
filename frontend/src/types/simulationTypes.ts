export interface Simulation {
    id: number;
    idEstudante: number;
    valor_total: number;
    quantidade_parcelas: number;
    juros_ao_mes: number;
    valor_parcela_mensal: number;
    data_criacao: string;
}

export interface SimulationPaginatedResponse {
    data: Simulation[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}