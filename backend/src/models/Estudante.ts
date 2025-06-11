export interface EstudanteInputDto {
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
}

export interface EstudanteOutputDto {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
}