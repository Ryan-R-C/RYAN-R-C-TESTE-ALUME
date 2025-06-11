import React from 'react';
import { CaretLeft, CaretRightIcon } from "@phosphor-icons/react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  // Gera lista de páginas (máximo de 5 botões, com elipses se necessário)
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    if (page >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  const pages = getPages();

  const handlePageClick = (p: number) => {
    if (p !== page && typeof p === 'number') {
      onPageChange(p);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-2">
      <button
        className="flex items-center gap-2 px-2 py-1 rounded disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 transition"
        onClick={handlePrev}
        disabled={page === 1}
        aria-label="Anterior"
        type="button"
      >
        <CaretLeft size={18} /> Anterior
      </button>
      <div className="flex items-center gap-2">
        {pages.map((p, idx) =>
          typeof p === 'number' ? (
            <button
              key={p}
              className={`w-8 h-8 flex items-center justify-center rounded border transition ${
                page === p
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => handlePageClick(p)}
              disabled={p === page}
              type="button"
              aria-current={page === p ? "page" : undefined}
            >
              {p}
            </button>
          ) : (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-500 select-none">...</span>
          )
        )}
      </div>
      <button
        className="flex items-center gap-2 px-2 py-1 rounded disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 transition"
        onClick={handleNext}
        disabled={page === totalPages}
        aria-label="Próxima"
        type="button"
      >
        Próxima <CaretRightIcon size={18} />
      </button>
    </div>
  );
};
