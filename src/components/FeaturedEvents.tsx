import { Card, CardContent } from "@/components/ui/card";

const events = [
  {
    id: 1,
    title: "IRONMAN World Championship",
    location: "Kona, Hawaii",
    date: "October 14, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "IRONMAN 70.3 Nice",
    location: "Nice, France",
    date: "September 15, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "IRONMAN Frankfurt",
    location: "Frankfurt, Germany",
    date: "June 30, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const FeaturedEvents = () => {
  return (
    <section id="events" className="py-20 bg-ironman-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="bg-transparent border-none">
              <CardContent className="p-0">
                <div className="group relative overflow-hidden rounded-lg animate-slide-up">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-white/80">{event.location}</p>
                    <p className="text-ironman-red">{event.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;