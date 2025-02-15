import React, { useState } from 'react';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { postLoginFn } from '../api/apiUser';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { useSession } from '../store/useSession';

const LoginView = () => {
    const { login } = useSession();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { mutate: postLogin } = useMutation({
        mutationFn: postLoginFn,
        onSuccess: (userData) => {
            Swal.close();
            toast.success('¡Bienvenida de nuevo!');
            login(userData);
            
            if (userData.isAdmin === true || userData.isAdmin === "true") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
            
        },
        onError: (err) => {
            Swal.close();
            toast.error(err.message);
        },
    });

    const onSubmit = (data) => {
        postLogin(data);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center py-16 px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-pink-100">
                        <div className="p-8 space-y-8">
                            <header className="text-center space-y-3">
                                <div className="flex justify-center">
                                    <div className="bg-pink-50 p-3 rounded-2xl">
                                        <Sparkles className="w-6 h-6 text-rose-400" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-serif text-neutral-800">
                                    Bienvenida
                                </h2>
                                <p className="text-neutral-500 font-serif">
                                    Accede a tu colección de joyas exclusivas
                                </p>
                            </header>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    {/* Email Input */}
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="w-4 h-4 text-rose-300 group-focus-within:text-rose-400 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Correo Electrónico"
                                            className={`w-full pl-11 pr-4 py-3 bg-pink-50 border ${
                                                errors.email ? 'border-red-300' : 'border-pink-100'
                                            } rounded-xl focus:ring-2 focus:ring-rose-200 focus:border-rose-300 outline-none text-neutral-800 transition-all font-serif placeholder:text-neutral-400`}
                                            {...register('email', {
                                                required: 'El correo es obligatorio',
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: 'Formato de correo inválido',
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="text-rose-400 text-xs mt-1 font-serif">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="w-4 h-4 text-rose-300 group-focus-within:text-rose-400 transition-colors" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Contraseña"
                                            className={`w-full pl-11 pr-11 py-3 bg-pink-50 border ${
                                                errors.password ? 'border-red-300' : 'border-pink-100'
                                            } rounded-xl focus:ring-2 focus:ring-rose-200 focus:border-rose-300 outline-none text-neutral-800 transition-all font-serif placeholder:text-neutral-400`}
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
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4 text-rose-300 hover:text-rose-400 transition-colors" />
                                            ) : (
                                                <Eye className="w-4 h-4 text-rose-300 hover:text-rose-400 transition-colors" />
                                            )}
                                        </button>
                                        {errors.password && (
                                            <p className="text-rose-400 text-xs mt-1 font-serif">{errors.password.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Forgot Password Link */}
                                <div className="text-right">
                                    <Link
                                        to="/recuperar-contraseña"
                                        className="text-sm text-neutral-500 hover:text-rose-400 transition-colors font-serif"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-rose-400 text-white py-3 rounded-xl hover:bg-rose-500 transition-all group flex items-center justify-center font-serif"
                                >
                                    Iniciar Sesión
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>

                            {/* Register Link */}
                            <div className="text-center">
                                <p className="text-sm text-neutral-500 font-serif">
                                    ¿Primera vez en nuestra boutique?{' '}
                                    <Link
                                        to="/register"
                                        className="text-rose-400 hover:text-rose-500 transition-colors font-medium"
                                    >
                                        Crear cuenta
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Text */}
                    <p className="text-center text-xs text-neutral-500 mt-6 font-serif">
                        Al iniciar sesión, accederás a tu colección personal de joyas y podrás realizar un seguimiento de tus pedidos
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default LoginView;