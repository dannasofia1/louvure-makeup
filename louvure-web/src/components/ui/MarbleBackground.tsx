export default function MarbleBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Capa 1 — base rosa crema */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #fdf0f5ff 0%, #fce4f7ff 40%, #fbb7d1ff 60%, #fbb7d1ff 100%)',
      }} />

      {/* Capa 2 — venas SVG principales */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="mv1" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.006" numOctaves="6" seed="15" result="n" />
            <feColorMatrix type="matrix" in="n"
              values="0 0 0 0 0.78
                      0 0 0 0 0.52
                      0 0 0 0 0.50
                      0 0 0 18 -10"
            />
          </filter>
          <filter id="mv2" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.008 0.022" numOctaves="4" seed="33" result="n2" />
            <feColorMatrix type="matrix" in="n2"
              values="0 0 0 0 0.72
                      0 0 0 0 0.40
                      0 0 0 0 0.40
                      0 0 0 22 -14"
            />
          </filter>
          <radialGradient id="vfade" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="0.0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0.9" />
          </radialGradient>
          <mask id="vmask">
            <rect width="100%" height="100%" fill="url(#vfade)" />
          </mask>
        </defs>

        {/* Venas principales */}
        <rect width="100%" height="100%" fill="transparent"
          filter="url(#mv1)" opacity="0.10" mask="url(#vmask)" />

        {/* Venas secundarias más finas */}
        <rect width="100%" height="100%" fill="transparent"
          filter="url(#mv2)" opacity="0.20" mask="url(#vmask)" />
      </svg>

      {/* Capa 3 — orbs de color encima */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 70% 50% at 15% 10%, rgba(201,130,120,0.13) 0%, transparent 20%),
          radial-gradient(ellipse 55% 45% at 85% 5%,  rgba(255,200,185,0.11) 0%, transparent 20%),
          radial-gradient(ellipse 65% 50% at 10% 90%, rgba(180,79,79,0.08)   0%, transparent 20%),
          radial-gradient(ellipse 50% 40% at 90% 85%, rgba(201,169,110,0.09) 0%, transparent 20%)
        `,
      }} />
    </div>
  );
}
