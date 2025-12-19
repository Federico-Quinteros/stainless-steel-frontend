import { StrapiProduct } from "@/lib/types/strapi";

const API_URL = process.env.STRAPI_API_URL!;

/* Todas las categorías */
export async function getCategories() {
  const res = await fetch(
    `${API_URL}/api/categories?populate=*`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data;
}

/* Productos por categoría */
export async function getCategoryBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/api/categories?filters[slug][$eq]=${slug}&populate[products][populate]=images`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data[0];
}
