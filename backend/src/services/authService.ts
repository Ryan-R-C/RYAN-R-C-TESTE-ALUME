import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../validators/schemas/authSchemas';
import { z } from 'zod';
import { EstudanteInputDto, EstudanteOutputDto } from '../models/Estudante';
import { estudanteRepository as defaultEstudanteRepository } from '../repositories/estudanteRepository';

export async function register(
  data: EstudanteInputDto,
  repository = defaultEstudanteRepository
): Promise<EstudanteOutputDto> {
  try {
    const parsed = registerSchema.parse(data) as EstudanteInputDto;
    const existing = await repository.findByEmail(parsed.email);
    if (existing) {
      throw { status: 409, message: 'Email já cadastrado' };
    }
    const hash = await bcrypt.hash(parsed.senha!, 10);
    const estudante = await repository.create({ ...parsed, senha: hash });
    return {
      id: estudante.id,
      nome: estudante.nome,
      sobrenome: estudante.sobrenome,
      email: estudante.email
    } as EstudanteOutputDto;
  } catch (err: any) {
    if (err instanceof z.ZodError) throw { status: 400, message: err.errors };
    if (err.status) throw err;
    throw { status: 500, message: 'Erro ao registrar' };
  }
}

export async function login(
  data: { email: string; senha: string },
  repository = defaultEstudanteRepository
): Promise<{ token: string }> {
  try {
    const parsed = loginSchema.parse(data);
    const estudante = await repository.findByEmail(parsed.email);
    if (!estudante) {
      throw { status: 401, message: 'Credenciais inválidas' };
    }
    const valid = await bcrypt.compare(parsed.senha, estudante.senha);
    if (!valid) {
      throw { status: 401, message: 'Credenciais inválidas' };
    }
    const token = jwt.sign({ id: estudante.id }, process.env.JWT_SECRET as string, {
      expiresIn: '5m'
    });
    return { token };
  } catch (err: any) {
    if (err instanceof z.ZodError) throw { status: 400, message: err.errors };
    if (err.status) throw err;
    throw { status: 500, message: 'Erro ao fazer login' };
  }
}

export async function getMe(
  idEstudante: number,
  repository = defaultEstudanteRepository
): Promise<EstudanteOutputDto> {
  try {
    if (!idEstudante) {
      throw { status: 401, message: 'Não autenticado' };
    }
    const estudante = await repository.findById(idEstudante);
    if (!estudante) {
      throw { status: 404, message: 'Estudante não encontrado' };
    }
    return estudante as EstudanteOutputDto;
  } catch (err: any) {
    if (err.status) throw err;
    throw { status: 500, message: 'Erro ao buscar dados do estudante' };
  }
}
