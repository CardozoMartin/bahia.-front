import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { getBanner } from '../../../api/apiBanner';
import { useQuery } from '@tanstack/react-query';

const HeroCarousel = () => {
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] space-y-6 bg-gradient-to-b from-white to-neutral-50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-neutral-200 rounded"></div>
          <div className="h-4 w-48 bg-neutral-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] space-y-4 text-red-500">
        <AlertCircle className="w-12 h-12 md:w-16 md:h-16 animate-bounce" />
        <div className="text-center">
          <p className="text-base md:text-lg font-medium">¡Ups! Algo salió mal</p>
          <p className="text-sm text-red-400">Por favor, intenta nuevamente más tarde</p>
        </div>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative pt-20 w-full h-[400px] md:h-[60vh] lg:h-[80vh] overflow-hidden bg-neutral-100">
      <div className="relative h-full">
        {banners.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Gradient overlay adaptativo */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent md:from-black/50 md:via-black/30 md:to-transparent" />
            
            {/* Imagen optimizada para móvil y desktop */}
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={`${slide.imagen}?w=1920&q=80`}
              />
              <source
                media="(min-width: 640px)"
                srcSet={`${slide.imagen}?w=1280&q=80`}
              />
              <img
                src={`${slide.imagen}?w=640&q=75`}
                alt={slide.titulo}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </picture>
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-xl md:max-w-2xl space-y-4 md:space-y-6">
                  <h2 
                    className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight"
                    style={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 1s ease-out 0.5s'
                    }}
                  >
                    {slide.titulo}
                  </h2>
                  <p 
                    className="text-base md:text-lg lg:text-xl text-white/90 max-w-prose"
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

      {/* Controles de navegación adaptables */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between p-4 md:p-6">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Anterior slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        <div className="flex space-x-2 md:space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white w-6 md:w-8' 
                  : 'bg-white/50 w-2 md:w-2 hover:bg-white/75'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;