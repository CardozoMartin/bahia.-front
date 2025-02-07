import React, { useState } from 'react';
import { 
  User, Mail, Phone, Edit, Save, 
  Lock, Unlock 
} from 'lucide-react';

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: 'María',
    apellido: 'González',
    email: 'maria.gonzalez@ejemplo.com',
    telefono: '+54 9 11 1234-5678'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  return (
    <div className="bg-neutral-100">
      <div className="container mx-auto p-6 md:p-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
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
                    <Unlock className="w-5 h-5 text-blue-600" />
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
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-semibold text-neutral-800 mb-2">Mis Pedidos</h2>
          <p className="text-neutral-600 mb-8">Seguimiento y detalles de tus compras recientes</p>
          
        </div>
      </div>
    </div>
  );
};


export default UserProfilePage;