import { getProducts } from "@/lib/api/products";
import { ProductCard }from "@/components/ui/product-card";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const products = await getProducts(slug);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {slug.replace(/-/g, " ")}
      </h1>

      {products.length === 0 ? (
        <p className="text-muted-foreground">
          No hay productos en esta categoría
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}