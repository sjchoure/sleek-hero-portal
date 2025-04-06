
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Award, ChevronRight, CreditCard, User, Mail, Phone, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
  });

  const upcomingRaces = [
    {
      id: 1,
      name: "IRONMAN 70.3 Florida",
      date: "May 15, 2024",
      location: "Haines City, FL",
      status: "Registered",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "IRONMAN Wisconsin",
      date: "September 10, 2024",
      location: "Madison, WI",
      status: "Registered",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const pastRaces = [
    {
      id: 3,
      name: "IRONMAN 70.3 California",
      date: "April 2, 2023",
      location: "Oceanside, CA",
      result: "5:42:30",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "IRONMAN Mont-Tremblant",
      date: "August 22, 2023",
      location: "Mont-Tremblant, Canada",
      result: "11:24:15",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const savedPaymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "05/25",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "09/24",
      isDefault: false
    }
  ];

  const handleSaveProfile = () => {
    // Would typically save profile to backend
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-ironman-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">My Profile</h1>
          <p className="text-white/70 mt-2">Manage your account and registrations</p>
        </motion.div>

        <Tabs defaultValue="profile" className="max-w-5xl mx-auto">
          <TabsList className="bg-black/20 border border-white/10 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="races">My Races</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="bg-black/20 backdrop-blur-lg border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Personal Information</CardTitle>
                  <CardDescription className="text-white/70">
                    Your personal details used for race registrations
                  </CardDescription>
                </div>
                <Button 
                  variant={isEditing ? "default" : "outline"} 
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className={isEditing ? "bg-ironman-red hover:bg-ironman-red/90" : ""}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <User size={16} />
                      <Label htmlFor="name">Full Name</Label>
                    </div>
                    <Input 
                      id="name" 
                      readOnly={!isEditing}
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className={`bg-black/20 border-white/20 ${!isEditing ? 'cursor-not-allowed' : ''}`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <Mail size={16} />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <Input 
                      id="email" 
                      type="email"
                      readOnly={!isEditing}
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className={`bg-black/20 border-white/20 ${!isEditing ? 'cursor-not-allowed' : ''}`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <Phone size={16} />
                      <Label htmlFor="phone">Phone</Label>
                    </div>
                    <Input 
                      id="phone" 
                      readOnly={!isEditing}
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className={`bg-black/20 border-white/20 ${!isEditing ? 'cursor-not-allowed' : ''}`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <Home size={16} />
                      <Label htmlFor="address">Address</Label>
                    </div>
                    <Input 
                      id="address" 
                      readOnly={!isEditing}
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                      className={`bg-black/20 border-white/20 ${!isEditing ? 'cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="races">
            <div className="space-y-6">
              <Card className="bg-black/20 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Upcoming Races</CardTitle>
                  <CardDescription className="text-white/70">
                    Events you're registered for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingRaces.map(race => (
                      <motion.div 
                        key={race.id}
                        whileHover={{ x: 5 }}
                        className="flex flex-col md:flex-row gap-4 items-center border-b border-white/10 pb-4"
                      >
                        <div className="w-20 h-20 rounded-md overflow-hidden">
                          <img src={race.image} alt={race.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{race.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            <div className="flex items-center gap-1 text-white/70 text-sm">
                              <Calendar size={14} />
                              <span>{race.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/70 text-sm">
                              <MapPin size={14} />
                              <span>{race.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-ironman-red bg-ironman-red/10 px-2 py-1 rounded-md text-sm">
                            {race.status}
                          </span>
                          <Button variant="ghost" className="p-0 h-auto">
                            <ChevronRight size={16} />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Race History</CardTitle>
                  <CardDescription className="text-white/70">
                    Your past race results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pastRaces.map(race => (
                      <motion.div 
                        key={race.id}
                        whileHover={{ x: 5 }}
                        className="flex flex-col md:flex-row gap-4 items-center border-b border-white/10 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="w-20 h-20 rounded-md overflow-hidden">
                          <img src={race.image} alt={race.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{race.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            <div className="flex items-center gap-1 text-white/70 text-sm">
                              <Calendar size={14} />
                              <span>{race.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/70 text-sm">
                              <MapPin size={14} />
                              <span>{race.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/70 text-sm">
                              <Clock size={14} />
                              <span>Finish time: {race.result}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button variant="outline" className="border-white/20 hover:border-ironman-red hover:bg-ironman-red/10">
                            View Certificate
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card className="bg-black/20 backdrop-blur-lg border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Payment Methods</CardTitle>
                  <CardDescription className="text-white/70">
                    Saved payment methods for faster checkout
                  </CardDescription>
                </div>
                <Button variant="outline" className="border-white/20 hover:bg-ironman-red hover:text-white hover:border-ironman-red">
                  Add New Card
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedPaymentMethods.map(method => (
                  <div 
                    key={method.id}
                    className="flex items-center justify-between bg-black/30 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2 rounded-md">
                        <CreditCard size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {method.type} •••• {method.last4}
                        </p>
                        <p className="text-white/60 text-sm">Expires {method.expiry}</p>
                      </div>
                      {method.isDefault && (
                        <span className="bg-ironman-red/20 text-ironman-red text-xs px-2 py-1 rounded ml-2">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-white/70 hover:text-white">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-white/70 hover:text-white">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
