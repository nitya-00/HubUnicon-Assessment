import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoCloud from "./components/LogoCloud";
import Products from "./components/Products";
import PaymentSection from "./components/PaymentSection";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function StripeApp() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Navbar />

      <main>
        <Hero />
        <LogoCloud />
        <Products />
        <PaymentSection />
        <Stats />
        <CTA />
      </main>

      <Footer />

    </div>
  );
}

export default StripeApp;