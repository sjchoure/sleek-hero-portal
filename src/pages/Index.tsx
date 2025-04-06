import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedEvents from "../components/FeaturedEvents";
import NewsGrid from "../components/NewsGrid";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-ironman-dark">
      <Navbar />
      <Hero />
      <FeaturedEvents />
      <NewsGrid />
      <Footer />
    </div>
  );
};

export default Index;