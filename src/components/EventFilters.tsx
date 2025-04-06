
import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, MapPin, Calendar, Trophy, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface EventFiltersProps {
  onFilterChange: (filters: any) => void;
  className?: string;
}

const EventFilters = ({ onFilterChange, className = "" }: EventFiltersProps) => {
  const [filters, setFilters] = useState({
    raceType: "",
    distance: "",
    location: "",
    sanctioned: [],
    priceRange: [0, 1000],
    dateRange: {
      from: "",
      to: "",
    },
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (category: string, value: any) => {
    const newFilters = { ...filters, [category]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    
    // Track active filters for badges
    if (value && !activeFilters.includes(category)) {
      setActiveFilters([...activeFilters, category]);
    } else if (!value && activeFilters.includes(category)) {
      setActiveFilters(activeFilters.filter(filter => filter !== category));
    }
  };

  const removeFilter = (category: string) => {
    const newFilters = { ...filters };
    if (category === 'sanctioned') {
      newFilters.sanctioned = [];
    } else if (category === 'priceRange') {
      newFilters.priceRange = [0, 1000];
    } else if (category === 'dateRange') {
      newFilters.dateRange = { from: "", to: "" };
    } else {
      // @ts-ignore
      newFilters[category] = "";
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
    setActiveFilters(activeFilters.filter(filter => filter !== category));
  };

  const sanctionOptions = ["USAT", "IRONMAN", "Challenge", "ITU", "Independent"];
  const raceTypes = ["Triathlon", "Duathlon", "Aquathlon", "Relay", "SwimRun", "Aquabike"];
  const distances = ["Sprint", "Olympic", "Half-Iron", "Full Iron", "Other"];

  return (
    <div className={`${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Filter size={18} />
          <h3 className="text-xl font-semibold">Event Filters</h3>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map(filter => (
              <Badge 
                key={filter} 
                variant="secondary" 
                className="bg-ironman-red/20 text-white flex items-center gap-1 px-3 py-1"
              >
                {filter}
                <button 
                  className="ml-1 hover:text-white/70" 
                  onClick={() => removeFilter(filter)}
                >
                  ✕
                </button>
              </Badge>
            ))}
            {activeFilters.length > 1 && (
              <Button 
                variant="link" 
                className="text-white/70 hover:text-white p-0 h-auto text-sm"
                onClick={() => {
                  setFilters({
                    raceType: "",
                    distance: "",
                    location: "",
                    sanctioned: [],
                    priceRange: [0, 1000],
                    dateRange: { from: "", to: "" },
                  });
                  setActiveFilters([]);
                  onFilterChange({});
                }}
              >
                Clear all
              </Button>
            )}
          </div>
        )}

        <Accordion type="multiple" className="space-y-2">
          {/* Race Type */}
          <AccordionItem value="race-type" className="border-white/10">
            <AccordionTrigger className="text-sm font-medium py-2">
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                Race Type
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {raceTypes.map(type => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    className={`justify-start text-left ${
                      filters.raceType === type ? "bg-ironman-red text-white border-ironman-red" : "bg-black/20 border-white/20"
                    }`}
                    onClick={() => handleFilterChange("raceType", filters.raceType === type ? "" : type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Distance */}
          <AccordionItem value="distance" className="border-white/10">
            <AccordionTrigger className="text-sm font-medium py-2">
              <div className="flex items-center gap-2">
                <Navigation size={16} />
                Distance
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {distances.map(dist => (
                  <Button
                    key={dist}
                    variant="outline"
                    size="sm"
                    className={`justify-start text-left ${
                      filters.distance === dist ? "bg-ironman-red text-white border-ironman-red" : "bg-black/20 border-white/20"
                    }`}
                    onClick={() => handleFilterChange("distance", filters.distance === dist ? "" : dist)}
                  >
                    {dist}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Location */}
          <AccordionItem value="location" className="border-white/10">
            <AccordionTrigger className="text-sm font-medium py-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Location
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2">
                <Input
                  placeholder="Search cities, states, countries..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="bg-black/20 border-white/20"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Sanctioned By */}
          <AccordionItem value="sanctioned" className="border-white/10">
            <AccordionTrigger className="text-sm font-medium py-2">
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                Sanctioned By
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {sanctionOptions.map(sanction => (
                  <Button
                    key={sanction}
                    variant="outline"
                    size="sm"
                    className={`justify-start text-left ${
                      filters.sanctioned.includes(sanction) ? "bg-ironman-red text-white border-ironman-red" : "bg-black/20 border-white/20"
                    }`}
                    onClick={() => {
                      const newSanctioned = filters.sanctioned.includes(sanction)
                        ? filters.sanctioned.filter(s => s !== sanction)
                        : [...filters.sanctioned, sanction];
                      handleFilterChange("sanctioned", newSanctioned);
                    }}
                  >
                    {sanction}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Date Range */}
          <AccordionItem value="date" className="border-white/10">
            <AccordionTrigger className="text-sm font-medium py-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                Date Range
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <label className="text-xs text-white/70 mb-1 block">From</label>
                  <Input
                    type="date"
                    value={filters.dateRange.from}
                    onChange={(e) => handleFilterChange("dateRange", { ...filters.dateRange, from: e.target.value })}
                    className="bg-black/20 border-white/20"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/70 mb-1 block">To</label>
                  <Input
                    type="date"
                    value={filters.dateRange.to}
                    onChange={(e) => handleFilterChange("dateRange", { ...filters.dateRange, to: e.target.value })}
                    className="bg-black/20 border-white/20"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Range */}
          <AccordionItem value="price" className="border-white/10">
            <AccordionTrigger className="text-sm font-medium py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                Price Range
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 px-2">
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={(val) => handleFilterChange("priceRange", val)}
                  className="my-6"
                />
                <div className="flex justify-between text-sm text-white/70">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
};

export default EventFilters;
