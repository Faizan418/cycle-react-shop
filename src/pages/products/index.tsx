
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, ChevronDown } from "lucide-react";

// Sample products data
const allProducts = [
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
  {
    id: "5",
    name: "Urban Commuter Pro",
    price: 549.99,
    imageSrc: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJpY3ljbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    category: "City Bikes",
  },
  {
    id: "6",
    name: "Trail Blazer 29er",
    price: 879.99,
    originalPrice: 999.99,
    imageSrc: "https://images.unsplash.com/photo-1559348349-86d1b252cb38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fG1vdW50YWluJTIwYmlrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "Mountain Bikes",
    isSale: true,
  },
  {
    id: "7",
    name: "Speedster Elite Road Bike",
    price: 1599.99,
    imageSrc: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "Road Bikes",
    isNew: true,
  },
  {
    id: "8",
    name: "Junior Explorer",
    price: 199.99,
    imageSrc: "https://images.unsplash.com/photo-1597265845623-816bd256d4b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJpa2UlMjBmb3IlMjBraWRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    category: "Kids Bikes",
  },
];

export default function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort products
  const filteredProducts = allProducts.filter(
    (product) =>
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "featured":
      default:
        return 0;
    }
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="bg-cycle-light py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-3xl font-bold md:text-4xl">Shop Bicycles</h1>
            <p className="mt-2 text-cycle-gray">Find the perfect bike for your needs</p>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
          {/* Filter and Search */}
          <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="flex items-center gap-2 md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            {/* Filters Sidebar */}
            <div
              className={`${
                isFilterOpen ? "block" : "hidden"
              } rounded-lg border bg-white p-6 md:block`}
            >
              <div className="mb-6">
                <h3 className="mb-4 font-semibold">Categories</h3>
                <div className="space-y-3">
                  {["All Bikes", "Mountain Bikes", "Road Bikes", "City Bikes", "Kids Bikes"].map(
                    (category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium text-cycle-gray"
                        >
                          {category}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-4 font-semibold">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 2000]}
                    max={2000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cycle-gray">${priceRange[0]}</span>
                    <span className="text-sm text-cycle-gray">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-4 font-semibold">Filter By</h3>
                <div className="space-y-3">
                  {["On Sale", "New Arrivals", "In Stock"].map((filter) => (
                    <div key={filter} className="flex items-center space-x-2">
                      <Checkbox id={filter} />
                      <label htmlFor={filter} className="text-sm font-medium text-cycle-gray">
                        {filter}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-cycle hover:bg-cycle-dark">Apply Filters</Button>
            </div>

            {/* Products Grid */}
            <div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <p className="text-lg font-medium">No products found</p>
                  <p className="text-sm text-cycle-gray">Try adjusting your filters</p>
                </div>
              )}

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full" disabled>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full bg-cycle text-white">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    3
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
