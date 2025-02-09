import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  User, Mail, Phone, Edit, Save, Package, 
  MapPin, Clock, CheckCircle, XCircle, 
  Truck, ChevronRight, Lock
} from 'lucide-react';
import { getOrders } from '../api/apiCart';
import { useSession } from '../store/useSession';

const UserDashboard = () => {
  const { user }= useSession()
  console.log(user)
  const [isEditing, setIsEditing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [userData, setUserData] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    telefono: user.telefono
  });

  const { data: allOrders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  });
  const orders = allOrders?.filter(order => order.idUser === user.id) || [];
console.log(orders)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
        activeTab === id 
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-neutral-500 hover:text-neutral-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const ProfileSection = ({ icon, label, name, value, editable = true }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-50 p-3 rounded-xl">
          {icon}
        </div>
        <div className="flex-grow">
          <p className="text-xs font-medium text-neutral-500 mb-1">{label}</p>
          {isEditing && editable ? (
            <input
              type="text"
              name={name}
              value={userData[name]}
              onChange={handleInputChange}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="font-medium text-neutral-800">{value}</p>
          )}
        </div>
      </div>
    </div>
  );

  const OrderTimeline = ({ estadoPedido }) => {
    if (!['armando', 'en camino', 'entregado'].includes(estadoPedido)) return null;
    
    const steps = [
      { text: 'Armando', icon: <Package className="w-4 h-4" /> },
      { text: 'En Camino', icon: <Truck className="w-4 h-4" /> },
      { text: 'Entregado', icon: <CheckCircle className="w-4 h-4" /> }
    ];
    
    const getCurrentStepIndex = (status) => {
      const statusMap = { 'armando': 0, 'en camino': 1, 'entregado': 2 };
      return statusMap[status] ?? -1;
    };
    
    const currentStepIndex = getCurrentStepIndex(estadoPedido);
    
    return (
      <div className="flex items-center w-full my-6 bg-neutral-50 rounded-lg p-4">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 relative group">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                index === currentStepIndex
                  ? 'bg-blue-600 text-white scale-110 shadow-md'
                  : index < currentStepIndex
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
              }`}>
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1.5 flex-1 mx-2 transition-colors duration-300 ${
                  index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-600 group-hover:text-neutral-900 transition-colors">
              {step.text}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const getStatusStyles = (status) => ({
    'pendiente': {
      color: 'bg-amber-500',
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
  }[status] || {
    color: 'bg-amber-500',
    icon: <Clock className="w-5 h-5" />,
    text: 'Pendiente'
  });

  const Order = ({ order }) => {
    const status = getStatusStyles(order.estado);
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
      <div className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
        <div 
          onClick={() => setExpandedOrder(order._id === expandedOrder ? null : order._id)}
          className={`${status.color} p-4 text-white flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity`}
        >
          <div className="flex items-center space-x-2">
            {status.icon}
            <span className="font-semibold">{status.text}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm flex flex-col items-end">
              <span>Pedido #{order._id?.slice(-6)}</span>
              <span className="text-xs">{formatDate(order.createdAt)}</span>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${expandedOrder === order._id ? 'rotate-90' : ''}`} />
          </div>
        </div>

        {expandedOrder === order._id && (
          <div className="p-6">
            {order.estado === 'aceptado' && <OrderTimeline estadoPedido={order.estadoPedido} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4 bg-neutral-50 p-5 rounded-lg">
                <h3 className="font-semibold text-lg mb-4 text-neutral-800 border-b pb-2">
                  Datos de entrega
                </h3>
                {[
                  { icon: <Mail className="w-5 h-5 text-neutral-500" />, text: order.email },
                  { icon: <Phone className="w-5 h-5 text-neutral-500" />, text: order.telefono },
                  { icon: <MapPin className="w-5 h-5 text-neutral-500" />, text: order.direccion }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 hover:bg-white p-2 rounded transition-colors">
                    {item.icon}
                    <span className="text-neutral-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-neutral-800 border-b pb-2">
                  Productos
                </h3>
                <div className="space-y-4">
                  {order.productos.map((product) => (
                    <div key={product._id} className="flex justify-between items-center bg-neutral-50 p-4 rounded-lg hover:bg-neutral-100 transition-colors">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={product.productoId.imagen} 
                          alt={product.productoId.nombre}
                          className="w-20 h-20 object-cover rounded-md shadow-sm"
                        />
                        <div>
                          <p className="font-medium text-neutral-800">{product.productoId.nombre}</p>
                          <p className="text-sm text-neutral-600">Color: {product.productoId.color}</p>
                          <p className="text-sm text-neutral-600">Cantidad: {product.cantidad}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-neutral-900">
                          ${(product.productoId.precio * product.cantidad).toFixed(2)}
                        </span>
                        <p className="text-sm text-neutral-600">${product.productoId.precio} c/u</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t flex justify-between items-center bg-neutral-50 p-4 rounded-lg">
                  <span className="font-semibold text-neutral-800">Total</span>
                  <span className="font-semibold text-lg text-neutral-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
    
    
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header con Tabs */}
          <div className="border-b">
            <div className="flex space-x-4 px-6">
              <TabButton 
                id="profile" 
                label="Mi Perfil" 
                icon={<User className="w-5 h-5" />} 
              />
              <TabButton 
                id="orders" 
                label="Mis Pedidos" 
                icon={<Package className="w-5 h-5" />} 
              />
            </div>
          </div>

          {/* Contenido del Tab Activo */}
          <div className="p-8">
            {activeTab === 'profile' ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-semibold text-neutral-800 mb-2">Mi Perfil</h1>
                    <p className="text-neutral-600">Administra tu información personal</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                      isEditing
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-5 h-5" /> Guardar
                      </>
                    ) : (
                      <>
                        <Edit className="w-5 h-5" /> Editar
                      </>
                    )}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <ProfileSection
                      icon={<User className="w-5 h-5 text-blue-600" />}
                      label="Nombre Completo"
                      name="nombre"
                      value={`${userData.nombre} ${userData.apellido}`}
                    />
                    <ProfileSection
                      icon={<Mail className="w-5 h-5 text-blue-600" />}
                      label="Correo Electrónico"
                      name="email"
                      value={userData.email}
                    />
                  </div>
                  <div className="space-y-6">
                    <ProfileSection
                      icon={<Phone className="w-5 h-5 text-blue-600" />}
                      label="Teléfono"
                      name="telefono"
                      value={userData.telefono}
                    />
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-50 p-3 rounded-xl">
                          <Lock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs font-medium text-neutral-500 mb-1">Contraseña</p>
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            Cambiar Contraseña
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-semibold text-neutral-800 mb-2">Mis Pedidos</h1>
                  <p className="text-neutral-600">Seguimiento y detalles de tus compras recientes</p>
                </div>

                {isLoading && (
                  <div className="flex justify-center items-center min-h-[300px]">
                    <Clock className="w-12 h-12 animate-pulse text-neutral-400" />
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-800">No pudimos cargar tus pedidos. Por favor, intenta nuevamente.</p>
                  </div>
                )}

                {!isLoading && !error && orders?.length === 0 && (
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-8 text-center">
                    <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-neutral-800 mb-2">No tienes pedidos aún</h3>
                    <p className="text-neutral-600">Cuando realices una compra, podrás ver los detalles aquí.</p>
                  </div>
                )}

                {!isLoading && !error && orders?.length > 0 && (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <Order key={order._id} order={order} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserDashboard;