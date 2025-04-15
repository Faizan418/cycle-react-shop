
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Minus, Plus, Trash, ShoppingCart } from "lucide-react";

// Sample cart items data
const initialCartItems = [
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
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "cycle10") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
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
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="rounded-lg bg-white shadow-sm">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 p-4 md:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row">
                        {/* Product Image */}
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.imageSrc}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-cycle-dark">
                                <Link to={`/products/${item.id}`}>{item.name}</Link>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Color: {item.color} | Size: {item.size}
                              </p>
                            </div>
                            <Price
                              value={item.price}
                              originalPrice={item.originalPrice}
                              isDiscounted={!!item.originalPrice && item.originalPrice > item.price}
                            />
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                onClick={() => decrementQuantity(item.id)}
                                className="flex h-8 w-8 items-center justify-center border border-r-0 border-gray-300"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <div className="flex h-8 w-10 items-center justify-center border border-gray-300 text-center">
                                {item.quantity}
                              </div>
                              <button
                                onClick={() => incrementQuantity(item.id)}
                                className="flex h-8 w-8 items-center justify-center border border-l-0 border-gray-300"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center text-sm text-red-500 hover:text-red-700"
                            >
                              <Trash className="mr-1 h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 md:p-6">
                    <div className="flex justify-between">
                      <div className="flex">
                        <Input
                          placeholder="Promo Code"
                          className="w-32 sm:w-48 lg:w-64"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button
                          onClick={applyPromoCode}
                          className="ml-2 bg-cycle hover:bg-cycle-dark"
                          disabled={promoApplied}
                        >
                          Apply
                        </Button>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className="hidden sm:flex"
                      >
                        <Link to="/products">
                          Continue Shopping
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mobile Continue Shopping */}
                <div className="mt-4 sm:hidden">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link to="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cycle-gray">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-cycle-gray">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      {shipping === 0 && (
                        <p className="mt-1 text-sm text-green-600">
                          You've qualified for free shipping!
                        </p>
                      )}
                    </div>
                  </div>

                  <Button className="mt-6 w-full bg-cycle text-white hover:bg-cycle-dark">
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>

                {/* Order support */}
                <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold">Need Help?</h3>
                  <p className="mb-3 text-sm text-cycle-gray">
                    Our customer service team is here to help you with any questions.
                  </p>
                  <a
                    href="/contact"
                    className="text-sm font-medium text-cycle hover:underline"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
              <ShoppingCart className="mb-4 h-16 w-16 text-cycle-gray" />
              <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
              <p className="mb-6 text-cycle-gray">
                Looks like you haven't added anything to your cart yet.
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
