export interface StrapiImage {
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface StrapiProduct {
  id: number;
  productName: string;
  description: string;
  price: number;
  slug: string;
  images: {
    url: string;
    formats: any;
  }[];
  category: {
    slug: string;
    categoryName: string;
  } | null;
}