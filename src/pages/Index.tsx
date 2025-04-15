
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategorySection } from "@/components/home/category-section";
import { Testimonial } from "@/components/home/testimonial";
import { Newsletter } from "@/components/home/newsletter";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <FeaturedProducts />
        <CategorySection />
        <Testimonial />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
