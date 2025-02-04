import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../../../api/apiProduct";

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
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestra Colección</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <img 
              src={product.imagen} 
              alt={product.nombre} 
              className="w-full h-32 sm:h-48 object-cover" 
            />
            <div className="p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{product.nombre}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{product.descripcion}</p>
              <span className="text-base sm:text-lg font-bold text-pink-500">${product.precio}</span>
              <button
                className="mt-4 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors text-sm sm:text-base"
                onClick={() => addToCart(product)}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductCars;