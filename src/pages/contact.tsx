
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-cycle-light py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
              <p className="mt-4 text-lg text-cycle-gray">
                We'd love to hear from you. Get in touch with our team for any questions or inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Contact Information */}
              <div>
                <h2 className="mb-6 text-3xl font-bold">Get In Touch</h2>
                <p className="mb-8 text-cycle-gray">
                  We're here to help with any questions about our products, services, or cycling in general.
                  Reach out through any of these channels:
                </p>

                <div className="space-y-6">
                  <div className="flex">
                    <MapPin className="mr-4 h-6 w-6 text-cycle" />
                    <div>
                      <h3 className="font-semibold">Our Store</h3>
                      <address className="not-italic text-cycle-gray">
                        123 Cycling Avenue<br />
                        Bike Town, BT 12345<br />
                        United States
                      </address>
                    </div>
                  </div>

                  <div className="flex">
                    <Phone className="mr-4 h-6 w-6 text-cycle" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-cycle-gray">(123) 456-7890</p>
                    </div>
                  </div>

                  <div className="flex">
                    <Mail className="mr-4 h-6 w-6 text-cycle" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-cycle-gray">info@cyclebikes.com</p>
                    </div>
                  </div>

                  <div className="flex">
                    <Clock className="mr-4 h-6 w-6 text-cycle" />
                    <div>
                      <h3 className="font-semibold">Hours</h3>
                      <p className="text-cycle-gray">
                        Monday - Friday: 9am - 6pm<br />
                        Saturday: 10am - 5pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 h-64 rounded-lg bg-gray-200"></div>
              </div>

              {/* Contact Form */}
              <div className="rounded-lg border border-cycle-border bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
                <form>
                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="border-cycle-border"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        required
                        className="border-cycle-border"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="Subject of your message"
                      className="border-cycle-border"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={6}
                      required
                      className="border-cycle-border"
                    />
                  </div>

                  <Button type="submit" className="btn-cycle w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-cycle-light py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-4 text-cycle-gray">
                Find answers to common questions about our products and services.
              </p>
            </div>

            <div className="mt-12 mx-auto max-w-4xl space-y-4">
              {[
                {
                  question: "Do you offer bike fitting services?",
                  answer: "Yes, we provide professional bike fitting services to ensure your bike is perfectly adjusted for your body dimensions and riding style. This service can be booked in-store or online.",
                },
                {
                  question: "What is your return policy?",
                  answer: "We offer a 30-day return policy on all unused products in original packaging. Bikes that have been ridden can be returned within 14 days for store credit, subject to inspection.",
                },
                {
                  question: "Do you ship internationally?",
                  answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary depending on the destination. Please check our shipping page for more details.",
                },
                {
                  question: "Do you offer assembly services?",
                  answer: "Yes, all bikes purchased in-store are assembled by our expert technicians at no additional cost. For online purchases, we offer professional assembly for a small fee.",
                },
                {
                  question: "How can I schedule a test ride?",
                  answer: "Test rides can be scheduled through our website or by calling our store directly. We recommend booking in advance, especially during weekends and peak season.",
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                  <p className="text-cycle-gray">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
