import React from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const PromotionalCarousel = ({ productsOff, addToCart }) => {
  const scrollRef = React.useRef(null);
  
  if (!productsOff || !Array.isArray(productsOff)) {
    return null;
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
    <div className="w-full py-8 bg-gradient-to-r from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-6">
          <Heart className="w-6 h-6 text-rose-400 mr-2" />
          <h2 className="text-2xl font-serif text-gray-800">Ofertas Especiales</h2>
        </div>
        
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 bg-white rounded-full shadow-sm border border-pink-100 flex items-center justify-center z-10 hover:bg-pink-50 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {productsOff.map((product) => (
              <div
                key={product._id}
                className="flex-none w-72 bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-4">
                  <div className="relative">
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute top-2 right-2 bg-rose-400 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                      {product.descuento}% OFF
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <h3 className="font-serif text-lg text-gray-800 line-clamp-1">
                      {product.nombre}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through text-sm">
                        ${product.precioAnterior}
                      </span>
                      <span className="text-xl font-serif text-rose-500">
                        ${product.precio}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-rose-400 text-white px-6 py-2.5 rounded-full hover:bg-rose-500 transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                    >
                      Agregar al carrito
                      <Heart className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 bg-white rounded-full shadow-sm border border-pink-100 flex items-center justify-center z-10 hover:bg-pink-50 transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalCarousel;