import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart, X } from 'lucide-react';

const ShoppingCarts = ({ 
    cart, 
    updateQuantity, 
    removeFromCart, 
    onClose,
    onCheckout 
  }) => {
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + (item.precio * item.quantity), 0).toFixed(2);
    };

  return (
    <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="h-full flex flex-col">
        {/* Cart Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <ShoppingCart className="mr-3 text-pink-500" />
            Tu Carrito
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-pink-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              Tu carrito está vacío
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item._id} 
                  className="flex items-center border-b pb-4 last:border-b-0"
                >
                  <img 
                    src={item.imagen} 
                    alt={item.nombre} 
                    className="w-20 h-20 object-cover rounded-md mr-4" 
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{item.nombre}</h3>
                    <p className="text-pink-500 font-bold">${item.precio}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="bg-gray-200 p-1 rounded-l-md hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="bg-gray-200 p-1 rounded-r-md hover:bg-gray-300 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="ml-4 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="font-bold text-gray-800">
                    ${(item.precio * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
        <div className="p-6 border-t space-y-4">
          <div className="flex justify-between mb-4">
            <span className="text-gray-700 font-semibold">Total:</span>
            <span className="text-2xl font-bold text-pink-500">${calculateTotal()}</span>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors font-semibold"
          >
            Ir a Pagar
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default ShoppingCarts;