
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export const OrdersSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Your recent purchase history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <p className="font-medium">#ORD12345</p>
                <p className="text-sm text-gray-500">March 15, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$599.99</p>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                  Delivered
                </span>
              </div>
            </div>
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <p className="font-medium">#ORD12356</p>
                <p className="text-sm text-gray-500">February 28, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$449.99</p>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  Shipped
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <ShoppingBag className="mr-2 h-4 w-4" />
          View All Orders
        </Button>
      </CardFooter>
    </Card>
  );
};
