
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";
import { CartItemsList } from "@/components/cart/CartItemsList";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartItemType } from "@/components/cart/types";

// Sample cart items data
const initialCartItems: CartItemType[] = [
  {
    id: "1",
    name: "Mountain Explorer X500",
    price: 599.99,
    originalPrice: 749.99,
    imageSrc: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    color: "Red",
    size: "M",
    quantity: 1,
  },
  {
    id: "4",
    name: "Kids Adventure Bike",
    price: 249.99,
    originalPrice: 299.99,
    imageSrc: "https://images.unsplash.com/photo-1597265845623-816bd256d4b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJpa2UlMjBmb3IlMjBraWRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    color: "Blue",
    size: "S",
    quantity: 1,
  },
  {
    id: "2",
    name: "Urban Commuter C200",
    price: 449.99,
    originalPrice: 499.99,
    imageSrc: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    color: "Black",
    size: "L",
    quantity: 1,
  },
  {
    id: "3",
    name: "Road Master R1000",
    price: 899.99,
    originalPrice: 999.99,
    imageSrc: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cm9hZCUyMGJpa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    color: "Silver",
    size: "M",
    quantity: 1,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

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
    setCartItems(cartItems.filter((item) => item.id !== id));
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
