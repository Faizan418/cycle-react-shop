
import { Link } from "react-router-dom";
import { Minus, Plus, Trash } from "lucide-react";
import { Price } from "@/components/ui/price";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageSrc: string;
  color: string;
  size: string;
  quantity: number;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeItem: (id: string) => void;
}

export function CartItem({
  id,
  name,
  price,
  originalPrice,
  imageSrc,
  color,
  size,
  quantity,
  incrementQuantity,
  decrementQuantity,
  removeItem,
}: CartItemProps) {
  return (
    <div className="border-b border-gray-200 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Product Image */}
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-cycle-dark">
                <Link to={`/products/${id}`}>{name}</Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Color: {color} | Size: {size}
              </p>
            </div>
            <Price
              value={price}
              originalPrice={originalPrice}
              isDiscounted={!!originalPrice && originalPrice > price}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => decrementQuantity(id)}
                className="flex h-8 w-8 items-center justify-center border border-r-0 border-gray-300 hover:bg-gray-100"
              >
                <Minus className="h-3 w-3" />
              </button>
              <div className="flex h-8 w-10 items-center justify-center border border-gray-300 text-center">
                {quantity}
              </div>
              <button
                onClick={() => incrementQuantity(id)}
                className="flex h-8 w-8 items-center justify-center border border-l-0 border-gray-300 hover:bg-gray-100"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <button
              onClick={() => removeItem(id)}
              className="flex items-center text-sm text-red-500 hover:text-red-700"
            >
              <Trash className="mr-1 h-4 w-4" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
