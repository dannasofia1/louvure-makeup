"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MarbleBackground from '@/components/ui/MarbleBackground';

const HERO_IMAGE_URL = '/hero-model.png';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
      gsap.fromTo('.hero-svg-line', 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', yoyo: true, repeat: -1 }
      );

      const tl = gsap.timeline();

      tl.fromTo('.anim-hero', 
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.16, ease: 'power3.out' },
        0.2
      );

      tl.fromTo('.anim-hero-img',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        0.4
      );
    } else {
      gsap.set('.anim-hero, .anim-hero-img', { opacity: 1, clearProps: 'transform' });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative overflow-hidden" style={{ background: 'transparent' }}>
      <MarbleBackground />

      {/* ============================================================
          MÓVIL: imagen de fondo con overlay
          Visible solo en pantallas < lg
      ============================================================ */}
      <div className="lg:hidden relative min-h-screen flex items-end">

        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
        />

        {/* Overlay degradado — de transparente arriba a rosado oscuro abajo */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(251,239,235,0.15) 0%, rgba(180,79,79,0.35) 45%, rgba(60,20,20,0.88) 100%)',
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Contenido móvil — pegado al fondo */}
        <div className="relative z-10 w-full px-6 pb-16 pt-32 flex flex-col gap-6">

          {/* Badge */}
          <span
            className="anim-hero inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] rounded-full self-start border"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(255,220,200,0.95)',
              borderColor: 'rgba(255,180,150,0.35)',
              background: 'rgba(180,79,79,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="w-1 h-1 rounded-full bg-rose-300 inline-block" />
            Premium American Quality
          </span>

          {/* Título */}
          <h1
            className="anim-hero text-5xl font-semibold leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span className="relative inline-block">
              <span className="relative z-10">Belleza premium,</span>
              <svg
                aria-hidden="true"
                className="absolute w-[110%] h-[120%] left-[-5%] top-[-10%] z-0 pointer-events-none"
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
              >
                <path
                  className="hero-svg-line"
                  d="M 50,130 Q 250,150 450,110"
                  fill="none"
                  stroke="rgba(255,160,140,0.8)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            <span className="italic" style={{ color: 'rgba(255,190,170,0.95)' }}>
              directamente desde <em>USA</em> hasta ti.
            </span>
          </h1>

          {/* Descripción */}
          <p
            className="anim-hero text-base leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(255,235,225,0.8)',
              maxWidth: 340,
            }}
          >
            Maquillaje de alta gama a precios inmejorables. Descubre la
            sofisticación de Louvure en cada aplicación.
          </p>

          {/* Botones */}
          <div className="anim-hero flex flex-col gap-3 w-full">
            <a
              href="https://ig.me/m/louvure.col"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 text-white px-8 py-4 font-semibold text-base transition-all duration-300 active:scale-95"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: 'rgba(180,79,79,0.9)',
                backdropFilter: 'blur(12px)',
                borderRadius: 14,
                border: '1px solid rgba(255,150,130,0.3)',
              }}
            >
              <span>Pedir por Instagram</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-base transition-all duration-300 active:scale-95"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'rgba(255,235,225,0.9)',
                border: '1px solid rgba(255,200,180,0.35)',
                borderRadius: 14,
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              Ver Colección
            </a>
          </div>

          {/* Trust bar */}
          <div
            className="anim-hero flex items-center gap-4 pt-2"
            style={{ color: 'rgba(255,210,195,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
          >
            <span>✦ Envíos a Colombia</span>
            <span>✦ Originales USA</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          DESKTOP: dos columnas (texto izq / imagen der)
          Visible solo en pantallas >= lg
      ============================================================ */}
      <div className="hidden lg:flex min-h-screen items-center relative">

        {/* Ambient orbs */}
        <div
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(180,79,79,0.14) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute -bottom-20 right-[40%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full grid grid-cols-2 gap-16 items-center py-24 relative z-10">

          {/* Columna izquierda — texto */}
          <div className="flex flex-col gap-8">

            <span
              className="anim-hero inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 rounded-full self-start border border-primary/20"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-1 h-1 rounded-full bg-primary inline-block" />
              Premium American Quality
            </span>

            <h1
              className="anim-hero text-7xl xl:text-8xl font-semibold leading-[1.02] tracking-tight text-black dark:text-slate-100"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">Belleza<br />premium,</span>
                <svg
                  aria-hidden="true"
                  className="absolute w-[110%] h-[120%] left-[-5%] top-[-10%] z-0 pointer-events-none"
                  viewBox="0 0 500 150"
                  preserveAspectRatio="none"
                >
                  <path
                    className="hero-svg-line"
                    d="M 50,130 Q 250,150 450,110"
                    fill="none"
                    stroke="#b44f4f"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              <span className="text-primary italic text-6xl xl:text-7xl">
                desde <em>USA</em><br />hasta ti.
              </span>
            </h1>

            <p
              className="anim-hero text-lg text-black/55 dark:text-slate-400 leading-relaxed max-w-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Maquillaje de alta gama a precios inmejorables. Descubre la
              sofisticación de Louvure en cada aplicación.
            </p>

            <div className="anim-hero flex flex-row gap-4">
              <a
                href="https://ig.me/m/louvure.col"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 text-white px-8 py-4 font-semibold text-base shadow-xl shadow-secondary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-secondary/40 active:scale-95 bg-secondary cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 12 }}
              >
                <span>Pedir por Instagram</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2 border border-primary/25 hover:border-primary/50 hover:bg-primary/5 px-8 py-4 font-semibold text-base transition-all duration-300 text-black dark:text-slate-100 active:scale-95 cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 12 }}
              >
                Ver Colección
              </a>
            </div>

            {/* Trust bar */}
            <div
              className="anim-hero flex items-center gap-6 pt-2"
              style={{ color: '#b44f4f', fontFamily: "'DM Sans', sans-serif", fontSize: 14, opacity: 0.7 }}
            >
              <span>✦ Envíos a toda Colombia</span>
              <span>✦ Productos originales USA</span>
            </div>
          </div>

          {/* Columna derecha — imagen */}
          <div className="anim-hero-img relative flex justify-center" style={{ opacity: 0 }}>

            {/* Marco decorativo detrás */}
            <div
              className="absolute top-6 right-6 w-full h-full rounded-3xl border border-primary/15"
              style={{ background: 'rgba(180,79,79,0.04)' }}
            />

            {/* Imagen principal */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-primary/20" style={{ aspectRatio: '3/4' }}>
              <img
                src={HERO_IMAGE_URL}
                alt="Modelo Louvure"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay sutil en la imagen */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(180,79,79,0.2) 0%, transparent 50%)',
                }}
              />
            </div>



            {/* Pequeño badge superior */}
            <div
              className="absolute top-6 left-4 rounded-full px-4 py-2 shadow-lg"
              style={{
                background: 'rgba(180,79,79,0.9)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,235,225,0.95)' }}>
                ✦ USA Import
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
