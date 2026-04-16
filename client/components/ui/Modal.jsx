import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Componente Modal - Siguiendo patrones de React Native para Web
 * @param {boolean} visible - Controla si el modal se muestra (como el visible en RN)
 * @param {function} onClose - Función que se ejecuta al intentar cerrar (como onRequestClose)
 * @param {string} title - Título del modal
 * @param {React.ReactNode} children - Contenido interno
 */
const Modal = ({ visible, onClose, title, children }) => {
  // Efecto para bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [visible]);

  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Overlay (Fondo) */}
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenedor del Modal */}
      <div
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-large overflow-hidden animate-slide-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h2 className="text-xl font-heading font-bold text-neutral-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 transition-colors"
          >
            <svg className="w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
