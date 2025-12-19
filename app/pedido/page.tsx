"use client";

import { usePedido } from "@/components/ui/pedido/pedido-context";

const generateOrderNumber = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `SS-${year}${month}${day}-${hours}${minutes}${seconds}`;
};

export default function MiPedidoPage() {
  const { items, updateQuantity, removeItem, totalPrice } = usePedido();

  const handleWhatsApp = () => {
    const phone = "5493512264219";
    const orderNumber = generateOrderNumber();

    const productsText = items
      .map(
        (item) =>
          `- ${item.name}\n` +
          `  Cantidad: ${item.quantity}\n` +
          `  Subtotal: $${(
            item.price * item.quantity
          ).toLocaleString("es-AR")}`
      )
      .join("\n\n");

    const message =
      `Nuevo pedido desde la tienda online\n\n` +
      `Número de pedido: ${orderNumber}\n\n` +
      `Productos:\n` +
      `${productsText}\n\n` +
      `Total del pedido: $${totalPrice.toLocaleString("es-AR")}\n\n` +
      `Quedo a la espera para confirmar disponibilidad de stock, precio final y envío.\n` +
      `Muchas gracias.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };


  if (items.length === 0) {
    return (
      <section className="container mx-auto py-10">
        <h1 className="text-2xl font-semibold mb-4">Mi pedido</h1>
        <p className="text-muted-foreground">Tu pedido está vacío.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Mi pedido</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                ${item.price.toLocaleString("es-AR")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                className="h-8 w-8 border rounded"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 border rounded"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-500 ml-4"
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <p className="text-lg font-medium">
          Total: ${totalPrice.toLocaleString("es-AR")}
        </p>

      <p className="text-xs text-muted-foreground mb-3">
        Los pedidos están sujetos a confirmación de stock.
      </p>

      <button
        onClick={handleWhatsApp}
        className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition"
      >
        Confirmar pedido por WhatsApp
      </button>
      </div>
    </section>
  );
}