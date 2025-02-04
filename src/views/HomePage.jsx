import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import ProductCars from '../components/Products/Cards/ProductCars';
import Footer from '../components/common/Footer';
import ShoppingCarts from '../components/Products/Carts/ShoppingCarts';
import CheckoutForm from '../components/Products/Carts/FormCarts/CheckoutForm';

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

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
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          onClose={toggleCart}
          onCheckout={openCheckout}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutForm
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onSubmit={handleOrderSubmit}
        />
      )}

      <ProductCars addToCart={addToCart} />
      <Footer />
    </>
  );
};

export default HomePage;