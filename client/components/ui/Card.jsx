import React from 'react';

/**
 * Componente Card - Contenedor base reutilizable
 * @param {React.ReactNode} children - Contenido de la card
 * @param {string} className - Clases adicionales
 * @param {function} onClick - Función al hacer clic (opcional)
 * @param {boolean} hoverable - Si la card tiene efecto hover
 */
const Card = ({
  children,
  className = '',
  onClick,
  hoverable = true,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        card-base
        ${hoverable && onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Subcomponente para imagen de card
Card.Image = ({ src, alt, className = '' }) => (
  <div className={`relative h-48 overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      loading="lazy"
    />
  </div>
);

// Subcomponente para contenido de card
Card.Content = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Subcomponente para título de card
Card.Title = ({ children, className = '' }) => (
  <h3 className={`text-xl font-semibold mb-2 ${className}`}>
    {children}
  </h3>
);

// Subcomponente para descripción de card
Card.Description = ({ children, className = '' }) => (
  <p className={`text-neutral-600 text-sm ${className}`}>
    {children}
  </p>
);

export default Card;