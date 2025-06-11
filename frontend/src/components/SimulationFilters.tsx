import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import React, { useState } from 'react';

interface SimulationFiltersProps {
  pendingFilters: {
    valor_total: string;
    quantidade_parcelas: string;
    juros_ao_mes: string;
    valor_parcela_mensal: string;
    data_criacao: string;
  };
  onFilterChange: (field: string, value: string) => void;
  onApply: () => void;
  onClear?: () => void;
}

export const SimulationFilters: React.FC<SimulationFiltersProps> = ({
  pendingFilters,
  onFilterChange,
  onApply,
  onClear,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full items-start max-w-full w-full">
      <button
        type="button"
        className="w-full flex justify-between items-center cursor-pointer bg-base-200 rounded-t"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="simulation-filters-content"
      >
        <span className="page_subtitle mb-0">Filtrar</span>
        <span className="ml-2">{open ? <CaretUpIcon className='text-secondary' size={24} /> : <CaretDownIcon className='text-secondary' size={24} />}</span>
      </button>
      {open && (
        <div id="simulation-filters-content" className="w-full py-4">
          <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block mb-1">Valor Total</label>
              <input
                type="number"
                name="valor_total"
                placeholder="Valor total"
                value={pendingFilters.valor_total}
                onChange={e => onFilterChange('valor_total', e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Qtd. Parcelas</label>
              <input
                type="number"
                name="quantidade_parcelas"
                placeholder="Qtd. parcelas"
                value={pendingFilters.quantidade_parcelas}
                onChange={e => onFilterChange('quantidade_parcelas', e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Juros ao Mês</label>
              <input
                type="number"
                name="juros_ao_mes"
                placeholder="Juros ao mês"
                value={pendingFilters.juros_ao_mes}
                onChange={e => onFilterChange('juros_ao_mes', e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Valor Parcela Mensal</label>
              <input
                type="number"
                name="valor_parcela_mensal"
                placeholder="Parcela mensal"
                value={pendingFilters.valor_parcela_mensal}
                onChange={e => onFilterChange('valor_parcela_mensal', e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Data de Criação</label>
              <input
                type="date"
                name="data_criacao"
                placeholder="Data de criação"
                value={pendingFilters.data_criacao}
                onChange={e => onFilterChange('data_criacao', e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            <div className="lg:col-start-4">
              <button
                type="button"
                onClick={onClear}
                className="button-outline btn-outline btn-sm w-full"
              >
                Limpar filtros
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={onApply}
                className="button btn-primary btn-sm w-full"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
