import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { postUserFn } from '../api/apiUser';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Registration = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const registerMutation = useMutation({
    mutationFn: postUserFn,
    onSuccess: () => {
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: 'Por favor verifica tu correo electrónico',
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#F43F5E',
        background: '#FFF5F6',
      }).then(() => {
        navigate('/login');
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Ocurrió un error durante el registro',
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente',
        confirmButtonColor: '#F43F5E',
        background: '#FFF5F6',
      });
    }
  });

  const onSubmit = (data) => {
    if (data.password !== data.confirmarPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Intentar nuevamente',
        confirmButtonColor: '#F43F5E',
        background: '#FFF5F6',
      });
      return;
    }
    
    const { confirmarPassword, ...registrationData } = data;
    registerMutation.mutate(registrationData);
  };

  const validatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
    return strength >= 3 || 'La contraseña debe cumplir al menos 3 requisitos de seguridad';
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden border border-pink-100">
          <div className="p-8 space-y-6">
            <header className="text-center">
              <h2 className="text-3xl font-light tracking-wide text-rose-800 mb-3">Bienvenida</h2>
              <p className="text-rose-600 text-sm font-light">Únete a nuestra exclusiva comunidad de joyería</p>
            </header>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-rose-300 group-focus-within:text-rose-400 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Nombre"
                  {...register('nombre', { required: 'Nombre es requerido' })}
                  className="w-full pl-10 pr-3 py-3 border-b border-rose-100 focus:border-rose-300 outline-none text-rose-800 transition-colors bg-transparent disabled:opacity-50"
                  disabled={registerMutation.isPending}
                />
                {errors.nombre && <span className="text-rose-500 text-sm mt-1">{errors.nombre.message}</span>}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-rose-300 group-focus-within:text-rose-400 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Apellido"
                  {...register('apellido', { required: 'Apellido es requerido' })}
                  className="w-full pl-10 pr-3 py-3 border-b border-rose-100 focus:border-rose-300 outline-none text-rose-800 transition-colors bg-transparent disabled:opacity-50"
                  disabled={registerMutation.isPending}
                />
                {errors.apellido && <span className="text-rose-500 text-sm mt-1">{errors.apellido.message}</span>}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="w-4 h-4 text-rose-300 group-focus-within:text-rose-400 transition-colors" />
                </div>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  {...register('telefono', {
                    required: 'Teléfono es requerido',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Ingrese un número de teléfono válido de 10 dígitos'
                    }
                  })}
                  className="w-full pl-10 pr-3 py-3 border-b border-rose-100 focus:border-rose-300 outline-none text-rose-800 transition-colors bg-transparent disabled:opacity-50"
                  disabled={registerMutation.isPending}
                />
                {errors.telefono && <span className="text-rose-500 text-sm mt-1">{errors.telefono.message}</span>}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-rose-300 group-focus-within:text-rose-400 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  {...register('email', {
                    required: 'Correo electrónico es requerido',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Correo electrónico no es válido'
                    }
                  })}
                  className="w-full pl-10 pr-3 py-3 border-b border-rose-100 focus:border-rose-300 outline-none text-rose-800 transition-colors bg-transparent disabled:opacity-50"
                  disabled={registerMutation.isPending}
                />
                {errors.email && <span className="text-rose-500 text-sm mt-1">{errors.email.message}</span>}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-rose-300 group-focus-within:text-rose-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  {...register('password', {
                    required: 'Contraseña es requerida',
                    validate: validatePasswordStrength
                  })}
                  className="w-full pl-10 pr-10 py-3 border-b border-rose-100 focus:border-rose-300 outline-none text-rose-800 transition-colors bg-transparent disabled:opacity-50"
                  disabled={registerMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={registerMutation.isPending}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-rose-300" />
                  ) : (
                    <Eye className="w-4 h-4 text-rose-300" />
                  )}
                </button>
                {errors.password && <span className="text-rose-500 text-sm mt-1">{errors.password.message}</span>}
                <div className="mt-1 h-1 w-full bg-rose-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      passwordStrength === 1 ? 'bg-red-300 w-1/4' :
                      passwordStrength === 2 ? 'bg-rose-300 w-1/2' :
                      passwordStrength === 3 ? 'bg-rose-400 w-3/4' :
                      passwordStrength === 4 ? 'bg-rose-500 w-full' : 'w-0'
                    } transition-all duration-300`}
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-rose-300 group-focus-within:text-rose-400 transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  {...register('confirmarPassword', {
                    required: 'Confirmar contraseña es requerida',
                    validate: value => value === watch('password') || 'Las contraseñas no coinciden'
                  })}
                  className="w-full pl-10 pr-3 py-3 border-b border-rose-100 focus:border-rose-300 outline-none text-rose-800 transition-colors bg-transparent disabled:opacity-50"
                  disabled={registerMutation.isPending}
                />
                {errors.confirmarPassword && <span className="text-rose-500 text-sm mt-1">{errors.confirmarPassword.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white py-3.5 rounded-2xl hover:from-rose-500 hover:to-pink-500 transition-all duration-300 group flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  'Registrando...'
                ) : (
                  <>
                    Crear Cuenta
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-rose-600">
                ¿Ya tienes una cuenta? <a href="/login" className="text-rose-700 hover:text-rose-800 hover:underline font-medium transition-colors">Iniciar sesión</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registration;