import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { useLocations } from '../../context/LocationsContext';

const ZONE_OPTIONS = [
  { value: 'norte', label: 'Zona Norte' },
  { value: 'centro', label: 'Zona Centro' },
  { value: 'sur', label: 'Zona Sur' },
  { value: 'este', label: 'Zona Este' },
];

/**
 * Directory Explorer - Perfectly aligned with the 'Segundo Esquema' locations.
 * Uses shared data from backend to ensure consistency.
 */
const Explorer = () => {
  const { locations, categoryStyles, loading, error } = useLocations();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    zone: searchParams.get('zone') || '',
  });

  const categoryOptions = Object.keys(categoryStyles).map(id => ({
    value: id,
    label: categoryStyles[id].label
  }));

  // Update URL when filters change
  useEffect(() => {
    const params = {};
    if (filters.q) params.q = filters.q;
    if (filters.category) params.category = filters.category;
    if (filters.zone) params.zone = filters.zone;
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="bg-neutral-50 min-h-screen flex items-center justify-center">Cargando directorio...</div>;
  if (error) return <div className="bg-neutral-50 min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  const filteredItems = locations.filter(item => {
    const matchesQuery = item.nombre.toLowerCase().includes(filters.q.toLowerCase()) ||
      item.titulo.toLowerCase().includes(filters.q.toLowerCase());
    const matchesCategory = !filters.category || item.categoria_id === filters.category;
    const matchesZone = !filters.zone || item.identificacion?.region?.toLowerCase().includes(filters.zone.toLowerCase());
    return matchesQuery && matchesCategory && matchesZone;
  });

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-primary-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 opacity-20" />
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-heading font-black mb-6 tracking-tighter text-center">Directorio Regional</h1>
          <p className="text-xl text-primary-100 max-w-2xl font-body leading-relaxed mx-auto text-center">
            Consulta la ficha técnica completa de los destinos, comercios y puntos logísticos del Barú.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl shadow-soft border-b border-neutral-200 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="md:col-span-2">
              <Input
                placeholder="Buscar por nombre, clima, actividad..."
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                className="mb-0 shadow-soft"
              />
            </div>
            <Select
              options={categoryOptions}
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              placeholder="Todas las categorías"
              className="mb-0 shadow-soft"
            />
            <Select
              options={ZONE_OPTIONS}
              value={filters.zone}
              onChange={(e) => handleFilterChange('zone', e.target.value)}
              placeholder="Seleccionar Zona"
              className="mb-0 shadow-soft"
            />
          </div>
        </div>
      </div>

      {/* Grid Results */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <p className="text-neutral-500 font-bold uppercase text-xs tracking-widest">
            Encontrados: <span className="text-primary-800">{filteredItems.length} registros</span>
          </p>
          {(filters.q || filters.category || filters.zone) && (
            <button
              onClick={() => setFilters({ q: '', category: '', zone: '' })}
              className="text-xs font-black text-accent-800 uppercase tracking-widest hover:underline"
            >
              × Limpiar filtros
            </button>
          )}
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                onClick={() => navigate(`/details/${item.id}`)}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-large transition-all duration-500 border border-neutral-100"
              >
                <Card.Image src={item.imagen} alt={item.nombre} className="h-64 scale-105 group-hover:scale-100 transition-transform duration-700" />
                <Card.Content className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {item.identificacion?.region}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest`} style={{ backgroundColor: categoryStyles[item.categoria_id]?.color + '10', color: categoryStyles[item.categoria_id]?.color }}>
                      {categoryStyles[item.categoria_id]?.label || item.categoria_id}
                    </span>
                  </div>
                  <Card.Title className="text-2xl font-black group-hover:text-primary-800 transition-colors tracking-tighter mb-4">
                    {item.titulo}
                  </Card.Title>
                  <div className="flex items-center gap-4 text-xs font-bold text-neutral-400 mb-6 border-b border-dashed border-neutral-100 pb-4">
                    <span className="flex items-center gap-1">⭐ {item.visibilidad_mediatica?.rating}</span>
                  </div>
                  <div className="flex justify-between items-center bg-neutral-50 p-4 rounded-2xl group-hover:bg-primary-50 transition-colors">
                    <span className="text-neutral-500 text-[10px] font-black uppercase tracking-widest group-hover:text-primary-800">Ver Ficha Técnica</span>
                    <span className="text-primary-800 font-bold transition-all transform group-hover:translate-x-2">→</span>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-soft border-2 border-dashed border-neutral-200 max-w-4xl mx-auto">
            <div className="text-7xl mb-6">🏜️</div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 tracking-tight">Sin registros que coincidan</h3>
            <p className="text-neutral-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
              Intenta simplificar tu búsqueda o selecciona una categoría diferente en la región.
            </p>
            <Button
              variant="outline"
              className="px-10 py-4 h-auto text-xs font-black uppercase tracking-widest border-2"
              onClick={() => setFilters({ q: '', category: '', zone: '' })}
            >
              Restablecer Directorio
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
