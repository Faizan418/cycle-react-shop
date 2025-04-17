
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Price } from "@/components/ui/price";
import { Minus, Plus, Check, ShoppingCart, Heart, Truck, RotateCcw, Shield } from "lucide-react";
import { toast } from "sonner";
import { CartItemType } from "@/components/cart/types";

// Sample products data
const products = [
  {
    id: "1",
    name: "Mountain Explorer X500",
    price: 599.99,
    originalPrice: 749.99,
    description: "The Mountain Explorer X500 is designed for the most challenging terrains. With its lightweight aluminum frame, responsive suspension, and reliable disc brakes, you'll conquer any mountain trail with confidence and style.",
    features: [
      "Aluminum alloy frame",
      "Front suspension fork with 100mm travel",
      "27-speed Shimano drivetrain",
      "Hydraulic disc brakes",
      "27.5\" wheels with all-terrain tires",
    ],
    specifications: {
      Frame: "Aluminum Alloy 6061",
      Fork: "SR Suntour XCR 32 Air, 100mm travel",
      Shifters: "Shimano Deore, 9-speed",
      Brakes: "Shimano MT200 Hydraulic Disc",
      Wheels: "27.5\" Double-wall alloy rims",
      Tires: "Maxxis Ardent, 27.5\" x 2.25\"",
      Saddle: "Ergonomic MTB saddle with pressure relief channel",
      Weight: "12.5 kg / 27.5 lbs",
    },
    images: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    ],
    category: "Mountain Bikes",
    colors: ["Red", "Black", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    isSale: true,
  },
  {
    id: "2",
    name: "City Cruiser Deluxe",
    price: 429.99,
    description: "Perfect for urban commuting and leisure rides around town, the City Cruiser Deluxe combines style and functionality. Its comfortable riding position, reliable components, and practical features make it the ideal companion for city adventures.",
    features: [
      "Step-through frame design",
      "7-speed Shimano drivetrain",
      "Front and rear fenders",
      "Comfortable saddle and ergonomic grips",
      "Rear cargo rack included",
    ],
    specifications: {
      Frame: "High-tensile steel",
      Fork: "Steel, rigid",
      Shifters: "Shimano Revo, 7-speed",
      Brakes: "Alloy V-brakes",
      Wheels: "700c Double-wall alloy rims",
      Tires: "Kenda Kwest, 700c x 38c",
      Saddle: "Comfort saddle with springs",
      Weight: "14 kg / 30.8 lbs",
    },
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJpY3ljbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1475666675596-cca2035b3d79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJpY3ljbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    ],
    category: "City Bikes",
    colors: ["Mint Green", "White", "Black"],
    sizes: ["S", "M", "L"],
  },
];

// Function to retrieve cart from local storage
const getCartFromStorage = (): CartItemType[] => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error getting cart from storage:", error);
    return [];
  }
};

// Function to save cart to local storage
const saveCartToStorage = (cart: CartItemType[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch custom event
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

// Function to retrieve wishlist from local storage
const getWishlistFromStorage = (): string[] => {
  try {
    const wishlistData = localStorage.getItem('wishlist');
    return wishlistData ? JSON.parse(wishlistData) : [];
  } catch (error) {
    console.error("Error getting wishlist from storage:", error);
    return [];
  }
};

// Function to save wishlist to local storage
const saveWishlistToStorage = (wishlist: string[]) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    // Dispatch custom event
    window.dispatchEvent(new Event('wishlistUpdated'));
  } catch (error) {
    console.error("Error saving wishlist to storage:", error);
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  // Find product by ID
  const product = products.find((p) => p.id === id) || products[0];
  console.log("Product data:", product);

  // Check if product is in wishlist
  const [isInWishlist, setIsInWishlist] = useState(() => {
    const wishlist = getWishlistFromStorage();
    return wishlist.includes(product.id);
  });

  // Update wishlist state when storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const wishlist = getWishlistFromStorage();
      setIsInWishlist(wishlist.includes(product.id));
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, [product.id]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    try {
      const cart = getCartFromStorage();
      
      // Check if product already exists in cart with the same color and size
      const existingItemIndex = cart.findIndex(
        item => item.id === product.id && item.color === selectedColor && item.size === selectedSize
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        const newItem: CartItemType = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          imageSrc: product.images[0],
          color: selectedColor,
          size: selectedSize,
          quantity: quantity
        };
        cart.push(newItem);
      }
      
      console.log("Saving cart with new item:", cart);
      saveCartToStorage(cart);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const toggleWishlist = () => {
    try {
      const wishlist = getWishlistFromStorage();
      
      if (isInWishlist) {
        // Remove from wishlist
        const updatedWishlist = wishlist.filter(itemId => itemId !== product.id);
        saveWishlistToStorage(updatedWishlist);
        setIsInWishlist(false);
        toast.success(`${product.name} removed from wishlist`);
      } else {
        // Add to wishlist
        wishlist.push(product.id);
        saveWishlistToStorage(wishlist);
        setIsInWishlist(true);
        toast.success(`${product.name} added to wishlist`);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist");
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`block h-20 w-20 overflow-hidden rounded-md border-2 ${
                      activeImage === index ? "border-cycle" : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              {product.isSale && (
                <div className="mb-4 inline-block rounded-none bg-cycle px-3 py-1 text-sm font-medium text-white">
                  Sale
                </div>
              )}
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <Price
                value={product.price}
                originalPrice={product.originalPrice}
                isDiscounted={!!product.originalPrice && product.originalPrice > product.price}
                className="mb-4 text-2xl"
              />

              <p className="mb-6 text-cycle-gray">{product.description}</p>

              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`rounded-none border px-4 py-2 text-sm ${
                        selectedColor === color
                          ? "border-cycle bg-cycle text-white"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`rounded-none border px-4 py-2 text-sm ${
                        selectedSize === size
                          ? "border-cycle bg-cycle text-white"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium">Quantity</h3>
                <div className="flex w-32 items-center">
                  <button
                    onClick={decrementQuantity}
                    className="flex h-10 w-10 items-center justify-center border border-r-0 border-gray-300"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <div className="flex h-10 w-12 items-center justify-center border border-gray-300 text-center">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="flex h-10 w-10 items-center justify-center border border-l-0 border-gray-300"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-4">
                <Button className="btn-cycle flex-1 sm:flex-none" onClick={addToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className={`flex-1 sm:flex-none ${isInWishlist ? "bg-pink-50 text-pink-600 border-pink-200" : ""}`}
                  onClick={toggleWishlist}
                >
                  <Heart className="mr-2 h-4 w-4" fill={isInWishlist ? "currentColor" : "none"} />
                  {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-start">
                  <Truck className="mr-3 h-5 w-5 text-cycle" />
                  <div>
                    <span className="block font-medium">Free shipping</span>
                    <span className="text-sm text-cycle-gray">On orders over $75</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <RotateCcw className="mr-3 h-5 w-5 text-cycle" />
                  <div>
                    <span className="block font-medium">30-day returns</span>
                    <span className="text-sm text-cycle-gray">Hassle-free returns</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="mr-3 h-5 w-5 text-cycle" />
                  <div>
                    <span className="block font-medium">2-year warranty</span>
                    <span className="text-sm text-cycle-gray">On all bicycles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start rounded-none border-b">
                <TabsTrigger value="description" className="rounded-none text-base">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specifications" className="rounded-none text-base">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none text-base">
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <h3 className="text-xl font-bold">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-cycle" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="pt-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className="py-3 pr-6 font-medium">{key}</td>
                          <td className="py-3 text-cycle-gray">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-bold">Customer Reviews</h3>
                  <p className="mb-6 text-cycle-gray">Be the first to review this product</p>
                  <Button className="btn-cycle">Write a Review</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
            <FeaturedProducts />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
