
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface FilterButtonsProps {
  options: string[];
  selectedOption: string | null;
  onToggle: (option: string) => void;
  label: string;
}

const FilterButtons = ({ options, selectedOption, onToggle, label }: FilterButtonsProps) => {
  return (
    <div>
      <label className="text-xs text-white/60 block mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(option)}
            className={`px-3 py-1.5 rounded-md text-sm ${
              selectedOption === option 
                ? 'bg-ironman-red text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
