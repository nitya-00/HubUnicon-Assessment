import { useState } from "react";

function StoreNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#store" className="text-xl font-bold tracking-tight">NOVA</a>
        <div className="hidden items-center gap-7 text-sm md:flex">
          {["Store", "Phone", "Laptop", "Watch", "Audio", "Accessories"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-gray-500">{item}</a>
          ))}
        </div>
        <div className="hidden items-center gap-5 md:flex"><button aria-label="Search">🔍</button><button aria-label="Shopping bag">🛍️</button></div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl md:hidden" aria-label="Toggle menu">{menuOpen ? "×" : "☰"}</button>
      </div>
      {menuOpen && <div className="border-t border-gray-200 bg-white px-5 py-6 md:hidden"><div className="flex flex-col gap-5 text-sm">{["Store", "Phone", "Laptop", "Watch", "Audio", "Accessories"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</div></div>}
    </nav>
  );
}

export default StoreNavbar;
