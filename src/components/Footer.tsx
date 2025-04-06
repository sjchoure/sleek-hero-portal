import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-ironman-dark to-black text-white py-16 overflow-hidden">
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand section */}
          <motion.div variants={item} className="space-y-4">
            <img src="/race-full.png" alt="RACE" className="h-8 w-auto" />
            <p className="text-ironman-gray/90">
              Pushing the limits of human potential through world-class endurance events.
            </p>
            {/* Newsletter signup */}
            <div className="flex gap-2 mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 rounded-md px-4 py-2.5 flex-1 focus:outline-none focus:ring-2 focus:ring-ironman-red/50 transition-all"
              />
              <Button variant="destructive" className="bg-ironman-red hover:bg-ironman-red/90 px-4">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </motion.div>

          {/* Quick links sections */}
          {["Events", "Training", "News", "Support"].map((section) => (
            <motion.div variants={item} key={section} className="space-y-4">
              <h4 className="text-lg font-semibold">{section}</h4>
              <ul className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-ironman-gray/90 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="h-[1px] w-0 bg-ironman-red group-hover:w-4 transition-all duration-200" />
                      {section} Link {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div 
          variants={item}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-ironman-gray/90 text-sm">
            &copy; {new Date().getFullYear()} RACE. All rights reserved.
          </p>
          
          {/* Social links */}
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-ironman-gray/90 hover:text-white transition-colors duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;