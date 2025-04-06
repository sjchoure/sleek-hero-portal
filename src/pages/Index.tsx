
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedEvents from "../components/FeaturedEvents";
import NewsGrid from "../components/NewsGrid";
import Footer from "../components/Footer";
import UserFeedbackSection from "../components/UserFeedbackSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-ironman-dark">
      <Navbar />
      <Hero />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <FeaturedEvents />
        <UserFeedbackSection />
        <NewsGrid />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Index;
