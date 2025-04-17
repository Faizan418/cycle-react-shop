
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
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
  );
}
