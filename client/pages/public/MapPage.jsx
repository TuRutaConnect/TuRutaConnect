import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import InteractiveMap from '../../components/maps/InteractiveMap';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

/**
 * MapPage - Full screen interactive experience.
 * Features a high-visibility map, legend/filters, and quick navigation.
 */
const MapPage = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const navigate = useNavigate();



  return (

    <div className="relative h-[calc(100vh-80px)] min-h-[500px] w-full overflow-hidden flex flex-col bg-neutral-100">
      {/* Map Content - Fills the entire view */}
      <div className="flex-grow w-full h-full relative overflow-hidden ring-1 ring-neutral-200">
        <InteractiveMap
          activeFilter={activeFilter}
          onFilterChange={(cat) => setActiveFilter(cat)}
        />

        {/* Floating Controls Overlay */}
        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 backdrop-blur-md shadow-soft hover:bg-white"
            onClick={() => navigate('/explorer')}
          >
            ← Volver al Directorio
          </Button>
        </div>
      </div>

      {/* Bottom Information Bar (Optional hint for mobile) */}
      <div className="bg-white border-t border-neutral-200 px-6 py-2 md:hidden">
        <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest text-center">
          Toca un marcador para ver resumen detallado
        </p>
      </div>
    </div>
  );
};

export default MapPage;
