import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import { useForm } from 'react-hook-form';
import { postLoginFn } from '../api/apiUser';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../store/useSession';


const Login = () => {
  const { login } = useSession();
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const { mutate: postLogin } = useMutation({
    mutationFn: postLoginFn,
    onSuccess: (data) => {
      // Mensajes de exito
      Swal.close();
      toast.success('Bienvenido');
      console.log(data)
      // Loguear al usuario
      login(data);
      if (data.rol) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      // Navegar a inicio (pero ya estando logueados)
  
    },
    onError: (err) => {
      Swal.close();
      toast.error(err.message);
    },
  });
  // Manejo del envío del formulario
  const onSubmit = (data) => {
    console.log(data)
    postLogin(data);
  };

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-100">
          <div className="p-8 space-y-6">
            <header className="text-center">
              <h2 className="text-3xl font-thin tracking-tight text-neutral-800 mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-neutral-500 text-sm">
                Accede a tu cuenta de joyería exclusiva
              </p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Input de Correo */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  className={`w-full pl-10 pr-3 py-3 border-b ${errors.email ? 'border-red-500' : 'border-neutral-200'
                    } focus:border-neutral-500 outline-none text-neutral-800 transition-colors`}
                  {...register('email', {
                    required: 'El correo es obligatorio',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Formato de correo inválido',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Input de Contraseña */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  className={`w-full pl-10 pr-10 py-3 border-b ${errors.password ? 'border-red-500' : 'border-neutral-200'
                    } focus:border-neutral-500 outline-none text-neutral-800 transition-colors`}
                  {...register('password', {
                    required: 'La contraseña es obligatoria',
                    minLength: {
                      value: 6,
                      message: 'Debe tener al menos 6 caracteres',
                    },
                  })}
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
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Olvidé mi contraseña */}
              <div className="text-right mb-4">
                <a
                  href="/recuperar-contraseña"
                  className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón de Enviar */}
              <button
                type="submit"
                className="w-full bg-neutral-800 text-white py-3 rounded-lg hover:bg-neutral-900 transition-colors group flex items-center justify-center"
              >
                Iniciar Sesión
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Enlace para registro */}
            <div className="text-center">
              <p className="text-xs text-neutral-500">
                ¿No tienes una cuenta?{' '}
                <Link
                  to={"/register"}
                  className="text-neutral-800 hover:underline font-medium"
                >
                  Regístrates
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
