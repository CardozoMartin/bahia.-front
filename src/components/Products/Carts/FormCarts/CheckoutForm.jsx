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
  ShoppingBag
} from 'lucide-react';
import { postOrder } from '../../../../api/apiCart';
import { useSession } from '../../../../store/useSession';
import { useCartStore } from '../../../../store/cartStore';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ cart, onClose }) => {
  const { user } = useSession();
  const navigate = useNavigate()

  // Verificar si user es null o undefined antes de acceder a sus propiedades
  const nombreCompleto = user ? `${user.nombre || ''} ${user.apellido || ''}`.trim() : '';
  const email = user?.email || '';
  const telefono = user?.telefono || '';
  const ID = user?.idUser || '';

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
      personalInfo: {
        nombre: nombreCompleto, // Usar el valor seguro
        email: email, // Usar el valor seguro
        telefono: telefono, // Usar el valor seguro
      },
      shippingInfo: {
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        notasAdicionales: ''
      }
    }
  });

  const submitOrderMutation = useMutation({
    mutationFn: postOrder,
    onSuccess: (data) => {
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    },
    onError: (error) => {
      alert('Error al crear el pedido');
      console.error(error);
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const watchPersonalInfo = watch('personalInfo');
  const watchShippingInfo = watch('shippingInfo');

  const inputClasses = "mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white hover:border-indigo-300";
  const labelClasses = "block text-sm font-medium text-gray-700 flex items-center";

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <User className="mr-2 text-indigo-600" size={20} />
        Información Personal
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="nombre" className={labelClasses}>Nombre Completo</label>
          <input
            {...register("personalInfo.nombre", { 
              required: "El nombre es requerido",
              minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
            })}
            className={inputClasses}
            placeholder="Ingresa tu nombre completo"
          />
          {errors.personalInfo?.nombre && (
            <p className="mt-1 text-sm text-red-600">{errors.personalInfo.nombre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input
            {...register("personalInfo.email", {
              required: "El email es requerido",
              pattern: { 
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
            type="email"
            className={inputClasses}
            placeholder="tu@email.com"
          />
          {errors.personalInfo?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.personalInfo.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className={labelClasses}>Teléfono</label>
          <input
            {...register("personalInfo.telefono", {
              required: "El teléfono es requerido",
              pattern: { 
                value: /^[0-9]{10}$/,
                message: "Debe ser un número de 10 dígitos"
              }
            })}
            className={inputClasses}
            placeholder="1234567890"
          />
          {errors.personalInfo?.telefono && (
            <p className="mt-1 text-sm text-red-600">{errors.personalInfo.telefono.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={nextStep}
          className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Siguiente
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );

  const renderShippingInfoStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Truck className="mr-2 text-indigo-600" size={20} />
        Información de Envío
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="direccion" className={labelClasses}>Dirección</label>
          <input
            {...register("shippingInfo.direccion", { 
              required: "La dirección es requerida"
            })}
            className={inputClasses}
            placeholder="Ingresa tu dirección completa"
          />
          {errors.shippingInfo?.direccion && (
            <p className="mt-1 text-sm text-red-600">{errors.shippingInfo.direccion.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="ciudad" className={labelClasses}>Ciudad</label>
          <input
            {...register("shippingInfo.ciudad", { 
              required: "La ciudad es requerida"
            })}
            className={inputClasses}
            placeholder="Ciudad"
          />
          {errors.shippingInfo?.ciudad && (
            <p className="mt-1 text-sm text-red-600">{errors.shippingInfo.ciudad.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="codigoPostal" className={labelClasses}>Código Postal</label>
          <input
            {...register("shippingInfo.codigoPostal", {
              required: "El código postal es requerido",
              pattern: { 
                value: /^[0-9]{5}$/,
                message: "Debe ser un código postal válido de 5 dígitos"
              }
            })}
            className={inputClasses}
            placeholder="12345"
          />
          {errors.shippingInfo?.codigoPostal && (
            <p className="mt-1 text-sm text-red-600">{errors.shippingInfo.codigoPostal.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="notasAdicionales" className={labelClasses}>Notas Adicionales (opcional)</label>
          <textarea
            {...register("shippingInfo.notasAdicionales")}
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
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Anterior
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Siguiente
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <CheckCircle2 className="mr-2 text-indigo-600" size={20} />
        Revisar y Confirmar
      </h3>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Información Personal</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Nombre:</p>
              <p className="font-medium">{watchPersonalInfo.nombre}</p>
            </div>
            <div>
              <p className="text-gray-500">Teléfono:</p>
              <p className="font-medium">{watchPersonalInfo.telefono}</p>
            </div>
          </div>
            <div>
              <p className="text-gray-500">Email:</p>
              <p className="font-medium">{watchPersonalInfo.email}</p>
            </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Información de Envío</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Dirección:</p>
              <p className="font-medium">{watchShippingInfo.direccion}</p>
            </div>
            <div>
              <p className="text-gray-500">Ciudad:</p>
              <p className="font-medium">{watchShippingInfo.ciudad}</p>
            </div>
            <div>
              <p className="text-gray-500">Código Postal:</p>
              <p className="font-medium">{watchShippingInfo.codigoPostal}</p>
            </div>
          </div>
          {watchShippingInfo.notasAdicionales && (
            <div className="mt-2">
              <p className="text-gray-500">Notas Adicionales:</p>
              <p className="font-medium">{watchShippingInfo.notasAdicionales}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Anterior
        </button>
        <button
          type="button"
          onClick={handleSubmit(onFinalSubmit)}
          className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          disabled={submitOrderMutation.isLoading}
        >
          {submitOrderMutation.isLoading ? (
            <span>Procesando...</span>
          ) : (
            <>
              Confirmar Pedido
              <CheckCircle2 className="ml-2" size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="relative pt-4">
      <div className="flex justify-between items-center mb-6">
        {[...Array(totalSteps)].map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive ? 'bg-indigo-600 text-white transform scale-110' :
                  isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isCompleted ? <CheckCircle2 size={16} /> : step}
              </div>
              <div className="text-xs mt-2 font-medium text-gray-600">
                {step === 1 ? "Datos" : step === 2 ? "Envío" : "Revisar"}
              </div>
              {step < totalSteps && (
                <div
                  className={`absolute top-7 left-0 h-0.5 transition-all duration-500 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                  style={{
                    width: `${(100 / (totalSteps - 1))}%`,
                    transform: `translateX(${(step - 1) * 100}%)`
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const CartSummary = () => {
    const total = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    
    return (
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <ShoppingBag className="mr-2 text-indigo-600" size={20} />
            Resumen del Carrito
          </h3>
          <span className="text-sm text-gray-600">{cart.length} productos</span>
        </div>
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.nombre}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold text-indigo-600">
                ${(item.precio * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Total</span>
              <span className="text-xl font-bold text-indigo-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const nextStep = async () => {
    let isValid = false;

    switch(formStep) {
      case 1:
        isValid = await trigger('personalInfo');
        if (isValid) setFormStep(2);
        break;
      case 2:
        isValid = await trigger('shippingInfo');
        if (isValid) setFormStep(3);
        break;
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const clearCart = useCartStore((state) => state.clearCart);
  const onFinalSubmit = async (data) => {
    const id = user?.id || ""; // Asegúrate de que `id` sea un string vacío si no existe
  
    const pedidoData = {
      ...data.personalInfo,
      ...data.shippingInfo,
      productos: cart.map(item => ({
        productoId: item._id,
        cantidad: item.quantity,
        nombre: item.nombre,
        precio: item.precio
      })),
      total: cart.reduce((total, item) => total + (item.precio * item.quantity), 0),
      estado: 'pendiente',
      estadoPedido: 'armando',
      idUser: id, // Aquí se incluye el `id` del usuario
    };
  
    try {
      await submitOrderMutation.mutateAsync(pedidoData); // Enviar el pedido
      clearCart(); // Limpiar el carrito después de enviar el pedido
      setShowSuccess(true); // Mostrar mensaje de éxito
      setTimeout(() => {
        onClose();
        navigate("/") // Cerrar el modal después de 2 segundos
      }, 1000);
    } catch (error) {
      alert('Error al crear el pedido');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 overflow-y-auto backdrop-blur-sm">
  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto p-6 border border-gray-200">
    {showSuccess ? (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">¡Pedido Confirmado!</h2>
        <p className="text-gray-600">Gracias por tu compra. Recibirás un email con los detalles.</p>
      </div>
    ) : (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center">
            Checkout
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-indigo-600 transition-colors rounded-full p-1"
          >
            <XCircle size={28} />
          </button>
        </div>

        <StepIndicator currentStep={formStep} totalSteps={3} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="order-2 md:order-1">
            {formStep === 1 && renderPersonalInfoStep()}
            {formStep === 2 && renderShippingInfoStep()}
            {formStep === 3 && renderReviewStep()}
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