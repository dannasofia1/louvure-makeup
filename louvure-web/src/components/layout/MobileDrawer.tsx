"use client";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <>
      <div
        id="mobileDrawerOverlay"
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[55] backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      ></div>
      <aside
        id="mobileDrawer"
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 z-[65] shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col border-r border-primary/10 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-5 border-b border-primary/10 flex items-center justify-between">
          <a className="flex items-center gap-2" href="#">
            <img
              alt="Louvure Logo"
              className="h-9 w-9 rounded-full object-cover"
              src="./logo.png"
              width="36"
              height="36"
            />
            <span className="text-xl font-extrabold tracking-tight">Louvure</span>
          </a>
          <button
            id="closeDrawerBtn"
            aria-label="Cerrar menú de navegación"
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] hover:bg-primary/10 rounded-full transition-colors text-slate-500 hover:text-primary"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex flex-col p-6 gap-2">
          <a
            href="#catalogo"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:text-primary font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-xl">grid_view</span>
            Productos
          </a>
          <a
            href="https://instagram.com/louvure.col"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:text-primary font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-xl">photo_camera</span>
            Instagram
          </a>
        </nav>
        <div className="mt-auto p-6 border-t border-primary/10">
          <a
            href="https://ig.me/m/louvure.col"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-full bg-secondary hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Pedir por Instagram
          </a>
        </div>
      </aside>
    </>
  );
}
