
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { CartItemType } from "./types";

interface CartItemsListProps {
  cartItems: CartItemType[];
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  applyPromoCode: () => void;
  promoApplied: boolean;
}

export function CartItemsList({
  cartItems,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  promoCode,
  setPromoCode,
  applyPromoCode,
  promoApplied,
}: CartItemsListProps) {
  return (
    <div className="lg:col-span-2">
      <div className="rounded-lg bg-white shadow-sm">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            removeItem={removeItem}
          />
        ))}

        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex max-w-xs">
              <Input
                placeholder="Promo Code"
                className="w-full sm:w-48 lg:w-64 rounded-r-none"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button
                onClick={applyPromoCode}
                className="rounded-l-none bg-cycle hover:bg-cycle-dark"
                disabled={promoApplied}
              >
                Apply
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button
                asChild
                variant="outline"
              >
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
