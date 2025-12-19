import { StrapiProduct } from "@/lib/types/strapi";

const API_URL = process.env.STRAPI_API_URL;

if (!API_URL) {
  throw new Error("STRAPI_API_URL no está definida");
}

/**
 * Obtener productos
 * - Si se pasa categorySlug → filtra por categoría
 * - Si no → trae todos
 */
export async function getProducts(
  categorySlug?: string
): Promise<StrapiProduct[]> {
  const params = new URLSearchParams({
    populate: "*",
  });

  if (categorySlug) {
    params.append(
      "filters[category][slug][$eq]",
      categorySlug
    );
  }

  const res = await fetch(
    `${API_URL}/api/products?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Error Strapi:", await res.text());
    throw new Error("Error al obtener productos");
  }

  const json = await res.json();

  if (!json?.data) return [];

  return json.data.map((item: any) => ({
    id: item.id,
    productName: item.productName,
    description: item.description,
    price: item.price,
    slug: item.slug,
    images:
      item.images?.map((img: any) => ({
        url: img.url,
        formats: img.formats,
      })) ?? [],
    category: item.category
      ? {
          slug: item.category.slug,
          categoryName: item.category.categoryName,
        }
      : null,
  }));
}

/**
 * Obtener un producto por slug
 */
export async function getProductBySlug(
  slug: string
): Promise<StrapiProduct | null> {
  const normalizedSlug = decodeURIComponent(slug)
    .trim()
    .toLowerCase();

  const params = new URLSearchParams({
    populate: "*",
    "filters[slug][$eq]": normalizedSlug,
  });

  const res = await fetch(
    `${API_URL}/api/products?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Error Strapi:", await res.text());
    return null;
  }

  const json = await res.json();

  if (!json?.data || json.data.length === 0)
    return null;

  const item = json.data[0];

  return {
    id: item.id,
    productName: item.productName,
    description: item.description,
    price: item.price,
    slug: item.slug,
    images:
      item.images?.map((img: any) => ({
        url: img.url,
        formats: img.formats,
      })) ?? [],
    category: item.category
      ? {
          slug: item.category.slug,
          categoryName: item.category.categoryName,
        }
      : null,
  };
}