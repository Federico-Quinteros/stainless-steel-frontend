"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types/product";
import { AddToPedidoButton } from "./pedido/add-to-pedido-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // 1️⃣ prioridad: imageUrl (nuevo sistema)
  const imageSrc =
    product.imageUrl ||
    // 2️⃣ fallback legacy: images (si existen)
    product.images?.[0]?.formats?.medium?.url ||
    product.images?.[0]?.formats?.small?.url ||
    product.images?.[0]?.url ||
    // 3️⃣ placeholder final
    "/placeholder.svg";

  const finalSrc =
    imageSrc.startsWith("http")
      ? imageSrc
      : `${process.env.NEXT_PUBLIC_API_URL}${imageSrc}`;

  return (
    <div className="group rounded-xl border bg-white overflow-hidden transition-all duration-300 hover:shadow-sm">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] bg-gray-50">
          <Image
            src={finalSrc}
            alt={product.productName}
            fill
            unoptimized
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

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