import { getProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/ui/product-card";

export default async function FeaturedProducts() {
  const products = (await getProducts()).slice(0, 8);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 lg:px-6 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Productos destacados
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Piezas elegidas para usar todos los días
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </section>
  );
}