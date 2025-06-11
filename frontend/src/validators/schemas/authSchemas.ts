import { z } from '../zod-i18n-config';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

export const registerSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  sobrenome: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

export const profileSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório'),
  sobrenome: z.string().min(2, 'Sobrenome é obrigatório'),
  email: z.string().email('E-mail inválido'),
});
