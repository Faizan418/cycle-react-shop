
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-cycle-light border-t border-cycle-border">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link to="/" className="mb-4 inline-block">
              <span className="text-2xl font-bold text-cycle-dark">Cycle</span>
            </Link>
            <p className="mb-4 text-sm text-cycle-gray">
              Experience the joy of cycling with our premium bikes and accessories. Quality that lasts, service that exceeds expectations.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-cycle-gray hover:text-cycle">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-cycle-gray hover:text-cycle">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-cycle-gray hover:text-cycle">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-semibold uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Shop", href: "/products" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-cycle-gray hover:text-cycle transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-base font-semibold uppercase">Account</h3>
            <ul className="space-y-3">
              {[
                { name: "My Account", href: "/account" },
                { name: "Shopping Cart", href: "/cart" },
                { name: "Wishlist", href: "/wishlist" },
                { name: "Order Tracking", href: "/orders" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-cycle-gray hover:text-cycle transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-base font-semibold uppercase">Newsletter</h3>
            <p className="mb-4 text-sm text-cycle-gray">
              Subscribe to our newsletter to get updates about our products and offers.
            </p>
            <div className="flex space-x-0">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-r-none border-cycle-border focus-visible:ring-cycle"
              />
              <Button type="submit" className="rounded-l-none bg-cycle hover:bg-cycle-dark">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-cycle-border pt-6 text-center">
          <p className="text-sm text-cycle-gray">
            &copy; {new Date().getFullYear()} Cycle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
