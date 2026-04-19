import React from 'react';
import { useMap } from 'react-leaflet';
import Button from '../ui/Button';

/**
 * Custom Control for Leaflet to locate the user's GPS position.
 * Features a high-visibility button in the bottom right.
 */
const GeoLocationButton = () => {
  const map = useMap();

  const handleLocate = () => {
    map.locate().on('locationfound', function (e) {
      map.flyTo(e.latlng, 15);
    }).on('locationerror', function (e) {
      alert("No se pudo obtener la ubicación: " + e.message);
    });
  };

  return (
    <div className="absolute bottom-28 right-4 z-[1000]">
      <Button
        variant="secondary"
        className="w-12 h-12 !p-0 rounded-full shadow-large flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        title="Mi Ubicación"
        onClick={handleLocate}
      >
        <span className="text-xl bg-red"><i className="fa-solid fa-location-dot"></i></span>
      </Button>
    </div>
  );
};

export default GeoLocationButton;
