// ---------- Images ----------
export interface StrapiImageFormats {
  small?: { url: string };
  medium?: { url: string };
  large?: { url: string };
}

export interface StrapiImageAttributes {
  url: string;
  formats?: StrapiImageFormats;
}

export interface StrapiImage {
  id: number;
  attributes: StrapiImageAttributes;
}

// ---------- Category ----------
export interface StrapiCategoryAttributes {
  slug: string;
  categoryName: string;
}

export interface StrapiCategory {
  id: number;
  attributes: StrapiCategoryAttributes;
}

// ---------- Product ----------
export interface StrapiProductAttributes {
  productName: string;
  description: string;
  price: number;
  slug: string;
  images?: {
    data: StrapiImage[];
  };
  category?: {
    data: StrapiCategory | null;
  };
}

export interface StrapiProduct {
  id: number;
  attributes: StrapiProductAttributes;
}

// ---------- Response ----------
export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: StrapiMeta;
}