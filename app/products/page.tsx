import { getProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/ui/product-card";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const products = await getProducts(searchParams.category);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}