export interface ProductImage {
  url: string;
  formats?: {
    small?: {
      url: string;
    };
    medium?: {
      url: string;
    };
  };
}

export interface Product {
  id: number;
  productName: string;
  price: number;
  slug: string;
  images: ProductImage[];
}