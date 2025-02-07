import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { getBanner } from '../../../api/apiBanner';
import { useQuery } from '@tanstack/react-query';

const HeroCarousel = () => {
  // 1. Todos los hooks primero
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    data: banners,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanner,
  });

  useEffect(() => {
    if (banners && banners.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [banners]);

  // 2. Funciones auxiliares
  const nextSlide = () => {
    if (banners) {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }
  };

  const prevSlide = () => {
    if (banners) {
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // 3. Renderizado condicional
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 bg-gradient-to-b from-white to-neutral-50">
        {/* ... (mantén el contenido del loading como está) ... */}
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

  if (!banners || banners.length === 0) {
    return null;
  }

  // 4. Renderizado principal
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-neutral-100">
      {/* El resto del código permanece igual */}
      <div className="relative h-full">
        {banners.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <img
              src={slide.imagen}
              alt={slide.titulo}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl space-y-6">
                  <h2 
                    className="text-3xl md:text-5xl lg:text-6xl font-light text-white"
                    style={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 1s ease-out 0.5s'
                    }}
                  >
                    {slide.titulo}
                  </h2>
                  <p 
                    className="text-lg md:text-xl text-white/90"
                    style={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 1s ease-out 0.7s'
                    }}
                  >
                    {slide.subtitulo}
                  </p>
                 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;