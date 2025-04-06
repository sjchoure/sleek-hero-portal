
import { motion } from "framer-motion";
import { MapPin, Calendar, Search, User, Hotel, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserFeedbackSection = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Search,
      title: "Event Discovery & Filters",
      description: "All multisport events in one place with advanced filtering for sanctioned races, race types, distances, and locations.",
      action: "Explore Races",
      path: "/events"
    },
    {
      icon: User,
      title: "User-Friendly Registration",
      description: "Fast checkout process with user accounts to save your details for quick registration in future races.",
      action: "Create Account",
      path: "/login"
    },
    {
      icon: MapPin,
      title: "Event Details & Logistics",
      description: "Venue locations with map integration and nearby hotel suggestions to make your race planning easier.",
      action: "See Example",
      path: "/event/1" // This would link to a sample event
    },
    {
      icon: Navigation,
      title: "Seamless Experience",
      description: "Easy-to-navigate interface with clear event information to simplify your decision-making process.",
      action: "Learn More",
      path: "/events"
    }
  ];

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
    <section className="py-20 bg-gradient-to-b from-ironman-dark to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built From Athlete Feedback
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            We've listened to triathletes and designed our platform to address the most requested features
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col h-full"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-ironman-red/20 p-3 rounded-lg w-fit mb-4">
                <feature.icon size={24} className="text-ironman-red" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70 mb-6 flex-grow">{feature.description}</p>
              <Button
                variant="outline"
                className="border-white/20 hover:bg-ironman-red hover:text-white hover:border-ironman-red transition-colors mt-auto"
                onClick={() => navigate(feature.path)}
              >
                {feature.action}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserFeedbackSection;
