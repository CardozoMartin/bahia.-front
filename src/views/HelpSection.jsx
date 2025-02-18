import React from 'react';
import {
  Truck, Mail, Package, Heart, 
  Shield, Watch, Sparkles, MessageCircle,
  Phone, MapPin, RefreshCw, HelpCircle
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const HelpSection = () => {
  const sections = [
    {
      title: "Nuestras Joyas",
      icon: <Sparkles className="w-6 h-6 text-rose-400" />,
      content: [
        {
          subtitle: "Acero Quirúrgico de Alta Calidad",
          description: "Todas nuestras piezas están elaboradas con acero quirúrgico 316L, garantizando durabilidad y resistencia a la corrosión. Ideal para uso diario y para pieles sensibles."
        },
        {
          subtitle: "Cuidado de tus Joyas",
          description: "Mantén tus joyas brillantes evitando el contacto con perfumes, cremas y agua. Guárdalas en un lugar seco y limpio. Para limpiarlas, usa un paño suave y seco."
        }
      ]
    },
    {
      title: "Envíos",
      icon: <Truck className="w-6 h-6 text-rose-400" />,
      content: [
        {
          subtitle: "Envíos por Andreani",
          description: "Realizamos envíos a todo el país a través de Andreani. Una vez despachado tu pedido, recibirás por email el número de seguimiento para que puedas rastrear tu paquete."
        },
        {
          subtitle: "Seguimiento",
          description: "Mantenemos informados a nuestros clientes en cada etapa del envío mediante actualizaciones por email. Podrás conocer el estado de tu pedido en tiempo real."
        }
      ]
    },
    {
      title: "Atención al Cliente",
      icon: <MessageCircle className="w-6 h-6 text-rose-400" />,
      content: [
        {
          subtitle: "WhatsApp",
          description: "Estamos disponibles vía WhatsApp para resolver todas tus dudas sobre productos, talles, envíos y más. ¡No dudes en consultarnos!"
        },
        {
          subtitle: "Email",
          description: "Recibirás confirmaciones y actualizaciones importantes sobre tu compra a través de tu correo electrónico registrado."
        }
      ]
    },
    {
      title: "Garantía",
      icon: <Shield className="w-6 h-6 text-rose-400" />,
      content: [
        {
          subtitle: "Calidad Garantizada",
          description: "Todos nuestros productos cuentan con garantía contra defectos de fabricación. Tu satisfacción es nuestra prioridad."
        },
        {
          subtitle: "Devoluciones",
          description: "Si no estás satisfecha con tu compra, tienes 30 días para realizar un cambio o devolución. El producto debe estar en su estado original."
        }
      ]
    }
  ];

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen pt-30 bg-gradient-to-b from-rose-50 to-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif text-rose-800 mb-4">Centro de Ayuda</h1>
          <p className="text-rose-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte a encontrar la joya perfecta y asegurar que tu experiencia de compra sea tan brillante como nuestras piezas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                {section.icon}
                <h2 className="text-xl font-serif text-rose-800">{section.title}</h2>
              </div>
              <div className="space-y-6">
                {section.content.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-rose-700 font-medium">{item.subtitle}</h3>
                    <p className="text-rose-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif text-rose-800 mb-2">¿Necesitas más ayuda?</h2>
            <p className="text-rose-600">Contáctanos por cualquiera de estos medios</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3 p-4 bg-rose-50 rounded-xl">
              <Phone className="w-5 h-5 text-rose-400" />
              <span className="text-rose-700">WhatsApp: [Número]</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-rose-50 rounded-xl">
              <Mail className="w-5 h-5 text-rose-400" />
              <span className="text-rose-700">Email: [Email]</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-rose-50 rounded-xl">
              <Watch className="w-5 h-5 text-rose-400" />
              <span className="text-rose-700">Lun a Vie: 9:00 - 18:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default HelpSection;