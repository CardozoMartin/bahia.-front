import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  Package,
  MapPin,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  XCircle,
  CreditCard,
  Truck,
  ShoppingBag,
  Wallet
} from 'lucide-react';
import { postOrder } from '../../../../api/apiCart';
import { useSession } from '../../../../store/useSession';
import { useCartStore } from '../../../../store/cartStore';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ cart, onClose }) => {
  const { user } = useSession();
  console.log(user)
  const navigate = useNavigate();
  const nombreCompleto = user ? `${user.nombre || ''} ${user.apellido || ''}`.trim() : '';
  const email = user?.email || '';
  const telefono = user?.telefono || '';
  const ID = user?.id || '';

  const [formStep, setFormStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: email,
      telefono: telefono,
      direccion: '',
      codigoPostal: '',
      descripcion: '',
      modoPago: '',
      idUser:ID,
      productos: cart.map(item => ({
        productoId: item._id,
        cantidad: item.quantity
      }))
    }
  });

  // Style classes remain the same...
  const inputClasses = "mt-1 block w-full rounded-md border border-gray-200 px-4 py-3 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300 bg-white hover:border-amber-300 text-gray-800";
  const labelClasses = "block text-sm font-medium text-gray-700 flex items-center";
  const buttonClasses = "flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-all duration-300 font-medium";
  const secondaryButtonClasses = "flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-300 text-gray-700";

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-serif text-gray-800 flex items-center">
        <User className="mr-2 text-amber-600" size={20} />
        Información de Contacto
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
            className={inputClasses}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className={labelClasses}>Teléfono</label>
          <input
            {...register("telefono", {
              required: "El teléfono es requerido",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Debe ser un número de 10 dígitos"
              }
            })}
            className={inputClasses}
            placeholder="1234567890"
          />
          {errors.telefono && (
            <p className="mt-1 text-sm text-rose-600">{errors.telefono.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => nextStep()}
          className={buttonClasses}
        >
          Siguiente
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );

  const renderShippingInfoStep = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-serif text-gray-800 flex items-center">
        <Truck className="mr-2 text-amber-600" size={20} />
        Información de Envío
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="direccion" className={labelClasses}>Dirección</label>
          <input
            {...register("direccion", {
              required: "La dirección es requerida"
            })}
            className={inputClasses}
            placeholder="Ingresa tu dirección completa"
          />
          {errors.direccion && (
            <p className="mt-1 text-sm text-rose-600">{errors.direccion.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="codigoPostal" className={labelClasses}>Código Postal</label>
          <input
            {...register("codigoPostal", {
              required: "El código postal es requerido",
              pattern: {
                value: /^[0-9]{5}$/,
                message: "Debe ser un código postal válido de 5 dígitos"
              }
            })}
            className={inputClasses}
            placeholder="12345"
          />
          {errors.codigoPostal && (
            <p className="mt-1 text-sm text-rose-600">{errors.codigoPostal.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="descripcion" className={labelClasses}>Notas Adicionales</label>
          <textarea
            {...register("descripcion")}
            className={inputClasses}
            rows={3}
            placeholder="Instrucciones especiales de entrega..."
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className={secondaryButtonClasses}
        >
          <ArrowLeft className="mr-2" size={20} />
          Anterior
        </button>
        <button
          type="button"
          onClick={() => nextStep()}
          className={buttonClasses}
        >
          Siguiente
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-serif text-gray-800 flex items-center">
        <Wallet className="mr-2 text-amber-600" size={20} />
        Método de Pago
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <label className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
            watch('modoPago') === 'transferencia' 
              ? 'border-amber-500 bg-amber-50' 
              : 'border-gray-200 hover:border-amber-200'
          }`}>
            <input
              type="radio"
              {...register("modoPago", {
                required: "Por favor selecciona un método de pago"
              })}
              value="transferencia"
              className="sr-only"
            />
            <div className="flex items-center">
              <div className={`w-5 h-5 border rounded-full mr-3 flex items-center justify-center ${
                watch('modoPago') === 'transferencia' 
                  ? 'border-amber-500' 
                  : 'border-gray-300'
              }`}>
                {watch('modoPago') === 'transferencia' && (
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Transferencia Bancaria</h4>
                <p className="text-sm text-gray-500">Realiza una transferencia directa a nuestra cuenta bancaria</p>
              </div>
            </div>
          </label>

          <label className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
            watch('modoPago') === 'mercado_pago' 
              ? 'border-amber-500 bg-amber-50' 
              : 'border-gray-200 hover:border-amber-200'
          }`}>
            <input
              type="radio"
              {...register("modoPago", {
                required: "Por favor selecciona un método de pago"
              })}
              value="mercado_pago"
              className="sr-only"
            />
            <div className="flex items-center">
              <div className={`w-5 h-5 border rounded-full mr-3 flex items-center justify-center ${
                watch('modoPago') === 'mercado_pago' 
                  ? 'border-amber-500' 
                  : 'border-gray-300'
              }`}>
                {watch('modoPago') === 'mercado_pago' && (
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">MercadoPago</h4>
                <p className="text-sm text-gray-500">Paga con tarjeta de crédito/débito a través de MercadoPago</p>
              </div>
            </div>
          </label>
        </div>

        {errors.modoPago && (
          <p className="mt-1 text-sm text-rose-600">{errors.modoPago.message}</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className={secondaryButtonClasses}
        >
          <ArrowLeft className="mr-2" size={20} />
          Anterior
        </button>
        <button
          type="submit"
          onClick={handleSubmit(onFinalSubmit)}
          className={buttonClasses}
        >
          Confirmar Pedido
          <CheckCircle2 className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );

  const clearCart = useCartStore((state) => state.clearCart);
  
  const onFinalSubmit = async (data) => {
    const orderData = {
      ...data,
      estado: 'pendiente',
      estadoPedido: 'armando',
      estadoPago: 'pendiente',
      idUser: ID,
      productos: cart.map(item => ({
        productoId: item._id,
        cantidad: item.quantity
      }))
    };

    try {
      await submitOrderMutation.mutateAsync(orderData);
      clearCart();
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        navigate("/");
      }, 2000);
    } catch (error) {
      alert('Error al crear el pedido');
      console.error(error);
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const submitOrderMutation = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      setShowSuccess(true);
    },
    onError: (error) => {
      console.error(error);
      alert('Error al crear el pedido');
    }
  });

  const nextStep = async () => {
    const fieldsToValidate = {
      1: ['email', 'telefono'],
      2: ['direccion', 'codigoPostal'],
      3: ['modoPago']
    };

    const currentFields = fieldsToValidate[formStep];
    const isValid = await trigger(currentFields);

    if (isValid) {
      setFormStep(formStep + 1);
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  // CartSummary component remains the same...
  const CartSummary = () => {
    const total = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

    return (
      <div className="bg-amber-50 rounded-lg p-6 mt-4 border border-amber-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-gray-800 flex items-center">
            <ShoppingBag className="mr-2 text-amber-600" size={20} />
            Tu Selección
          </h3>
          <span className="text-sm text-gray-600">{cart.length} piezas</span>
        </div>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center py-3 border-b border-amber-200 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-full object-cover rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <p className="font-serif text-gray-800">{item.nombre}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                </div>
              </div>
              <span className="font-medium text-amber-800">
                ${(item.precio * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="pt-4 border-t border-amber-200">
            <div className="flex justify-between items-center">
              <span className="font-serif text-gray-800">Total</span>
              <span className="text-xl font-bold text-amber-800">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto p-8 border border-amber-100">
      {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-serif text-gray-800">¡Gracias por tu Compra!</h2>
            <p className="text-gray-600">Recibirás un email con los detalles de tu pedido.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif text-amber-800 flex items-center">
                Finalizar Compra
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-amber-600 transition-colors rounded-full p-1"
              >
                <XCircle size={28} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="order-2 md:order-1">
                {formStep === 1 && renderPersonalInfoStep()}
                {formStep === 2 && renderShippingInfoStep()}
                {formStep === 3 && renderPaymentStep()}
              </div>

              <div className="order-1 md:order-2">
                <CartSummary />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;