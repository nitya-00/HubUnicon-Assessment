import { useState } from "react";

function StoreNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight"
        >
          NOVA
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 text-sm md:flex">

          <a
            href="#store"
            className="transition hover:text-gray-500"
          >
            Store
          </a>

          <a
            href="#phone"
            className="transition hover:text-gray-500"
          >
            Phone
          </a>

          <a
            href="#laptop"
            className="transition hover:text-gray-500"
          >
            Laptop
          </a>

          <a
            href="#watch"
            className="transition hover:text-gray-500"
          >
            Watch
          </a>

          <a
            href="#audio"
            className="transition hover:text-gray-500"
          >
            Audio
          </a>

          <a
            href="#accessories"
            className="transition hover:text-gray-500"
          >
            Accessories
          </a>

        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">

          <button aria-label="Search">
            🔍
          </button>

          <button aria-label="Shopping bag">
            🛍️
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xl md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-5 py-6 md:hidden">

          <div className="flex flex-col gap-5 text-sm">

            <a href="#store" onClick={() => setMenuOpen(false)}>
              Store
            </a>

            <a href="#phone" onClick={() => setMenuOpen(false)}>
              Phone
            </a>

            <a href="#laptop" onClick={() => setMenuOpen(false)}>
              Laptop
            </a>

            <a href="#watch" onClick={() => setMenuOpen(false)}>
              Watch
            </a>

            <a href="#audio" onClick={() => setMenuOpen(false)}>
              Audio
            </a>

            <a href="#accessories" onClick={() => setMenuOpen(false)}>
              Accessories
            </a>

          </div>

        </div>
      )}

    </nav>
  );
}

export default StoreNavbar;