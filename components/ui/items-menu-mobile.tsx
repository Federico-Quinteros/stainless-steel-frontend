"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as Popover from "@radix-ui/react-popover";

interface Category {
  id: number;
  slug: string;
  categoryName: string;
}

const ItemsMenuMobile = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="px-3 py-2 text-sm font-medium rounded-md border hover:bg-muted transition">
          Menú
        </button>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={8}
        className="w-56 rounded-xl border bg-background p-3 shadow-lg"
      >
        <nav className="flex flex-col gap-1">
          {/* Título */}
          <span className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">
            Nuestros productos
          </span>

          {loading && (
            <span className="px-2 py-2 text-sm text-muted-foreground">
              Cargando…
            </span>
          )}

          {!loading && categories.length === 0 && (
            <span className="px-2 py-2 text-sm text-muted-foreground">
              No hay categorías
            </span>
          )}

          {!loading &&
            categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="rounded-md px-3 py-2 text-sm hover:bg-muted transition"
                onClick={() => setOpen(false)}
              >
                {cat.categoryName}
              </Link>
            ))}

          {/* Divider */}
          <div className="my-2 h-px bg-border" />

          {/* Cómo comprar */}
          <Link
            href="/como-comprar"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition"
            onClick={() => setOpen(false)}
          >
            Cómo comprar
          </Link>
        </nav>
      </Popover.Content>
    </Popover.Root>
  );
};

export default ItemsMenuMobile;