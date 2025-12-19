import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { PedidoProvider } from "@/components/ui/pedido/pedido-context";
import { ToastProvider } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stainless Steel",
  description: "Stainless Steel Argentina",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${urbanist.variable} antialiased bg-white text-gray-900`}>
        <ToastProvider>
          <PedidoProvider>
            {/* Navbar */}
            <Navbar />

            {/* Contenido principal */}
            <main className="mx-auto w-full max-w-[1280px] px-4 lg:px-6">
              {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Toasts */}
            <Toaster />
          </PedidoProvider>
        </ToastProvider>
      </body>
    </html>
  );
}