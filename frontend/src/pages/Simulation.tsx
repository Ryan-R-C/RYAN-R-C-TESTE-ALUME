import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { simulationSchema, type SimulationInput } from '../validators/schemas/simulationSchemas';
import { createSimulation } from '../services/simulationService';
import { useNavigate } from 'react-router-dom';
import { calculateInstallment } from '../utils/calculateInstallment';

const Simulation: React.FC = () => {
  const [valorParcela, setValorParcela] = useState<number | null>(null);

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } =
    useForm<SimulationInput>({
      resolver: zodResolver(simulationSchema)
    });

  const valorTotal = watch('valor_total');
  const quantidadeParcelas = watch('quantidade_parcelas');
  const jurosAoMes = watch('juros_ao_mes');

  useEffect(() => {
    if (valorTotal && quantidadeParcelas && jurosAoMes) {
      const i = jurosAoMes / 100 / 12;
      const n = quantidadeParcelas;
      const parcela = calculateInstallment(valorTotal, i, n);
      setValorParcela(parcela);
    } else {
      setValorParcela(null);
    }
  }, [valorTotal, quantidadeParcelas, jurosAoMes]);

  const onSubmit = async (data: SimulationInput) => {
    try {
      await createSimulation(data);
      navigate('/app/history');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <h2 className="page_title">Nova Simulação</h2>

        <div className='w-full'>
          <label className="block mb-1">Valor Total</label>
          <input
            type="number"
            step="0.01"
            {...register('valor_total', { valueAsNumber: true })}
            className="input"
          />
          {errors.valor_total && <p className="text-red-500">{errors.valor_total.message}</p>}
        </div>

        <div className='w-full'>
          <label className="block mb-1">Quantidade de Parcelas</label>
          <input
            type="number"
            {...register('quantidade_parcelas', { valueAsNumber: true })}
            className="input"
          />
          {errors.quantidade_parcelas && <p className="text-red-500">{errors.quantidade_parcelas.message}</p>}
        </div>

        <div className='w-full'>
          <label className="block mb-1">Juros ao Mês (%)</label>
          <input
            type="number"
            step="0.0001"
            {...register('juros_ao_mes', { valueAsNumber: true })}
            className="input"
          />
          {errors.juros_ao_mes && <p className="text-red-500">{errors.juros_ao_mes.message}</p>}
        </div>

        <div className='w-full'>
          <label className="block mb-1">Valor da Parcela</label>
          <input
            type="text"
            value={valorParcela !== null ? valorParcela.toFixed(2) : ''}
            readOnly
            className="input cursor-not-allowed bg-gray-200"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button"
        >
          {isSubmitting ? 'Calculando...' : 'Salvar Simulação'}
        </button>
      </form>
    </div>
  );
};

export default Simulation;