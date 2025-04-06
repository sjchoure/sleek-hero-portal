import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Add your authentication logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      // Handle successful login
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ironman-dark to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-ironman-dark/40 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white/10 relative">
          <Button
            onClick={() => handleNavigation("/")}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 ${
                    errors.email ? "border-red-500" : "focus:border-ironman-red"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 ${
                    errors.password
                      ? "border-red-500"
                      : "focus:border-ironman-red"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-white/10 bg-black/20 text-ironman-red focus:ring-ironman-red"
                />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-ironman-red hover:text-ironman-red/80 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ironman-red hover:bg-ironman-red/90 text-white transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-ironman-red hover:text-ironman-red/80 transition-colors"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
