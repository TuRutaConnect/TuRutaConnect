import React, { forwardRef } from 'react';

/**
 * Componente Select - Menú desplegable reutilizable
 * @param {string} label - Etiqueta del campo
 * @param {array} options - Opciones del select [{value, label}]
 * @param {string} error - Mensaje de error
 * @param {boolean} disabled - Estado deshabilitado
 */
const Select = forwardRef(({
  label,
  options = [],
  error,
  disabled = false,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="label-base"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={`
            input-base appearance-none cursor-pointer
            ${error ? 'border-status-rejected focus:ring-status-rejected' : ''}
          `}
          {...props}
        >
          <option value="">Seleccionar...</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Icono de dropdown */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-status-rejected">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;