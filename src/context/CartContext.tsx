import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

export interface CartItem {
  name: string;
  price: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (name: string, price: string) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
  loadCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = useCallback(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (name: string, price: string) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.name === name);
      if (existingItem) {
        return currentCart.map(item =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { name, price, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.name === name);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(item =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return currentCart.filter(item => item.name !== name);
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};