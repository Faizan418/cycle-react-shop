
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function CategorySection() {
  const categories = [
    {
      name: "Mountain Bikes",
      description: "For rugged terrain and adventure",
      imageSrc: "https://images.unsplash.com/photo-1549216963-72c1712c1196?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdW50YWluJTIwYmlrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      link: "/products?category=mountain",
    },
    {
      name: "Road Bikes",
      description: "For speed and performance",
      imageSrc: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      link: "/products?category=road",
    },
    {
      name: "City Bikes",
      description: "For urban commuting and leisure",
      imageSrc: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      link: "/products?category=city",
    },
  ];

  return (
    <section className="bg-cycle-light py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-cycle">
            Categories
          </span>
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.imageSrc}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="mb-1 text-2xl font-semibold">{category.name}</h3>
                <p className="mb-4 text-sm text-white/80">{category.description}</p>
                <Button asChild className="btn-cycle">
                  <Link to={category.link}>
                    Explore
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
