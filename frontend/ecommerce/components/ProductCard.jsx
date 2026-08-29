function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-gray-100">

      <div className="flex h-72 items-center justify-center bg-gray-200">

        <div className="text-6xl transition duration-300 group-hover:scale-110">
          {product.icon}
        </div>

      </div>

      <div className="p-6">

        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-2 text-xl font-semibold">
          {product.name}
        </h3>

        <p className="mt-2 text-gray-600">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <span className="font-semibold">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button className="rounded-full bg-black px-4 py-2 text-sm text-white">
            Buy
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;