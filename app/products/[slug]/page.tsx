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

  const { id, productName, description, price, images } = product;

  const firstImage = images?.[0];
  const imageUrl = firstImage
    ? `${process.env.NEXT_PUBLIC_API_URL}${
        firstImage.formats?.medium?.url || firstImage.url
      }`
    : "/placeholder.png";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

        {/* Imagen */}
        <div className="relative aspect-[4/5] rounded-xl bg-neutral-50 overflow-hidden border">
          <Image
            src={imageUrl}
            alt={productName}
            fill
            unoptimized
            className="object-contain p-8 transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-6">
          
          {/* Nombre */}
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            {productName}
          </h1>

          {/* Precio */}
          <p className="text-2xl font-medium text-neutral-900">
            ${price.toLocaleString("es-AR")}
          </p>

          {/* Separador */}
          <div className="h-px w-12 bg-neutral-300" />

          {/* Descripción */}
          <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
            {description}
          </p>

          {/* CTA */}
          <div className="pt-2">
            <AddToPedidoButton
              product={{
                id,
                productName,
                price,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}