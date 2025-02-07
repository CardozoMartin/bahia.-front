import React, { useState } from 'react';
import { Ruler, HelpCircle } from 'lucide-react';

const RingSizeGuide = () => {
  const [selectedMethod, setSelectedMethod] = useState('paper');

  const sizeChart = [
    { size: 49, diameter: 15.7, circumference: 49.3 },
    { size: 50, diameter: 15.9, circumference: 50.0 },
    { size: 51, diameter: 16.1, circumference: 50.6 },
    { size: 52, diameter: 16.5, circumference: 51.8 },
    { size: 53, diameter: 16.7, circumference: 52.4 },
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-800 mb-4">
            Guía de Medición de Anillos
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Encontrar el tamaño de anillo perfecto es crucial para la comodidad y ajuste. Te mostramos cómo hacerlo.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Ruler className="w-6 h-6 text-neutral-700 mr-3" />
              <h2 className="text-xl font-medium text-neutral-800">Métodos de Medición</h2>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => setSelectedMethod('paper')}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedMethod === 'paper' 
                    ? 'bg-neutral-100 ring-2 ring-neutral-300' 
                    : 'hover:bg-neutral-50'
                }`}
              >
                <h3 className="font-medium text-neutral-800">Método del Papel</h3>
                <p className="text-sm text-neutral-600">Mide tu dedo con una tira de papel</p>
              </button>

              <button 
                onClick={() => setSelectedMethod('professional')}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedMethod === 'professional' 
                    ? 'bg-neutral-100 ring-2 ring-neutral-300' 
                    : 'hover:bg-neutral-50'
                }`}
              >
                <h3 className="font-medium text-neutral-800">Medición Profesional</h3>
                <p className="text-sm text-neutral-600">Usa un medidor de anillos en joyería</p>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <HelpCircle className="w-6 h-6 text-neutral-700 mr-3" />
              <h2 className="text-xl font-medium text-neutral-800">Consejos Importantes</h2>
            </div>
            <ul className="space-y-3 text-neutral-600 text-sm">
              <li>📏 Mide al final del día cuando tus dedos están en su tamaño normal</li>
              <li>🌡️ Evita medir cuando hace mucho frío o calor</li>
              <li>🤲 Considera que los dedos de la mano dominante son ligeramente más grandes</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-neutral-600">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="p-3 text-left">Tamaño de Anillo</th>
                  <th className="p-3 text-left">Diámetro (mm)</th>
                  <th className="p-3 text-left">Circunferencia (mm)</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((size) => (
                  <tr key={size.size} className="border-b">
                    <td className="p-3">{size.size}</td>
                    <td className="p-3">{size.diameter}</td>
                    <td className="p-3">{size.circumference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingSizeGuide;