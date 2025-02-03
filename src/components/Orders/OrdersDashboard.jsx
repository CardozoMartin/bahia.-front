import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Clock, Truck, Package, Home, CheckCircle, XCircle } from 'lucide-react';
import { getOrders, updateOrderDeliveryStatus, updateOrderStatus } from '../../api/apiCart';

const OrdersDashboard = () => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, estado }) => updateOrderStatus(id, estado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const updateDeliveryStatusMutation = useMutation({
    mutationFn: ({ id, estadoPedido }) => updateOrderDeliveryStatus(id, estadoPedido),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    updateStatusMutation.mutate({ id: orderId, estado: newStatus });
  };

  const handleDeliveryStatusUpdate = (orderId, newDeliveryStatus) => {
    updateDeliveryStatusMutation.mutate({ id: orderId, estadoPedido: newDeliveryStatus });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aceptado': return 'text-green-600';
      case 'rechazado': return 'text-red-600';
      case 'pendiente': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getDeliveryStatusColor = (status) => {
    switch (status) {
      case 'armando': return 'text-blue-600';
      case 'en camino': return 'text-purple-600';
      case 'entregado': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) return <div className="p-6">Cargando pedidos...</div>;
  if (error) return <div className="p-6 text-red-600">Error al cargar los pedidos</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gestión de Pedidos</h2>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Pedido #{order._id}</h3>
                <p className="text-gray-600">{order.email}</p>
                <p className="text-gray-600">{order.telefono}</p>
                <p className="text-gray-600">{order.direccion}</p>
              </div>
              <div className="flex gap-2">
                {order.estado === 'pendiente' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(order._id, 'aceptado')}
                      disabled={updateStatusMutation.isPending}
                      className="bg-green-100 text-green-600 px-4 py-2 rounded-md hover:bg-green-200 flex items-center gap-2 disabled:opacity-50"
                    >
                      <CheckCircle size={16} />
                      Aceptar
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order._id, 'rechazado')}
                      disabled={updateStatusMutation.isPending}
                      className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 flex items-center gap-2 disabled:opacity-50"
                    >
                      <XCircle size={16} />
                      Rechazar
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Productos:</h4>
              <ul className="space-y-2">
                {order.productos.map((item, index) => {
                  // Asegurarnos de que productoId es un objeto con la información del producto
                  const producto = typeof item.productoId === 'object' ? item.productoId : {};
                  
                  return (
                    <li key={producto._id || index} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{producto.nombre || 'Producto sin nombre'}</span>
                        <span className="text-gray-600 ml-2">({producto._id || 'ID no disponible'})</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600">Cantidad: {item.cantidad}</span>
                        {producto.precio && (
                          <span className="font-medium">
                            ${(producto.precio * item.cantidad).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${getStatusColor(order.estado)}`}>
                  Estado: {order.estado}
                </span>
              </div>
              
              {order.estado === 'aceptado' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeliveryStatusUpdate(order._id, 'armando')}
                    disabled={updateDeliveryStatusMutation.isPending}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 
                      ${order.estadoPedido === 'armando' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} disabled:opacity-50`}
                  >
                    <Package size={16} />
                    Preparando
                  </button>
                  <button
                    onClick={() => handleDeliveryStatusUpdate(order._id, 'en camino')}
                    disabled={updateDeliveryStatusMutation.isPending}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 
                      ${order.estadoPedido === 'en camino' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'} disabled:opacity-50`}
                  >
                    <Truck size={16} />
                    En Camino
                  </button>
                  <button
                    onClick={() => handleDeliveryStatusUpdate(order._id, 'entregado')}
                    disabled={updateDeliveryStatusMutation.isPending}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 
                      ${order.estadoPedido === 'entregado' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'} disabled:opacity-50`}
                  >
                    <Home size={16} />
                    Entregado
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersDashboard;