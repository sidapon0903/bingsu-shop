"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  name: string;
  price: number;
  img: string;
  qty: number;
  size?: string;
  note?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  increase: (name: string, size?: string, note?: string) => void;
  decrease: (name: string, size?: string, note?: string) => void;
  removeItem: (name: string, size?: string, note?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(item: Omit<CartItem, "qty">) {
    setItems((prev) => {
      const found = prev.find(
        (i) =>
          i.name === item.name &&
          i.size === item.size &&
          i.note === item.note
      );
      if (found) {
        return prev.map((i) =>
          i.name === item.name &&
          i.size === item.size &&
          i.note === item.note
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function increase(name: string, size?: string, note?: string) {
    setItems((prev) =>
      prev.map((i) =>
        i.name === name && i.size === size && i.note === note
          ? { ...i, qty: i.qty + 1 }
          : i
      )
    );
  }

  function decrease(name: string, size?: string, note?: string) {
    setItems((prev) =>
      prev
        .map((i) =>
          i.name === name && i.size === size && i.note === note
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(name: string, size?: string, note?: string) {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.name === name &&
            i.size === size &&
            i.note === note
          )
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        increase,
        decrease,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}