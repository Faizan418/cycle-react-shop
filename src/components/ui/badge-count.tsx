
import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeCountProps {
  count: number;
  limit?: number;
  className?: string;
}

export function BadgeCount({
  count,
  limit = 99,
  className,
  ...props
}: BadgeCountProps & React.HTMLAttributes<HTMLSpanElement>) {
  const displayCount = count > limit ? `${limit}+` : count;

  return (
    <span
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cycle p-0.5 text-xs font-medium text-white",
        className
      )}
      {...props}
    >
      {displayCount}
    </span>
  );
}
