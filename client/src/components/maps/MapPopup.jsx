import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

/**
 * Stylized Popup content for the 'Segundo Esquema'.
 * Shows a high-impact summary with Rating, Climate, and Region tags.
 */
const MapPopup = ({ location }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 min-w-[240px] font-body text-neutral-800 bg-white p-3 rounded-2xl">
      {/* Thumbnail with Overlay Rating */}
      <div className="h-32 overflow-hidden rounded-xl relative group">
        <img
          src={location.imagen}
          alt={location.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-black border border-white/10 shadow-xl">
          ⭐ {location.visibilidad_mediatica?.rating}
        </div>
        <div className="absolute bottom-2 left-2 flex gap-1">
          <span className="bg-white/90 backdrop-blur-sm text-neutral-900 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shadow-soft">
            {location.identificacion?.region}
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="px-1 text-center">
        <h3 className="font-heading font-black text-xl leading-tight mb-1 text-neutral-900 tracking-tighter">
          {location.titulo}
        </h3>

        <div className="flex items-center justify-center gap-3 mb-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-50 py-2 rounded-xl border border-neutral-100">
          <span className="flex items-center gap-1.5"><span className="text-lg">🌡</span> {location.clima_ambiente?.temp}</span>
          <span className="w-px h-3 bg-neutral-200" />
          <span className="flex items-center gap-1.5 opacity-70"><i className="fa-solid fa-location-dot"></i> {location.identificacion?.pais}</span>
        </div>

        <p className="text-[11px] text-neutral-500 line-clamp-2 md:line-clamp-3 mb-4 px-1 leading-relaxed font-medium italic">
          "{location.descripcion_det?.caracteristicas}"
        </p>

        {/* Action Button */}
        <Button
          variant="primary"
          size="sm"
          className="w-full text-[10px] py-4 shadow-large hover:shadow-xl active:scale-95 transition-all bg-primary-800 border-none font-black uppercase tracking-widest h-auto"
          onClick={() => navigate(`/details/${location.id}`)}
        >
          Consultar Ficha Técnica
        </Button>
      </div>
    </div>
  );
};

export default MapPopup;
