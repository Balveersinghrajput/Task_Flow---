"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Ban,
  BarChart3,
  Book,
  CheckSquare,
  CircleHelp,
  Clock,
  Cookie,
  CreditCard,
  FileCheck,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  Info,
  Instagram,
  LayoutDashboard,
  Lightbulb,
  List,
  ListTodo,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  RefreshCw,
  Scale,
  Send,
  Settings,
  Shield,
  ShieldCheck,
  Sliders,
  Twitter,
  User,
  UserCheck,
  Video,
  Wrench,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Footer = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [email, setEmail] = useState("");
  const tooltipRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setActiveLink(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTooltip = (key) => {
    setActiveLink(activeLink === key ? null : key);
  };

  const tooltipContent = {
    menu: {
      icon: Menu,
      color: "from-blue-500 to-cyan-500",
      title: "Main Menu",
      items: [
        { icon: Home, label: "Home", url: "/" },
        { icon: LayoutDashboard, label: "Dashboard", url: "/dashboard" },
        { icon: Settings, label: "Settings", url: "/settings" }
      ]
    },
    tasks: {
      icon: ListTodo,
      color: "from-purple-500 to-pink-500",
      title: "Task List",
      items: [
        { icon: Inbox, label: "All Tasks", url: "/tasks" },
        { icon: CheckSquare, label: "Completed", url: "/tasks/completed" },
        { icon: Clock, label: "Pending", url: "/tasks/pending" }
      ]
    },
    profile: {
      icon: User,
      color: "from-green-500 to-emerald-500",
      title: "My Profile",
      items: [
        { icon: Instagram, label: "@taskflow_official", url: "https://instagram.com/taskflow_official" },
        { icon: MessageCircle, label: "+91 9739533883", url: "https://wa.me/919739533883" },
        { icon: Send, label: "@taskflow", url: "https://t.me/taskflow" },
        { icon: Twitter, label: "@taskflow_app", url: "https://twitter.com/taskflow_app" }
      ]
    },
    contact: {
      icon: Mail,
      color: "from-orange-500 to-red-500",
      title: "Contact Us",
      items: [
        { icon: Mail, label: "taskflow2004@gmail.com", url: "mailto:taskflow2004@gmail.com" },
        { icon: Phone, label: "+91 9739533883", url: "tel:+919739533883" },
        { icon: MessageCircle, label: "WhatsApp Support", url: "https://wa.me/919739533883" }
      ]
    },
    help: {
      icon: HelpCircle,
      color: "from-indigo-500 to-purple-500",
      title: "Help Center",
      items: [
        { icon: Phone, label: "+91 9739533883", url: "tel:+919739533883" },
        { icon: Book, label: "Documentation", url: "/docs" },
        { icon: Video, label: "Video Tutorials", url: "/tutorials" },
        { icon: Lightbulb, label: "Tips & Tricks", url: "/tips" }
      ]
    },
    faqs: {
      icon: MessageCircle,
      color: "from-pink-500 to-rose-500",
      title: "FAQs",
      items: [
        { icon: CircleHelp, label: "Getting Started", url: "/faqs#getting-started" },
        { icon: Wrench, label: "Troubleshooting", url: "/faqs#troubleshooting" },
        { icon: CreditCard, label: "Billing & Pricing", url: "/faqs#billing" },
        { icon: Lock, label: "Security", url: "/faqs#security" }
      ]
    },
    privacy: {
      icon: Shield,
      color: "from-blue-500 to-purple-500",
      title: "Privacy Policy",
      items: [
        { icon: Lock, label: "Data Protection", url: "/privacy#data" },
        { icon: UserCheck, label: "User Rights", url: "/privacy#rights" },
        { icon: BarChart3, label: "Data Collection", url: "/privacy#collection" },
        { icon: ShieldCheck, label: "Security Measures", url: "/privacy#security" }
      ]
    },
    terms: {
      icon: FileText,
      color: "from-teal-500 to-cyan-500",
      title: "Terms of Service",
      items: [
        { icon: FileCheck, label: "User Agreement", url: "/terms#agreement" },
        { icon: Scale, label: "Legal Terms", url: "/terms#legal" },
        { icon: Ban, label: "Prohibited Use", url: "/terms#prohibited" },
        { icon: RefreshCw, label: "Updates & Changes", url: "/terms#updates" }
      ]
    },
    cookies: {
      icon: Cookie,
      color: "from-yellow-500 to-orange-500",
      title: "Cookie Policy",
      items: [
        { icon: Info, label: "What are Cookies", url: "/cookies#what" },
        { icon: List, label: "Cookie Types", url: "/cookies#types" },
        { icon: Sliders, label: "Manage Cookies", url: "/cookies#manage" },
        { icon: X, label: "Opt-Out", url: "/cookies#opt-out" }
      ]
    }
  };

  const TooltipCard = ({ content, position = "right" }) => {
    const positionClasses = {
      right: "left-full top-0 ml-4 md:ml-4",
      bottom: "bottom-full right-0 mb-3 left-auto md:right-0",
      mobileBottom: "left-0 right-0 top-full mt-2"
    };

    const arrowClasses = {
      right: "absolute right-full top-8 hidden md:block",
      bottom: "absolute top-full right-8 hidden md:block",
      mobileBottom: "absolute bottom-full left-8"
    };

    const arrowBorder = {
      right: "w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-[#0a1628]/90",
      bottom: "w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#0a1628]/90",
      mobileBottom: "w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#0a1628]/90"
    };

    return (
      <>
        {/* Mobile version - appears below */}
        <div className={`md:hidden absolute ${positionClasses.mobileBottom} z-50 animate-in fade-in slide-in-from-top-2 duration-200 w-full max-w-xs`}>
          <div className="relative bg-[#0a1628]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4">
            <div className={arrowClasses.mobileBottom}>
              <div className={arrowBorder.mobileBottom}></div>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${content.color} bg-opacity-20 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0`}>
                {(() => {
                  const Icon = content.icon;
                  return <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />;
                })()}
              </div>
              <h4 className="text-white font-bold text-sm">
                {content.title}
              </h4>
            </div>
            
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {content.items.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-all">
                      <ItemIcon className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs text-gray-300 group-hover:text-white transition-colors flex-1">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop version - appears on right or bottom */}
        <div className={`hidden md:block absolute ${positionClasses[position]} z-50 animate-in fade-in slide-in-from-${position === 'bottom' ? 'bottom' : 'left'}-2 duration-200`}>
          <div className="relative bg-[#0a1628]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4 w-64">
            <div className={arrowClasses[position]}>
              <div className={arrowBorder[position]}></div>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${content.color} bg-opacity-20 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0`}>
                {(() => {
                  const Icon = content.icon;
                  return <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />;
                })()}
              </div>
              <h4 className="text-white font-bold text-sm">
                {content.title}
              </h4>
            </div>
            
            <div className="space-y-1">
              {content.items.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-all">
                      <ItemIcon className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs text-gray-300 group-hover:text-white transition-colors flex-1">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <footer className="relative mt-20 text-white overflow-visible">
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
                  {
                    icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                    label: "Twitter",
                    href: "https://x.com/Balveersin93270?t=jAkDFkpzepEXfSdnOln--g&s=09",
                  },
                  {
                    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/balveersingh-rajput/",
                  },
                  {
                    icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
                    label: "GitHub",
                    href: "https://github.com/BalveersinghRajput",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700 hover:border-blue-500/50 flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="relative" ref={tooltipRef}>
              <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { key: "menu", label: "Menu" },
                  { key: "tasks", label: "Task List" },
                  { key: "profile", label: "Profile" },
                  { href: "/#features", label: "Features", noTooltip: true }
                ].map((link, i) => (
                  <li key={i} className="relative">
                    {link.noTooltip ? (
                      <a 
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                      </a>
                    ) : (
                      <button
                        onClick={() => toggleTooltip(link.key)}
                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group w-full text-left"
                      >
                        <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                      </button>
                    )}
                    
                    {activeLink === link.key && tooltipContent[link.key] && (
                      <TooltipCard content={tooltipContent[link.key]} position="right" />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="relative" ref={tooltipRef}>
              <h3 className="text-lg font-bold mb-4 text-white">Support</h3>
              <ul className="space-y-3">
                {[
                  { key: "contact", label: "Contact Us" },
                  { key: "help", label: "Help Center" },
                  { key: "faqs", label: "FAQs" },
                  { key: "privacy", label: "Privacy Policy" }
                ].map((link, i) => (
                  <li key={i} className="relative">
                    <button
                      onClick={() => toggleTooltip(link.key)}
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group w-full text-left"
                    >
                      <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </button>
                    
                    {activeLink === link.key && tooltipContent[link.key] && (
                      <TooltipCard content={tooltipContent[link.key]} position="right" />
                    )}
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
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
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

            <div className="flex gap-4 md:gap-6 text-xs text-gray-500 relative" ref={tooltipRef}>
              {[
                { key: "terms", label: "Terms" },
                { key: "privacy", label: "Privacy" },
                { key: "cookies", label: "Cookies" }
              ].map((link, i) => (
                <div key={i} className="relative">
                  <button 
                    onClick={() => toggleTooltip(link.key)}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </button>
                  
                  {activeLink === link.key && tooltipContent[link.key] && (
                    <TooltipCard content={tooltipContent[link.key]} position="bottom" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};