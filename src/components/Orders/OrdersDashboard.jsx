import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Clock, Package, Search } from 'lucide-react';
import { getOrders, updateOrderDeliveryStatus, updateOrderStatus } from '../../api/apiCart';

const OrderBadge = ({ status, type = 'status', onClick, isActive, isDisabled }) => {
  const badgeStyles = {
    status: {
      pendiente: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      aceptado: { bg: 'bg-green-100', text: 'text-green-800' },
      rechazado: { bg: 'bg-red-100', text: 'text-red-800' }
    },
    delivery: {
      armando: { bg: 'bg-blue-100', text: 'text-blue-800' },
      'en camino': { bg: 'bg-purple-100', text: 'text-purple-800' },
      entregado: { bg: 'bg-green-100', text: 'text-green-800' }
    }
  };

  const styles = badgeStyles[type][status] || { bg: 'bg-gray-100', text: 'text-gray-800' };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 
        ${styles.bg} ${styles.text} 
        ${isActive ? 'opacity-100 shadow-md' : 'hover:opacity-80'}
        ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {status}
    </button>
  );
};

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

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin">
        <Clock className="text-blue-500" size={48} />
      </div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-600">
      <div className="text-center">
        <Search size={48} className="mx-auto mb-4" />
        <p>Error al cargar los pedidos</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-4">
          <Package className="text-blue-500" />
          Gestión de Pedidos
        </h2>
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order?._id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Pedido #{order?._id || 'Sin ID'}
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>{order?.email || 'Email no disponible'}</p>
                    <p>{order?.telefono || 'Teléfono no disponible'}</p>
                    <p>{order?.direccion || 'Dirección no disponible'}</p>
                  </div>
                </div>
                <div className="flex justify-end items-start gap-2">
                  {order?.estado === 'pendiente' && (
                    <>
                      <OrderBadge 
                        status="Aceptar" 
                        type="status" 
                        onClick={() => handleStatusUpdate(order._id, 'aceptado')}
                        isDisabled={updateStatusMutation.isPending}
                      />
                      <OrderBadge 
                        status="Rechazar" 
                        type="status" 
                        onClick={() => handleStatusUpdate(order._id, 'rechazado')}
                        isDisabled={updateStatusMutation.isPending}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="font-semibold mb-3 text-gray-700">Productos:</h4>
                <div className="space-y-2">
                  {order?.productos?.map((item, index) => {
                    // Safely access producto data with null checks
                    const producto = item?.productoId && typeof item.productoId === 'object' 
                      ? item.productoId 
                      : {};
                    
                    return (
                      <div 
                        key={`${order?._id}-${index}`}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                      >
                        <div>
                          <span className="font-medium text-gray-800">
                            {producto?.nombre || 'Producto sin nombre'}
                          </span>
                          <span className="text-gray-500 ml-2 text-sm">
                            ({producto?._id || 'ID no disponible'})
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">
                            Cantidad: {item?.cantidad || 0}
                          </span>
                          {producto?.precio && (
                            <span className="font-semibold text-gray-800">
                              ${((producto.precio * (item?.cantidad || 0)) || 0).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <OrderBadge 
                  status={order?.estado || 'unknown'} 
                  type="status" 
                  isActive 
                />

                {order?.estado === 'aceptado' && (
                  <div className="flex gap-2">
                    <OrderBadge 
                      status="Preparando" 
                      type="delivery"
                      onClick={() => handleDeliveryStatusUpdate(order._id, 'armando')}
                      isActive={order?.estadoPedido === 'armando'}
                      isDisabled={updateDeliveryStatusMutation.isPending}
                    />
                    <OrderBadge 
                      status="En Camino" 
                      type="delivery"
                      onClick={() => handleDeliveryStatusUpdate(order._id, 'en camino')}
                      isActive={order?.estadoPedido === 'en camino'}
                      isDisabled={updateDeliveryStatusMutation.isPending}
                    />
                    <OrderBadge 
                      status="Entregado" 
                      type="delivery"
                      onClick={() => handleDeliveryStatusUpdate(order._id, 'entregado')}
                      isActive={order?.estadoPedido === 'entregado'}
                      isDisabled={updateDeliveryStatusMutation.isPending}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersDashboard;