"use client";

import { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenMobileMenu,
}: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > 80 && currentY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="mainHeader"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{
        paddingTop: '14px',
        transform: hidden ? 'translateY(-120%)' : 'translateY(0)',
        transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Liquid Glass Pill */}
      <nav
        className="relative flex items-center w-full mx-4"
        style={{
          maxWidth: '860px',
          height: '54px',
          borderRadius: '9999px',
          /* Liquid glass base */
          background: scrolled
            ? 'rgba(253, 242, 240, 0.55)'
            : 'rgba(253, 242, 240, 0.42)',
          backdropFilter: 'blur(28px) saturate(200%) brightness(1.08)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(1.08)',
          border: '1px solid rgba(255, 255, 255, 0.55)',
          boxShadow: scrolled
            ? '0 8px 32px -4px rgba(180, 79, 79, 0.12), 0 2px 8px -2px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(180,79,79,0.06)'
            : '0 4px 24px -4px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.65)',
          transition: 'background 350ms ease, box-shadow 350ms ease',
        }}
      >
        {/* Specular top highlight — liquid glass effect */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '1px',
            left: '12%',
            right: '12%',
            height: '40%',
            borderRadius: '9999px 9999px 40% 40%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── LEFT: nav links (desktop) / menu btn (mobile) ── */}
        <div className="flex items-center gap-6 pl-5 flex-1">
          {/* Mobile menu button */}
          <button
            onClick={onOpenMobileMenu}
            aria-label="Abrir menú de navegación"
            className="md:hidden p-1.5 hover:bg-primary/10 rounded-full transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-slate-700 text-[22px]">menu</span>
          </button>

          {/* Desktop nav */}
          <a
            href="#catalogo"
            className="hidden md:inline-flex items-center text-[13px] font-medium tracking-[0.06em] uppercase text-slate-700 hover:text-primary transition-colors duration-200 relative group"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Productos
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        {/* ── CENTER: Logo ── */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Louvure — Inicio">
            <img
              src="./logo.png"
              alt="Louvure Logo"
              className="h-8 w-8 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="text-[22px] tracking-tight text-slate-900 select-none"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
              }}
            >
              louvure
            </span>
          </a>
        </div>

        {/* ── RIGHT: Instagram + Cart ── */}
        <div className="flex items-center gap-2 pr-4 flex-1 justify-end">
          {/* Instagram */}
          <a
            href="https://instagram.com/louvure.col"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seguir en Instagram (@louvure.col)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 hover:bg-primary/10 rounded-full transition-colors duration-200 text-slate-700 hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px] flex-shrink-0">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span
              className="text-[12px] font-medium"
              style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.04em' }}
            >
              louvure.col
            </span>
          </a>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            aria-label="Ver carrito de compras"
            className="relative p-2 min-w-[40px] min-h-[40px] hover:bg-primary/10 rounded-full transition-colors duration-200 group flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-slate-700 group-hover:text-primary transition-colors duration-200 text-[22px]">
              shopping_bag
            </span>
            <span
              style={{
                opacity: cartCount > 0 ? 1 : 0,
                transform: cartCount > 0 ? 'scale(1)' : 'scale(0.5)',
                transition: 'opacity 250ms ease, transform 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              }}
              className="absolute top-0 right-0 -mt-0.5 -mr-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white shadow-sm"
            >
              {cartCount}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
