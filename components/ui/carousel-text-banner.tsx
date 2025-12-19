"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const messages = [
  "✨ Envío gratis en compras +$400",
  "💍 Aros hipoalergénicos en acero 316L para usar todos los días",
  "🎁 Personalizamos dijes con nombre o fecha",
  "🛡️ Garantía de 1 año en todos nuestros productos",
];

export function CarouselTextBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrentIndex((i) => (i + 1) % messages.length),
    []
  );

  const prev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + messages.length) % messages.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className="w-full border-b bg-muted/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-[1280px] px-4 lg:px-6">
        <div className="relative overflow-hidden">
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {messages.map((text, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 py-4 flex justify-center items-center"
              >
                <p className="text-sm md:text-base font-medium text-muted-foreground tracking-tight">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Flechas */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-1.5 pb-3">
          {messages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === currentIndex ? "bg-foreground" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}