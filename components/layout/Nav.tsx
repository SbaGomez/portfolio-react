"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, User, FolderGit2, Mail } from "lucide-react";
import Wordmark from "@/components/ui/Wordmark";

const LINKS = [
  { href: "/", label: "Inicio", Icon: Home },
  { href: "/sobre-mi", label: "Sobre mí", Icon: User },
  { href: "/proyectos", label: "Proyectos", Icon: FolderGit2 },
  { href: "/contacto", label: "Contacto", Icon: Mail },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sg-nav ${scrolled ? "sg-nav-scrolled" : ""}`}>
      <Link href="/" aria-label="Sebastián Gómez" className="shrink-0">
        <Wordmark />
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-1">
        {LINKS.map(({ href, label, Icon }) => {
          const activo = pathname === href || pathname === `${href}/`;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={activo ? "page" : undefined}
              className={`sg-nav-pill text-sm ${
                activo ? "sg-nav-pill-active" : "text-[var(--color-text-muted)]"
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
