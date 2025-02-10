import React, { useState } from 'react';
import {
  User, Mail, Phone, Edit, Save, Package, 
  MapPin, Clock, CheckCircle, XCircle, 
  Truck, ChevronRight, Lock, Heart
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../api/apiCart';
import { useSession } from '../store/useSession';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const UserDashboard = () => {
  const { user } = useSession();
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
      className={`flex items-center space-x-2 px-8 py-4 font-medium transition-all ${
        activeTab === id 
          ? 'text-rose-400 border-b-2 border-rose-400 bg-pink-50'
          : 'text-neutral-500 hover:text-rose-300 hover:bg-pink-50'
      }`}
    >
      {icon}
      <span className="font-serif">{label}</span>
    </button>
  );

  const ProfileSection = ({ icon, label, name, value, editable = true }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-pink-100">
      <div className="flex items-center space-x-4">
        <div className="bg-pink-50 p-3 rounded-2xl">
          {React.cloneElement(icon, { className: "w-5 h-5 text-rose-400" })}
        </div>
        <div className="flex-grow">
          <p className="text-xs font-medium text-neutral-500 mb-1 font-serif">{label}</p>
          {isEditing && editable ? (
            <input
              type="text"
              name={name}
              value={userData[name]}
              onChange={handleInputChange}
              className="w-full bg-pink-50 border border-pink-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-rose-300 focus:border-transparent"
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
      <div className="flex items-center w-full my-6 bg-pink-50 rounded-2xl p-6">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 relative group">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                index === currentStepIndex
                  ? 'bg-rose-400 text-white scale-110 shadow-md'
                  : index < currentStepIndex
                    ? 'bg-rose-300 text-white'
                    : 'bg-pink-200'
              }`}>
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1.5 flex-1 mx-2 transition-colors duration-300 ${
                  index < currentStepIndex ? 'bg-rose-300' : 'bg-pink-200'
                }`} />
              )}
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-600 font-serif">
              {step.text}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const getStatusStyles = (status) => ({
    'pendiente': {
      color: 'bg-amber-400',
      icon: <Clock className="w-5 h-5" />,
      text: 'Pendiente'
    },
    'rechazado': {
      color: 'bg-rose-400',
      icon: <XCircle className="w-5 h-5" />,
      text: 'Rechazado'
    },
    'aceptado': {
      color: 'bg-emerald-400',
      icon: <Heart className="w-5 h-5" />,
      text: 'Aceptado'
    }
  }[status] || {
    color: 'bg-amber-400',
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
      <div className="mb-6 bg-white rounded-3xl shadow-sm overflow-hidden transition-all hover:shadow-lg border border-pink-100">
        <div 
          onClick={() => setExpandedOrder(order._id === expandedOrder ? null : order._id)}
          className={`${status.color} p-6 text-white flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity`}
        >
          <div className="flex items-center space-x-3">
            {status.icon}
            <span className="font-serif">{status.text}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm flex flex-col items-end font-serif">
              <span>Pedido #{order._id?.slice(-6)}</span>
              <span className="text-xs">{formatDate(order.createdAt)}</span>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${expandedOrder === order._id ? 'rotate-90' : ''}`} />
          </div>
        </div>

        {expandedOrder === order._id && (
          <div className="p-8">
            {order.estado === 'aceptado' && <OrderTimeline estadoPedido={order.estadoPedido} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4 bg-pink-50 p-6 rounded-2xl">
                <h3 className="font-serif text-lg mb-4 text-neutral-800 border-b border-pink-200 pb-2">
                  Detalles de Entrega
                </h3>
                {[
                  { icon: <Mail className="w-5 h-5 text-rose-400" />, text: order.email },
                  { icon: <Phone className="w-5 h-5 text-rose-400" />, text: order.telefono },
                  { icon: <MapPin className="w-5 h-5 text-rose-400" />, text: order.direccion }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 hover:bg-white p-3 rounded-xl transition-colors">
                    {item.icon}
                    <span className="text-neutral-700 font-serif">{item.text}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-serif text-lg mb-4 text-neutral-800 border-b border-pink-200 pb-2">
                  Tus Joyas
                </h3>
                <div className="space-y-4">
                  {order.productos.map((product) => (
                    <div key={product._id} className="flex justify-between items-center bg-pink-50 p-4 rounded-2xl hover:bg-pink-100 transition-colors">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={product.productoId.imagen} 
                          alt={product.productoId.nombre}
                          className="w-24 h-24 object-cover rounded-2xl shadow-sm"
                        />
                        <div className="font-serif">
                          <p className="font-medium text-neutral-800">{product.productoId.nombre}</p>
                          <p className="text-sm text-neutral-600">Color: {product.productoId.color}</p>
                          <p className="text-sm text-neutral-600">Cantidad: {product.cantidad}</p>
                        </div>
                      </div>
                      <div className="text-right font-serif">
                        <span className="font-medium text-rose-500">
                          ${(product.productoId.precio * product.cantidad).toFixed(2)}
                        </span>
                        <p className="text-sm text-neutral-600">${product.productoId.precio} c/u</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-pink-200 flex justify-between items-center bg-pink-50 p-6 rounded-2xl">
                  <span className="font-serif text-neutral-800">Total</span>
                  <span className="font-serif text-lg text-rose-500">${total.toFixed(2)}</span>
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
      <Navbar />
      <div className="min-h-screen pt-20 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-100">
            <div className="border-b border-pink-100">
              <div className="flex space-x-4">
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

            <div className="p-8">
              {activeTab === 'profile' ? (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h1 className="text-3xl font-serif text-neutral-800 mb-2">Mi Perfil</h1>
                      <p className="text-neutral-600 font-serif">Administra tu información personal</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
                        isEditing
                          ? 'bg-emerald-400 text-white hover:bg-emerald-500'
                          : 'bg-rose-400 text-white hover:bg-rose-500'
                      }`}
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-5 h-5" /> 
                          <span className="font-serif">Guardar</span>
                        </>
                      ) : (
                        <>
                          <Edit className="w-5 h-5" /> 
                          <span className="font-serif">Editar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <ProfileSection
                        icon={<User />}
                        label="Nombre Completo"
                        name="nombre"
                        value={`${userData.nombre} ${userData.apellido}`}
                      />
                      <ProfileSection
                        icon={<Mail />}
                        label="Correo Electrónico"
                        name="email"
                        value={userData.email}
                      />
                    </div>
                    <div className="space-y-6">
                      <ProfileSection
                        icon={<Phone />}
                        label="Teléfono"
                        name="telefono"
                        value={userData.telefono}
                      />
                      <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-pink-100">
                        <div className="flex items-center space-x-4">
                          <div className="bg-pink-50 p-3 rounded-2xl">
                            <Lock className="w-5 h-5 text-rose-400" />
                          </div>
                          <div className="flex-grow">
                            <p className="text-xs font-medium text-neutral-500 mb-1 font-serif">Contraseña</p>
                            <button className="text-rose-400 hover:text-rose-500 font-serif">
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
                    <h1 className="text-3xl font-serif text-neutral-800 mb-2">Mis Pedidos</h1>
                    <p className="text-neutral-600 font-serif">Seguimiento y detalles de tus joyas</p>
                  </div>

                  {isLoading && (
                    <div className="flex justify-center items-center min-h-[300px]">
                      <Clock className="w-12 h-12 animate-pulse text-rose-300" />
                    </div>
                  )}

                  {error && (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center">
                      <XCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                      <p className="text-rose-800 font-serif">Lo sentimos, no pudimos cargar tus pedidos. Por favor, intenta nuevamente.</p>
                    </div>
                  )}

                  {!isLoading && !error && orders?.length === 0 && (
                    <div className="bg-pink-50 border border-pink-200 rounded-2xl p-12 text-center">
                      <Package className="w-16 h-16 text-rose-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-neutral-800 mb-2 font-serif">No tienes pedidos aún</h3>
                      <p className="text-neutral-600 font-serif">Cuando encuentres la joya perfecta, podrás ver los detalles de tu pedido aquí.</p>
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
      <Footer />
    </>
  );
};

export default UserDashboard;