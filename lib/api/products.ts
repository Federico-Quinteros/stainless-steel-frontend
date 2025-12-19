import { Product } from "@/lib/types/product";

const API_URL = process.env.STRAPI_API_URL;

if (!API_URL) {
  throw new Error("STRAPI_API_URL no está definida");
}

/**
 * Obtener todos los productos (opcionalmente por categoría)
 */
export async function getProducts(
  categorySlug?: string
): Promise<Product[]> {
  const params = new URLSearchParams({
    populate: "*",
  });

  if (categorySlug) {
    params.append("filters[category][slug][$eq]", categorySlug);
  }

  const res = await fetch(
    `${API_URL}/api/products?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Error al obtener productos");
  }

  const json = await res.json();
  return json.data as Product[];
}

/**
 * Obtener un producto por slug
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const params = new URLSearchParams({
    populate: "*",
    "filters[slug][$eq]": slug,
  });

  const res = await fetch(
    `${API_URL}/api/products?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error(await res.text());
    return null;
  }

  const json = await res.json();

  if (!json.data || json.data.length === 0) {
    return null;
  }

  return json.data[0] as Product;
}