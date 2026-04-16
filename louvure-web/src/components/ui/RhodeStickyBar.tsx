"use client";

import { useState, useEffect } from "react";

interface RhodeStickyProduct {
  name: string;
  price: string;
  image?: string | null;
  shades?: string[];
}

interface RhodeStickyBarProps {
  product?: RhodeStickyProduct;
  showAfterScroll?: number;
  onAddToCart?: (shade: string | null) => void;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500&display=swap');

  .rhd-sticky-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(250, 248, 245, 0.97);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 0.5px solid #ddd6cc;
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    opacity: 0;
    pointer-events: none;
  }

  .rhd-sticky-bar.visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .rhd-sticky-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    height: 76px;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .rhd-sticky-img {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
    background: #e8ddd0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rhd-sticky-img-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e8ddd0, #d4c9bc);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.2em;
    color: #8a7a6c;
  }

  .rhd-sticky-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex-shrink: 0;
  }

  .rhd-sticky-name {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 16px;
    color: #1a1a18;
    white-space: nowrap;
    letter-spacing: 0.01em;
  }

  .rhd-sticky-price {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 13px;
    color: #6b5c4e;
    letter-spacing: 0.04em;
  }

  .rhd-sticky-divider {
    width: 0.5px;
    height: 32px;
    background: #ddd6cc;
    flex-shrink: 0;
  }

  .rhd-sticky-shades {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 4px 0;
  }

  .rhd-sticky-shades::-webkit-scrollbar { display: none; }

  .rhd-sticky-shade-label {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #8a7a6c;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .rhd-shade-pill {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.06em;
    color: #6b5c4e;
    border: 0.5px solid #ccc4ba;
    background: transparent;
    border-radius: 20px;
    padding: 6px 14px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .rhd-shade-pill:hover {
    border-color: #1a1a18;
    color: #1a1a18;
  }

  .rhd-shade-pill.active {
    background: #1a1a18;
    border-color: #1a1a18;
    color: #faf8f5;
  }

  .rhd-sticky-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    margin-left: auto;
  }

  .rhd-add-btn {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    background: #1a1a18;
    color: #faf8f5;
    border: none;
    border-radius: 2px;
    padding: 0 32px;
    height: 44px;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
    white-space: nowrap;
  }

  .rhd-add-btn:hover { background: #3a3a38; }
  .rhd-add-btn:active { transform: scale(0.98); }

  .rhd-add-btn.added {
    background: #5a7a5a;
    pointer-events: none;
  }

  .rhd-close-btn {
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.3;
    transition: opacity 0.2s;
    flex-shrink: 0;
  }

  .rhd-close-btn:hover { opacity: 0.7; }

  /* Responsive */
  @media (max-width: 768px) {
    .rhd-sticky-inner {
      padding: 0 20px;
      height: 68px;
      gap: 12px;
    }
    .rhd-sticky-divider { display: none; }
    .rhd-sticky-shade-label { display: none; }
    .rhd-sticky-name { font-size: 14px; }
    .rhd-add-btn { padding: 0 20px; font-size: 10px; }
    .rhd-shade-pill { font-size: 10px; padding: 5px 10px; }
  }

  @media (max-width: 480px) {
    .rhd-sticky-shades { display: none; }
    .rhd-sticky-divider { display: none; }
  }
`;

export default function RhodeStickyBar({
  product = {
    name: "Peptide Glazing Fluid",
    price: "$29",
    image: null,
    shades: ["Unscented", "Glazed Donut", "Espresso Haze", "Salted Caramel"],
  },
  showAfterScroll = 300,
  onAddToCart,
}: RhodeStickyBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [selectedShade, setSelectedShade] = useState(
    product.shades?.length ? product.shades[0] : null
  );
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const handleScroll = () => {
      setVisible(window.scrollY > showAfterScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll, dismissed]);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart?.(selectedShade);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const hasShades = (product.shades?.length ?? 0) > 0;

  return (
    <>
      <style>{styles}</style>
      <div className={`rhd-sticky-bar${visible ? " visible" : ""}`} role="complementary" aria-label="Sticky add to cart">
        <div className="rhd-sticky-inner">

          {/* Imagen del producto */}
          <div className="rhd-sticky-img">
            {product.image ? (
              <img src={product.image} alt={product.name} width={48} height={48} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            ) : (
              <div className="rhd-sticky-img-placeholder">rh</div>
            )}
          </div>

          {/* Nombre + precio */}
          <div className="rhd-sticky-info">
            <span className="rhd-sticky-name">{product.name}</span>
            <span className="rhd-sticky-price">{product.price}</span>
          </div>

          {/* Divider */}
          {hasShades && <div className="rhd-sticky-divider" />}

          {/* Selector de shades */}
          {hasShades && (
            <div className="rhd-sticky-shades">
              <span className="rhd-sticky-shade-label">Shade</span>
              {product.shades!.map((shade) => (
                <button
                  key={shade}
                  className={`rhd-shade-pill${selectedShade === shade ? " active" : ""}`}
                  onClick={() => setSelectedShade(shade)}
                  aria-pressed={selectedShade === shade}
                >
                  {shade}
                </button>
              ))}
            </div>
          )}

          {/* Acciones */}
          <div className="rhd-sticky-actions">
            <button
              className={`rhd-add-btn${added ? " added" : ""}`}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to bag`}
            >
              {added ? "Added ✓" : "Add to bag"}
            </button>

            {/* Botón cerrar */}
            <button className="rhd-close-btn" onClick={handleDismiss} aria-label="Dismiss bar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
