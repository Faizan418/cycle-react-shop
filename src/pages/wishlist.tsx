
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/ui/product-card";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageSrc: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

// Sample products data - this should ultimately come from your API/database
const sampleProducts = [
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
    name: "Road Master Pro",
    price: 899.99,
    originalPrice: 999.99,
    imageSrc: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    category: "Road Bikes",
    isNew: true,
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);

  useEffect(() => {
    const loadWishlist = () => {
      try {
        // Get wishlist IDs from localStorage
        const wishlistData = localStorage.getItem('wishlist');
        const wishlistIds = wishlistData ? JSON.parse(wishlistData) : [];
        console.log("Wishlist IDs from localStorage:", wishlistIds);
        
        if (wishlistIds.length > 0) {
          // For each ID in the wishlist, find the corresponding product
          const items = wishlistIds.map(id => 
            sampleProducts.find(product => product.id === id)
          ).filter(Boolean);
          
          console.log("Wishlist items loaded:", items);
          setWishlistItems(items);
        } else {
          console.log("No wishlist items found");
          setWishlistItems([]);
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setWishlistItems([]);
      }
    };
    
    // Initial load
    loadWishlist();
    
    // Listen for wishlist updates
    window.addEventListener('storage', loadWishlist);
    window.addEventListener('wishlistUpdated', loadWishlist);
    
    return () => {
      window.removeEventListener('storage', loadWishlist);
      window.removeEventListener('wishlistUpdated', loadWishlist);
    };
  }, []);

  const clearWishlist = () => {
    localStorage.setItem('wishlist', JSON.stringify([]));
    setWishlistItems([]);
    toast.success("Wishlist cleared");
    // Dispatch event to update other components
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cycle-light py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            {wishlistItems.length > 0 && (
              <Button 
                variant="outline" 
                className="mt-4 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 sm:mt-0"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </Button>
            )}
          </div>

          {wishlistItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
              <ShoppingCart className="mb-4 h-16 w-16 text-cycle-gray" />
              <h2 className="mb-2 text-2xl font-semibold">Your wishlist is empty</h2>
              <p className="mb-6 text-cycle-gray">
                Start adding your favorite products to your wishlist!
              </p>
              <Button asChild className="bg-cycle hover:bg-cycle-dark">
                <Link to="/products">
                  Explore Products
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
