import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import ProductCars from '../components/Products/Cards/ProductCars';
import Footer from '../components/common/Footer';
import ShoppingCarts from '../components/Products/Carts/ShoppingCarts';
import CheckoutForm from '../components/Products/Carts/FormCarts/CheckoutForm';
import HeroCarousel from '../components/Products/Carrusel/HeroCarousel';
import PromotionalCarousel from '../components/Products/FormProducts/PromotionalCarousel';
import WhatsAppButton from '../components/Utils/WhatsAppButton';
import { useQuery } from '@tanstack/react-query';
import { getProductsOff } from '../api/apiProductOffert';
import { useSession } from '../store/useSession';

const HomePage = () => {
  const [cart, setCart] = useState(loadCartFromLocalStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const { user } = useSession()

  useEffect(() => {
    // Al cargar el componente, asegurarse de que el carrito se guarda en localStorage
    saveCartToLocalStorage(cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // Set the last added product for the preview
        setLastAddedProduct(product);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const clearLastAddedProduct = () => {
    setLastAddedProduct(null);
  };

  const handleOrderSubmit = async (orderData) => {
    try {
      // Assume you have a createOrder method in your API
      const response = await createOrder(orderData);
      
      // Clear the cart after creating the order
      setCart([]);
      setIsCheckoutOpen(false);
      
      // Show success message
      alert('Pedido creado exitosamente');
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      // Handle errors (show message to user)
      alert('Hubo un problema al procesar tu pedido');
    }
  };
  const {
    data: productsOff,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productsoff"],
    queryFn: getProductsOff,
  });

  
  const promotionalProducts = [
    {
      _id: 'promo1',
      name: 'Producto en Oferta 1',
      originalPrice: 99.99,
      price: 79.99,
      discountPercentage: 20,
      image: 'https://http2.mlstatic.com/D_NQ_NP_803447-MLA81083055223_122024-O.webp'
    },
    // Add more promotional products...
  ];

  return (
    <>
      <Navbar
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        openCart={toggleCart}
        lastAddedProduct={lastAddedProduct}
        clearLastAddedProduct={clearLastAddedProduct}
      />

{isCartOpen && (
  <ShoppingCarts
    cart={cart}
    updateQuantity={updateQuantity}  // Usa directamente la función updateQuantity
    removeFromCart={removeFromCart}
    onClose={() => setIsCartOpen(false)}
    onCheckout={() => setIsCheckoutOpen(true)}
  />
)}

      {isCheckoutOpen && (
        <CheckoutForm
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onSubmit={handleOrderSubmit}
        />
      )}

      <HeroCarousel></HeroCarousel>

      <PromotionalCarousel 
        productsOff={productsOff}
        addToCart={addToCart}
      />
      <WhatsAppButton></WhatsAppButton>
      <ProductCars addToCart={addToCart} />
      <Footer />
    </>
  );
};

const saveCartToLocalStorage = (updatedCart) => {
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

export default HomePage;
