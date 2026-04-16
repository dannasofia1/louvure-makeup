"use client";

import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/features/landing/Hero';
import ProductCatalog from '@/features/products/ProductCatalog';
import Benefits from '@/features/landing/Benefits';
import CallToAction from '@/features/landing/CallToAction';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import MobileDrawer from '@/components/layout/MobileDrawer';
import RhodeStickyBar from '@/components/ui/RhodeStickyBar';
import type { Product, CartItem } from '@/types';
import productsData from '@/data/products.json';

const products = productsData as unknown as Product[];

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Saltar al contenido principal
      </a>

      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <main id="main-content" className="flex-1">
        <Hero />
        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
        />
        <Benefits />
        <CallToAction />
      </main>

      <Footer />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        cartCount={cartCount}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <RhodeStickyBar
        product={{
          name: "Louvure Premium Makeup",
          price: "$29",
          shades: ["Opción 1", "Opción 2"],
        }}
        onAddToCart={(shade) => console.log(shade)}
      />
    </div>
  );
}
