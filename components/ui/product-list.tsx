"use client";

import { useProducts } from "@/hooks/use-product";
import { ProductCard } from "./product-card";
import type { Product } from "@/types/product";

export function ProductList() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error al cargar los productos
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay productos disponibles
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}