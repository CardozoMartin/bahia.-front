import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, ChevronDown } from 'lucide-react';

const Navbar = ({ cartItemCount, openCart, lastAddedProduct, clearLastAddedProduct }) => {
  const [showProductPreview, setShowProductPreview] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle cart notification
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <span className="font-playfair text-2xl md:text-3xl text-neutral-800">
              BAHÍA
              <span className="font-light italic">Joyas</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {['Inicio', 'Colecciones', 'Anillos', 'Collares', 'Contacto'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group relative py-2 text-sm text-neutral-600 font-medium tracking-wide hover:text-neutral-900 transition-colors duration-200"
              >
                <span>{item}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-900 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-neutral-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-700" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute left-0 right-0 top-full bg-white border-t transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {['Inicio', 'Colecciones', 'Anillos', 'Collares', 'Contacto'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Cart Notification Popover */}
        {showProductPreview && lastAddedProduct && (
          <div className="absolute top-full right-4 mt-4 w-80 bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden transform transition-all duration-300 animate-fade-down">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-neutral-900">
                  Agregado al carrito
                </h3>
                <button
                  onClick={() => {
                    setShowProductPreview(false);
                    clearLastAddedProduct();
                  }}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 bg-neutral-50 rounded-md overflow-hidden">
                  <img
                    src={lastAddedProduct.imagen}
                    alt={lastAddedProduct.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-neutral-900 mb-1">
                    {lastAddedProduct.nombre}
                  </h4>
                  <p className="text-sm text-neutral-500 mb-2">
                    {lastAddedProduct.descripcion}
                  </p>
                  <p className="text-sm font-medium text-neutral-900">
                    ${lastAddedProduct.precio.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={openCart}
                  className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Ver carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;