import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const news = [
  {
    id: 1,
    title: "Training Tips for Your First IRONMAN",
    category: "Training",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Nutrition Guide for Long Distance Triathlons",
    category: "Nutrition",
    date: "March 12, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "2024 Race Calendar Announced",
    category: "News",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Recovery Strategies for Triathletes",
    category: "Training",
    date: "March 8, 2024",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const NewsGrid = () => {
  return (
    <section id="news" className="py-20 bg-ironman-lightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-ironman-dark mb-12">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.map((item) => (
            <Card 
              key={item.id}
              className="overflow-hidden hover:shadow-xl transition-shadow animate-slide-up"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge variant="secondary" className="bg-ironman-red text-white">
                  {item.category}
                </Badge>
                <CardHeader className="p-0 mt-2">
                  <h3 className="text-lg font-bold text-ironman-dark">
                    {item.title}
                  </h3>
                  <p className="text-ironman-gray text-sm">{item.date}</p>
                </CardHeader>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;