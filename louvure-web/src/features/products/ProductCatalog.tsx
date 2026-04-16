"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/format';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
}

export default function ProductCatalog({
  products,
  onAddToCart,
}: ProductCatalogProps) {
  const [currentCategory, setCurrentCategory] = useState<string>('Todos');
  const [gridKey, setGridKey] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const filterRef = useRef<string>('Todos');

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);
  const gridRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal: observe each product card as it enters the viewport
  const observeCards = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.product-card'));
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Re-run observer when grid re-renders (category change)
  useEffect(() => {
    // Small delay so cards are in DOM before observing
    const timeout = setTimeout(() => observeCards(), 60);
    return () => clearTimeout(timeout);
  }, [gridKey, observeCards]);

  const categories = useMemo(() => {
    return ['Todos', ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      return currentCategory === 'Todos' || p.category === currentCategory;
    });
  }, [products, currentCategory]);

  const handleCategoryChange = (cat: string) => {
    if (cat === filterRef.current) return;
    filterRef.current = cat;
    setCurrentCategory(cat);
    setGridKey((k) => k + 1); // re-trigger entrance animations
  };

  return (
    <>
      {/* Category Filters */}
      <div
        id="categoryFilters"
        className="flex gap-3 px-6 md:px-10 py-10 overflow-x-auto no-scrollbar max-w-7xl mx-auto w-full"
      >
        {categories.map((category, i) => {
          const isActive = currentCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className="filter-pill whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1"
              style={{
                /* Liquid glass base */
                fontFamily: "'Jost', sans-serif",
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '8px 20px',
                borderRadius: '9999px',
                position: 'relative',
                cursor: 'pointer',
                /* Scroll-reveal */
                opacity: 0,
                transform: 'translateY(12px)',
                transition: `opacity 400ms cubic-bezier(0.16,1,0.3,1) ${i * 50}ms, transform 400ms cubic-bezier(0.16,1,0.3,1) ${i * 50}ms, background 200ms ease, box-shadow 200ms ease`,
                /* Glass */
                backdropFilter: 'blur(20px) saturate(170%)',
                WebkitBackdropFilter: 'blur(20px) saturate(170%)',
                ...(isActive
                  ? {
                      background: 'rgba(180, 79, 79, 0.82)',
                      color: '#fff',
                      border: '1px solid rgba(255,160,140,0.50)',
                      boxShadow:
                        '0 4px 18px -4px rgba(180,79,79,0.38), inset 0 1px 0 rgba(255,200,185,0.55)',
                    }
                  : {
                      background: 'rgba(253, 230, 225, 0.52)',
                      color: '#b44f4f',
                      border: '1px solid rgba(255,200,185,0.55)',
                      boxShadow:
                        '0 2px 10px -3px rgba(180,79,79,0.10), inset 0 1px 0 rgba(255,255,255,0.65)',
                    }),
              }}
              ref={(el) => {
                if (el) {
                  // Trigger reveal on mount (filter bar is always visible)
                  requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                  });
                }
              }}
            >
              {category}
            </button>
          );
        })}
      </div>


      {/* Catalog Section */}
      <section
        className="pb-28"
        id="catalogo"
        style={{ background: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-14 border-l-4 border-primary pl-6">
            <div className="flex flex-col gap-2">
              <span
                className="text-primary font-semibold tracking-[0.2em] uppercase text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Exclusividad Americana
              </span>
              <h2
                className="text-black dark:text-slate-100 text-5xl lg:text-6xl font-semibold leading-[1.1]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Nuestro Catálogo
              </h2>
              <p
                className="text-black/50 dark:text-slate-400 text-lg max-w-xl mt-1 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Descubre el lujo del maquillaje premium importado directamente de
                USA. Belleza exclusiva seleccionada para resaltar tu esencia natural.
              </p>
            </div>
          </div>

          {/* Product Grid */}
          <div
            key={gridKey}
            id="productGrid"
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <span
                  className="material-symbols-outlined text-5xl text-primary/30 mb-4 block"
                  aria-hidden="true"
                >
                  search_off
                </span>
                <p
                  className="text-slate-400 text-lg"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  No se encontraron productos que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="product-card group relative rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    /* Initial hidden state — IntersectionObserver will reveal */
                    opacity: 0,
                    transform: `translateY(32px) scale(0.97)`,
                    transition: `opacity 550ms cubic-bezier(0.16,1,0.3,1) ${index * 70}ms, transform 550ms cubic-bezier(0.16,1,0.3,1) ${index * 70}ms`,
                    boxShadow: '0 4px 24px -4px rgba(0,0,0,0.10), 0 1px 4px -1px rgba(180,79,79,0.08)',
                  }}
                >
                  {/* Full-bleed image */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-background-light dark:bg-slate-900">
                    <div
                      className="card-image-inner absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    />
                    {/* Subtle gradient veil at bottom for readability */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(30,15,15,0.18) 0%, transparent 45%)',
                      }}
                    />
                    {/* Hover overlay */}
                    <div className="card-overlay absolute inset-0 pointer-events-none" />
                    {product.badge && (
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-md ${
                          product.badgeColor || 'bg-white/80 text-primary backdrop-blur-sm'
                        }`}
                      >
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Liquid Glass Info Panel */}
                  <div
                    className="relative flex flex-col p-5"
                    style={{
                      background: 'rgba(253, 242, 240, 0.62)',
                      backdropFilter: 'blur(24px) saturate(180%) brightness(1.06)',
                      WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(1.06)',
                      borderTop: '1px solid rgba(255,255,255,0.60)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.68)',
                    }}
                  >
                    {/* Specular top highlight */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '8%',
                        right: '8%',
                        height: '38%',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    <h3
                      className="text-slate-900 text-xl group-hover:text-primary transition-colors duration-200 mb-0.5"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 300,
                        fontStyle: 'italic',
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-slate-500 text-[12px] mb-4 leading-relaxed"
                      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                    >
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <p
                        className="text-primary text-2xl"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontWeight: 400,
                          fontStyle: 'italic',
                        }}
                      >
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Product Popup Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all animate-in fade-in duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#fdf2f0] dark:bg-slate-900 rounded-3xl overflow-hidden max-w-sm sm:max-w-md w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid rgba(255,255,255,0.4)' }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white backdrop-blur-md rounded-full shadow-sm text-slate-800 transition-colors"
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar detalles"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Product Image */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden bg-white/50">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedProduct.image}')` }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(30,15,15,0.22) 0%, transparent 45%)',
                }}
              />
              {selectedProduct.badge && (
                <div
                  className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-md ${
                    selectedProduct.badgeColor || 'bg-white/85 text-primary backdrop-blur-sm'
                  }`}
                >
                  {selectedProduct.badge}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 sm:p-8 shrink-0">
              <span
                className="text-primary/80 font-semibold tracking-[0.2em] uppercase text-[10px] mb-2 block"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {selectedProduct.category}
              </span>
              <h3
                className="text-slate-900 text-2xl sm:text-3xl mb-3 leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 400,
                  fontStyle: 'italic',
                }}
              >
                {selectedProduct.name}
              </h3>
              <p
                className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed mb-8"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
              >
                {selectedProduct.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <p
                  className="text-primary text-3xl"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 400,
                    fontStyle: 'italic',
                  }}
                >
                  {formatPrice(selectedProduct.price)}
                </p>
                <button
                  onClick={() => {
                    onAddToCart(selectedProduct.id);
                    setSelectedProduct(null);
                  }}
                  className="flex items-center gap-2 text-white py-3 px-6 rounded-full active:scale-95 transition-all duration-200 cursor-pointer"
                  aria-label={`Añadir ${selectedProduct.name} al carrito`}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: 'rgba(62, 39, 35, 0.95)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 12px -2px rgba(62,39,35,0.4)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(62,39,35,1)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(62, 39, 35, 0.95)')}
                >
                  <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

