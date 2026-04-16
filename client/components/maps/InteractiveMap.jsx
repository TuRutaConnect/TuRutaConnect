import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useLocations } from '../../context/LocationsContext';
import { createCustomIcon } from './CustomMarkers';
import MapPopup from './MapPopup';
import ClusterGroup from './ClusterGroup';
import MapLegend from './MapLegend';
import GeoLocationButton from './GeoLocationButton';

/**
 * Core Interactive Map component for the Barú region.
 * Optimized with marker clustering and integrated UI controls.
 * @param {string} activeFilter - Current category filter
 * @param {function} onFilterChange - Callback to update filter
 */
const InteractiveMap = ({ activeFilter = '', onFilterChange }) => {
  const { center, zoom, locations, categoryStyles, loading, error } = useLocations();

  if (loading) return <div className="h-full w-full flex items-center justify-center bg-gray-100">Cargando mapa...</div>;
  if (error) return <div className="h-full w-full flex items-center justify-center bg-red-50 text-red-600">{error}</div>;

  // Filter locations by the updated category set
  const displayLocations = activeFilter 
    ? locations.filter(loc => loc.categoria_id === activeFilter)
    : locations;

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={false}
      >
        {/* Real-world OSM Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        {/* INTEGRATED CONTROLS (Inside MapContainer to use hooks) */}
        <MapLegend activeFilter={activeFilter} onFilterChange={onFilterChange} />
        <GeoLocationButton />

        {/* CLUSTER GROUP: Combines markers when zoomed out */}
        <ClusterGroup>
          {displayLocations.map((location) => (
            <Marker 
              key={location.id} 
              position={location.position}
              icon={createCustomIcon(location.categoria_id, categoryStyles)}
            >
              <Popup minWidth={220} className="custom-popup">
                <MapPopup location={location} />
              </Popup>
            </Marker>
          ))}
        </ClusterGroup>
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
