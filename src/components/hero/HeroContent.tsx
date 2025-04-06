
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import HeroFeatures from "./HeroFeatures";
import { EventData } from "./types";

interface HeroContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRaceType: string | null;
  setSelectedRaceType: (type: string | null) => void;
  selectedDistance: string | null;
  setSelectedDistance: (distance: string | null) => void;
  handleSearch: () => void;
  favorites: number[];
  setFavorites: (favorites: number[]) => void;
  popularEvents: EventData[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const HeroContent = ({
  searchQuery,
  setSearchQuery,
  selectedRaceType,
  setSelectedRaceType,
  selectedDistance,
  setSelectedDistance,
  handleSearch,
  favorites,
  setFavorites,
  popularEvents
}: HeroContentProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-6xl font-bold text-white mb-6"
      >
        Less Work. <span className="text-ironman-red">More Racing.</span>
      </motion.h1>
      
      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-white/90 mb-8"
      >
        Discover, register, and prepare for multisport events with our athlete-centered platform.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRaceType={selectedRaceType}
          setSelectedRaceType={setSelectedRaceType}
          selectedDistance={selectedDistance}
          setSelectedDistance={setSelectedDistance}
          handleSearch={handleSearch}
          favorites={favorites}
          setFavorites={setFavorites}
          popularEvents={popularEvents}
        />
      </motion.div>
      
      <HeroFeatures />
    </motion.div>
  );
};

export default HeroContent;
