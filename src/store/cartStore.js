import { create } from 'zustand';

// Función para cargar el carrito desde localStorage
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const useCartStore = create((set) => ({
  cart: loadCartFromLocalStorage(), // Cargar el carrito desde localStorage al inicializar
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      let newCart;
      if (existingProduct) {
        newCart = state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...state.cart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart)); // Guardar el carrito en localStorage
      return { cart: newCart };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newCart)); // Guardar el carrito en localStorage
      return { cart: newCart };
    }),
  clearCart: () => {
    localStorage.removeItem('cart'); // Limpiar el carrito de localStorage
    set({ cart: [] });
  },
}));