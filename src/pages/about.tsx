
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-cycle-light py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold md:text-5xl">About Cycle</h1>
              <p className="mt-4 text-lg text-cycle-gray">
                Premium bicycles for every rider. We're passionate about helping you find the perfect bike for your journey.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-bold">Our Story</h2>
                <div className="mt-6 space-y-4 text-cycle-gray">
                  <p>
                    Founded in 2010 by cycling enthusiasts, Cycle began as a small workshop dedicated to creating hand-crafted bicycles for local riders.
                  </p>
                  <p>
                    Our passion for quality craftsmanship and innovative design quickly earned us a reputation among cycling communities. As demand grew, we expanded our offerings while maintaining our commitment to excellence.
                  </p>
                  <p>
                    Today, Cycle is a premier destination for cyclists of all levels. We curate the finest bicycles and accessories from around the world, while still producing our signature models that reflect our dedication to quality and performance.
                  </p>
                </div>
                <div className="mt-8">
                  <Button className="btn-cycle">View Our Collection</Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJpY3ljbGUlMjBzaG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Cycle workshop"
                  className="rounded-lg object-cover shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 hidden rounded-lg bg-cycle p-6 text-white shadow-lg md:block">
                  <span className="text-4xl font-bold">13+</span>
                  <span className="block text-sm font-medium uppercase tracking-wider">
                    Years of Excellence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-cycle-light py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold">Our Values</h2>
              <p className="mt-4 text-cycle-gray">
                At Cycle, these principles guide everything we do, from product design to customer service.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Quality",
                  description:
                    "We never compromise on materials or craftsmanship. Every product meets our rigorous standards.",
                },
                {
                  title: "Innovation",
                  description:
                    "We continuously seek new technologies and designs to enhance the cycling experience.",
                },
                {
                  title: "Sustainability",
                  description:
                    "We're committed to environmentally responsible practices throughout our operations.",
                },
                {
                  title: "Community",
                  description:
                    "We actively support and engage with the cycling community through events and initiatives.",
                },
                {
                  title: "Service",
                  description:
                    "We provide exceptional customer service and expert advice to help you make informed choices.",
                },
                {
                  title: "Accessibility",
                  description:
                    "We believe cycling should be accessible to all and offer options for every budget and skill level.",
                },
              ].map((value, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                  <p className="text-cycle-gray">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold">Our Team</h2>
              <p className="mt-4 text-cycle-gray">
                Meet the dedicated experts who make Cycle the premier destination for cyclists.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  name: "Alex Morgan",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhlYWRzaG90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
                },
                {
                  name: "Jamie Chen",
                  role: "Head of Design",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWRzaG90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
                },
                {
                  name: "Sam Wilson",
                  role: "Master Technician",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGhlYWRzaG90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
                },
                {
                  name: "Taylor Reed",
                  role: "Customer Experience",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhlYWRzaG90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-cycle-gray">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-cycle-dark py-12 text-white md:py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold">Why Choose Cycle</h2>
              <p className="mt-4 text-white/70">
                Here's what sets us apart from other bicycle retailers.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Premium Selection of World-Class Brands",
                "Expert Advice from Passionate Cyclists",
                "Personalized Bike Fitting Service",
                "Comprehensive Warranty on All Products",
                "Regular Maintenance Workshops",
                "Active Community Involvement",
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <Check className="mr-2 h-6 w-6 shrink-0 text-cycle" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild className="bg-white text-cycle-dark hover:bg-cycle hover:text-white">
                <a href="/products">Explore Our Collection</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
