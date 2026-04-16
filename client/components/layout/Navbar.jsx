import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Explorar', path: '/explorer' },
    { name: 'Mapa', path: '/map' },
    { name: 'Información', path: '/border-info' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-primary-800 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            F
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight text-neutral-900 border-none">
            FRONTERA<span className="text-primary-800">VIVA</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`text-sm font-bold uppercase tracking-widest transition-all ${
                isActive(link.path) 
                  ? 'text-primary-800 border-b-2 border-primary-800 pb-1' 
                  : 'text-neutral-500 hover:text-primary-800'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/login')}>
            Ingresar
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/postulate')}>
            Postularse
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-neutral-200 py-6 px-6 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setIsMenuOpen(false);
              }}
              className={`text-lg font-bold text-left ${
                isActive(link.path) ? 'text-primary-800' : 'text-neutral-600'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="h-px bg-neutral-100 my-2" />
          <Button variant="outline" onClick={() => navigate('/admin/login')}>
            Ingresar Administrador
          </Button>
          <Button variant="primary" onClick={() => navigate('/postulate')}>
            Postularse
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
