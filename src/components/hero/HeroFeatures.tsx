
import { motion } from "framer-motion";
import { Search, Filter, Calendar } from "lucide-react";

const HeroFeatures = () => {
  return (
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
  );
};

export default HeroFeatures;
