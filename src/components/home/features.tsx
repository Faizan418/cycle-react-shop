
import { CheckCircle, Truck, RotateCcw, Clock } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Shipping",
      description: "On all orders over $75.00",
    },
    {
      icon: <RotateCcw className="h-8 w-8" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Quality Guarantee",
      description: "Best materials and craftsmanship",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Dedicated support team",
    },
  ];

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 text-cycle">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-cycle-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
