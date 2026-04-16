import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-neutral-800 pb-12 mb-10">
        {/* Branding Column */}
        <div className="md:col-span-1 flex flex-col">
          <div className="flex items-center gap-3 mb-5 pointer-events-none select-none">
            {/* Nota: Si usas colores custom en tailwind.config, cambia bg-emerald-600 por bg-primary-800 */}
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-900/30 ring-1 ring-white/10">
              F
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-white">
              FRONTERA<span className="text-emerald-400">VIVA</span>
            </span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-body max-w-xs">
            Fomentando la integración, conectividad y el desarrollo sostenible en nuestra región fronteriza del Barú.
          </p>
          <div className="flex gap-3">
            {[{ label: 'FB', icon: 'f' }, { label: 'X', icon: '𝕏' }, { label: 'IG', icon: '◎' }].map((item, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-500 hover:scale-105 transition-all duration-300 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                aria-label={`Red social ${item.label}`}
              >
                <span className="text-sm font-semibold text-neutral-400 group-hover:text-white">{item.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Directory Column */}
        <div>
          <h4 className="text-sm font-semibold mb-5 text-white uppercase tracking-wider">Directorio</h4>
          <ul className="space-y-3 text-neutral-400 text-sm font-medium">
            <li><a href="/explorer?category=tourism" className="hover:text-emerald-400 transition-colors duration-200 hover:underline decoration-emerald-400/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Turismo</a></li>
            <li><a href="/explorer?category=logistics" className="hover:text-emerald-400 transition-colors duration-200 hover:underline decoration-emerald-400/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Logística</a></li>
            <li><a href="/explorer?category=services" className="hover:text-emerald-400 transition-colors duration-200 hover:underline decoration-emerald-400/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Servicios</a></li>
            <li><a href="/explorer" className="hover:text-emerald-400 transition-colors duration-200 hover:underline decoration-emerald-400/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Ver todo</a></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-sm font-semibold mb-5 text-white uppercase tracking-wider">Ayuda</h4>
          <ul className="space-y-3 text-neutral-400 text-sm font-medium">
            <li><a href="/border-info" className="hover:text-emerald-400 transition-colors duration-200 hover:underline decoration-emerald-400/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Puntos de control</a></li>
            <li><a href="/postulate" className="hover:text-emerald-400 transition-colors duration-200 hover:underline decoration-emerald-400/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Registrar servicio</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200 hover:underline decoration-emerald-400/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Preguntas frecuentes</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200 hover:underline decoration-emerald-400/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Soporte técnico</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-sm font-semibold mb-5 text-white uppercase tracking-wider">Contacto</h4>
          <address className="not-italic space-y-4 text-neutral-400 text-sm font-medium">
            <p className="flex items-start gap-3 group">
              <span className="text-emerald-400 mt-0.5 transition-colors group-hover:text-emerald-300">📞</span>
              <a href="tel:+5078880000" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">+507 888-0000</a>
            </p>
            <p className="flex items-start gap-3 group">
              <span className="text-emerald-400 mt-0.5 transition-colors group-hover:text-emerald-300">✉️</span>
              <a href="mailto:info@fronteraviva.com" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">info@fronteraviva.com</a>
            </p>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-500 text-xs uppercase tracking-wider font-medium">
        <p>Copyright © 2026 Frontera Viva. Todos los derechos reservados.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-neutral-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Términos</a>
          <a href="#" className="hover:text-neutral-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Privacidad</a>
          <a href="#" className="hover:text-neutral-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;