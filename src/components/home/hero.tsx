
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-gradient-to-br from-[#1EAEDB] via-[#33C3F0] to-[#0FA0CE]">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="relative z-10 grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-white/90">
              New Collection 2023
            </span>
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tighter text-white md:text-5xl lg:text-6xl">
              Discover the Joy <br /> of Cycling
            </h1>
            <p className="mb-8 max-w-md text-lg text-white/80">
              Premium bikes and accessories to elevate your cycling experience. 
              From city bikes to mountain rides, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-white text-cycle hover:bg-white/90">
                <Link to="/products">
                  Shop Collection
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-cycle">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Premium bicycle"
              className="mx-auto max-h-[500px] w-auto rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="h-full w-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
}
