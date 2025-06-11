import { updateStudentSchema } from '../validators/schemas/studentSchemas';
import { z } from 'zod';
import { EstudanteInputDto, EstudanteOutputDto } from '../models/Estudante';
import { estudanteRepository as defaultEstudanteRepository } from '../repositories/estudanteRepository';

export async function getMe(
  idEstudante: number,
  repository = defaultEstudanteRepository
): Promise<EstudanteOutputDto> {
  const estudante = await repository.findById(idEstudante);
  if (!estudante) throw { status: 404, message: 'Estudante não encontrado' };
  return estudante as EstudanteOutputDto;
}

export async function updateMe(
  idEstudante: number,
  body: EstudanteInputDto,
  repository = defaultEstudanteRepository
): Promise<EstudanteOutputDto> {
  let data;
  try {
    data = updateStudentSchema.parse(body);
  } catch (err: any) {
    if (err instanceof z.ZodError) throw { status: 400, message: err.errors };
    throw err;
  }
  try {
    const estudante = await repository.update(idEstudante, data);
    return { id: estudante.id, nome: estudante.nome, sobrenome: estudante.sobrenome, email: estudante.email } as EstudanteOutputDto;
  } catch (err: any) {
    if (err.code === 'P2025') throw { status: 404, message: 'Estudante não encontrado' };
    throw { status: 500, message: 'Erro ao atualizar dados' };
  }
}
