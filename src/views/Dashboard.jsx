import React, { useState } from 'react';
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import FormProducts from '../components/Products/FormProducts/FormProducts';
import ProductsTable from '../components/Products/AllProduct/ProductTable';
import OrdersDashboard from '../components/Orders/OrdersDashboard';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('pedidos');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'pedidos', icon: ShoppingCart, label: 'Pedidos' },
    { id: 'productos', icon: Package, label: 'Productos' },
    { id: 'usuarios', icon: Users, label: 'Usuarios' },
    { id: 'configuracion', icon: Settings, label: 'Configuración' }
  ];

  const handleLogout = () => {
    console.log('Cerrando sesión...');
  };

  const ViewContent = () => {
    switch (currentView) {
      case 'pedidos':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">Gestión de Pedidos</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <OrdersDashboard />
            </div>
          </div>
        );
      case 'productos':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">Gestión de Productos</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FormProducts />
              <h3 className="text-xl font-semibold mt-4 mb-3 text-center text-gray-600">Lista de productos</h3>
              <ProductsTable />
            </div>
          </div>
        );
      case 'usuarios':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">Gestión de Usuarios</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p>Contenido de la vista de usuarios</p>
            </div>
          </div>
        );
      case 'configuracion':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">Configuración</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p>Contenido de la vista de configuración</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white h-screen transition-all duration-300 shadow-lg flex flex-col justify-between`}
      >
        <div>
          {/* Sidebar Toggle & Title */}
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {isSidebarOpen && <h1 className="text-xl font-semibold">Dashboard</h1>}
          </div>

          {/* Menu Navigation */}
          <nav className="p-4 flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentView(item.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors text-gray-700 font-medium ${
                        currentView === item.id
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={22} />
                      {isSidebarOpen && <span className="ml-4">{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-100 transition font-medium"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="ml-4">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <ViewContent />
      </main>
    </div>
  );
};

export default Dashboard;
