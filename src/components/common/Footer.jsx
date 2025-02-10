import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200"></div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-neutral-800">Bahia Acc</h3>
            <p className="text-neutral-600 leading-relaxed">
              Descubre la elegancia atemporal en cada pieza. Joyería exclusiva que cuenta historias únicas.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-rose-300 hover:text-rose-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-rose-300 hover:text-rose-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-rose-300 hover:text-rose-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800">Enlaces Útiles</h3>
            <ul className="space-y-3">
              {['Colecciones', 'Sobre Nosotros', 'Política de Privacidad', 'Términos y Condiciones'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-neutral-600 hover:text-rose-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-neutral-600">
                <Phone className="w-4 h-4 mr-2 text-rose-300" />
                +1234567890
              </li>
              <li className="flex items-center text-neutral-600">
                <Mail className="w-4 h-4 mr-2 text-rose-300" />
                info@bahiaacc.com
              </li>
              <li className="flex items-center text-neutral-600">
                <MapPin className="w-4 h-4 mr-2 text-rose-300" />
                Ciudad, País
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800">Newsletter</h3>
            <p className="text-neutral-600">Suscríbete para recibir noticias sobre nuevas colecciones y ofertas exclusivas.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
              />
              <button
                type="submit"
                className="w-full px-6 py-2 bg-gradient-to-r from-rose-200 to-rose-300 text-neutral-800 rounded-lg hover:from-rose-300 hover:to-rose-400 transition-all duration-300"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-neutral-600 text-sm">
            &copy; 2024 Bahia Acc. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;