import React from 'react';
import { useLocations } from '../../context/LocationsContext';

/**
 * Floating Map Legend to help users identify marker types.
 * Styled with glassmorphism for a premium look.
 */
const MapLegend = ({ activeFilter, onFilterChange }) => {
  const { categoryStyles } = useLocations();

  if (!categoryStyles || Object.keys(categoryStyles).length === 0) return null;

  const categories = Object.keys(categoryStyles).map(id => ({
    id,
    ...categoryStyles[id]
  }));

  return (
    <div className="absolute top-[60px] right-4 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-large border border-neutral-200 min-w-[160px]">
      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 ml-1">
        Categorías
      </h4>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onFilterChange(activeFilter === cat.id ? '' : cat.id)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all
              ${activeFilter === cat.id
                ? 'bg-primary-50 text-primary-800 ring-2 ring-primary-500 shadow-soft'
                : 'hover:bg-neutral-100 text-neutral-700'}
            `}
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
              style={{ backgroundColor: activeFilter === cat.id ? 'transparent' : cat.color }}
            >
              {activeFilter === cat.id ? '✓' : ''}
            </span>
            <span className="flex-grow text-left">{cat.label}</span>
            <span className="text-lg opacity-70">{cat.icon}</span>
          </button>
        ))}
        {activeFilter && (
          <button
            onClick={() => onFilterChange('')}
            className="mt-2 text-[10px] font-bold text-accent-800 uppercase text-center hover:underline"
          >
            Limpiar Filtro
          </button>
        )}
      </div>
    </div>
  );
};

export default MapLegend;
