"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import { usePedido } from "@/components/ui/pedido/pedido-context";

const Navbar = () => {
  const router = useRouter();
  const { totalItems } = usePedido();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4 lg:px-6">
        
        {/* Logo */}
        <h1
          onClick={() => router.push("/")}
          className="cursor-pointer text-lg font-semibold tracking-tight text-gray-900"
        >
          Stainless Steel Argentina
        </h1>

        {/* Desktop menu */}
        <nav className="hidden sm:flex">
          <MenuList />
        </nav>

        {/* Mobile menu */}
        <div className="flex sm:hidden">
          <ItemsMenuMobile />
        </div>

        {/* Actions */}
        <div className="relative flex items-center">
          <button
            onClick={() => router.push("/pedido")}
            className="relative rounded-md p-2 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Ver pedido"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />

            {/* Contador */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gray-900 px-1 text-[11px] font-medium text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;