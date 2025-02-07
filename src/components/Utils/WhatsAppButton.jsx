import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center">
      {isTooltipVisible && (
        <div className="absolute right-16 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs animate-fade-in">
          <p>¿Necesitas ayuda? ¡Escríbenos!</p>
          <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2">
            <div className="border-8 border-transparent border-l-white"></div>
          </div>
        </div>
      )}
      
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        className="group relative bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25"></div>
        <MessageCircle className="w-7 h-7 text-white transform transition-transform duration-300 group-hover:rotate-12" />
      </button>
    </div>
  );
};

export default WhatsAppButton;