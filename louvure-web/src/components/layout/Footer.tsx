

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-primary/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-1">
          <div className="flex flex-col gap-6">
            <a className="flex items-center gap-2" href="#">
              <img
                alt="Louvure Logo"
                className="h-10 w-auto rounded-full object-cover aspect-square"
                src="./logo.png"
              />
              <span className="text-2xl font-black tracking-tighter">Louvure</span>
            </a>
            <div className="flex gap-4">
              <a
                className="size-11 min-w-[44px] min-h-[44px] rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all active:scale-95"
                aria-label="Instagram @louvure.col"
                href="https://instagram.com/louvure.col"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-black/50">
          <p>Louvure Cosmetics. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a className="hover:text-primary" href="#">
              Términos y condiciones
            </a>
            <a className="hover:text-primary" href="#">
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
