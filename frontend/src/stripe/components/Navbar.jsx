import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute left-0 top-0 z-50 w-full text-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        {/* Logo */}
        <a href="/stripe" className="text-2xl font-bold tracking-tight">
          stripe
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium lg:flex">

          <a href="#products" className="hover:text-gray-300">
            Products
          </a>

          <a href="#solutions" className="hover:text-gray-300">
            Solutions
          </a>

          <a href="#developers" className="hover:text-gray-300">
            Developers
          </a>

          <a href="#resources" className="hover:text-gray-300">
            Resources
          </a>

          <a href="#pricing" className="hover:text-gray-300">
            Pricing
          </a>

        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">

          <button className="text-sm font-medium hover:text-gray-300">
            Sign in
          </button>

          <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-200">
            Contact sales
          </button>

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl lg:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? "×" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mx-4 rounded-2xl bg-white p-6 text-gray-900 shadow-xl lg:hidden">

          <div className="flex flex-col gap-5">

            <a href="#products" onClick={() => setMenuOpen(false)}>
              Products
            </a>

            <a href="#solutions" onClick={() => setMenuOpen(false)}>
              Solutions
            </a>

            <a href="#developers" onClick={() => setMenuOpen(false)}>
              Developers
            </a>

            <a href="#resources" onClick={() => setMenuOpen(false)}>
              Resources
            </a>

            <a href="#pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </a>

            <hr />

            <button className="text-left">
              Sign in
            </button>

            <button className="rounded-full bg-gray-900 px-5 py-3 text-white">
              Contact sales
            </button>

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;