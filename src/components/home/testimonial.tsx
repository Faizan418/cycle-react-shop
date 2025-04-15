
import { Star } from "lucide-react";

export function Testimonial() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-cycle">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <blockquote className="text-center">
            <div className="mb-4 flex justify-center">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-cycle text-cycle" />
                ))}
            </div>
            <p className="mb-6 text-xl italic text-cycle-gray">
              "The Mountain Explorer X500 exceeded all my expectations. The build quality is exceptional, and it handles rough terrain like a dream. The team at Cycle was incredibly helpful with my purchase, offering expert advice and ensuring I got the perfect bike for my needs."
            </p>
            <footer>
              <div className="mb-2 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Customer"
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
              <div>
                <cite className="not-italic font-semibold text-cycle-dark">
                  Michael Johnson
                </cite>
                <div className="text-sm text-cycle-gray">Mountain Biking Enthusiast</div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
