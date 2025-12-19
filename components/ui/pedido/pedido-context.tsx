"use client";

import { createContext, useContext, useState } from "react";

export interface PedidoItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PedidoContextType {
  items: PedidoItem[];
  addItem: (item: PedidoItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearPedido: () => void;
  totalItems: number;
  totalPrice: number; // 👈 NUEVO
}

const PedidoContext = createContext<PedidoContextType | null>(null);

export function PedidoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PedidoItem[]>([]);

  const addItem = (newItem: PedidoItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);

      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }

      return [...prev, newItem];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearPedido = () => {
    setItems([]);
  };

  // 🔢 Total de unidades
  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // 💰 Total en dinero
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <PedidoContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearPedido,
        totalItems,
        totalPrice, // 👈 EXPUESTO
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("usePedido debe usarse dentro de PedidoProvider");
  }
  return context;
}