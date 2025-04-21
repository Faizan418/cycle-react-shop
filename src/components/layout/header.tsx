
import * as React from "react";
import { Link } from "react-router-dom";
import { BadgeCount } from "@/components/ui/badge-count";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import { CartItemType } from "@/components/cart/types";

export function Header() {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Update cart and wishlist count when localStorage changes
  useEffect(() => {
    const updateCounts = () => {
      // Get cart count
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const cart: CartItemType[] = JSON.parse(cartData);
        setCartCount(cart.length);
      } else {
        setCartCount(0);
      }

      // Get wishlist count
      const wishlistData = localStorage.getItem('wishlist');
      if (wishlistData) {
        const wishlist: string[] = JSON.parse(wishlistData);
        setWishlistCount(wishlist.length);
      } else {
        setWishlistCount(0);
      }
    };

    // Initial update
    updateCounts();

    // Listen for storage changes
    window.addEventListener('storage', updateCounts);
    
    // Custom event listener for cart/wishlist updates
    const handleCustomStorageEvent = () => updateCounts();
    window.addEventListener('cartUpdated', handleCustomStorageEvent);
    window.addEventListener('wishlistUpdated', handleCustomStorageEvent);
    
    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartUpdated', handleCustomStorageEvent);
      window.removeEventListener('wishlistUpdated', handleCustomStorageEvent);
    };
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Mock search results
  const searchResults = [
    { id: "1", name: "Mountain Explorer X500", category: "Mountain Bikes" },
    { id: "2", name: "Urban Commuter C200", category: "City Bikes" },
    { id: "3", name: "Road Master R1000", category: "Road Bikes" },
    { id: "4", name: "Kids Adventure Bike", category: "Kids Bikes" },
  ];

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search products..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {searchResults.map((item) => (
              <CommandItem 
                key={item.id}
                onSelect={() => {
                  setOpen(false);
                  window.location.href = `/products/${item.id}`;
                }}
              >
                {item.name}
                <span className="ml-2 text-xs text-gray-500">{item.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <header 
  className={`sticky top-0 z-40 w-full transition-all duration-300 ${
    isScrolled ? "bg-gradient-to-br  from-[#0f1346] via-[#000000] to-[#0f1346] text-black shadow-sm" : "bg-gradient-to-br from-[#000000] via-[#0f1346] to-[#000000] text-white"
  }`}
>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Cycle</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden space-x-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-white hover:text-cycle transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center space-x-4 lg:flex">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-blue-900"
                onClick={() => setOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Link to="/account">
                <Button variant="ghost" size="icon" className="text-white hover:text-blue-900">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative text-white hover:text-blue-900">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && <BadgeCount count={wishlistCount} className="absolute -right-1 -top-1" />}
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative text-white hover:text-blue-900">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && <BadgeCount count={cartCount} className="absolute -right-1 -top-1" />}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu & Actions */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative text-cycle-dark">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && <BadgeCount count={cartCount} className="absolute -right-1 -top-1" />}
                </Button>
              </Link>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="flex w-[80vw] flex-col sm:max-w-md">
                  <div className="flex items-center justify-between border-b py-4">
                    <span className="text-xl font-bold text-cycle-dark">Menu</span>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>
                  
                  <nav className="mt-6 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="text-base font-medium text-cycle-dark hover:text-cycle transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      to="/cart"
                      className="text-base font-medium text-cycle-dark hover:text-cycle transition-colors"
                    >
                      Cart
                    </Link>
                    <Link
                      to="/wishlist"
                      className="text-base font-medium text-cycle-dark hover:text-cycle transition-colors"
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/account"
                      className="text-base font-medium text-cycle-dark hover:text-cycle transition-colors"
                    >
                      My Account
                    </Link>
                  </nav>
                  
                  <div className="mt-8 space-y-4">
                    <Button 
                      className="w-full bg-cycle text-white hover:bg-cycle-dark"
                      onClick={() => {
                        window.location.href = "/account";
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Button>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm font-medium text-cycle-dark">Search</div>
                      <div className="flex">
                        <Input placeholder="Search products..." className="rounded-r-none" />
                        <Button 
                          className="rounded-l-none bg-cycle hover:bg-cycle-dark"
                          onClick={() => setOpen(true)}
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
