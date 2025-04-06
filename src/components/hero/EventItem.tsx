
import { Heart, MapPin, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface EventItemProps {
  event: {
    id: number;
    name: string;
    location: string;
    date: string;
    type: string;
    distance: string;
    trending: boolean;
  };
  favorites: number[];
  onToggleFavorite: (eventId: number) => void;
}

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

const EventItem = ({ event, favorites, onToggleFavorite }: EventItemProps) => {
  const navigate = useNavigate();
  
  return (
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
          onToggleFavorite(event.id);
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
  );
};

export default EventItem;
