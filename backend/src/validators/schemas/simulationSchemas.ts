import { z } from 'zod';

export const simulationSchema = z.object({
  valor_total: z.number().positive(),
  quantidade_parcelas: z.number().int().positive(),
  juros_ao_mes: z.number().positive()
});
