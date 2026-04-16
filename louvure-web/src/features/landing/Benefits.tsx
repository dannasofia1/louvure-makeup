"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
      gsap.fromTo('.anim-benefit',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    } else {
      gsap.set('.anim-benefit', { opacity: 1, clearProps: 'transform' });
    }
  }, { scope: sectionRef });


  const benefits = [
    {
      icon: 'flight_takeoff',
      title: 'Importado de EE.UU.',
      desc: 'Productos auténticos de las mejores marcas americanas directos a tu puerta.',
    },
    {
      icon: 'sell',
      title: 'Mejores Precios',
      desc: 'Calidad premium sin los precios inflados. Lujo accesible para ti.',
    },
    {
      icon: 'verified_user',
      title: 'Envío Seguro',
      desc: 'Garantizamos que tus productos lleguen en perfecto estado en tiempo récord.',
    },
  ];

  return (
    <section className="py-20 dark:bg-slate-950/20 bg-background-light relative overflow-hidden">
      {/* Soft radial accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 120%, rgba(180,79,79,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16"
          id="benefitsSection"
        >
          {benefits.map((b) => (
            <div key={b.title} className="anim-benefit flex flex-col items-center text-center gap-5">
              {/* Glassmorphism icon container */}
              <div
                className="size-20 rounded-2xl flex items-center justify-center text-primary"
                style={{
                  background: 'rgba(180, 79, 79, 0.08)',
                  border: '1px solid rgba(180, 79, 79, 0.2)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 24px -4px rgba(180, 79, 79, 0.15)',
                }}
              >
                <span className="material-symbols-outlined text-4xl">{b.icon}</span>
              </div>
              <h3
                className="text-2xl font-semibold text-slate-900 dark:text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {b.title}
              </h3>
              <p
                className="text-black/50 dark:text-slate-400 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
