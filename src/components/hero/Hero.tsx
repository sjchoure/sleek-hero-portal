
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "./BackgroundVideo";
import HeroContent from "./HeroContent";
import { EventData } from "./types";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();
  
  const [selectedRaceType, setSelectedRaceType] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);

  const popularEvents: EventData[] = [
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

  const handleSearch = () => {
    navigate("/events", { state: { searchQuery, raceType: selectedRaceType, distance: selectedDistance } });
  };

  return (
    <div className="relative h-screen">
      <BackgroundVideo />
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <HeroContent 
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
      </div>
    </div>
  );
};

export default Hero;
