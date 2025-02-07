import React from 'react';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';

const PromotionalCarousel = ({ productsOff, addToCart }) => {
  const scrollRef = React.useRef(null);
  
  // Add check for productsOff
  if (!productsOff || !Array.isArray(productsOff)) {
    return null; // Or return a loading/error state
  }

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left'
        ? -current.offsetWidth
        : current.offsetWidth;
      
      current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full py-8 bg-gradient-to-r from-indigo-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-6">
          <Tag className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Ofertas Especiales</h2>
        </div>
        
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center z-10 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {productsOff.map((product) => (
              <div
                key={product._id}
                className="flex-none w-72 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-4">
                  <div className="relative">
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      {product.descuento}% OFF
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                      {product.nombre}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 line-through text-sm">
                        ${product.precioAnterior}
                      </span>
                      <span className="text-xl font-bold text-indigo-600">
                        ${product.precio}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center z-10 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalCarousel;