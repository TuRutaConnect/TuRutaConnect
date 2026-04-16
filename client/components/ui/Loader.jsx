import React from 'react';

/**
 * Componente Loader - Indicador de carga
 * @param {string} variant - 'spinner' | 'skeleton' | 'page'
 * @param {string} className - Clases adicionales
 */
const Loader = ({ variant = 'spinner', className = '' }) => {
  // Spinner simple
  if (variant === 'spinner') {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800"></div>
      </div>
    );
  }

  // Skeleton para tarjetas
  if (variant === 'skeleton') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-48 bg-neutral-200 rounded-t-xl"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
          <div className="h-4 bg-neutral-200 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  // Skeleton para página completa
  if (variant === 'page') {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
          <div className="h-4 bg-neutral-200 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        </div>
        <div className="grid-responsive">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Loader key={i} variant="skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Loader;