import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/apiProduct";
import { Heart, ShoppingBag, Loader2, AlertCircle, Search } from "lucide-react";

const ProductCars = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(8);
  
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Filter products based on search term
  const filteredProducts = products?.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const displayedProducts = filteredProducts.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < filteredProducts.length;

  const loadMore = () => {
    setVisibleProducts(prev => Math.min(prev + 8, filteredProducts.length));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 bg-gradient-to-b from-white to-neutral-50">
        {/* Loading animation (keeping the existing one) */}
        <div className="relative">
          <svg viewBox="0 0 120 120" className="w-24 h-24">
            <circle cx="60" cy="60" r="30" className="fill-yellow-100 animate-pulse" />
            <g className="animate-[spin_3s_linear_infinite]">
              <path d="M60 20 L90 60 L60 80 L30 60 Z" className="fill-blue-200 stroke-blue-300" style={{ filter: 'drop-shadow(0 0 8px rgba(147, 197, 253, 0.5))' }} />
              <path d="M30 60 L60 80 L60 100 L40 70 Z" className="fill-blue-300 stroke-blue-400" />
              <path d="M90 60 L60 80 L60 100 L80 70 Z" className="fill-blue-300 stroke-blue-400" />
            </g>
            <g className="animate-[ping_2s_ease-in-out_infinite]">
              <circle cx="40" cy="40" r="2" className="fill-white" />
              <circle cx="80" cy="40" r="2" className="fill-white" />
              <circle cx="60" cy="70" r="2" className="fill-white" />
            </g>
          </svg>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-serif text-neutral-700">Preparando su colección</p>
          <div className="flex justify-center space-x-1">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
          </div>
        </div>
        <p className="text-sm text-neutral-500 italic">Elegancia en cada detalle</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-red-500">
        <div className="relative w-16 h-16">
          <AlertCircle className="w-16 h-16 animate-bounce" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium">¡Ups! Algo salió mal</p>
          <p className="text-sm text-red-400">Por favor, intenta nuevamente más tarde</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-neutral-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-800 mb-4">
            Colección Exclusiva
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
            Descubre nuestra exquisita selección de joyas, cada pieza diseñada con pasión y elegancia atemporal.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {displayedProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <button
                    className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4 text-neutral-600" />
                  </button>
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="p-4 lg:p-6">
                <h3 className="text-sm lg:text-base font-medium text-neutral-800 mb-1 lg:mb-2">
                  {product.nombre}
                </h3>
                <p className="text-xs lg:text-sm text-neutral-600 mb-3 lg:mb-4 line-clamp-2">
                  {product.descripcion}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base lg:text-lg font-medium text-neutral-800">
                    ${product.precio.toLocaleString()}
                  </span>
                  {product.stock > 0 ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-1.5 bg-neutral-800 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-md hover:bg-neutral-900 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      <span className="text-xs lg:text-sm">Agregar</span>
                    </button>
                  ) : (
                    <span className="text-xs lg:text-sm text-red-500">
                      Sin stock
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show More Button */}
        {hasMoreProducts && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="inline-flex items-center px-6 py-3 bg-neutral-800 text-white rounded-md hover:bg-neutral-900 transition-colors"
            >
              <span className="text-sm font-medium">Mostrar más productos</span>
            </button>
          </div>
        )}

        {/* No Results Message */}
        {filteredProducts.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-neutral-600">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductCars;