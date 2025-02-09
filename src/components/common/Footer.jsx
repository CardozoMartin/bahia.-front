import React from 'react'
import "../../css/footer.css"
const Footer = () => {
    return (
      <footer className="bg-[#111111] text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sección 1 */}
            <div className="footer-section">
              <h3 className="text-xl font-semibold mb-2">Bahia Acc</h3>
              <p>Tu destino para joyería fina y accesorios exclusivos.</p>
              <div className="social-links mt-4">
                <a href="#" className="text-white mr-4">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-white mr-4">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
  
            {/* Sección 2 */}
            <div className="footer-section">
              <h3 className="text-xl font-semibold mb-2">Enlaces Rápidos</h3>
              <ul>
                <li><a href="#" className="text-white hover:text-[#f5f5dc]">Sobre Nosotros</a></li>
                <li><a href="#" className="text-white hover:text-[#f5f5dc]">Política de Privacidad</a></li>
                <li><a href="#" className="text-white hover:text-[#f5f5dc]">Términos y Condiciones</a></li>
                <li><a href="#" className="text-white hover:text-[#f5f5dc]">Envíos y Devoluciones</a></li>
              </ul>
            </div>
  
            {/* Sección 3 */}
            <div className="footer-section">
              <h3 className="text-xl font-semibold mb-2">Contacto</h3>
              <ul className="contact-info">
                <li><i className="fas fa-phone mr-2"></i> +1234567890</li>
                <li><i className="fas fa-envelope mr-2"></i> info@bahiaacc.com</li>
                <li><i className="fas fa-map-marker-alt mr-2"></i> Ciudad, País</li>
              </ul>
            </div>
  
            {/* Sección 4 */}
            <div className="footer-section">
              <h3 className="text-xl font-semibold mb-2">Newsletter</h3>
              <form className="newsletter-form">
                <input type="email" placeholder="Tu correo electrónico" className="w-full py-2 px-4 mb-4 rounded-lg text-black" />
                <button type="submit" className="bg-[#8b4513] text-white px-6 py-2 rounded-lg hover:bg-[#6b3c1c]">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
  
        <div className="footer-bottom bg-[#8b4513] text-center py-4">
          <p>&copy; 2024 Bahia Acc. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  };

export default Footer