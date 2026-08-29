import ProductCard from "./ProductCard";

const products = [
  { name: "NOVA Watch S", category: "Watch", description: "A smarter way to stay connected.", price: 29999, icon: "⌚" },
  { name: "NOVA Pods", category: "Audio", description: "Immersive sound, all day long.", price: 8999, icon: "🎧" },
  { name: "NOVA Book Air", category: "Laptop", description: "Lightweight performance for work anywhere.", price: 74999, icon: "💻" },
];

function ProductGrid() {
  return (
    <section id="watch" className="bg-white px-5 py-20">
      <div className="mx-auto max-w-6xl"><h2 className="text-center text-3xl font-bold">Explore the lineup</h2><div className="mt-12 grid gap-6 md:grid-cols-3">{products.map((product) => <ProductCard key={product.name} product={product} />)}</div></div>
    </section>
  );
}

export default ProductGrid;
