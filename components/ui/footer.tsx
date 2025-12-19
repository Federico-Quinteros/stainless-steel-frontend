"use client";

import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-6 py-14">
        
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <span className="text-lg font-semibold tracking-tight text-gray-900">
                Stainless Steel
              </span>
            </div>

            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              Joyería de acero inoxidable hipoalergénica, duradera y elegante.
              Diseñada para acompañarte todos los días.
            </p>

              {/* Email */}
              <a
                href="mailto:stainlesssteelargentina@gmail.com"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                stainlesssteelargentina@gmail.com
              </a>

          </div>

          {/* Explorar */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Explorar
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/pedido" className="hover:text-gray-900 transition-colors">
                  Mi pedido
                </Link>
              </li>
              <li>
                <Link
                  href="https://wa.me/5493512264219?text=Hola%2C%20te%20escribo%20por%20una%20consulta"
                  className="hover:text-green-600 transition-colors"
                >
                  Comprar por WhatsApp
                </Link>
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Comunidad
            </h3>

            <p className="text-sm text-gray-600 max-w-xs">
              Seguinos en redes y enterate de nuevos productos, lanzamientos y promociones.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Link
                href="https://www.instagram.com/stainless_steel_arg/"
                aria-label="Instagram"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61585305995305" className="text-gray-500 hover:text-gray-900">
              <Facebook className="h-5 w-5" />
              </Link>

              <Link
                href="https://wa.me/5493512264219?text=Hola%2C%20te%20escribo%20por%20una%20consulta"
                aria-label="WhatsApp"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Stainless Steel Argentina · Hecho con ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}