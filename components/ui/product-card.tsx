"use client";

import Image from "next/image";
import Link from "next/link";
import { StrapiProduct } from "@/lib/types/strapi";
import { usePedido } from "@/components/ui/pedido/pedido-context";
import { AddToPedidoButton } from "./pedido/add-to-pedido-button";

interface ProductCardProps {
  product: StrapiProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = usePedido();

  const firstImage = product.images?.[0];

  const rawUrl =
    firstImage?.formats?.medium?.url ||
    firstImage?.formats?.small?.url ||
    null;

  const imageSrc = rawUrl
    ? rawUrl.startsWith("http")
      ? rawUrl
      : `${process.env.NEXT_PUBLIC_API_URL}${rawUrl}`
    : "/placeholder.svg";

  return (
    <div className="group rounded-xl border bg-white overflow-hidden transition-all duration-300 hover:shadow-sm">
      
      {/* Imagen + link */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] bg-gray-50">
          <Image
            src={imageSrc}
            alt={product.productName}
            fill
            unoptimized
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="px-3 py-3 flex flex-col gap-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {product.productName}
          </h3>
        </Link>

        <div className="text-sm font-semibold text-gray-800">
          ${product.price.toLocaleString("es-AR")}
        </div>

      <AddToPedidoButton
        product={{
          id: product.id,
          productName: product.productName,
          price: product.price,
        }}
      />

      </div>
    </div>
  );
}