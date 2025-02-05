import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, X } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl transform transition-all duration-500 ease-in-out translate-x-0">
        <div className="h-full flex flex-col">
          {/* Cart Header */}
          <div className="flex justify-between items-center p-6 border-b border-neutral-100">
            <h2 className="text-xl font-medium text-neutral-800 flex items-center gap-3">
              <ShoppingBag className="text-neutral-800" />
              Carrito de Compras
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5 text-neutral-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-4">
                <ShoppingBag className="w-12 h-12 text-neutral-300" />
                <p className="text-neutral-600">Tu carrito está vacío</p>
                <button
                  onClick={onClose}
                  className="text-sm text-neutral-800 hover:text-neutral-600 underline underline-offset-4"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex gap-4 pb-6 border-b border-neutral-100 last:border-b-0"
                  >
                    <div className="relative w-24 h-24 bg-neutral-50 rounded-lg overflow-hidden">
                      <img 
                        src={item.imagen} 
                        alt={item.nombre} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-neutral-800 truncate pr-4">
                          {item.nombre}
                        </h3>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-neutral-500 mt-1">
                        ${item.precio.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-neutral-200 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-1.5 hover:bg-neutral-50 text-neutral-600 transition-colors rounded-l-lg"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 text-sm font-medium text-neutral-800">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-1.5 hover:bg-neutral-50 text-neutral-600 transition-colors rounded-r-lg"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-medium text-neutral-800">
                          ${(item.precio * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-100 bg-neutral-50">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium text-neutral-800">
                    ${calculateTotal()}
                  </span>
                </div>
                <div className="flex justify-between items-center font-medium">
                  <span className="text-neutral-800">Total</span>
                  <span className="text-lg text-neutral-800">
                    ${calculateTotal()}
                  </span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium"
                >
                  Finalizar Compra
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-neutral-600 text-sm hover:text-neutral-800 transition-colors"
                >
                  Continuar comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCarts;