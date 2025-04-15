
import * as React from "react";
import { cn } from "@/lib/utils";

interface PriceProps {
  value: number;
  currencyCode?: string;
  isDiscounted?: boolean;
  originalPrice?: number;
  className?: string;
}

export function Price({
  value,
  currencyCode = "USD",
  isDiscounted = false,
  originalPrice,
  className,
  ...props
}: PriceProps & React.HTMLAttributes<HTMLDivElement>) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  });

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <span className={cn("text-lg font-medium", isDiscounted && "text-cycle")}>{formatter.format(value)}</span>
      {isDiscounted && originalPrice && (
        <span className="text-sm text-gray-500 line-through">{formatter.format(originalPrice)}</span>
      )}
    </div>
  );
}
