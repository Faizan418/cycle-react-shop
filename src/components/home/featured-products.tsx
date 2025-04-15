
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { ChevronRight } from "lucide-react";

// Sample products data
const products = [
  {
    id: "1",
    name: "Mountain Explorer X500",
    price: 599.99,
    originalPrice: 749.99,
    imageSrc: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "Mountain Bikes",
    isSale: true,
  },
  {
    id: "2",
    name: "City Cruiser Deluxe",
    price: 429.99,
    imageSrc: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "City Bikes",
  },
  {
    id: "3",
    name: "Road Master Pro Carbon",
    price: 1299.99,
    imageSrc: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "Road Bikes",
    isNew: true,
  },
  {
    id: "4",
    name: "Kids Adventure Bike",
    price: 249.99,
    originalPrice: 299.99,
    imageSrc: "https://images.unsplash.com/photo-1597265845623-816bd256d4b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJpa2UlMjBmb3IlMjBraWRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    category: "Kids Bikes",
    isSale: true,
  },
];

export function FeaturedProducts() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div>
            <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-cycle">
              Our Selection
            </span>
            <h2 className="text-3xl font-bold tracking-tight">Featured Bikes</h2>
          </div>
          <Button asChild variant="link" className="text-cycle hover:text-cycle-dark">
            <Link to="/products">
              View All Products
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
