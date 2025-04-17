
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoApplied: boolean;
}

export function OrderSummary({
  subtotal,
  discount,
  shipping,
  total,
  promoApplied,
}: OrderSummaryProps) {
  return (
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
        <Link
          to="/contact"
          className="text-sm font-medium text-cycle hover:underline"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
