import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/apiProduct";
import { Heart, ShoppingBag, Loader2 } from "lucide-react";

const ProductCars = ({ addToCart }) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        <p className="text-lg">Lo sentimos, ha ocurrido un error: {error.message}</p>
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
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Descubre nuestra exquisita selección de joyas, cada pieza diseñada con pasión y elegancia atemporal.
          </p>
        </header>

        {/* Updated grid layout with specific breakpoints */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
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
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1.5 bg-neutral-800 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-md hover:bg-neutral-900 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm">Agregar</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductCars;