import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Heart, ShoppingBag, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProductById } from '../api/apiProduct';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ShoppingCarts from '../components/Products/Carts/ShoppingCarts';
import CheckoutForm from '../components/Products/Carts/FormCarts/CheckoutForm';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Add cart-related state
  const [cart, setCart] = useState(loadCartFromLocalStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });


  // Cart management functions
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

  const clearLastAddedProduct = () => {
    setLastAddedProduct(null);
  };

  const handleOrderSubmit = async (orderData) => {
    try {
      const response = await createOrder(orderData);
      setCart([]);
      setIsCheckoutOpen(false);
      alert('Pedido creado exitosamente');
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      alert('Hubo un problema al procesar tu pedido');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-rose-50 to-pink-50">
        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 space-y-4">
        <AlertCircle className="w-16 h-16 text-rose-500" />
        <p className="text-rose-600 font-serif">Error al cargar el producto</p>
      </div>
    );
  }

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

      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-rose-600 hover:text-rose-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Volver</span>
          </button>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
              <div className="space-y-6">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-serif text-rose-800 mb-4">{product.nombre}</h1>
                  <p className="text-rose-600">{product.descripcion}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif text-rose-800">
                      ${product.precio.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        className="p-2 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-5 h-5 text-rose-500" />
                      </button>
                      {product.stock > 0 ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center gap-2 bg-rose-400 text-white px-6 py-3 rounded-full hover:bg-rose-500 transition-colors shadow-sm hover:shadow-md"
                        >
                          <ShoppingBag className="w-5 h-5" />
                          <span>Agregar al carrito</span>
                        </button>
                      ) : (
                        <span className="text-rose-500 font-serif">Sin stock</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-rose-100">
                  <h2 className="text-xl font-serif text-rose-800">Detalles del producto</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-rose-600">Stock</h3>
                      <p className="text-rose-800">{product.stock} unidades</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-rose-600">Categoría</h3>
                      <p className="text-rose-800">{product.categoria}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-rose-600">Color</h3>
                      <p className="text-rose-800">{product.color}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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

export default ProductDetail;