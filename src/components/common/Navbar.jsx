import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 fixed w-full z-50 shadow-lg transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-3xl font-dancing-script text-pink-500 hover:scale-105 transition-transform">
          Bahia Acc
        </a>
        
        {/* Menú para desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#" className="text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-300 after:transition-all after:duration-300 hover:after:w-full">
            Inicio
          </a>
          <a href="#" className="text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-300 after:transition-all after:duration-300 hover:after:w-full">
            Colecciones
          </a>
          <a href="#" className="text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-300 after:transition-all after:duration-300 hover:after:w-full">
            Anillos
          </a>
          <a href="#" className="text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-300 after:transition-all after:duration-300 hover:after:w-full">
            Collares
          </a>
          <a href="#" className="text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-300 after:transition-all after:duration-300 hover:after:w-full">
            Contacto
          </a>
          <div className="relative">
            <i className="fas fa-shopping-cart text-gray-700 hover:text-pink-500 transition-colors"></i>
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>

        {/* Botón de menú para móviles */}
        <button className="md:hidden text-gray-700 focus:outline-none">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Menú para móviles */}
      <div className="md:hidden bg-white mt-4 p-4 space-y-4">
        <a href="#" className="block text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors">
          Inicio
        </a>
        <a href="#" className="block text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors">
          Colecciones
        </a>
        <a href="#" className="block text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors">
          Anillos
        </a>
        <a href="#" className="block text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors">
          Collares
        </a>
        <a href="#" className="block text-gray-700 uppercase text-sm font-medium tracking-wide hover:text-pink-500 transition-colors">
          Contacto
        </a>
        <div className="relative">
          <i className="fas fa-shopping-cart text-gray-700 hover:text-pink-500 transition-colors"></i>
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;