import React from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';

/**
 * ClusterGroup - Performance optimizer for high-density marker maps.
 * Groups nearby pins into colored circles to prevent UI overlap.
 */
const ClusterGroup = ({ children }) => {
  return (
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={60}
      showCoverageOnHover={false}
      spiderfyOnMaxZoom={true}
      polygonOptions={{
        fillColor: '#2D5016', // Forest Green area
        color: '#2D5016',
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0.1,
      }}
    >
      {children}
    </MarkerClusterGroup>
  );
};

export default ClusterGroup;
