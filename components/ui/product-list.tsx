"use client";

import { useProducts } from "@/hooks/use-product";
import { ProductCard } from "./product-card";

export function ProductList() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error al cargar</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}