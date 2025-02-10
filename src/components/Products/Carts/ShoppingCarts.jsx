import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, X } from 'lucide-react';

const ShoppingCart = ({ 
  cart, 
  updateQuantity, 
  removeFromCart, 
  onClose,
  onCheckout 
}) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0).toFixed(2);
  };

  const handleQuantityUpdate = (itemId, currentQuantity, isIncrementing) => {
    const newQuantity = isIncrementing ? currentQuantity + 1 : currentQuantity - 1;
    
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50">
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl transform transition-all duration-500 ease-in-out translate-x-0">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-8 border-b border-rose-100">
            <h2 className="text-2xl font-light text-rose-950 flex items-center gap-3">
              <ShoppingBag className="text-rose-400" size={20} />
              Mi Colección
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-rose-50 rounded-full transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5 text-rose-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-8">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-rose-300 space-y-4">
                <ShoppingBag className="w-12 h-12" />
                <p className="text-rose-400 font-light">Tu colección está vacía</p>
                <button
                  onClick={onClose}
                  className="text-sm text-rose-500 hover:text-rose-600 underline underline-offset-4 font-light"
                >
                  Continuar explorando
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {cart.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex gap-6 pb-8 border-b border-rose-100 last:border-b-0"
                  >
                    <div className="relative w-28 h-28 bg-rose-50 rounded-lg overflow-hidden">
                      <img 
                        src={item.imagen} 
                        alt={item.nombre} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-light text-lg text-rose-950 truncate pr-4">
                          {item.nombre}
                        </h3>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="p-1 text-rose-300 hover:text-rose-400 transition-colors"
                          aria-label="Eliminar pieza"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-rose-400 mt-2 font-light">
                        ${item.precio.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center border border-rose-200 rounded-lg">
                          <button 
                            onClick={() => handleQuantityUpdate(item._id, item.quantity, false)}
                            className="p-1.5 hover:bg-rose-50 text-rose-400 transition-colors rounded-l-lg disabled:opacity-50"
                            disabled={item.quantity <= 1}
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-1 text-sm font-light text-rose-950">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityUpdate(item._id, item.quantity, true)}
                            className="p-1.5 hover:bg-rose-50 text-rose-400 transition-colors rounded-r-lg"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-light text-rose-950">
                          ${(item.precio * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-8 border-t border-rose-100 bg-white">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-rose-950">
                  <span className="font-light">Subtotal</span>
                  <span className="font-light">
                    ${calculateTotal()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-rose-950 font-light">Total</span>
                  <span className="text-xl text-rose-950 font-light">
                    ${calculateTotal()}
                  </span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-rose-400 text-white py-3.5 rounded-lg hover:bg-rose-500 transition-colors font-light text-lg"
                >
                  Finalizar Compra
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-rose-400 text-sm hover:text-rose-500 transition-colors font-light"
                >
                  Continuar explorando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;