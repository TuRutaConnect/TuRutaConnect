import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');
  
  // Read current JSON
  const dataPath = path.join(__dirname, '../src/data/mapData.json');
  const fileContent = await fs.readFile(dataPath, 'utf8');
  const mapData = JSON.parse(fileContent);

  // 1. Seed Map Config
  console.log('Seeding MapConfig...');
  await prisma.mapConfig.deleteMany(); // Reset
  const mapConfig = await prisma.mapConfig.create({
    data: {
      center: mapData.center,
      zoom: mapData.zoom,
      styles: mapData.categoryStyles
    }
  });

  // 2. Seed Categories
  console.log('Seeding Categorias...');
  for (const [key, details] of Object.entries(mapData.categoryStyles)) {
    await prisma.categoria.upsert({
      where: { nombre: key },
      update: { color: details.color, icon: details.icon },
      create: { nombre: key, color: details.color, icon: details.icon }
    });
  }

  // 3. Seed Locations
  console.log('Seeding Lugares Turisticos...');
  await prisma.lugarTuristico.deleteMany(); // Reset (if needed, or map id manually)
  
  for (const loc of mapData.locations) {
    const categoria = await prisma.categoria.findUnique({
      where: { nombre: loc.categoria_id }
    });

    if (!categoria) {
      console.warn(`Category ${loc.categoria_id} not found for location ${loc.nombre}`);
      continue;
    }

    await prisma.lugarTuristico.create({
      data: {
        nombre: loc.nombre,
        titulo: loc.titulo,
        latitud: loc.position[0],
        longitud: loc.position[1],
        imagen: loc.imagen,
        logo: loc.logo,
        verified: loc.verified,
        categoriaId: categoria.id,
        
        // JSON fields
        identificacion: loc.identificacion || null,
        descripcion_det: loc.descripcion_det || null,
        geospacial: loc.geospacial || null,
        acceso_transporte: loc.acceso_transporte || null,
        requisitos_entrada: loc.requisitos_entrada || null,
        clima_ambiente: loc.clima_ambiente || null,
        seguridad_det: loc.seguridad_det || null,
        servicios_basicos_det: loc.servicios_basicos_det || null,
        actividades_turisticas: loc.actividades_turisticas || null,
        alojamiento_det: loc.alojamiento_det || null,
        gastronomia_det: loc.gastronomia_det || null,
        horarios_operacion: loc.horarios_operacion || null,
        tarifas_costos: loc.tarifas_costos || null,
        personal_guias: loc.personal_guias || null,
        biodiversidad: loc.biodiversidad || null,
        visibilidad_mediatica: loc.visibilidad_mediatica || null,
      }
    });
  }
  
  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
