import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Menu } from 'lucide-react';

const Navbar = ({ cartItemCount, openCart, lastAddedProduct, clearLastAddedProduct }) => {
  const [showProductPreview, setShowProductPreview] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (lastAddedProduct) {
      setShowProductPreview(true);
      
      const timer = setTimeout(() => {
        setShowProductPreview(false);
        clearLastAddedProduct();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [lastAddedProduct, clearLastAddedProduct]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white p-4 fixed w-full z-50 shadow-lg transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center relative">
        <a href="#" className="text-3xl font-dancing-script text-pink-500 hover:scale-105 transition-transform">
          Bahia Acc
        </a>
        
        {/* Desktop Menu */}
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
          <button onClick={openCart} className="relative">
            <ShoppingCart className="text-gray-700 hover:text-pink-500 transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={openCart} className="relative">
            <ShoppingCart className="text-gray-700 text-2xl hover:text-pink-500 transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <button 
            onClick={toggleMobileMenu} 
            className="text-gray-700 focus:outline-none"
          >
            <Menu className="text-2xl" />
          </button>
        </div>

        {/* Product Preview Popover */}
        {showProductPreview && lastAddedProduct && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-60 animate-fade-in-down">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Añadido al carrito</h3>
              <button 
                onClick={() => {
                  setShowProductPreview(false);
                  clearLastAddedProduct();
                }} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <img 
                src={lastAddedProduct?.image || ''} 
                alt={lastAddedProduct?.name || 'Producto'} 
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {lastAddedProduct?.name || 'Producto'}
                </p>
                <p className="text-sm text-gray-600">
                  ${lastAddedProduct?.price?.toFixed(2) || '0.00'}
                </p>
                <p className="text-xs text-pink-500">Agregado al carrito</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white mt-4 p-4 space-y-4 fixed top-16 left-0 w-full z-40 shadow-lg">
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;