
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Check, Calendar, Gift, User, Info, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Registration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stage, setStage] = useState("personal");
  const [loading, setLoading] = useState(false);
  
  // Mock event data based on the eventId
  const eventData = {
    id: eventId,
    name: "IRONMAN 70.3 Florida",
    date: "May 15, 2024",
    location: "Haines City, FL",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };
  
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "United States",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543"
    },
    birthDate: "1990-01-01",
    gender: "Male",
    saveInfo: true,
    
    // Payment
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
    savePayment: false,
    agreeTerms: false
  });
  
  const handleInputChange = (field, value) => {
    // Handle nested objects
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };
  
  const handleCheckboxChange = (field) => {
    setFormData({
      ...formData,
      [field]: !formData[field]
    });
  };
  
  const handleSubmit = () => {
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Registration Complete!",
        description: `You are now registered for ${eventData.name}`,
      });
      navigate("/profile");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-ironman-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">Register for Event</h1>
          <p className="text-white/70 mt-2">Complete your registration for {eventData.name}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main form section */}
          <div className="lg:col-span-2">
            <Tabs value={stage} onValueChange={setStage} className="w-full">
              <TabsList className="bg-black/20 border border-white/10 mb-6 w-full grid grid-cols-2">
                <TabsTrigger value="personal" className="w-full">Personal Details</TabsTrigger>
                <TabsTrigger value="payment" className="w-full">Payment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card className="bg-black/20 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Your Information</CardTitle>
                    <CardDescription className="text-white/70">
                      Enter your personal details for race registration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Personal information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="bg-black/20 border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-black/20 border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-black/20 border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white">Phone</Label>
                          <Input 
                            id="phone" 
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-black/20 border-white/20"
                          />
                        </div>
                      </div>
                      
                      {/* Address */}
                      <div className="space-y-4">
                        <h3 className="text-white text-lg font-medium">Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address" className="text-white">Street Address</Label>
                            <Input 
                              id="address" 
                              value={formData.address}
                              onChange={(e) => handleInputChange("address", e.target.value)}
                              className="bg-black/20 border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-white">City</Label>
                            <Input 
                              id="city" 
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              className="bg-black/20 border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state" className="text-white">State/Province</Label>
                            <Input 
                              id="state" 
                              value={formData.state}
                              onChange={(e) => handleInputChange("state", e.target.value)}
                              className="bg-black/20 border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-white">Zip/Postal Code</Label>
                            <Input 
                              id="zipCode" 
                              value={formData.zipCode}
                              onChange={(e) => handleInputChange("zipCode", e.target.value)}
                              className="bg-black/20 border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country" className="text-white">Country</Label>
                            <Input 
                              id="country" 
                              value={formData.country}
                              onChange={(e) => handleInputChange("country", e.target.value)}
                              className="bg-black/20 border-white/20"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Emergency Contact */}
                      <div className="space-y-4">
                        <h3 className="text-white text-lg font-medium">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="emergencyName" className="text-white">Name</Label>
                            <Input 
                              id="emergencyName" 
                              value={formData.emergencyContact.name}
                              onChange={(e) => handleInputChange("emergencyContact.name", e.target.value)}
                              className="bg-black/20 border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyRelationship" className="text-white">Relationship</Label>
                            <Input 
                              id="emergencyRelationship" 
                              value={formData.emergencyContact.relationship}
                              onChange={(e) => handleInputChange("emergencyContact.relationship", e.target.value)}
                              className="bg-black/20 border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyPhone" className="text-white">Phone</Label>
                            <Input 
                              id="emergencyPhone" 
                              value={formData.emergencyContact.phone}
                              onChange={(e) => handleInputChange("emergencyContact.phone", e.target.value)}
                              className="bg-black/20 border-white/20"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Save information checkbox */}
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="saveInfo" 
                          checked={formData.saveInfo}
                          onCheckedChange={() => handleCheckboxChange("saveInfo")}
                        />
                        <label
                          htmlFor="saveInfo"
                          className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Save my information for future registrations
                        </label>
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          onClick={() => setStage("payment")}
                          className="w-full bg-ironman-red hover:bg-ironman-red/90"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment">
                <Card className="bg-black/20 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Payment Details</CardTitle>
                    <CardDescription className="text-white/70">
                      Secure checkout for your race registration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Payment information */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                          <div className="relative">
                            <Input 
                              id="cardNumber" 
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                              className="bg-black/20 border-white/20 pl-10"
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName" className="text-white">Cardholder Name</Label>
                            <Input 
                              id="cardName" 
                              placeholder="John Doe"
                              value={formData.cardName}
                              onChange={(e) => handleInputChange("cardName", e.target.value)}
                              className="bg-black/20 border-white/20"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry" className="text-white">Expiry Date</Label>
                              <Input 
                                id="expiry" 
                                placeholder="MM/YY"
                                value={formData.expiry}
                                onChange={(e) => handleInputChange("expiry", e.target.value)}
                                className="bg-black/20 border-white/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc" className="text-white">CVC</Label>
                              <Input 
                                id="cvc" 
                                placeholder="123"
                                value={formData.cvc}
                                onChange={(e) => handleInputChange("cvc", e.target.value)}
                                className="bg-black/20 border-white/20"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Save payment & terms checkboxes */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="savePayment" 
                            checked={formData.savePayment}
                            onCheckedChange={() => handleCheckboxChange("savePayment")}
                          />
                          <label
                            htmlFor="savePayment"
                            className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Save payment method for future registrations
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="agreeTerms" 
                            checked={formData.agreeTerms}
                            onCheckedChange={() => handleCheckboxChange("agreeTerms")}
                          />
                          <label
                            htmlFor="agreeTerms"
                            className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the <a href="#" className="text-ironman-red hover:underline">terms and conditions</a>
                          </label>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          onClick={handleSubmit}
                          className="w-full bg-ironman-red hover:bg-ironman-red/90"
                          disabled={!formData.agreeTerms || loading}
                        >
                          {loading ? (
                            <>Processing...</>
                          ) : (
                            <>Complete Registration</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-black/20 backdrop-blur-lg border-white/10 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Event info */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden">
                    <img src={eventData.image} alt={eventData.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{eventData.name}</h3>
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="flex items-center gap-1 text-white/70 text-sm">
                        <Calendar size={14} />
                        <span>{eventData.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/70 text-sm">
                        <Clock size={14} />
                        <span>7:00 AM Start</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Pricing breakdown */}
                <div className="border-t border-white/10 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70">Registration Fee</span>
                      <span className="text-white">${eventData.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Processing Fee</span>
                      <span className="text-white">$15.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Insurance</span>
                      <span className="text-white">$7.99</span>
                    </div>
                    
                    {/* Add promo code */}
                    <div className="pt-2">
                      <div className="relative">
                        <Input 
                          placeholder="Promo code"
                          className="bg-black/20 border-white/20 pr-20"
                        />
                        <Button className="absolute right-0 top-0 h-full rounded-l-none bg-white/10 hover:bg-white/20 text-white">
                          Apply
                        </Button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="flex justify-between pt-4 border-t border-white/10 mt-4">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-ironman-red font-bold">${(eventData.price + 15 + 7.99).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Event information */}
                <div className="bg-white/5 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Info size={16} className="text-ironman-red" />
                    <h4 className="text-white font-medium">Event Information</h4>
                  </div>
                  <p className="text-white/70 text-sm">
                    Please note that this registration is non-refundable but can be transferred 
                    to another athlete up to 30 days before the event.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-ironman-red">
                    View Event Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Registration;
