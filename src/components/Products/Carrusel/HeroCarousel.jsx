import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { getBanner } from '../../../api/apiBanner';
import { useQuery } from '@tanstack/react-query';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const {
    data: banners,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanner,
  });

  useEffect(() => {
    if (banners && banners.length > 0 && !isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [banners, isHovered]);

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
      <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[400px] space-y-6 bg-gradient-to-b from-white to-rose-50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-rose-100 rounded"></div>
          <div className="h-4 w-48 bg-rose-50 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[400px] space-y-4 text-rose-500">
        <AlertCircle className="w-12 h-12 md:w-16 md:h-16 animate-bounce" />
        <div className="text-center">
          <p className="text-base md:text-lg font-medium">¡Ups! Algo salió mal</p>
          <p className="text-sm text-rose-400">Por favor, intenta nuevamente más tarde</p>
        </div>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-full h-[500px] sm:h-[600px] md:h-[70vh] lg:h-[85vh] overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full">
        {banners.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {/* Gradiente optimizado para móvil */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 sm:bg-gradient-to-r sm:from-black/40 sm:via-transparent sm:to-black/40" />
            
            {/* Efecto de brillo ajustado para móvil */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent mix-blend-overlay" />
            
            <picture>
              {/* Desktop */}
              <source
                media="(min-width: 1024px)"
                srcSet={`${slide.imagen}?w=1920&q=90&brightness=105&contrast=105`}
              />
              {/* Tablet */}
              <source
                media="(min-width: 768px)"
                srcSet={`${slide.imagen}?w=1280&q=90&brightness=105&contrast=105`}
              />
              {/* Mobile landscape */}
              <source
                media="(min-width: 640px)"
                srcSet={`${slide.imagen}?w=800&q=85&brightness=105&contrast=105`}
              />
              {/* Mobile portrait - Optimizado para mejor calidad */}
              <img
                src={`${slide.imagen}?w=750&q=85&brightness=110&contrast=105&fit=crop`}
                alt={slide.titulo}
                className="w-full h-full object-cover object-center sm:object-[50%,50%] filter brightness-105"
                loading={index === 0 ? "eager" : "lazy"}
                style={{ transform: 'scale(1.02)' }}
              />
            </picture>
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-xl md:max-w-2xl space-y-4 sm:space-y-6 md:space-y-8">
                  <h2 
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-wide"
                    style={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    {slide.titulo}
                  </h2>
                  <p 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-prose font-light"
                    style={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.7s',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
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

      {/* Controles optimizados para móvil */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 flex items-center justify-between px-3 sm:px-6 md:px-10">
        <button
          onClick={prevSlide}
          className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 group touch-manipulation"
          aria-label="Anterior slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white transition-transform group-hover:-translate-x-1" />
        </button>

        <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 md:h-2.5 rounded-full transition-all duration-500 ${
                currentSlide === index 
                  ? 'bg-white w-6 sm:w-8 md:w-10' 
                  : 'bg-white/40 w-2 sm:w-2.5 hover:bg-white/60'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 group touch-manipulation"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;