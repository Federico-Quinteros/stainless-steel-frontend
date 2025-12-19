export interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  slug: string;
  images: {
    url: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  }[];
  category?: {
    slug: string;
    categoryName: string;
  } | null;
}