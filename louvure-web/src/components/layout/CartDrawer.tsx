"use client";

import type { CartItem } from '@/types';
import { formatPrice } from '@/utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  cartCount: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  cartCount,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  return (
    <>
      <div
        id="cartOverlay"
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      ></div>
      <aside
        id="cartSidebar"
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-slate-900 z-[70] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col border-l border-primary/10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-5 border-b border-primary/10 flex items-center justify-between bg-white dark:bg-slate-900/95 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">
              shopping_cart_checkout
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Tu Pedido
            </h2>
            <span
              id="cartHeaderCount"
              className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full ml-1"
            >
              {cartCount}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div
          id="cartItemsContainer"
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {cartItems.length === 0 ? (
            <div
              id="emptyCartMessage"
              className="flex flex-col items-center justify-center h-full text-center opacity-70"
            >
              <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">
                shopping_bag
              </span>
              <p className="text-slate-500 dark:text-slate-400 font-medium pb-20">
                Tu carrito de deseos
                <br />
                está vacío por ahora.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30"
              >
                <img
                  src={item.product.image}
                  className="w-20 h-20 object-cover rounded-lg bg-white"
                  alt={item.product.name}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-primary font-black text-sm mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="text-slate-400 hover:text-primary transition-colors text-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          remove
                        </span>
                      </button>
                      <span className="font-bold text-sm min-w-[1ch] text-center text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="text-slate-400 hover:text-primary transition-colors text-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          add
                        </span>
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-400 hover:text-red-500 transition-colors bg-red-50 dark:bg-red-900/10 p-1.5 rounded-lg"
                      aria-label="Eliminar producto"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-primary/10 bg-slate-50 dark:bg-slate-900/90 p-6 sticky bottom-0 z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-slate-500 font-medium">Total Estimado</span>
            <span id="cartTotal" className="text-2xl font-black text-primary">
              {formatPrice(cartTotal)}
            </span>
          </div>

          {cartItems.length > 0 ? (
            <a
              href={`https://ig.me/m/louvure.col`}
              id="checkoutBtn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-primary/30 opacity-100 cursor-pointer bg-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>Enviar Pedido por Instagram</span>
            </a>
          ) : (
            <div className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl shadow-lg transition-all opacity-50 pointer-events-none bg-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>Enviar Pedido por Instagram</span>
            </div>
          )}
          <p className="text-center text-slate-400 text-xs mt-4">
            No se requiere tarjeta de crédito
          </p>
        </div>
      </aside>
    </>
  );
}
