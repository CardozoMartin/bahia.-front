import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, CircleUserRound } from 'lucide-react';
import { useSession } from '../../store/useSession';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItemCount, openCart, lastAddedProduct, clearLastAddedProduct }) => {
  const { user } = useSession();
  const [showProductPreview, setShowProductPreview] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <span className="font-playfair text-2xl md:text-3xl text-neutral-800">
                BAHÍA<span className="font-light italic">Joyas</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/login" className="nav-link">Inicio</Link>
              <Link to="/register" className="nav-link">Productos</Link>
              <Link to="/dashboard" className="nav-link">Ayuda</Link>
              <Link to="/dashboard" className="nav-link">Contactanos</Link>

            </div>

            {/* Cart & Account Links */}
            <div className="flex items-center space-x-4">
              {user ? (
                <Link to="/myaccount" className="hidden lg:flex text-sm text-neutral-600 hover:text-neutral-900">Cerrar sesión</Link>
              ) : (
                <Link to="/register" className="hidden lg:flex text-sm text-neutral-600 hover:text-neutral-900">Registro</Link>
              )}
              <p className="hidden lg:block">/</p>
              {user ? (
                <Link to="/myaccount" className="hidden lg:flex text-sm text-neutral-600 hover:text-neutral-900">Mi cuenta</Link>
              ) : (
                <Link to="/login" className="hidden lg:flex text-sm text-neutral-600 hover:text-neutral-900">Iniciar sesión</Link>
              )}

              {/* Carrito */}
              <button onClick={openCart} className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <ShoppingBag className="w-6 h-6 text-neutral-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button onClick={toggleMobileMenu} className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <Menu className="w-6 h-6 text-neutral-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Offcanvas */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} onClick={toggleMobileMenu}>
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-end">
              <button onClick={toggleMobileMenu} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-neutral-700" />
              </button>
            </div>

            <div className="mt-8 flex flex-col space-y-6">
              <Link
                to="/"
                className="text-lg font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={toggleMobileMenu}
              >
                Inicio
              </Link>
              <Link
                to="/productos"
                className="text-lg font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={toggleMobileMenu}
              >
                Productos
              </Link>
              <Link
                to="/dashboard"
                className="text-lg font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={toggleMobileMenu}
              >
                Ayuda
              </Link>
              <Link
                to="/dashboard"
                className="text-lg font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={toggleMobileMenu}
              >
                Contactanos
              </Link>

              {/* User specific links for mobile */}
              <div className="flex items-center justify-center  mt-50 pt-4 border-t border-neutral-200">
                <CircleUserRound className="w-6 h-6 mr-2  text-neutral-700" />

                {user ? (
                  <>
                    <Link
                      to="/myaccount"
                      className="text-dm mr-2 text-neutral-700 hover:text-neutral-900 transition-colors inline-flex"
                      onClick={toggleMobileMenu}
                    >
                      Mi cuenta
                    </Link>
                    <span className="text-neutral-400">/</span>
                    <Link
                      to="/logout"
                      className="text-dm text-neutral-700 ms-2 mr-2 hover:text-neutral-900 transition-colors inline-flex"
                      onClick={toggleMobileMenu}
                    >
                      Cerrar sesión
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-dm mr-2 ms-2 text-neutral-700 hover:text-neutral-900 transition-colors inline-flex"
                      onClick={toggleMobileMenu}
                    >
                      Iniciar sesión
                    </Link>
                    <span className="text-neutral-400">/</span>
                    <Link
                      to="/register"
                      className="text-dm ms-2 mr-2 text-neutral-700 hover:text-neutral-900 transition-colors inline-flex"
                      onClick={toggleMobileMenu}
                    >
                      Registro
                    </Link>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Cart Notification Popover */}
      {showProductPreview && lastAddedProduct && (
        <div className="absolute top-full right-4 mt-4 w-80 bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden transform transition-all duration-300 animate-fade-down">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-neutral-900">Agregado al carrito</h3>
              <button onClick={() => { setShowProductPreview(false); clearLastAddedProduct(); }} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 bg-neutral-50 rounded-md overflow-hidden">
                <img src={lastAddedProduct.imagen} alt={lastAddedProduct.nombre} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">{lastAddedProduct.nombre}</h4>
                <p className="text-sm text-neutral-500 mb-2">{lastAddedProduct.descripcion}</p>
                <p className="text-sm font-medium text-neutral-900">${lastAddedProduct.precio.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button onClick={openCart} className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors">
                Ver carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;