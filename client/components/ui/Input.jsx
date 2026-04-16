import React, { forwardRef } from 'react';

/**
 * Componente Input - Campo de entrada reutilizable
 * @param {string} label - Etiqueta del campo
 * @param {string} error - Mensaje de error
 * @param {string} helperText - Texto de ayuda
 * @param {boolean} disabled - Estado deshabilitado
 * @param {string} className - Clases adicionales
 */
const Input = forwardRef(({
  label,
  error,
  helperText,
  disabled = false,
  className = '',
  type = 'text',
  id,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="label-base"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        type={type}
        disabled={disabled}
        className={`
          input-base
          ${error ? 'border-status-rejected focus:ring-status-rejected' : ''}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-status-rejected">{error}</p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;