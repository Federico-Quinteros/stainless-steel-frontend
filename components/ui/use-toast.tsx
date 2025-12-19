"use client";

import * as React from "react";

type ToastProps = {
  title?: string;
  description?: string;
};

type Toast = ToastProps & {
  id: string;
};

const ToastContext = React.createContext<{
  toast: (toast: ToastProps) => void;
  toasts: Toast[];
}>({
  toast: () => {},
  toasts: [],
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = (toast: ToastProps) => {
    setToasts((prev) => [
      ...prev,
      { ...toast, id: crypto.randomUUID() },
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return React.useContext(ToastContext);
}