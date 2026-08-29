import Benefits from "./components/Benefits";
import Categories from "./components/Categories";
import FeaturedProduct from "./components/FeaturedProduct";
import HeroProduct from "./components/HeroProduct";
import ProductGrid from "./components/ProductGrid";
import StoreFooter from "./components/StoreFooter";
import StoreNavbar from "./components/StoreNavbar";

function EcommerceApp() {
  return (
    <div className="bg-white text-black">
      <StoreNavbar />
      <main>
        <HeroProduct />
        <Categories />
        <FeaturedProduct />
        <ProductGrid />
        <Benefits />
      </main>
      <StoreFooter />
    </div>
  );
}

export default EcommerceApp;
