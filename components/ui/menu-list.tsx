"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Category {
  id: number;
  slug: string;
  categoryName: string;
}

export default function MenuList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const ref = useRef<HTMLLIElement>(null);

  // Fetch categorías
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((res) => res.json())
      .then((json) => {
        if (!json?.data) {
          setCategories([]);
          return;
        }

        const normalized: Category[] = json.data
          .filter(
            (item: any) =>
              item &&
              typeof item.id === "number" &&
              typeof item.slug === "string" &&
              typeof item.categoryName === "string"
          )
          .map((item: any) => ({
            id: item.id,
            slug: item.slug,
            categoryName: item.categoryName,
          }));

        setCategories(normalized);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Click afuera cierra
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <ul className="flex items-center gap-8">
      <li
        ref={ref}
        className="relative"
        onMouseEnter={() => setOpen(true)}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 text-sm font-medium hover:text-muted-foreground transition"
        >
          Nuestros productos
          <span
            className={`text-xs transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {open && (
          <ul className="absolute left-0 top-full z-50 mt-3 min-w-[220px] rounded-xl border bg-background shadow-lg overflow-hidden">
            {loading && (
              <li className="px-4 py-2 text-sm text-muted-foreground">
                Cargando categorías…
              </li>
            )}

            {!loading && categories.length === 0 && (
              <li className="px-4 py-2 text-sm text-muted-foreground">
                No hay categorías
              </li>
            )}

            {!loading &&
              categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="block px-4 py-2 text-sm hover:bg-muted transition"
                    onClick={() => setOpen(false)}
                  >
                    {cat.categoryName}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </li>

      <li>
        <Link
          href="/como-comprar"
          className="text-sm font-medium hover:text-muted-foreground transition"
        >
          Cómo comprar
        </Link>
      </li>
    </ul>
  );
}