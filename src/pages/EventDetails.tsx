import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Cloud, Mountain, Users, CreditCard, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WeatherInfo {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface TerrainInfo {
  elevation: string;
  surface: string;
  difficulty: string;
  landmarks: string[];
}

interface EventDetails {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
  distance: string;
  price: string;
  spots: number;
  image: string;
  sanctioningBody: string;
  raceType: string;
  venueType: string;
  coordinates: [number, number];
  terrain: TerrainInfo;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium'>('standard');

  // Simulated event data - In a real app, this would come from an API
  useEffect(() => {
    // Simulated API call
    const mockEvent: EventDetails = {
      id: 1,
      name: "IRONMAN World Championship",
      location: "Kona, Hawaii",
      date: "October 2024",
      description: "The most prestigious event in triathlon. Athletes will swim 2.4 miles, bike 112 miles, and run 26.2 miles through the barren lava fields of Kona.",
      distance: "Full",
      price: "$999",
      spots: 100,
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "IRONMAN",
      raceType: "Triathlon",
      venueType: "Ocean",
      coordinates: [19.6222, -155.9889], // Kona coordinates
      terrain: {
        elevation: "785m total elevation gain",
        surface: "Mix of tarmac roads and volcanic terrain",
        difficulty: "Extremely challenging",
        landmarks: ["Kailua Bay", "Queen Ka'ahumanu Highway", "Natural Energy Lab", "Ali'i Drive"]
      }
    };

    setEvent(mockEvent);

    // Simulated weather data - In a real app, this would come from a weather API
    const mockWeather: WeatherInfo = {
      temperature: 27,
      condition: "Sunny",
      humidity: 65,
      windSpeed: 15
    };

    setWeather(mockWeather);
  }, [id]);

  if (!event || !weather) {
    return (
      <div className="min-h-screen bg-ironman-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ironman-red"></div>
      </div>
    );
  }

  // Generate static map URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${event.coordinates[1] - 0.01},${event.coordinates[0] - 0.01},${event.coordinates[1] + 0.01},${event.coordinates[0] + 0.01}&layer=mapnik&marker=${event.coordinates[0]},${event.coordinates[1]}`;

  return (
    <div className="min-h-screen bg-ironman-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/events"
          className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </Link>

        {/* Hero Section */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{event.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-5 h-5" />
                <span>{event.spots} spots left</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">About the Event</h2>
              <p className="text-white/80">{event.description}</p>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Location</h2>
              <div className="h-96 rounded-lg overflow-hidden">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  className="rounded-lg"
                  title="Event Location"
                ></iframe>
              </div>
            </motion.div>

            {/* Weather & Terrain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Weather */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Weather</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Temperature</span>
                    <span className="text-white">{weather.temperature}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Condition</span>
                    <span className="text-white">{weather.condition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Humidity</span>
                    <span className="text-white">{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Wind Speed</span>
                    <span className="text-white">{weather.windSpeed} km/h</span>
                  </div>
                </div>
              </div>

              {/* Terrain */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Terrain</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Elevation</span>
                    <span className="text-white">{event.terrain.elevation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Surface</span>
                    <span className="text-white">{event.terrain.surface}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Difficulty</span>
                    <span className="text-white">{event.terrain.difficulty}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Registration Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-fit sticky top-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Registration</h2>

            {/* Plan Selection */}
            <div className="space-y-4 mb-6">
              <div
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPlan === 'standard'
                    ? 'border-ironman-red bg-ironman-red/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setSelectedPlan('standard')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">Standard Entry</h3>
                  <span className="text-white">{event.price}</span>
                </div>
                <p className="text-white/60 text-sm">Basic race entry with timing chip</p>
              </div>

              <div
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPlan === 'premium'
                    ? 'border-ironman-red bg-ironman-red/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setSelectedPlan('premium')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">Premium Entry</h3>
                  <span className="text-white">${parseInt(event.price.slice(1)) + 200}</span>
                </div>
                <p className="text-white/60 text-sm">Race entry + merchandise pack + priority check-in</p>
              </div>
            </div>

            {/* Registration Button */}
            <button className="w-full bg-ironman-red hover:bg-red-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Payment
            </button>

            <p className="text-white/40 text-sm mt-4 text-center">
              Secure payment powered by Stripe
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 