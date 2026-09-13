"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Sin unobserve: se resetea cada vez que el elemento sale del
        // viewport (para arriba o para abajo), asi que si volves al top
        // y bajas de nuevo la animacion se repite en vez de quedar
        // siempre visible desde el primer trigger.
        setVisible(entry.isIntersecting);
      },
      // threshold bajo a proposito: con elementos muy altos (ej. el
      // reglamento con muchas normas, que mide varias pantallas de alto),
      // un threshold como 0.15 pide que el 15% de TODA esa altura este
      // visible -- al tope de la pagina eso nunca se cumple, asi que el
      // contenido quedaba invisible hasta bajar. Con un numero chico
      // alcanza con que una porcion minima entre en pantalla.
      { threshold: 0.01, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sg-reveal ${visible ? "sg-reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
