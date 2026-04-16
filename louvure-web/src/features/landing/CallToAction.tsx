"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
      gsap.fromTo('.anim-cta',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true
          }
        }
      );
    } else {
      gsap.set('.anim-cta', { opacity: 1, clearProps: 'transform' });
    }
  }, { scope: sectionRef });

  return (
    <section className="bg-background-light py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-3">
        <div
          ref={sectionRef}
          className="relative overflow-hidden rounded-3xl px-8 text-center shadow-2xl py-16"
          style={{
            background: `linear-gradient(135deg, #3E2723 0%, #5D4037 40%, #3E2723 70%, #2C1810 100%)`,
            backgroundSize: '200% 200%',
            animation: 'gradientShift 8s ease infinite',
          }}
        >
          {/* Glassmorphism ambient blobs */}
          <div
            className="ambient-orb absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(201,169,110,0.25) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="ambient-orb absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(180,79,79,0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animationDelay: '3s',
            }}
          />

          {/* Border glow overlay */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <span
              className="anim-cta inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/60"
              style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
            >
              ✦ Atención personalizada ✦
            </span>

            <h2
              className="anim-cta text-3xl lg:text-5xl font-semibold text-white leading-[1.1]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                opacity: 0,
              }}
            >
              Realiza tu pedido por Instagram
            </h2>

            <p
              className="anim-cta text-base lg:text-lg text-white/75 max-w-md leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
            >
              Nuestros pedidos se gestionan exclusivamente a través de nuestra cuenta
              de Instagram para brindarte una atención personalizada y directa.
            </p>

            <a
              className="anim-cta group inline-flex items-center gap-3 bg-white hover:bg-white/95 text-secondary px-10 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer"
              href="https://ig.me/m/louvure.col"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>Ir a Instagram</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>

            <p
              className="anim-cta text-sm font-semibold text-white/50 uppercase tracking-[0.2em]"
              style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
            >
              @louvure.col
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
