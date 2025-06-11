import { z } from '../zod-i18n-config';

export const simulationSchema = z.object({
  valor_total: z.number().min(1, 'Valor total deve ser maior que zero'),
  quantidade_parcelas: z.number().int().min(1, 'Pelo menos 1 parcela'),
  juros_ao_mes: z.number().min(0, 'Juros não pode ser negativo'),
});

export type SimulationInput = z.infer<typeof simulationSchema>;