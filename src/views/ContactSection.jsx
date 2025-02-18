import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    <Navbar></Navbar>
    <section className="bg-gradient-to-b pt-30 from-rose-50 to-pink-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif text-rose-800 mb-4">
              Contáctanos
            </h1>
            <p className="text-rose-600 max-w-2xl mx-auto font-light">
              Estamos aquí para ayudarte a encontrar la joya perfecta que cuente tu historia
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif text-rose-800 mb-6">Información de Contacto</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-rose-100 rounded-full">
                      <Phone className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-rose-800 font-serif">Teléfono</p>
                      <p className="text-rose-600">(+54) 123-456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-rose-100 rounded-full">
                      <Mail className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-rose-800 font-serif">Email</p>
                      <p className="text-rose-600">contacto@joyeriabahia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-rose-100 rounded-full">
                      <MapPin className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-rose-800 font-serif">Ubicación</p>
                      <p className="text-rose-600">Av. Principal 123, Ciudad</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif text-rose-800 mb-4">Horario de Atención</h2>
                <div className="space-y-2">
                  <p className="text-rose-600">Lunes a Viernes: 9:00 - 20:00</p>
                  <p className="text-rose-600">Sábados: 10:00 - 18:00</p>
                  <p className="text-rose-600">Domingos: Cerrado</p>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-rose-800 font-serif mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-rose-800 font-serif mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-rose-800 font-serif mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-rose-800 font-serif mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-rose-400 text-white px-6 py-3 rounded-full hover:bg-rose-500 transition-colors shadow-sm hover:shadow-md font-serif flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
    </>
  );
};

export default ContactSection;