import Image from "next/image";
import { getProductBySlug } from "@/lib/api/products";
import { notFound } from "next/navigation";
import { AddToPedidoButton } from "@/components/ui/pedido/add-to-pedido-button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const { id, productName, description, price } = product;

  const imageSrc =
    product.imageUrl ||
    product.images?.[0]?.formats?.medium?.url ||
    product.images?.[0]?.formats?.small?.url ||
    product.images?.[0]?.url ||
    "/placeholder.svg";

  const finalSrc = imageSrc.startsWith("http")
    ? imageSrc
    : `${process.env.NEXT_PUBLIC_API_URL}${imageSrc}`;

  return (
    <section className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* Imagen */}
      <div className="relative aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden border">
        <Image
          src={finalSrc}
          alt={productName}
          fill
          unoptimized
          className="object-contain bg-white p-6"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">{productName}</h1>

        <p className="text-2xl font-medium">
          ${price.toLocaleString("es-AR")}
        </p>

        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}

        <AddToPedidoButton
          product={{
            id,
            productName,
            price,
          }}
        />
      </div>
    </section>
  );
}