import React, { useState } from 'react';
import {
  User, Mail, Phone, Heart, Package, 
  MapPin, Clock, XCircle, 
  Truck, ChevronDown, Lock, CreditCard, Building
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../api/apiCart';
import { useSession } from '../store/useSession';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const UserProfile = () => {
  const { user } = useSession();
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  const userData = {
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    email: user?.email || '',
    telefono: user?.telefono || ''
  };

  const { data: allOrders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  });

  const orders = allOrders?.filter(order => order?.idUser === user?.id) || [];

  const PaymentInfo = ({ order }) => {
    if (order.modoPago === 'transferencia') {
      return (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Building className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium text-blue-700">Datos para Transferencia</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Banco:</span> Banco Ejemplo</p>
            <p><span className="font-medium">Titular:</span> Empresa S.A.</p>
            <p><span className="font-medium">CBU:</span> 0000000000000000000000</p>
            <p><span className="font-medium">CUIT:</span> 00-00000000-0</p>
            <p className="text-blue-600 mt-2">
              Una vez realizada la transferencia, envía el comprobante a nuestro WhatsApp
            </p>
          </div>
        </div>
      );
    } else if (order.modoPago === 'mercado_pago' && order.paymentUrl) {
      return (
        <div className="mt-4">
          <a 
            href={order.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <CreditCard className="w-5 h-5" />
            <span>Pagar con Mercado Pago</span>
          </a>
        </div>
      );
    }
    return null;
  };

  // El resto del componente permanece igual...
  
  const OrderTimeline = ({ estadoPedido }) => {
    if (!['armando', 'en camino', 'entregado'].includes(estadoPedido)) return null;
    
    const steps = [
      { text: 'Preparando', icon: <Package className="w-4 h-4" /> },
      { text: 'En Camino', icon: <Truck className="w-4 h-4" /> },
      { text: 'Entregado', icon: <Heart className="w-4 h-4" /> }
    ];
    
    const getCurrentStepIndex = (status) => {
      const statusMap = { 'armando': 0, 'en camino': 1, 'entregado': 2 };
      return statusMap[status] ?? -1;
    };
    
    const currentStepIndex = getCurrentStepIndex(estadoPedido);
    
    return (
      <div className="flex items-center w-full my-4 bg-pink-50 rounded-xl p-4">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 relative">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === currentStepIndex
                  ? 'bg-rose-400 text-white scale-110'
                  : index < currentStepIndex
                    ? 'bg-rose-300 text-white'
                    : 'bg-pink-200'
              }`}>
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-1 ${
                  index < currentStepIndex ? 'bg-rose-300' : 'bg-pink-200'
                }`} />
              )}
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-600">
              {step.text}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const Order = ({ order }) => {
    if (!order || !order.productos) return null;
  
    const total = order.productos.reduce((sum, prod) => {
      if (!prod?.productoId?.precio || !prod.cantidad) return sum;
      return sum + (prod.productoId.precio * prod.cantidad);
    }, 0);
  
    const formatDate = (dateString) => {
      try {
        return new Date(dateString).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (e) {
        return 'Fecha no disponible';
      }
    };
  
    const statusColors = {
      'pendiente': 'bg-amber-100 text-amber-700',
      'rechazado': 'bg-rose-100 text-rose-700',
      'aceptado': 'bg-emerald-100 text-emerald-700'
    };
  
    const PaymentStatus = () => {
      // Si el pago está confirmado
      if (order.modoPago === 'aceptado' || (order.estado === 'aceptado' && order.estadoPago === 'pagado')) {
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm">Pedido Pagado</span>
          </div>
        );
      }
      
      // Si el pago está pendiente
      if (order.estadoPago === 'pendiente') {
        const paymentMethod = order.modoPago === 'transferencia' ? 'Transferencia' : 'Mercado Pago';
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm">Pago Pendiente - {paymentMethod}</span>
          </div>
        );
      }
      
      return null;
    };
  
    return (
      <div className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-100">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.estado] || statusColors.pendiente}`}>
              {order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}
            </span>
            <span className="text-sm text-neutral-500">{formatDate(order.createdAt)}</span>
            <PaymentStatus />
          </div>
          <button
            onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
            className="text-neutral-500 hover:text-rose-400"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedOrder === order._id ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {expandedOrder === order._id && (
          <div className="p-4 border-t border-neutral-100">
            {order.estado === 'aceptado' && <OrderTimeline estadoPedido={order.estadoPedido} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  Dirección de Envío
                </h3>
                <p className="text-sm text-neutral-600">{order.direccion}</p>
                <p className="text-sm text-neutral-600">CP: {order.codigoPostal}</p>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-400" />
                  Información de Contacto
                </h3>
                <p className="text-sm text-neutral-600">{order.email}</p>
                <p className="text-sm text-neutral-600">{order.telefono}</p>
              </div>
            </div>

            {order.descripcion && (
              <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Notas del Pedido</h3>
                <p className="text-sm text-neutral-600">{order.descripcion}</p>
              </div>
            )}
            
            <div className="mt-8 space-y-4">
              {order.productos.map((product) => {
                if (!product?.productoId) return null;
                return (
                  <div key={product._id || Math.random()} className="flex justify-between items-center bg-neutral-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.productoId.imagen || '/placeholder-image.jpg'}
                        alt={product.productoId.nombre}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{product.productoId.nombre}</p>
                        <p className="text-sm text-neutral-500">
                          Cantidad: {product.cantidad} × ${product.productoId.precio}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium text-rose-500">
                      ${(product.productoId.precio * product.cantidad).toFixed(2)}
                    </span>
                  </div>
                );
              })}
              
              <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                <span className="font-medium">Total</span>
                <span className="font-medium text-rose-500">${total.toFixed(2)}</span>
              </div>

              {order.estadoPago === 'pendiente' && <PaymentInfo order={order} />}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-medium mb-6">Información Personal</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-xl">
                <User className="w-5 h-5 text-rose-400" />
                <div>
                  <p className="text-sm text-neutral-500">Nombre</p>
                  <p className="font-medium">{`${userData.nombre} ${userData.apellido}`}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-xl">
                <Mail className="w-5 h-5 text-rose-400" />
                <div>
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-xl">
                <Phone className="w-5 h-5 text-rose-400" />
                <div>
                  <p className="text-sm text-neutral-500">Teléfono</p>
                  <p className="font-medium">{userData.telefono}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-xl">
                <Lock className="w-5 h-5 text-rose-400" />
                <div>
                  <p className="text-sm text-neutral-500">Contraseña</p>
                  <button className="text-rose-400 hover:text-rose-500 text-sm">
                    Cambiar contraseña
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-medium mb-6">Mis Pedidos</h2>
            
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Clock className="w-8 h-8 animate-pulse text-rose-300" />
              </div>
            )}

            {error && (
              <div className="bg-rose-50 rounded-xl p-6 text-center">
                <XCircle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                <p className="text-rose-700">No pudimos cargar tus pedidos</p>
              </div>
            )}

            {!isLoading && !error && orders.length === 0 && (
              <div className="text-center py-12 bg-neutral-50 rounded-xl">
                <Package className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-600">No tienes pedidos realizados</p>
              </div>
            )}

            {!isLoading && !error && orders.length > 0 && (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Order key={order._id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;