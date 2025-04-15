
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="bg-cycle-dark py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Mail className="mx-auto mb-4 h-10 w-10 text-white opacity-80" />
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
            Join Our Newsletter
          </h2>
          <p className="mb-8 text-white/75">
            Subscribe to get special offers, free giveaways, and product launches.
          </p>
          <div className="flex w-full max-w-md mx-auto space-x-0">
            <Input
              type="email"
              placeholder="Your email address"
              className="rounded-r-none border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-cycle"
            />
            <Button type="submit" className="rounded-l-none bg-cycle hover:bg-white hover:text-cycle-dark">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
