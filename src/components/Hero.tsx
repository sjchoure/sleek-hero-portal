
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, MapPin, Calendar, Heart, Filter, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  const raceTypes = ["Triathlon", "Duathlon", "SwimRun", "Aquathlon"];
  const distances = ["Sprint", "Olympic", "Half Iron", "Full Iron"];
  const [selectedRaceType, setSelectedRaceType] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);

  const popularEvents = [
    {
      id: 1,
      name: "IRONMAN World Championship",
      location: "Kona, Hawaii",
      date: "October 2024",
      type: "Triathlon",
      distance: "Full Iron",
      trending: true
    },
    {
      id: 2,
      name: "IRONMAN 70.3 World Championship",
      location: "Taupo, New Zealand",
      date: "December 2024",
      type: "Triathlon",
      distance: "Half Iron",
      trending: true
    },
    {
      id: 3,
      name: "IRONMAN European Championship",
      location: "Frankfurt, Germany",
      date: "June 2024",
      type: "Triathlon",
      distance: "Full Iron",
      trending: false
    },
    {
      id: 4,
      name: "IRONMAN African Championship",
      location: "Port Elizabeth, South Africa",
      date: "March 2024",
      type: "Triathlon",
      distance: "Full Iron",
      trending: false
    },
    {
      id: 5,
      name: "IRONMAN Asia-Pacific Championship",
      location: "Cairns, Australia",
      date: "June 2024",
      type: "Triathlon",
      distance: "Full Iron",
      trending: false
    },
    {
      id: 6,
      name: "IRONMAN North American Championship",
      location: "The Woodlands, Texas",
      date: "April 2024",
      type: "Triathlon",
      distance: "Full Iron",
      trending: false
    }
  ];

  const filteredEvents = selectedRaceType || selectedDistance 
    ? popularEvents.filter(event => 
        (!selectedRaceType || event.type === selectedRaceType) && 
        (!selectedDistance || event.distance === selectedDistance)
      )
    : popularEvents;

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

  const backgroundVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const eventItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const filterPillVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: "spring", stiffness: 200, damping: 10 }
  };

  const handleSearch = () => {
    navigate("/events", { state: { searchQuery, raceType: selectedRaceType, distance: selectedDistance } });
  };

  const toggleRaceType = (type: string) => {
    setSelectedRaceType(selectedRaceType === type ? null : type);
  };

  const toggleDistance = (distance: string) => {
    setSelectedDistance(selectedDistance === distance ? null : distance);
  };

  return (
    <div className="relative h-screen">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={backgroundVariants}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ironman-dark to-black/50">
          <motion.div className="absolute inset-0">
            <iframe 
              src="https://drive.google.com/file/d/10tydhnleEUyOmAyIY1Z1N6QonnCGdezf/preview" 
              className="absolute inset-0 w-full h-full"
              allow="autoplay"
              style={{ pointerEvents: "none" }}
              frameBorder="0"
            ></iframe>
            {/* Add a script to automatically play the video and hide controls */}
            <div 
              dangerouslySetInnerHTML={{ 
                __html: `
                  <script>
                    window.onload = function() {
                      const iframe = document.querySelector('iframe');
                      if (iframe && iframe.contentWindow) {
                        // Try to find and autoplay the video within the iframe
                        const message = JSON.stringify({
                          event: 'command',
                          func: 'playVideo'
                        });
                        iframe.contentWindow.postMessage(message, '*');
                      }
                    }
                  </script>
                `
              }}
            />
          </motion.div>
        </div>
      </motion.div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
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
          
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
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

            <AnimatePresence>
              {isSearchFocused && (
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
                      <div>
                        <label className="text-xs text-white/60 block mb-2">Race Type</label>
                        <div className="flex flex-wrap gap-2">
                          {raceTypes.map(type => (
                            <motion.button
                              key={type}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleRaceType(type)}
                              className={`px-3 py-1.5 rounded-md text-sm ${
                                selectedRaceType === type 
                                  ? 'bg-ironman-red text-white' 
                                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                              }`}
                            >
                              {type}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Distances */}
                      <div>
                        <label className="text-xs text-white/60 block mb-2">Distance</label>
                        <div className="flex flex-wrap gap-2">
                          {distances.map(dist => (
                            <motion.button
                              key={dist}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleDistance(dist)}
                              className={`px-3 py-1.5 rounded-md text-sm ${
                                selectedDistance === dist 
                                  ? 'bg-ironman-red text-white' 
                                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                              }`}
                            >
                              {dist}
                            </motion.button>
                          ))}
                        </div>
                      </div>
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
                          <motion.div
                            key={event.id}
                            variants={eventItemVariants}
                            whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                            className="rounded-lg p-3 cursor-pointer transition-colors relative group"
                            onClick={() => navigate(`/event/${event.id}`)}
                          >
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFavorites(prev => 
                                  prev.includes(event.id) 
                                    ? prev.filter(id => id !== event.id)
                                    : [...prev, event.id]
                                );
                              }}
                              className="absolute right-3 top-3 p-2 rounded-full bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Heart
                                size={16}
                                className={`${favorites.includes(event.id) ? 'fill-ironman-red text-ironman-red' : 'text-white'}`}
                              />
                            </motion.button>
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="text-white font-medium group-hover:text-ironman-red transition-colors">
                                  {event.name}
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                  <div className="flex items-center gap-1 text-white/60 text-sm">
                                    <MapPin size={14} />
                                    <span>{event.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-white/60 text-sm">
                                    <Calendar size={14} />
                                    <span>{event.date}</span>
                                  </div>
                                </div>
                              </div>
                              {event.trending && (
                                <Badge className="bg-ironman-red text-white text-xs flex items-center gap-1">
                                  <TrendingUp size={10} />
                                  Trending
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="bg-black/30 border-white/20 text-white/80 text-xs">
                                {event.type}
                              </Badge>
                              <Badge variant="outline" className="bg-black/30 border-white/20 text-white/80 text-xs">
                                {event.distance}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-x-6 gap-y-2 text-white/60 text-sm mt-10"
          >
            <div className="flex items-center gap-2">
              <Search size={16} />
              <span>All multisport events in one place</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <span>Advanced filtering options</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Fast registration process</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
