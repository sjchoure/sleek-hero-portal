import { ArrowRight, Search, MapPin, Calendar, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  const popularEvents = [
    {
      id: 1,
      name: "IRONMAN World Championship",
      location: "Kona, Hawaii",
      date: "October 2024"
    },
    {
      id: 2,
      name: "IRONMAN 70.3 World Championship",
      location: "Taupo, New Zealand",
      date: "December 2024"
    },
    {
      id: 3,
      name: "IRONMAN European Championship",
      location: "Frankfurt, Germany",
      date: "June 2024"
    },
    {
      id: 4,
      name: "IRONMAN African Championship",
      location: "Port Elizabeth, South Africa",
      date: "March 2024"
    },
    {
      id: 5,
      name: "IRONMAN Asia-Pacific Championship",
      location: "Cairns, Australia",
      date: "June 2024"
    },
    {
      id: 6,
      name: "IRONMAN North American Championship",
      location: "The Woodlands, Texas",
      date: "April 2024"
    }
  ];

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

  const searchContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      }
    }
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
            ></iframe>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Less Work. More Racing.
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-8"
          >
            Innovating endurance sports with seamless, technology-driven race registration.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="relative mb-6"
          >
            <div className="relative flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Search for events..."
                  className={`w-full px-6 py-4 pr-[180px] bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-ironman-red/50 transition-all ${isSearchFocused ? 'shadow-2xl' : ''}`}
                />
              </div>
              <motion.button
                onClick={() => navigate("/events", { state: { searchQuery } })}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 bg-ironman-red hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
                whileHover={{ gap: "12px" }}
              >
                <Search size={16} />
                Find Race
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>
            </div>

            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={searchContainerVariants}
                  className="absolute top-full left-0 right-0 mt-2 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="p-2">
                    <p className="text-sm text-white/80 font-medium px-3 py-2">Popular Events</p>
                    <div className="max-h-[280px] overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
                      {popularEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          variants={eventItemVariants}
                          whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                          className="rounded-lg p-3 cursor-pointer transition-colors relative group"
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
                          <div className="text-white font-medium">{event.name}</div>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-white/60 text-sm">
                              <MapPin size={14} />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/60 text-sm">
                              <Calendar size={14} />
                              <span>{event.date}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;