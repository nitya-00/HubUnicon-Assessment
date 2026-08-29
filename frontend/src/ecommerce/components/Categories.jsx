const categories = [
  { name: "Phone", icon: "📱" },
  { name: "Laptop", icon: "💻" },
  { name: "Watch", icon: "⌚" },
  { name: "Audio", icon: "🎧" },
  { name: "Accessories", icon: "🔌" },
];

function Categories() {
  return (
    <section id="phone" className="bg-white px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold">Shop NOVA</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <button key={category.name} className="flex flex-col items-center rounded-2xl bg-gray-100 p-7 transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-4xl">{category.icon}</span>
              <span className="mt-4 font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
