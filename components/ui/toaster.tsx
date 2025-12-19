"use client";

import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-lg border bg-background px-4 py-3 shadow-lg"
        >
          {toast.title && (
            <p className="font-medium text-sm">{toast.title}</p>
          )}
          {toast.description && (
            <p className="text-sm text-muted-foreground">
              {toast.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}