import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, CircleUserRound, Heart } from 'lucide-react';
import { useSession } from '../../store/useSession';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

const Navbar = ({ cartItemCount, openCart, lastAddedProduct, clearLastAddedProduct }) => {
  const { user, logout } = useSession();
  const [showProductPreview, setShowProductPreview] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
const navigate = useNavigate()
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
  const handleLogout = () => {
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      text: "¡Gracias por visitarnos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#F43F5E',
      cancelButtonColor: '#9F1239',
    }).then((res) => {
      if (res.isConfirmed) {
        toast.success("Sesión cerrada con éxito");
        logout();
        navigate("/");
      }
    });
  };

  return (
    <>
      <nav className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-serif text-2xl md:text-3xl text-rose-800">
                BAHÍA<span className="font-light italic text-rose-600">Joyas</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="nav-link text-rose-700 hover:text-rose-900 transition-colors font-light">Inicio</Link>
              <Link to="/productall" className="nav-link text-rose-700 hover:text-rose-900 transition-colors font-light">Productos</Link>
              <Link to="/dashboard" className="nav-link text-rose-700 hover:text-rose-900 transition-colors font-light">Ayuda</Link>
              <Link to="/dashboard" className="nav-link text-rose-700 hover:text-rose-900 transition-colors font-light">Contáctanos</Link>
            </div>

            {/* Cart & Account Links */}
            <div className="flex items-center space-x-4">
              {user ? (
                <p onClick={handleLogout} className="hidden lg:flex text-sm text-rose-600 hover:text-rose-800 cursor-pointer transition-colors">
                  Cerrar sesión
                </p>
              ) : (
                <Link to="/register" className="hidden lg:flex text-sm text-rose-600 hover:text-rose-800 transition-colors">
                  Registro
                </Link>
              )}
              <p className="hidden lg:block text-rose-300">/</p>
              {user ? (
                <Link to="/userprofile" className="hidden lg:flex text-sm text-rose-600 hover:text-rose-800 transition-colors">
                  Hola, {user.nombre}
                </Link>
              ) : (
                <Link to="/login" className="hidden lg:flex text-sm text-rose-600 hover:text-rose-800 transition-colors">
                  Iniciar sesión
                </Link>
              )}

              {/* Carrito */}
              <div className="relative">
                <button 
                  onClick={openCart} 
                  className="relative p-2 hover:bg-rose-50 rounded-full transition-colors"
                >
                  <ShoppingBag className="w-6 h-6 text-rose-600" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Cart Notification Popover */}
                {showProductPreview && lastAddedProduct && (
                  <div className="fixed right-4 md:absolute md:right-0 top-16 w-80 bg-white rounded-2xl shadow-lg border border-rose-100 overflow-hidden transform transition-all duration-300 animate-fade-down z-50">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-serif text-rose-800">Agregado al carrito</h3>
                        <button 
                          onClick={() => { setShowProductPreview(false); clearLastAddedProduct(); }} 
                          className="text-rose-400 hover:text-rose-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-20 h-20 bg-rose-50 rounded-xl overflow-hidden">
                          <img src={lastAddedProduct.imagen} alt={lastAddedProduct.nombre} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-serif text-rose-800 mb-1">{lastAddedProduct.nombre}</h4>
                          <p className="text-sm text-rose-600 mb-2">{lastAddedProduct.descripcion}</p>
                          <p className="text-sm font-medium text-rose-800">${lastAddedProduct.precio.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-3">
                        <button 
                          onClick={openCart} 
                          className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-full hover:bg-rose-600 transition-colors shadow-sm hover:shadow-md"
                        >
                          Ver carrito
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu} 
                className="lg:hidden p-2 hover:bg-rose-50 rounded-full transition-colors"
              >
                <Menu className="w-6 h-6 text-rose-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={toggleMobileMenu}
      >
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-end">
              <button 
                onClick={toggleMobileMenu} 
                className="p-2 hover:bg-rose-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-rose-600" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col h-full justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <span className="font-serif text-2xl text-rose-800">
                  BAHÍA<span className="font-light italic text-rose-600">Joyas</span>
                </span>
              </Link>
              
              <div className="mt-8 flex flex-col space-y-6">
                <Link
                  to="/"
                  className="text-lg font-serif text-rose-700 hover:text-rose-900 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Inicio
                </Link>
                <Link
                  to="/productos"
                  className="text-lg font-serif text-rose-700 hover:text-rose-900 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Productos
                </Link>
                <Link
                  to="/dashboard"
                  className="text-lg font-serif text-rose-700 hover:text-rose-900 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Ayuda
                </Link>
                <Link
                  to="/dashboard"
                  className="text-lg font-serif text-rose-700 hover:text-rose-900 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Contáctanos
                </Link>
              </div>

              {/* User section */}
              <div className="border-t border-rose-100 pt-4 mt-auto">
                <div className="flex items-center justify-center">
                  <CircleUserRound className="w-6 h-6 mr-2 text-rose-600" />

                  {user ? (
                    <>
                      <Link
                        to="/userdashboard"
                        className="text-sm text-rose-700 hover:text-rose-900 transition-colors inline-flex mr-2"
                        onClick={toggleMobileMenu}
                      >
                        Hola, {user.nombre}
                      </Link>
                      <span className="text-rose-300">/</span>
                      <button
                        onClick={handleLogout}
                        className="text-sm text-rose-700 ms-2 hover:text-rose-900 transition-colors inline-flex"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-sm text-rose-700 hover:text-rose-900 transition-colors inline-flex mr-2"
                        onClick={toggleMobileMenu}
                      >
                        Iniciar sesión
                      </Link>
                      <span className="text-rose-300">/</span>
                      <Link
                        to="/register"
                        className="text-sm text-rose-700 ms-2 hover:text-rose-900 transition-colors inline-flex"
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
      </div>
    </>
  );
};

export default Navbar;