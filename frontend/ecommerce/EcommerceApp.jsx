import StoreNavbar from "./ecommerce/StoreNavbar";
import HeroProduct from "./ecommerce/HeroProduct";
import Categories from "./ecommerce/Categories";
import Benefits from "./ecommerce/Benefits";
import StoreFooter from "./ecommerce/StoreFooter";
import ProjectSection from "./ecommerce/ProjectSection";
import ProjectCard from "./ecommerce/ProjectCard";

function EcommerceApp() {
  return (
    <div className="min-h-screen bg-white text-gray-950">

      <StoreNavbar />

      <main>
        <HeroProduct />
        <Categories />
        <ProjectSection />
        <Benefits />
      </main>

      <StoreFooter />

    </div>
  );
}

export default EcommerceApp;