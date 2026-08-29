import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-[#f5f5f0]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

        {/* Logo */}
        <a
          href="#"
          className="text-xl font-black tracking-[-0.05em]"
        >
          HUBFLOW
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#home"
            className="text-sm transition hover:opacity-50"
          >
            Home
          </a>

          <a
            href="#systems"
            className="text-sm transition hover:opacity-50"
          >
            Systems
          </a>

          <a
            href="#services"
            className="text-sm transition hover:opacity-50"
          >
            Services
          </a>

          <a
            href="#process"
            className="text-sm transition hover:opacity-50"
          >
            Process
          </a>

          <a
            href="#contact"
            className="text-sm transition hover:opacity-50"
          >
            Contact
          </a>

        </div>

        {/* Contact Button */}
          <a
            href="/dashboard"
            className="hidden rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 md:block"
          >
          Open Dashboard
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl md:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-black/10 bg-[#f5f5f0] px-6 py-6 md:hidden">

          <div className="flex flex-col gap-6">

            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>

            <a
              href="#systems"
              onClick={() => setMenuOpen(false)}
            >
              Systems
            </a>

            <a
              href="#services"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>

            <a
              href="#process"
              onClick={() => setMenuOpen(false)}
            >
              Process
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;
