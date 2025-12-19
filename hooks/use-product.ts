"use client";

import useSWR from "swr";
import type { Product } from "@/lib/types/product";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>(
    "/api/products", // o endpoint interno si usás route handlers
    fetcher
  );

  return {
    products: data ?? [],
    isLoading,
    error,
  };
}