import React, { useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ADD TO CART
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.bookID === item.bookID
      );
      const updatedCart = prevCart.map((cartItem) =>
        cartItem.bookID === item.bookID
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.bookID !== bookID)
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
