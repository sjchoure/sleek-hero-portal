import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, ChevronDown, ArrowLeft, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface Event {
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
}

const Events = () => {
  const location = useLocation();
  const initialSearchQuery = location.state?.searchQuery || '';
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedDistance, setSelectedDistance] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedSanctioningBody, setSelectedSanctioningBody] = useState('all');
  const [selectedRaceType, setSelectedRaceType] = useState('all');
  const [selectedVenueType, setSelectedVenueType] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const events: Event[] = [
    {
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
      venueType: "Ocean"
    },
    {
      id: 2,
      name: "IRONMAN 70.3 World Championship",
      location: "Taupo, New Zealand",
      date: "December 2024",
      description: "Experience the beauty of New Zealand in this half-distance championship event featuring a 1.2-mile swim, 56-mile bike, and 13.1-mile run.",
      distance: "70.3",
      price: "$799",
      spots: 150,
      image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "IRONMAN",
      raceType: "Triathlon",
      venueType: "Lake"
    },
    {
      id: 3,
      name: "Challenge Roth",
      location: "Roth, Germany",
      date: "July 2024",
      description: "One of Europe's most iconic long-distance triathlons, featuring a fast course and incredible crowd support through the Bavarian countryside.",
      distance: "Full",
      price: "$899",
      spots: 200,
      image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "Challenge",
      raceType: "Triathlon",
      venueType: "Lake"
    },
    {
      id: 4,
      name: "USAT Age Group National Championships",
      location: "Milwaukee, Wisconsin",
      date: "August 2024",
      description: "The premier Olympic-distance championship event for USA Triathlon, featuring the nation's top age-group athletes.",
      distance: "Olympic",
      price: "$299",
      spots: 250,
      image: "https://images.unsplash.com/photo-1517344368193-41552b6ad3f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "USAT",
      raceType: "Triathlon",
      venueType: "Lake"
    },
    {
      id: 5,
      name: "ITU World Triathlon Series Abu Dhabi",
      location: "Abu Dhabi, UAE",
      date: "March 2024",
      description: "Elite triathletes compete in this fast-paced Olympic distance race through the stunning Yas Marina Circuit.",
      distance: "Olympic",
      price: "$399",
      spots: 175,
      image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "ITU",
      raceType: "Triathlon",
      venueType: "Ocean"
    },
    {
      id: 6,
      name: "Powerman Zofingen",
      location: "Zofingen, Switzerland",
      date: "September 2024",
      description: "The world's most challenging long-distance duathlon, featuring a 10km run, 150km bike, and 30km run through the Swiss countryside.",
      distance: "Full",
      price: "$599",
      spots: 120,
      image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "ITU",
      raceType: "Duathlon",
      venueType: "Endurance Sports"
    },
    {
      id: 7,
      name: "USAT Indoor Triathlon National Championship",
      location: "Boston, Massachusetts",
      date: "February 2024",
      description: "A unique indoor triathlon experience featuring a pool swim, stationary bike, and treadmill run.",
      distance: "Sprint",
      price: "$199",
      spots: 100,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "USAT",
      raceType: "Triathlon",
      venueType: "Indoor Pool"
    },
    {
      id: 8,
      name: "Challenge Watkins Glen Aquabike",
      location: "Watkins Glen, NY",
      date: "June 2024",
      description: "A scenic aquabike event combining a 1.2-mile swim in Seneca Lake with a 56-mile bike through wine country.",
      distance: "70.3",
      price: "$299",
      spots: 150,
      image: "https://images.unsplash.com/photo-1557330359-ffb0deed6163?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "Challenge",
      raceType: "Aquabike",
      venueType: "Lake"
    },
    {
      id: 9,
      name: "USAT Aquathlon National Championships",
      location: "Santa Cruz, California",
      date: "May 2024",
      description: "Test your swimming and running abilities in this fast-paced event along the California coast.",
      distance: "Sprint",
      price: "$159",
      spots: 200,
      image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "USAT",
      raceType: "Aquathlon",
      venueType: "Ocean"
    },
    {
      id: 10,
      name: "IRONMAN 70.3 St. George",
      location: "St. George, Utah",
      date: "May 2024",
      description: "A challenging 70.3 featuring a reservoir swim, scenic bike course through Snow Canyon, and a run through the red rocks.",
      distance: "70.3",
      price: "$399",
      spots: 200,
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      sanctioningBody: "IRONMAN",
      raceType: "Triathlon",
      venueType: "Lake"
    }
  ];

  const distances = ['all', 'Full', '70.3', 'Olympic', 'Sprint'];
  const months = ['all', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const sanctioningBodies = ['all', 'IRONMAN', 'USAT', 'ITU', 'Challenge'];
  const raceTypes = ['all', 'Triathlon', 'Duathlon', 'Aquathlon', 'Aquabike'];
  const venueTypes = ['all', 'Ocean', 'Lake', 'River', 'Indoor Pool'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistance = selectedDistance === 'all' || event.distance === selectedDistance;
    const matchesMonth = selectedMonth === 'all' || event.date.includes(months[months.indexOf(selectedMonth)]);
    const matchesSanctioningBody = selectedSanctioningBody === 'all' || event.sanctioningBody === selectedSanctioningBody;
    const matchesRaceType = selectedRaceType === 'all' || event.raceType === selectedRaceType;
    const matchesVenueType = selectedVenueType === 'all' || event.venueType === selectedVenueType;
    return matchesSearch && matchesDistance && matchesMonth && matchesSanctioningBody && matchesRaceType && matchesVenueType;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-ironman-dark no-scrollbar">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to home
        </Link>
        </div>
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events by name or location..."
              className="w-full px-6 py-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-ironman-red/50 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-white/60" />
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="relative">
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ironman-red/50 transition-all"
              >
                <option value="all">All Distances</option>
                <option value="Full">Full IRONMAN</option>
                <option value="70.3">IRONMAN 70.3</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>

            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ironman-red/50 transition-all"
              >
                <option value="all">All Months</option>
                {months.slice(1).map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>

            <div className="relative">
              <select
                value={selectedSanctioningBody}
                onChange={(e) => setSelectedSanctioningBody(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ironman-red/50 transition-all"
              >
                <option value="all">All Sanctioning Bodies</option>
                {sanctioningBodies.slice(1).map(body => (
                  <option key={body} value={body}>{body}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>

            <div className="relative">
              <select
                value={selectedRaceType}
                onChange={(e) => setSelectedRaceType(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ironman-red/50 transition-all"
              >
                <option value="all">All Race Types</option>
                {raceTypes.slice(1).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>

            <div className="relative">
              <select
                value={selectedVenueType}
                onChange={(e) => setSelectedVenueType(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-ironman-red/50 transition-all"
              >
                <option value="all">All Venues</option>
                {venueTypes.slice(1).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all group"
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-ironman-red px-3 py-1 rounded-full text-sm text-white font-medium">
                    {event.distance}
                  </div>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFavorites(prev => 
                        prev.includes(event.id) 
                          ? prev.filter(id => id !== event.id)
                          : [...prev, event.id]
                      );
                    }}
                    className="absolute top-4 left-4 p-2 rounded-full bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart
                      size={16}
                      className={`${favorites.includes(event.id) ? 'fill-ironman-red text-ironman-red' : 'text-white'}`}
                    />
                  </motion.button>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-white/60 text-sm">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/60 text-sm">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-white font-medium">{event.price}</div>
                    <div className="text-white/60 text-sm">{event.spots} spots left</div>
                  </div>

                  <Link
                    to={`/event/${event.id}`}
                    className="block w-full mt-4 bg-ironman-red hover:bg-red-600 text-white py-2 rounded-lg transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
              <Search className="w-8 h-8 text-white/60" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              We couldn't find any events matching your current filters. Try adjusting your search criteria or filters to see more events.
            </p>
            <div className="space-y-3 text-sm text-white/60">
              <p>Try these suggestions:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Clear or modify your search term</li>
                <li>Select "All" in one or more filter dropdowns</li>
                <li>Choose different combinations of filters</li>
                <li>Check for spelling errors in your search</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events; 