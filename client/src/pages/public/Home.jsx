import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import SearchInput from '../../components/ui/SearchInput';
import Card from '../../components/ui/Card';
import Carousel from '../../components/ui/Carousel';
import { useLocations } from '../../context/LocationsContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { locations, categoryStyles, loading, error } = useLocations();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/explorer?q=${encodeURIComponent(query)}`);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/explorer?category=${categoryId}`);
  };

  const featuredLocations = locations.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Carousel
          images={[
            'https://i.imgur.com/Z5eLiEj.jpg',
            'https://i.imgur.com/AEtvOjb.jpg',
            'https://i.imgur.com/dSrjWEJ.jpg'
          ]}
        />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in">
          <h1 className="text-4xl md:text-7xl font-heading font-extrabold text-white mb-6 drop-shadow-large">
            Tu<span className="text-primary-400">Ruta</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-body font-medium drop-shadow-soft">
            Descubre, conecta y explora el potencial de nuestra región fronteriza.
          </p>

          {/* Search Box */}
          <div className="animate-slide-up">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
            />
          </div>

          {/* Popular Categories (Quick access as row) */}
          {!loading && !error && Object.keys(categoryStyles).length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-in">
              <span className="w-full text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">Accesos rápidos</span>
              {Object.keys(categoryStyles).map((catId) => (
                <button
                  key={catId}
                  onClick={() => handleCategoryClick(catId)}
                  className="flex items-center gap-2 px-6 py-3  border border-white/20 rounded-full text-white font-semibold transition-all active:scale"
                >

                  <span
                    className="text-xl group-hover:scale-125 transition-transform w-6 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current"
                    dangerouslySetInnerHTML={{ __html: categoryStyles[catId].iconSvg }}
                  >
                  </span>
                  <span>{categoryStyles[catId].label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Explorations Preview */}

      <section className="py-24 bg-neutral-50 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary-800 font-bold uppercase tracking-widest text-sm text-center md:text-left block">Explora la región</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-neutral-900 mt-2 text-center md:text-left">
                Descubre lugares y servicios destacados
              </h2>
            </div>
            <Button variant="outline" onClick={() => navigate('/explorer')} className="mx-auto md:mx-0">
              Ver todo el directorio
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-neutral-400 font-bold uppercase tracking-widest animate-pulse">Cargando destacados...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-400 font-bold uppercase tracking-widest">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredLocations.map((item, idx) => (
                <Card key={item.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }} onClick={() => navigate(`/details/${item.id}`)}>
                  <Card.Image src={item.imagen} alt={item.nombre} className="h-64 object-cover" />
                  <Card.Content>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded`}
                        style={{ backgroundColor: categoryStyles[item.categoria_id]?.color + '20', color: categoryStyles[item.categoria_id]?.color }}>
                        {categoryStyles[item.categoria_id]?.label || item.categoria_id}
                      </span>
                    </div>
                    <Card.Title className="text-2xl font-black">{item.titulo}</Card.Title>
                    <Card.Description className="line-clamp-2">
                      {item.descripcion_det?.historia}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-20 bg-primary-800 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">¿Quieres destacar tu servicio o zona?</h2>
          <p className="text-lg text-white/80 mb-10">
            Únete a Frontera Viva y forma parte del directorio más importante de la región.
          </p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/postulate')}>
            Postularme ahora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
