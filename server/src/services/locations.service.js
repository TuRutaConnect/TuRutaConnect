import prisma from '../lib/prisma.js';

export const locationsService = {
  getRegionalData: async () => {
    try {
      // 1. Fetch map config
      const mapConfigList = await prisma.mapConfig.findMany({ take: 1 });
      const mapConfig = mapConfigList[0] || {
        center: [8.535, -82.842],
        zoom: 13,
        styles: {
          aventura: { color: '#2D5016', icon: '🌴', label: 'Aventura' },
          restaurante: { color: '#8B4513', icon: '🍽️', label: 'Restaurante' },
          hotel: { color: '#0077BE', icon: '🏨', label: 'Hotel' },
          servicios: { color: '#64748b', icon: '🛂', label: 'Servicios' }
        }
      };

      // 2. Fetch mapping structure to keep front-end compatibility
      const locations = await prisma.lugarTuristico.findMany({
        include: {
          categoria: true
        }
      });
      
      const formattedLocations = locations.map(loc => ({
        id: loc.id,
        nombre: loc.nombre,
        titulo: loc.titulo,
        categoria_id: loc.categoria.nombre,
        position: [loc.latitud, loc.longitud],
        imagen: loc.imagen,
        logo: loc.logo,
        verified: loc.verified,
        identificacion: loc.identificacion,
        descripcion_det: loc.descripcion_det,
        geospacial: loc.geospacial,
        acceso_transporte: loc.acceso_transporte,
        requisitos_entrada: loc.requisitos_entrada,
        clima_ambiente: loc.clima_ambiente,
        seguridad_det: loc.seguridad_det,
        servicios_basicos_det: loc.servicios_basicos_det,
        actividades_turisticas: loc.actividades_turisticas,
        alojamiento_det: loc.alojamiento_det,
        gastronomia_det: loc.gastronomia_det,
        horarios_operacion: loc.horarios_operacion,
        tarifas_costos: loc.tarifas_costos,
        personal_guias: loc.personal_guias,
        biodiversidad: loc.biodiversidad,
        visibilidad_mediatica: loc.visibilidad_mediatica
      }));

      return {
        center: mapConfig.center,
        zoom: mapConfig.zoom,
        categoryStyles: mapConfig.styles,
        locations: formattedLocations
      };
    } catch (error) {
      console.error('Error fetching regional data from DB:', error);
      throw new Error('Database access failed');
    }
  },

  getById: async (id) => {
    try {
      const loc = await prisma.lugarTuristico.findUnique({
        where: { id: parseInt(id) },
        include: { categoria: true }
      });
      
      if (!loc) return null;

      return {
        id: loc.id,
        nombre: loc.nombre,
        titulo: loc.titulo,
        categoria_id: loc.categoria.nombre,
        position: [loc.latitud, loc.longitud],
        imagen: loc.imagen,
        logo: loc.logo,
        verified: loc.verified,
        identificacion: loc.identificacion,
        descripcion_det: loc.descripcion_det,
        geospacial: loc.geospacial,
        acceso_transporte: loc.acceso_transporte,
        requisitos_entrada: loc.requisitos_entrada,
        clima_ambiente: loc.clima_ambiente,
        seguridad_det: loc.seguridad_det,
        servicios_basicos_det: loc.servicios_basicos_det,
        actividades_turisticas: loc.actividades_turisticas,
        alojamiento_det: loc.alojamiento_det,
        gastronomia_det: loc.gastronomia_det,
        horarios_operacion: loc.horarios_operacion,
        tarifas_costos: loc.tarifas_costos,
        personal_guias: loc.personal_guias,
        biodiversidad: loc.biodiversidad,
        visibilidad_mediatica: loc.visibilidad_mediatica
      };
    } catch (error) {
      console.error('Error in LocationsService.getById:', error);
      throw new Error('Location lookup failed');
    }
  }
};
