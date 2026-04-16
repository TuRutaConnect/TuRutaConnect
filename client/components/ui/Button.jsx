import React from 'react';

/**
 * Componente Button - Botón reutilizable
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} isLoading - Estado de carga
 * @param {boolean} disabled - Estado deshabilitado
 * @param {string} className - Clases adicionales de Tailwind
 * @param {React.ReactNode} children - Contenido del botón
 * @param {function} onClick - Función al hacer clic
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  children,
  onClick,
  type = 'button',
  ...props
}) => {
  // Variantes de estilo
  const variants = {
    primary: 'bg-primary-800 text-white hover:bg-primary-700 active:bg-primary-900 focus:ring-primary-500',
    secondary: 'bg-secondary-800 text-white hover:bg-secondary-700 active:bg-secondary-900 focus:ring-secondary-500',
    outline: 'border-2 border-primary-800 text-primary-800 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
    ghost: 'text-primary-800 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
    danger: 'bg-status-rejected text-white hover:bg-red-700 active:bg-red-900 focus:ring-red-500',
  };

  // Tamaños
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center font-semibold rounded-lg
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;