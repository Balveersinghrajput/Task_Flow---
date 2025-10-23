"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter logic here
  };

  return (
    <footer className="relative mt-20 text-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#011b3b] via-[#001428] to-[#000000]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Task-Flow
                </h2>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Collaborate, plan, and execute projects seamlessly — all in one place. Transform your workflow today.
              </p>
              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {[
                  { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", label: "Twitter" },
                  { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z", label: "LinkedIn" },
                  { icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22", label: "GitHub" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700 hover:border-blue-500/50 flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { href: "/menu", label: "Menu" },
                  { href: "/tasks", label: "Task List" },
                  { href: "/profile", label: "Profile" },
                  { href: "/#features", label: "Features" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Support</h3>
              <ul className="space-y-3">
                {[
                  { href: "/contact", label: "Contact Us" },
                  { href: "/help", label: "Help Center" },
                  { href: "/faqs", label: "FAQs" },
                  { href: "/privacy", label: "Privacy Policy" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe to get the latest updates and news.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800/50 text-white border-gray-700 focus:border-blue-500 placeholder-gray-500 pr-10 transition-all duration-300"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              &copy; 2025 <span className="font-semibold text-blue-400">Task-Flow</span>. All rights reserved.
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Developed with</span>
              <span className="text-red-500 animate-pulse text-lg">❤️</span>
              <span>by</span>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Balveer Singh Rajput
              </span>
            </div>

            <div className="flex gap-6 text-xs text-gray-500">
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="hover:text-blue-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};