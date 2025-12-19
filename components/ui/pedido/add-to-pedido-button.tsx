"use client";

import { usePedido } from "./pedido-context";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  product: {
    id: number;
    productName: string;
    price: number;
  };
};

export function AddToPedidoButton({ product }: Props) {
  const { addItem } = usePedido();
  const { toast } = useToast();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.productName,
      price: product.price,
      quantity: 1,
    });

    toast({
      title: "Producto agregado",
      description: product.productName,
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="
        mt-3 w-full rounded-md
        border border-neutral-300
        bg-white
        py-2.5
        text-sm font-medium text-neutral-900
        transition-all duration-200
        hover:border-neutral-900
        hover:bg-neutral-50
        focus:outline-none focus:ring-2 focus:ring-neutral-900/10
      "
    >
      Agregar al pedido
    </button>
  );
}