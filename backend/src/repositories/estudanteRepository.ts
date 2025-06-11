import { PrismaClient } from '@prisma/client';
import { EstudanteInputDto } from '../models/Estudante';

const prisma = new PrismaClient();

export const estudanteRepository = {
  async findById(id: number) {
    return prisma.estudante.findUnique({
      where: { id },
      select: { id: true, nome: true, sobrenome: true, email: true }
    });
  },

  async findByEmail(email: string) {
    return prisma.estudante.findUnique({
      where: { email }
    });
  },

  async create(data: EstudanteInputDto & { senha: string }) {
    return prisma.estudante.create({ data });
  },

  async update(id: number, data: Partial<EstudanteInputDto>) {
    return prisma.estudante.update({
      where: { id },
      data
    });
  }
};
