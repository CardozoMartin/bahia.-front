import React from 'react'
import "../../css/footer.css"
const Footer = () => {
  return (
    <footer className="site-footer">
        <div className="footer-content">
            <div className="footer-section">
                <h3>Bahia Acc</h3>
                <p>Tu destino para joyería fina y accesorios exclusivos.</p>
                <div className="social-links">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-pinterest"></i></a>
                </div>
            </div>
            <div className="footer-section">
                <h3>Enlaces Rápidos</h3>
                <ul>
                    <li><a href="#">Sobre Nosotros</a></li>
                    <li><a href="#">Política de Privacidad</a></li>
                    <li><a href="#">Términos y Condiciones</a></li>
                    <li><a href="#">Envíos y Devoluciones</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Contacto</h3>
                <ul className="contact-info">
                    <li><i className="fas fa-phone"></i> +1234567890</li>
                    <li><i className="fas fa-envelope"></i> info@bahiaacc.com</li>
                    <li><i className="fas fa-map-marker-alt"></i> Ciudad, País</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Newsletter</h3>
                <form className="newsletter-form">
                    <input type="email" placeholder="Tu correo electrónico"/>
                    <button type="submit">Suscribirse</button>
                </form>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2024 Bahia Acc. Todos los derechos reservados.</p>
        </div>
    </footer>
  )
}

export default Footer