
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { Trash, ShoppingBag } from "lucide-react";

// Sample wishlist items
const initialWishlistItems = [
  {
    id: "1",
    name: "Mountain Explorer X500",
    price: 599.99,
    originalPrice: 749.99,
    imageSrc: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "Mountain Bikes",
    isNew: true,
  },
  {
    id: "2",
    name: "Urban Commuter C200",
    price: 449.99,
    originalPrice: 499.99,
    imageSrc: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "City Bikes",
    isSale: true,
  },
  {
    id: "3",
    name: "Road Master R1000",
    price: 899.99,
    originalPrice: 999.99,
    imageSrc: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cm9hZCUyMGJpa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    category: "Road Bikes",
    isSale: true,
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cycle-light py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="mb-6 text-3xl font-bold">My Wishlist</h1>

          {wishlistItems.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="group relative">
                    <ProductCard
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      originalPrice={item.originalPrice}
                      imageSrc={item.imageSrc}
                      category={item.category}
                      isNew={item.isNew}
                      isSale={item.isSale}
                    />
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full bg-white border-gray-200 hover:bg-red-50 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button asChild className="bg-cycle hover:bg-cycle-dark">
                  <Link to="/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
              <Heart className="mb-4 h-16 w-16 text-cycle-gray" />
              <h2 className="mb-2 text-2xl font-semibold">Your wishlist is empty</h2>
              <p className="mb-6 text-cycle-gray">
                You haven't added any items to your wishlist yet.
              </p>
              <Button asChild className="bg-cycle hover:bg-cycle-dark">
                <Link to="/products">
                  Start Shopping
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
