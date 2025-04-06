
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SearchDropdown from "./SearchDropdown";
import { EventData } from "./types";

const filterPillVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { type: "spring", stiffness: 200, damping: 10 }
};

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedRaceType: string | null;
  setSelectedRaceType: (value: string | null) => void;
  selectedDistance: string | null;
  setSelectedDistance: (value: string | null) => void;
  handleSearch: () => void;
  favorites: number[];
  setFavorites: (value: number[]) => void;
  popularEvents: EventData[];
}

const SearchBar = ({
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
}: SearchBarProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const raceTypes = ["Triathlon", "Duathlon", "SwimRun", "Aquathlon"];
  const distances = ["Sprint", "Olympic", "Half Iron", "Full Iron"];

  const filteredEvents = selectedRaceType || selectedDistance 
    ? popularEvents.filter(event => 
        (!selectedRaceType || event.type === selectedRaceType) && 
        (!selectedDistance || event.distance === selectedDistance)
      )
    : popularEvents;

  const toggleRaceType = (type: string) => {
    setSelectedRaceType(selectedRaceType === type ? null : type);
  };

  const toggleDistance = (distance: string) => {
    setSelectedDistance(selectedDistance === distance ? null : distance);
  };

  const toggleFavorite = (eventId: number) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <motion.div variants={filterPillVariants} className="mb-8">
      <div className="flex flex-wrap gap-2 mb-4">
        <AnimatePresence>
          {selectedRaceType && (
            <motion.div
              key="race-type-pill"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={filterPillVariants}
            >
              <Badge 
                variant="outline" 
                className="bg-ironman-red text-white border-none flex items-center gap-1"
              >
                {selectedRaceType}
                <button 
                  className="ml-1 hover:text-white/70" 
                  onClick={() => setSelectedRaceType(null)}
                >
                  ✕
                </button>
              </Badge>
            </motion.div>
          )}
          
          {selectedDistance && (
            <motion.div
              key="distance-pill"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={filterPillVariants}
            >
              <Badge 
                variant="outline" 
                className="bg-ironman-red text-white border-none flex items-center gap-1"
              >
                {selectedDistance}
                <button 
                  className="ml-1 hover:text-white/70" 
                  onClick={() => setSelectedDistance(null)}
                >
                  ✕
                </button>
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="relative flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Search for events..."
            className="w-full px-6 py-4 pr-12 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-ironman-red/50 transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
        </div>
        
        <motion.button
          onClick={handleSearch}
          className="bg-ironman-red hover:bg-red-600 text-white px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 md:w-auto w-full"
          whileHover={{ gap: "12px" }}
        >
          Find Race
          <motion.span
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <ArrowRight size={18} />
          </motion.span>
        </motion.button>
      </div>

      <SearchDropdown 
        isVisible={isSearchFocused}
        raceTypes={raceTypes}
        distances={distances}
        selectedRaceType={selectedRaceType}
        selectedDistance={selectedDistance}
        toggleRaceType={toggleRaceType}
        toggleDistance={toggleDistance}
        filteredEvents={filteredEvents}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handleSearch={handleSearch}
      />
    </motion.div>
  );
};

export default SearchBar;
