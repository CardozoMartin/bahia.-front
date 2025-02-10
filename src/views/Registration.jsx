import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Phone } from 'lucide-react';
import { postUserFn } from '../api/apiUser' // Asumiendo que tienes el archivo de API
import { useNavigate } from 'react-router-dom';
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
      // Puedes mostrar un mensaje de éxito
      alert('¡Registro exitoso! Por favor verifica tu correo electrónico.');
      // Redirigir al login
      navigate('/login');
    },
    onError: (error) => {
      // Manejo de errores
      alert(error.message || 'Ocurrió un error durante el registro');
    }
  });

  const onSubmit = (data) => {
    if (data.password !== data.confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    // Eliminar el campo de confirmar contraseña antes de enviar
    const { confirmarPassword, ...registrationData } = data;
    
    // Iniciar la mutación con los datos del formulario
    registerMutation.mutate(registrationData);
  };

  const validatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
    return strength >= 3;
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="bg-gradient-to-br pt-30 from-neutral-50 to-neutral-100 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-100">
        <div className="p-8 space-y-6">
          <header className="text-center">
            <h2 className="text-3xl font-thin tracking-tight text-neutral-800 mb-2">Crear Cuenta</h2>
            <p className="text-neutral-500 text-sm">Únete a nuestra comunidad de joyería exclusiva</p>
          </header>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Nombre"
                {...register('nombre', { required: 'Nombre es requerido' })}
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                disabled={registerMutation.isPending}
              />
              {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Apellido"
                {...register('apellido', { required: 'Apellido es requerido' })}
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                disabled={registerMutation.isPending}
              />
              {errors.apellido && <span className="text-red-500 text-sm">{errors.apellido.message}</span>}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
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
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                disabled={registerMutation.isPending}
              />
              {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
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
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                disabled={registerMutation.isPending}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                {...register('password', { 
                  required: 'Contraseña es requerida', 
                  validate: validatePasswordStrength 
                })}
                className="w-full pl-10 pr-10 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                disabled={registerMutation.isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={registerMutation.isPending}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-neutral-400" />
                ) : (
                  <Eye className="w-4 h-4 text-neutral-400" />
                )}
              </button>
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
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
                placeholder="Confirmar Contraseña"
                {...register('confirmarPassword', { 
                  required: 'Confirmar contraseña es requerida', 
                  validate: value => value === watch('password') || 'Las contraseñas no coinciden'
                })}
                className="w-full pl-10 pr-3 py-3 border-b border-neutral-200 focus:border-neutral-500 outline-none text-neutral-800 transition-colors"
                disabled={registerMutation.isPending}
              />
              {errors.confirmarPassword && <span className="text-red-500 text-sm">{errors.confirmarPassword.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-800 text-white py-3 rounded-lg hover:bg-neutral-900 transition-colors group flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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

          {registerMutation.isError && (
            <div className="text-red-500 text-sm text-center">
              {registerMutation.error.message}
            </div>
          )}

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

export default Registration;