import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Process from './components/Process';
import WhyHubFlow from './components/WhyHubFlow';

function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] text-black">
      <Navbar />
      <Hero />
      <WhyHubFlow />
      <Process />
      <Footer />
    </div>
  );
}

export default App;