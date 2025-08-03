// src/context/CartContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const fetchCartFromBackend = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error('Error loading backend cart:', err);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCartFromBackend();
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(localCart);
    }
  }, [token, fetchCartFromBackend]);

  const syncLocalCartToBackend = async () => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (localCart.length > 0 && token) {
      try {
        await fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items: localCart }),
        });
        localStorage.removeItem('cart');
        fetchCartFromBackend();
      } catch (err) {
        console.error('Sync failed:', err);
      }
    }
  };

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    syncLocalCartToBackend();
  };
  

  return (
    <CartContext.Provider value={{ cart, setCart, token, user, login }}>
      {children}
    </CartContext.Provider>
  );
};
