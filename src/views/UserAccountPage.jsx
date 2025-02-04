import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Package, MapPin, Phone, Mail,
  Clock, CheckCircle, XCircle, Truck
} from 'lucide-react';
import { getOrders } from '../api/apiCart';

const UserAccountPage = () => {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  });

  const getStatusStyles = (status) => {
    const statusMap = {
      'pendiente': {
        color: 'bg-yellow-500',
        icon: <Clock className="w-5 h-5" />,
        text: 'Pendiente'
      },
      'rechazado': {
        color: 'bg-red-500',
        icon: <XCircle className="w-5 h-5" />,
        text: 'Rechazado'
      },
      'aceptado': {
        color: 'bg-green-500',
        icon: <CheckCircle className="w-5 h-5" />,
        text: 'Aceptado'
      }
    };
    return statusMap[status] || statusMap['pendiente'];
  };

  const OrderTimeline = ({ estadoPedido }) => {
    if (!['armando', 'en camino', 'entregado'].includes(estadoPedido)) {
        return null; // Solo oculta si no está en ninguno de estos estados
      
      
    }
  
    const steps = [
      { text: 'Armando', icon: <Package className="w-4 h-4" /> },
      { text: 'En Camino', icon: <Truck className="w-4 h-4" /> },
      { text: 'Entregado', icon: <CheckCircle className="w-4 h-4" /> }
    ];
  
    const getCurrentStepIndex = (currentStatus) => {
      switch (currentStatus) {
        case 'armando': return 0;
        case 'en camino': return 1;
        case 'entregado': return 2;
        default: return -1;
      }
    };
  
    const currentStepIndex = getCurrentStepIndex(estadoPedido);
  
    return (
      <div className="flex items-center w-full my-6">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 relative">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                index === currentStepIndex
                  ? 'bg-blue-600 text-white'
                  : index < currentStepIndex
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
              }`}>
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 transition-colors duration-300 ${
                  index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
            <span className="absolute -bottom-6 left-0 text-xs w-20 text-center">
              {step.text}
            </span>
          </div>
        ))}
      </div>
    );
  };
  

  const Order = ({ order }) => {
    const estadoPedidoStatus = getStatusStyles(order.estado);
    const total = order.productos.reduce((sum, prod) => 
      sum + (prod.productoId.precio * prod.cantidad), 0
    );

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
        <div className={`${estadoPedidoStatus.color} p-4 text-white flex items-center justify-between`}>
          <div className="flex items-center space-x-2">
            {estadoPedidoStatus.icon}
            <span className="font-semibold">{estadoPedidoStatus.text}</span>
          </div>
          <div className="text-sm flex flex-col items-end">
            <span>Pedido #{order._id?.slice(-6)}</span>
            <span className="text-xs">{formatDate(order.createdAt)}</span>
          </div>
        </div>

        <div className="p-6">
          {order.estado === 'aceptado' && <OrderTimeline estadoPedido={order.estadoPedido} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg mb-4">Datos de entrega</h3>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <span>{order.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>{order.telefono}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>{order.direccion}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Productos</h3>
              <div className="space-y-3">
                {order.productos.map((product) => (
                  <div key={product._id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <div className="flex items-start space-x-3">
                      <img 
                        src={product.productoId.imagen} 
                        alt={product.productoId.nombre}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.productoId.nombre}</p>
                        <p className="text-sm text-gray-600">Color: {product.productoId.color}</p>
                        <p className="text-sm text-gray-600">Cantidad: {product.cantidad}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">${product.productoId.precio * product.cantidad}</span>
                      <p className="text-sm text-gray-600">${product.productoId.precio} c/u</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {isLoading && <div className="text-center py-4">Cargando pedidos...</div>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error al cargar pedidos
        </div>
      )}
      {orders && orders.map(order => (
        <Order key={order._id} order={order} />
      ))}
    </div>
  );
};

export default UserAccountPage;
