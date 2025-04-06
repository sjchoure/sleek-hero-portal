
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "IRONMAN World Championship",
    location: "Kona, Hawaii",
    date: "October 14, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: 2,
    title: "IRONMAN 70.3 Nice",
    location: "Nice, France",
    date: "September 15, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: 3,
    title: "IRONMAN Frankfurt",
    location: "Frankfurt, Germany",
    date: "June 30, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    popular: false
  }
];

const FeaturedEvents = () => {
  const navigate = useNavigate();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
  };

  return (
    <section id="events" className="py-20 bg-ironman-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h2 className="text-3xl font-bold text-white">Featured Events</h2>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-white/20 hover:border-ironman-red hover:bg-ironman-red/10 hover:text-white"
            onClick={() => navigate("/events")}
          >
            View All Events
          </Button>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {events.map((event) => (
            <motion.div key={event.id} variants={item}>
              <Card className="bg-transparent border-none h-full">
                <CardContent className="p-0 h-full">
                  <motion.div 
                    className="group relative overflow-hidden rounded-lg h-full flex flex-col"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      {event.popular && (
                        <div className="absolute top-4 left-4 bg-ironman-red text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                          <TrendingUp size={12} />
                          Popular
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 flex flex-col justify-end">
                      <motion.h3 
                        className="text-xl font-bold text-white mb-2"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {event.title}
                      </motion.h3>
                      <div className="flex flex-col gap-1 mb-4">
                        <motion.div 
                          className="flex items-center gap-2 text-white/80"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <MapPin size={14} />
                          <p>{event.location}</p>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-2 text-ironman-red"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Calendar size={14} />
                          <p>{event.date}</p>
                        </motion.div>
                      </div>
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-2"
                      >
                        <Button 
                          variant="outline" 
                          className="border-white/20 hover:border-ironman-red hover:bg-ironman-red/10 hover:text-white text-sm"
                          onClick={() => navigate(`/event/${event.id}`)}
                        >
                          View Details
                        </Button>
                        <Button 
                          className="bg-ironman-red hover:bg-ironman-red/90 text-white text-sm"
                          onClick={() => navigate(`/register/${event.id}`)}
                        >
                          Register Now
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
