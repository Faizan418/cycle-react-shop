import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { CartItemType } from "@/components/cart/types";
import { addToCart, toggleWishlistItem } from "@/utils/storageUtils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageSrc: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  imageSrc,
  category,
  isNew = false,
  isSale = false,
  className,
  ...props
}: ProductCardProps & React.HTMLAttributes<HTMLDivElement>) {
  const isDiscounted = !!originalPrice && originalPrice > price;
  
  // Get wishlist from localStorage
  const getWishlist = (): string[] => {
    const wishlistData = localStorage.getItem('wishlist');
    return wishlistData ? JSON.parse(wishlistData) : [];
  };
  
  const [isWishlisted, setIsWishlisted] = React.useState(() => {
    const wishlist = getWishlist();
    return wishlist.includes(id);
  });

  React.useEffect(() => {
    // Update wishlisted state when localStorage changes
    const handleStorageChange = () => {
      const wishlist = getWishlist();
      setIsWishlisted(wishlist.includes(id));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, [id]);

  const handleAddToCart = () => {
    try {
      // Create cart item
      const cartItem: CartItemType = {
        id,
        name,
        price,
        originalPrice,
        imageSrc,
        color: "Default", // Default color for quick add from card
        size: "Default", // Default size for quick add from card
        quantity: 1
      };
      
      // Use the utility function to add to cart
      const success = addToCart(cartItem);
      
      if (success) {
        toast.success(`${name} added to cart`);
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const toggleWishlist = () => {
    const isNowWishlisted = toggleWishlistItem(id);
    setIsWishlisted(isNowWishlisted);
    
    if (isNowWishlisted) {
      toast.success(`${name} added to wishlist`);
    } else {
      toast.success(`${name} removed from wishlist`);
    }
  };

  return (
    <div
      className={cn(
        "product-card group relative flex flex-col overflow-hidden rounded-none border bg-white",
        className
      )}
      {...props}
    >
      {/* Product labels */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
        {isNew && (
          <div className="rounded-none bg-cycle-dark px-2 py-1 text-xs font-medium text-white">
            New
          </div>
        )}
        {isSale && (
          <div className="rounded-none bg-cycle px-2 py-1 text-xs font-medium text-white">
            Sale
          </div>
        )}
      </div>

      {/* Product actions */}
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button 
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isWishlisted 
              ? "bg-cycle text-white" 
              : "bg-white text-gray-800 hover:bg-cycle hover:text-white"
          } shadow-md transition-colors`}
          onClick={toggleWishlist}
        >
          <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Product image */}
      <Link to={`/products/${id}`} className="overflow-hidden">
        <img
          src={imageSrc}
          alt={name}
          className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 text-xs text-gray-500">{category}</div>
        <Link to={`/products/${id}`} className="mb-2 line-clamp-2 flex-1 hover:underline">
          <h3 className="font-medium text-cycle-dark">{name}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <Price value={price} originalPrice={isDiscounted ? originalPrice : undefined} isDiscounted={isDiscounted} />
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-9 w-9 shrink-0 border-gray-300 text-gray-600 hover:bg-cycle hover:text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
