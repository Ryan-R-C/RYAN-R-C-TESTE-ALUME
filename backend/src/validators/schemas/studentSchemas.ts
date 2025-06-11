import { z } from 'zod';

export const updateStudentSchema = z.object({
  nome: z.string().min(1).optional(),
  sobrenome: z.string().min(1).optional(),
  email: z.string().email().optional()
});
