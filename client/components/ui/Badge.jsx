import React from 'react';

/**
 * Componente Badge - Etiqueta de estado/categoría
 * @param {string} variant - 'verified' | 'pending' | 'rejected' | 'draft' | 'custom'
 * @param {string} color - Color personalizado (si variant es 'custom')
 * @param {React.ReactNode} children - Contenido del badge
 * @param {string} className - Clases adicionales
 */
const Badge = ({
  variant = 'custom',
  color,
  children,
  className = '',
  ...props
}) => {
  const variants = {
    verified: 'bg-status-verified/10 text-status-verified',
    pending: 'bg-status-pending/10 text-status-pending',
    rejected: 'bg-status-rejected/10 text-status-rejected',
    draft: 'bg-neutral-500/10 text-neutral-500',
    primary: 'bg-primary-800/10 text-primary-800',
    secondary: 'bg-secondary-800/10 text-secondary-800',
    accent: 'bg-accent-800/10 text-accent-800',
  };

  const customStyle = variant === 'custom' && color ? {
    backgroundColor: `${color}20`, // 20% de opacidad
    color: color,
  } : {};

  return (
    <span
      className={`
        badge-base
        ${variants[variant] || ''}
        ${className}
      `}
      style={customStyle}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;