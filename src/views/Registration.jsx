import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Registration = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    confirmarContraseña: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'contraseña') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  

  const handleSubmit = (data) => {
    setIsSubmitting(true);
    postUser({ ...data, isActive: true });
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-100">
        <div className="p-8 space-y-6">
          <header className="text-center">
            <h2 className="text-3xl font-thin tracking-tight text-neutral-800 mb-2">Crear Cuenta</h2>
            <p className="text-neutral-500 text-sm">Únete a nuestra comunidad de joyería exclusiva</p>
          </header>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              </div>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre "
                value={formData.nombre}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                required
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              </div>
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                required
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              </div>
              <input
                type="text"
                name="nombre"
                placeholder="Telefono"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="contraseña"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-neutral-400" />
                ) : (
                  <Eye className="w-4 h-4 text-neutral-400" />
                )}
              </button>
              <div className="mt-1 h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    passwordStrength === 1 ? 'bg-red-500 w-1/4' :
                    passwordStrength === 2 ? 'bg-yellow-500 w-1/2' :
                    passwordStrength === 3 ? 'bg-green-500 w-3/4' :
                    passwordStrength === 4 ? 'bg-green-600 w-full' : 'bg-neutral-200 w-0'
                  } transition-all duration-300`}
                />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              </div>
              <input
                type="password"
                name="confirmarContraseña"
                placeholder="Confirmar Contraseña"
                value={formData.confirmarContraseña}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-800 text-white py-3 rounded-lg hover:bg-neutral-900 transition-colors group flex items-center justify-center"
            >
              Crear Cuenta
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center">
            <p className="text-xs text-neutral-500">
              ¿Ya tienes una cuenta? <a href="/login" className="text-neutral-800 hover:underline font-medium">Iniciar sesión</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Registration;