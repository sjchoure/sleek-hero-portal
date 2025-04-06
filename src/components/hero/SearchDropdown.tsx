
import { motion, AnimatePresence } from "framer-motion";
import { Filter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterButtons from "./FilterButtons";
import EventItem from "./EventItem";
import { EventData } from "./types";

interface SearchDropdownProps {
  isVisible: boolean;
  raceTypes: string[];
  distances: string[];
  selectedRaceType: string | null;
  selectedDistance: string | null;
  toggleRaceType: (type: string) => void;
  toggleDistance: (distance: string) => void;
  filteredEvents: EventData[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  handleSearch: () => void;
}

const SearchDropdown = ({ 
  isVisible, 
  raceTypes, 
  distances, 
  selectedRaceType, 
  selectedDistance,
  toggleRaceType,
  toggleDistance,
  filteredEvents,
  favorites,
  toggleFavorite,
  handleSearch
}: SearchDropdownProps) => {
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 right-0 mt-2 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl z-10"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-white/80 font-medium">Quick Filters</p>
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-white/60" />
                <span className="text-xs text-white/60">Filter events</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Race Types */}
              <FilterButtons 
                options={raceTypes}
                selectedOption={selectedRaceType}
                onToggle={toggleRaceType}
                label="Race Type"
              />
              
              {/* Distances */}
              <FilterButtons
                options={distances}
                selectedOption={selectedDistance}
                onToggle={toggleDistance}
                label="Distance"
              />
            </div>
            
            {/* Popular Events */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-white/80 font-medium">
                  {filteredEvents.length > 0 ? 'Matching Events' : 'No matching events'}
                </p>
                {filteredEvents.length > 0 && (
                  <Button 
                    variant="link" 
                    className="p-0 h-6 text-xs text-ironman-red"
                    onClick={handleSearch}
                  >
                    View All
                  </Button>
                )}
              </div>
              
              <div className="max-h-[280px] overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
                {filteredEvents.map((event) => (
                  <EventItem 
                    key={event.id}
                    event={event}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDropdown;
