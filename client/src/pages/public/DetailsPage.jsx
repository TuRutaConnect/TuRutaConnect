import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocations } from '../../context/LocationsContext';
import Button from '../../components/ui/Button';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locations, categoryStyles, loading, error } = useLocations();
  const [activeTab, setActiveTab] = useState('general');
  const [imageLoaded, setImageLoaded] = useState(false);

  const location = useMemo(() =>
    locations.find(loc => loc.id === parseInt(id)),
    [id, locations]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <span className="text-white/50 text-sm tracking-widest uppercase">Cargando</span>
      </div>
    </div>
  );

  if (error || !location) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full border border-white/20 flex items-center justify-center">
            <span className="text-2xl text-white/40">?</span>
          </div>
          <h2 className="text-xl font-light text-white tracking-wide">{error || 'Registro no encontrado'}</h2>
          <Button onClick={() => navigate('/explorer')} variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Volver al Directorio
          </Button>
        </div>
      </div>
    );
  }

  const categoryStyle = categoryStyles[location.categoria_id] || { color: "#64748b", icon: "●", label: "Servicios" };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'logistica', label: 'Logística' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'naturaleza', label: 'Naturaleza' },
  ];

  const Icon = ({ path, className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );

  const Icons = {
    historia: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    caracteristicas: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
    documentos: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    visa: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    salud: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    clima: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    temp: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    agua: "M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2.34M20 14.66a3 3 0 01-3.28-1.42 2.7 2.7 0 00-3.5-1.05 2.7 2.7 0 00-2.3 2.05 2.75 2.75 0 01-3.86 1.85 2.75 2.75 0 01-1.85-3.86 2.7 2.7 0 002.05-2.3 2.7 2.7 0 00-1.05-3.5A3 3 0 0110.34 2H14",
    luz: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    wifi: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
    bed: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    food: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    money: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    leaf: "M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
    animal: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    activity: "M13 10V3L4 14h7v7l9-11h-7z",
    guide: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* HERO - 60vh (MANTENIDO) */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-1000 ${imageLoaded ? 'scale-100' : 'scale-110'}`}>
          <img
            src={location.imagen}
            alt={location.nombre}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{ backgroundColor: categoryStyle.color }}
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
          <div className="max-w-6xl mx-auto w-full">

            <div className="flex items-center gap-3 mb-4 animate-in slide-in-from-bottom-4 duration-700">
              <div
                className="px-3 py-1.5 rounded-full border backdrop-blur-md text-xs font-medium tracking-wider uppercase"
                style={{ borderColor: `${categoryStyle.color}40`, color: categoryStyle.color }}
              >
                {categoryStyle.label}
              </div>
              <div className="h-px w-8 bg-white/30" />
              <span className="text-white/60 text-xs tracking-widest uppercase">
                {location.identificacion?.pais} — {location.identificacion?.tipo}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] mb-6 tracking-tight animate-in slide-in-from-bottom-6 duration-700 delay-100">
              {location.titulo}
            </h1>

            <div className="flex flex-wrap items-center gap-6 lg:gap-10 animate-in slide-in-from-bottom-8 duration-700 delay-200">
              <div>
                <div className="text-2xl lg:text-3xl font-light text-white"><i class="fa-regular fa-star"></i>
                  {location.visibilidad_mediatica?.rating}
                  <span className="text-sm text-white/40 ml-1">/5</span>
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Rating</div>
              </div>

              <div className="hidden md:block w-px h-10 bg-white/20" />

              <div>
                <div className="text-lg lg:text-xl font-light text-white"><i class="fa-solid fa-location-arrow"></i>
                  {location.geospacial?.coordenadas}
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Coordenadas</div>
              </div>

              <div className="hidden md:block w-px h-10 bg-white/20" />

              <div>
                <div className="text-lg lg:text-xl font-light text-white"><i class="fa-solid fa-dollar-sign"></i>
                  {location.descripcion_det?.moneda}
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Moneda</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* NAVEGACIÓN (MANTENIDA) */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => navigate('/explorer')}
              className="py-4 text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>

            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-5 py-4 text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap
                    ${activeTab === tab.id ? 'text-white' : 'text-white/30 hover:text-white/60'}
                  `}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-12 pb-24">

        {/* TAB: GENERAL - COLOR AZUL CIELO */}
        {activeTab === 'general' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20">
                <Icon path={Icons.historia} className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-white">Información General</h2>
                <p className="text-sm text-white/40">Historia e identidad del lugar</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="relative p-8 bg-gradient-to-br from-sky-500/10 to-transparent rounded-2xl border border-sky-500/20 overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-sky-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <Icon path={Icons.historia} className="w-5 h-5 text-sky-400" />
                      <h3 className="text-sm font-medium text-sky-400 uppercase tracking-wider">Historia</h3>
                    </div>
                    <p className="text-base font-light text-white/90 leading-relaxed">
                      {location.descripcion_det?.historia}
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon path={Icons.caracteristicas} className="w-5 h-5 text-sky-300" />
                    <h3 className="text-sm font-medium text-sky-300 uppercase tracking-wider">Características Distintivas</h3>
                  </div>
                  <p className="text-base text-white/70 italic leading-relaxed border-l-2 border-sky-400/30 pl-4">
                    "{location.descripcion_det?.caracteristicas}"
                  </p>
                </div>

                <div className="grid grid-flow-col md:grid-cols-4 gap-4">
                  <div className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-sky-500/30 transition-colors group">
                    <Icon path="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-5 h-5 text-white/40 mb-3 group-hover:text-sky-400 transition-colors" />
                    <div className="text-lg font-medium text-white mb-1">{location.identificacion?.pais}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">País</div>
                  </div>
                  <div className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-sky-500/30 transition-colors group">
                    <Icon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" className="w-5 h-5 text-white/40 mb-3 group-hover:text-sky-400 transition-colors" />
                    <div className="text-lg font-medium text-white mb-1">{location.identificacion?.region}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Región</div>
                  </div>
                  <div className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-sky-500/30 transition-colors group">
                    <Icon path="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" className="w-5 h-5 text-white/40 mb-3 group-hover:text-sky-400 transition-colors" />
                    <div className="text-lg font-medium text-white mb-1">{location.geospacial?.area}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Área</div>
                  </div>
                  <div className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-sky-500/30 transition-colors group">
                    <Icon path="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-5 h-5 text-white/40 mb-3 group-hover:text-sky-400 transition-colors" />
                    <div className="text-lg font-medium text-white mb-1">{location.descripcion_det?.moneda}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Moneda</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-28 space-y-4">
                  <div className="p-6 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-sky-500/20 rounded-lg">
                        <Icon path="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" className="w-5 h-5 text-sky-400" />
                      </div>
                      <h3 className="text-sm font-medium text-white">Visibilidad Mediática</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon path="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" className="w-4 h-4 text-white/40" />
                          <span className="text-sm text-white/60">Redes</span>
                        </div>
                        <span className="text-lg font-light text-white">{location.visibilidad_mediatica?.redes_sociales}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon path="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" className="w-4 h-4 text-white/40" />
                          <span className="text-sm text-white/60">Premios</span>
                        </div>
                        <span className="text-lg font-light text-white">{location.visibilidad_mediatica?.reconocimientos}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon path="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.609 3 18.129" className="w-4 h-4 text-white/40" />
                          <span className="text-sm text-white/60">Idiomas</span>
                        </div>
                        <span className="text-sm text-white">{location.descripcion_det?.idiomas?.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* <button className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-black rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <Icon path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" className="w-4 h-4" />
                    Descargar Informe
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: LOGISTICA - COLOR CORAL/NARANJA */}
        {activeTab === 'logistica' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <Icon path={Icons.documentos} className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-white">Logística y Acceso</h2>
                <p className="text-sm text-white/40">Requisitos, clima y transporte</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider flex items-center gap-2">
                  <Icon path={Icons.documentos} className="w-4 h-4" />
                  Requisitos de Entrada
                </h3>

                <div className="space-y-3">
                  <div className="group p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                        <Icon path={Icons.documentos} className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-white mb-1">Documentos Necesarios</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{location.requisitos_entrada?.documentos}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                        <Icon path={Icons.visa} className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-white mb-1">Visas y Permisos</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{location.requisitos_entrada?.visas}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-rose-500/5 rounded-xl border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400">
                        <Icon path={Icons.salud} className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-rose-300 mb-1">Vacunas Requeridas</h4>
                        <p className="text-sm text-rose-200/60 leading-relaxed">{location.requisitos_entrada?.vacunas}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider flex items-center gap-2">
                  <Icon path={Icons.clima} className="w-4 h-4" />
                  Clima y Ambiente
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent rounded-xl border border-orange-500/20 text-center">
                    <Icon path={Icons.temp} className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-light text-white mb-1">{location.clima_ambiente?.temp}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest">Temperatura</div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-amber-500/10 to-transparent rounded-xl border border-amber-500/20 text-center">
                    <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-lg font-medium text-white mb-1 leading-tight">{location.clima_ambiente?.epocas}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest">Época Ideal</div>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <Icon path="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-300 mb-1">Riesgos Ambientales</h4>
                      <p className="text-sm text-amber-200/50">{location.clima_ambiente?.riesgos}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                    <Icon path="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" className="w-4 h-4 text-white/40" />
                    Acceso y Transporte
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/50">Rutas disponibles</span>
                      <span className="text-sm text-white font-medium">{location.acceso_transporte?.rutas?.join(', ')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/50">Transporte público</span>
                      <span className="text-sm text-white font-medium">{location.acceso_transporte?.transporte_publico}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SERVICIOS - COLOR PÚRPURA/VIOLETA */}
        {activeTab === 'servicios' && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
                <Icon path={Icons.bed} className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-white">Servicios y Hospitalidad</h2>
                <p className="text-sm text-white/40">Alojamiento, gastronomía y servicios básicos</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Icon path="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" className="w-4 h-4" />
                Infraestructura Básica
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(location.servicios_basicos_det || {}).map(([key, value]) => {
                  const serviceIcons = {
                    agua: Icons.agua,
                    luz: Icons.luz,
                    salud: Icons.salud,
                    internet: Icons.wifi
                  };
                  const isAvailable = value === true || value === 'Sí';
                  const colors = isAvailable ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' : 'bg-white/5 border-white/10 text-white/30';

                  return (
                    <div
                      key={key}
                      className={`p-5 rounded-xl border transition-all hover:scale-[1.02] ${colors}`}
                    >
                      <Icon path={serviceIcons[key] || Icons.wifi} className="w-6 h-6 mb-3" />
                      <h4 className="text-base font-medium capitalize mb-1">{key}</h4>
                      <p className="text-xs opacity-60">{isAvailable ? 'Disponible' : 'No disponible'}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider flex items-center gap-2">
                    <Icon path={Icons.bed} className="w-4 h-4" />
                    Alojamiento
                  </h3>
                  <span className="text-[10px] text-violet-300 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                    {location.horarios_operacion?.horarios}
                  </span>
                </div>

                <div className="space-y-3">
                  {location.alojamiento_det?.map((al, idx) => (
                    <div key={idx} className="group p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-violet-500/30 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400">
                            <Icon path={Icons.bed} className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-medium text-white">{al.nombre}</h4>
                            <p className="text-xs text-white/40 flex items-center gap-1 mt-1">
                              <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-3 h-3" />
                              {al.contacto}
                            </p>
                          </div>
                        </div>
                        <span className="text-lg font-light text-fuchsia-400">{al.precio}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider flex items-center gap-2">
                  <Icon path={Icons.food} className="w-4 h-4" />
                  Gastronomía Local
                </h3>
                <div className="space-y-3">
                  {location.gastronomia_det?.map((ga, idx) => (
                    <div key={idx} className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-fuchsia-500/30 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-fuchsia-500/10 rounded-lg flex items-center justify-center text-fuchsia-400">
                            <Icon path={Icons.food} className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-medium text-white">{ga.nombre}</h4>
                            <p className="text-xs text-white/40 flex items-center gap-1 mt-1">
                              <Icon path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" className="w-3 h-3" />
                              {ga.horarios}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-fuchsia-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-medium">{ga.plato_estrella}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-violet-500/10 rounded-2xl border border-white/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Icon path={Icons.money} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white">Tarifas y Costos</h3>
                    <p className="text-sm text-white/40">Estimados por perfil de viajero</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="text-center px-6 border-r border-white/10">
                    <div className="text-3xl font-light text-white mb-1">{location.tarifas_costos?.entrada}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest">Entrada</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-fuchsia-400 mb-1">{location.tarifas_costos?.estimados?.split(' ')[0]}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest">Estimado/día</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: NATURALEZA - COLOR VERDE LIMA */}
        {activeTab === 'naturaleza' && (
          <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-lime-500/10 rounded-xl border border-lime-500/20">
                <Icon path={Icons.leaf} className="w-6 h-6 text-lime-400" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-white">Naturaleza y Biodiversidad</h2>
                <p className="text-sm text-white/40">Ecosistemas, fauna y actividades</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 bg-gradient-to-br from-lime-500/10 to-transparent rounded-2xl border border-lime-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-lime-500/20 rounded-lg">
                      <Icon path={Icons.leaf} className="w-5 h-5 text-lime-400" />
                    </div>
                    <h3 className="text-sm font-medium text-lime-400 uppercase tracking-wider">Ecosistemas Predominantes</h3>
                  </div>
                  <p className="text-xl text-white/90 leading-relaxed mb-4">
                    {location.biodiversidad?.ecosistemas}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {location.biodiversidad?.ballenas && (
                      <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm border border-cyan-500/30 flex items-center gap-2">
                        <Icon path="M13 10V3L4 14h7v7l9-11h-7z" className="w-4 h-4" />
                        Avistamiento Ballenas
                      </span>
                    )}
                    {location.biodiversidad?.tortugas && (
                      <span className="px-4 py-2 bg-teal-500/20 text-teal-300 rounded-lg text-sm border border-teal-500/30 flex items-center gap-2">
                        <Icon path="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-4 h-4" />
                        Anidación Tortugas
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Icon path={Icons.animal} className="w-5 h-5 text-white/60" />
                    </div>
                    <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Fauna Emblemática</h3>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {location.biodiversidad?.fauna}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Icon path={Icons.activity} className="w-4 h-4" />
                    Actividades de Aventura
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {location.actividades_turisticas?.map((act, idx) => (
                      <span key={idx} className="px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 hover:border-lime-500/30 transition-all cursor-default text-sm font-medium">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-28 p-6 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-lime-500/20 rounded-lg">
                      <Icon path={Icons.guide} className="w-5 h-5 text-lime-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Guías Locales</h3>
                  </div>

                  <div className="space-y-5">
                    <div className="p-4 bg-black/30 rounded-xl">
                      <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Contacto Directo</div>
                      <div className="text-xl font-light text-white flex items-center gap-2">
                        <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4 text-lime-400" />
                        {location.personal_guias?.contacto}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Idiomas Disponibles</div>
                      <div className="flex flex-wrap gap-2">
                        {location.personal_guias?.idiomas?.map((idi, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs text-white/80 border border-white/10">
                            {idi}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Tarifa de Guianza</div>
                      <div className="text-3xl font-light text-lime-400">{location.personal_guias?.tarifas}</div>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-3 bg-lime-500 hover:bg-lime-400 text-black rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4" />
                    Contactar Guía
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default DetailsPage;