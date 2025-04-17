
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";
import { CartItemsList } from "@/components/cart/CartItemsList";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartItemType } from "@/components/cart/types";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          console.log("Loading cart from localStorage:", parsedCart);
          setCartItems(parsedCart);
        } else {
          console.log("No cart found in localStorage");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        setCartItems([]);
      }
    };
    
    // Initial load
    loadCart();
    
    // Listen for storage changes
    window.addEventListener('storage', loadCart);
    window.addEventListener('cartUpdated', loadCart);
    
    return () => {
      window.removeEventListener('storage', loadCart);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  const incrementQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id: string) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    
    if (itemToRemove) {
      toast.success(`${itemToRemove.name} removed from cart`);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "cycle10") {
      setPromoApplied(true);
      toast.success("Promo code applied: 10% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 75 ? 0 : 10;
  const total = subtotal - discount + shipping;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cycle-light py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              <CartItemsList
                cartItems={cartItems}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                removeItem={removeItem}
                clearCart={clearCart}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                applyPromoCode={applyPromoCode}
                promoApplied={promoApplied}
              />
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                total={total}
                promoApplied={promoApplied}
              />
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
