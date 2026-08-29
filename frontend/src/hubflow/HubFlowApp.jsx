import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Process from "./components/Process";
import WhyHubFlow from "./components/WhyHubFlow";
import Footer from "./components/Footer";

function HubflowApp() {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <Process />
        <WhyHubFlow />
      </main>

      <Footer />
    </div>
  );
}

export default HubflowApp;