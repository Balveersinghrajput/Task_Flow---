"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="mt-0 text-white shadow-inner bg-gradient-to-r from-[#011b3b] to-[#000000]">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold mb-2">Task - Flow</h2>
          <p className="text-sm text-gray-300">
            Collaborate, plan, and execute projects seamlessly — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/menu" className="hover:underline">Menu</a></li>
            <li><a href="/tasks" className="hover:underline">Task List</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>
            <li><a href="/features" className="hover:underline">Features</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/allergen" className="hover:underline">Allergen Info</a></li>
            <li><a href="/faqs" className="hover:underline">FAQs</a></li>
            <li><a href="/privacy" className="hover:underline">Terms & Privacy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
          <form className="flex flex-col space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-white border-gray-600 placeholder-gray-400"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Text */}
      <Separator className="bg-gray-600" />
      <div className="text-center py-4 text-sm text-gray-400">
        &copy; 2025 Task-Flow | Developed with ❤️ by Balveer Singh Rajput
      </div>
    </footer>
  );
};
