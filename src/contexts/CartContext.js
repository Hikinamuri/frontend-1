// CartContext.js - Updated to include clearCart
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // [{ id, name, price, quantity, images }]

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const newCart = existing
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) {
        const newCart = prev.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      }
      const newCart = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Загрузка из localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Ошибка загрузки корзины:', e);
      localStorage.removeItem('cart');
    }
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};