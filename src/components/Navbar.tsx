import { useState, useEffect } from "react";
import { Menu, ShoppingCart, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Events", "Partners", "News", "RACE+"];

  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-md border-b border-white/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.a
            href="/"
            className="text-white flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/race-full.png" alt="RACE" className="h-12 w-auto" />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  className="text-white hover:text-ironman-red transition-colors relative group"
                  asChild
                >
                  <a href={`#${item.toLowerCase()}`}>
                    {item}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ironman-red transform scale-x-0 transition-transform group-hover:scale-x-100" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Shopping Cart Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-ironman-red transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </motion.div>

            {/* Profile Button with Dropdown */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-ironman-red transition-colors"
                  >
                    <User className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-ironman-dark/95 backdrop-blur-lg border-white/10">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuLabel className="text-white">
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem
                        onClick={() => handleNavigation("/profile")}
                        className="text-white hover:text-ironman-red focus:text-ironman-red cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleNavigation("/settings")}
                        className="text-white hover:text-ironman-red focus:text-ironman-red cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-white hover:text-ironman-red focus:text-ironman-red cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        onClick={() => handleNavigation("/login")}
                        className="text-white hover:text-ironman-red focus:text-ironman-red cursor-pointer"
                      >
                        <span>Log in</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-ironman-dark/95 backdrop-blur-lg">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        className="text-white hover:text-ironman-red transition-colors w-full justify-start"
                        asChild
                      >
                        <a href={`#${item.toLowerCase()}`}>{item}</a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
