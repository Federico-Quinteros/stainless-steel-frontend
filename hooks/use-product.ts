"use client";

import useSWR from "swr";
import { StrapiResponse, StrapiProduct } from "@/lib/types/strapi";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export function useProducts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  
  const { data, error, isLoading } = useSWR<StrapiResponse<StrapiProduct>>(
    `${API_URL}/api/products?populate=*`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    products: data?.data || [],
    isLoading,
    error,
    isEmpty: data?.meta.pagination.total === 0,
  };
}