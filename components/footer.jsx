"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Ban,
  BarChart3,
  Book,
  CheckSquare,
  ChevronDown,
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Footer = () => {
  const router = useRouter();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [email, setEmail] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const handleLinkClick = (e, url) => {
    e.preventDefault();
    router.push(url);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const tooltipContent = {
    menu: {
      icon: Menu,
      color: "from-blue-500 to-cyan-500",
      title: "Main Menu",
      mainUrl: "/dashboard",
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
      mainUrl: "/tasks",
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
      mainUrl: "/profile",
      items: [
        { icon: Instagram, label: "@taskflow_official", url: "https://instagram.com/taskflow_official", external: true },
        { icon: MessageCircle, label: "+91 9739533883", url: "https://wa.me/919739533883", external: true },
        { icon: Send, label: "@taskflow", url: "https://t.me/taskflow", external: true },
        { icon: Twitter, label: "@taskflow_app", url: "https://twitter.com/taskflow_app", external: true }
      ]
    },
    contact: {
      icon: Mail,
      color: "from-orange-500 to-red-500",
      title: "Contact Us",
      mainUrl: "/contact",
      items: [
        { icon: Mail, label: "taskflow2004@gmail.com", url: "mailto:taskflow2004@gmail.com", external: true },
        { icon: Phone, label: "+91 9739533883", url: "tel:+919739533883", external: true },
        { icon: MessageCircle, label: "WhatsApp Support", url: "https://wa.me/919739533883", external: true }
      ]
    },
    help: {
      icon: HelpCircle,
      color: "from-indigo-500 to-purple-500",
      title: "Help Center",
      mainUrl: "/help",
      items: [
        { icon: Phone, label: "+91 9739533883", url: "tel:+919739533883", external: true },
        { icon: Book, label: "Documentation", url: "/docs" },
        { icon: Video, label: "Video Tutorials", url: "/tutorials" },
        { icon: Lightbulb, label: "Tips & Tricks", url: "/tips" }
      ]
    },
    faqs: {
      icon: MessageCircle,
      color: "from-pink-500 to-rose-500",
      title: "FAQs",
      mainUrl: "/faqs",
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
      mainUrl: "/privacy",
      items: [
        { icon: Lock, label: "Data Protection", url: "/privacy#data" },
        { icon: UserCheck, label: "User Rights", url: "/privacy#rights" },
        { icon: BarChart3, label: "Data Collection", url: "/privacy#collection" },
        { icon: ShieldCheck, label: "Security Measures", url: "/privacy#security" }
      ]
    },
    privacySupport: {
      icon: Shield,
      color: "from-blue-500 to-purple-500",
      title: "Privacy Policy",
      mainUrl: "/privacy",
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
      mainUrl: "/terms",
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
      mainUrl: "/cookies",
      items: [
        { icon: Info, label: "What are Cookies", url: "/cookies#what" },
        { icon: List, label: "Cookie Types", url: "/cookies#types" },
        { icon: Sliders, label: "Manage Cookies", url: "/cookies#manage" },
        { icon: X, label: "Opt-Out", url: "/cookies#opt-out" }
      ]
    }
  };

  const renderTooltip = (hoveredKey) => {
    if (!tooltipContent[hoveredKey]) return null;

    const content = tooltipContent[hoveredKey];
    
    return (
      <div className="relative bg-[#0a1628]/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4 w-64">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${content.color} bg-opacity-20 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0`}>
            {(() => {
              const Icon = content.icon;
              return <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />;
            })()}
          </div>
          <h4 className="text-white font-bold text-sm">{content.title}</h4>
        </div>
        <div className="space-y-1">
          {content.items.map((item, idx) => {
            const ItemIcon = item.icon;
            return item.external ? (
              <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-all duration-200 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-all">
                  <ItemIcon className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <span className="text-xs text-gray-300 group-hover:text-white transition-colors flex-1">{item.label}</span>
              </a>
            ) : (
              <a key={idx} href={item.url} onClick={(e) => handleLinkClick(e, item.url)} className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-all duration-200 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-all">
                  <ItemIcon className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <span className="text-xs text-gray-300 group-hover:text-white transition-colors flex-1">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMobileSection = (sectionKey, title, links) => {
    const isExpanded = expandedSection === sectionKey;
    
    return (
      <div className="border-b border-gray-700/50 last:border-b-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <h3 className="text-base font-bold text-white">{title}</h3>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <ul className="space-y-3 pl-1">
            {links.map((link, i) => (
              <li key={i}>
                {link.noTooltip ? (
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.label}</span>
                  </Link>
                ) : (
                  <a href={link.mainUrl || "#"} onClick={(e) => handleLinkClick(e, link.mainUrl)} className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.label}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <footer className="relative mt-12 sm:mt-16 md:mt-20 text-white overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-br from-[#011b3b] via-[#001428] to-[#000000]">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          {/* Desktop/Tablet Grid Layout (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Task-Flow
                </h2>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Collaborate, plan, and execute projects seamlessly — all in one place. Transform your workflow today.
              </p>
              <div className="flex gap-3 pt-2">
                {[
                  { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", label: "Twitter", href: "https://x.com/Balveersin93270?t=jAkDFkpzepEXfSdnOln--g&s=09" },
                  { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z", label: "LinkedIn", href: "https://www.linkedin.com/in/balveersingh-rajput/" },
                  { icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22", label: "GitHub", href: "https://github.com/BalveersinghRajput" }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700 hover:border-blue-500/50 flex items-center justify-center transition-all duration-300 group" aria-label={social.label}>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="relative">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { key: "menu", label: "Menu", mainUrl: "/dashboard" },
                  { key: "tasks", label: "Task List", mainUrl: "/tasks" },
                  { key: "profile", label: "Profile", mainUrl: "/profile" },
                  { href: "/#features", label: "Features", noTooltip: true }
                ].map((link, i) => (
                  <li key={i} className="relative">
                    {link.noTooltip ? (
                      <Link href={link.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                        <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                      </Link>
                    ) : (
                      <a href={link.mainUrl} onClick={(e) => handleLinkClick(e, link.mainUrl)} onMouseEnter={() => setHoveredLink(link.key)} onMouseLeave={() => setHoveredLink(null)} className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group cursor-pointer">
                        <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              
              {hoveredLink && (hoveredLink === 'menu' || hoveredLink === 'tasks' || hoveredLink === 'profile') && tooltipContent[hoveredLink] && (
                <div className="hidden lg:block absolute left-full top-0 ml-4 z-50 animate-in fade-in slide-in-from-left-2 duration-200" onMouseEnter={() => setHoveredLink(hoveredLink)} onMouseLeave={() => setHoveredLink(null)}>
                  <div className="absolute right-full top-8">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-[#0a1628]/40"></div>
                  </div>
                  {renderTooltip(hoveredLink)}
                </div>
              )}
            </div>

            {/* Support Section */}
            <div className="relative">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-white">Support</h3>
              <ul className="space-y-3">
                {[
                  { key: "contact", label: "Contact Us", mainUrl: "/contact" },
                  { key: "help", label: "Help Center", mainUrl: "/help" },
                  { key: "faqs", label: "FAQs", mainUrl: "/faqs" },
                  { key: "privacySupport", label: "Privacy Policy", mainUrl: "/privacy" }
                ].map((link, i) => (
                  <li key={i} className="relative">
                    <a href={link.mainUrl} onClick={(e) => handleLinkClick(e, link.mainUrl)} onMouseEnter={() => setHoveredLink(link.key)} onMouseLeave={() => setHoveredLink(null)} className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group cursor-pointer">
                      <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              
              {hoveredLink && (hoveredLink === 'contact' || hoveredLink === 'help' || hoveredLink === 'faqs' || hoveredLink === 'privacySupport') && tooltipContent[hoveredLink] && (
                <div className="hidden lg:block absolute left-full top-0 ml-4 z-50 animate-in fade-in slide-in-from-left-2 duration-200" onMouseEnter={() => setHoveredLink(hoveredLink)} onMouseLeave={() => setHoveredLink(null)}>
                  <div className="absolute right-full top-8">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-[#0a1628]/40"></div>
                  </div>
                  {renderTooltip(hoveredLink)}
                </div>
              )}
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-4 text-white">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest updates and news.</p>
              <div className="space-y-3">
                <div className="relative">
                  <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-800/50 text-white border-gray-700 focus:border-blue-500 placeholder-gray-500 pr-10 transition-all duration-300 text-sm" required />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Accordion Layout (visible only on mobile) */}
          <div className="md:hidden space-y-0">
            {/* Brand Section - Always visible on mobile */}
            <div className="space-y-4 pb-6 border-b border-gray-700/50 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Task-Flow
                </h2>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Collaborate, plan, and execute projects seamlessly — all in one place.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", label: "Twitter", href: "https://x.com/Balveersin93270?t=jAkDFkpzepEXfSdnOln--g&s=09" },
                  { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z", label: "LinkedIn", href: "https://www.linkedin.com/in/balveersingh-rajput/" },
                  { icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22", label: "GitHub", href: "https://github.com/BalveersinghRajput" }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700 hover:border-blue-500/50 flex items-center justify-center transition-all duration-300 group" aria-label={social.label}>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Accordion Sections */}
            {renderMobileSection('quicklinks', 'Quick Links', [
              { key: "menu", label: "Menu", mainUrl: "/dashboard" },
              { key: "tasks", label: "Task List", mainUrl: "/tasks" },
              { key: "profile", label: "Profile", mainUrl: "/profile" },
              { href: "/#features", label: "Features", noTooltip: true }
            ])}

            {renderMobileSection('support', 'Support', [
              { key: "contact", label: "Contact Us", mainUrl: "/contact" },
              { key: "help", label: "Help Center", mainUrl: "/help" },
              { key: "faqs", label: "FAQs", mainUrl: "/faqs" },
              { key: "privacySupport", label: "Privacy Policy", mainUrl: "/privacy" }
            ])}

            {/* Newsletter Section - Always visible on mobile */}
            <div className="pt-6">
              <h3 className="text-base font-bold mb-3 text-white">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest updates and news.</p>
              <div className="space-y-3">
                <div className="relative">
                  <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-800/50 text-white border-gray-700 focus:border-blue-500 placeholder-gray-500 pr-10 transition-all duration-300 text-sm" required />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        
        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
            <div className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
              &copy; 2025 <span className="font-semibold text-blue-400">Task-Flow</span>. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <span>Developed with</span>
              <span className="text-red-500 animate-pulse text-base sm:text-lg">❤️</span>
              <span>by</span>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Balveer Singh Rajput</span>
            </div>
            <div className="flex gap-4 sm:gap-6 text-xs text-gray-500 relative">
              {[
                { key: "terms", label: "Terms" },
                { key: "privacy", label: "Privacy" },
                { key: "cookies", label: "Cookies" }
              ].map((link, i) => (
                <a key={i} href={tooltipContent[link.key]?.mainUrl || "#"} onClick={(e) => handleLinkClick(e, tooltipContent[link.key]?.mainUrl)} onMouseEnter={() => setHoveredLink(link.key)} onMouseLeave={() => setHoveredLink(null)} className="hover:text-blue-400 transition-colors cursor-pointer">
                  {link.label}
                </a>
              ))}
              
              {(hoveredLink === 'terms' || hoveredLink === 'privacy' || hoveredLink === 'cookies') && tooltipContent[hoveredLink] && (
                <div className="hidden lg:block absolute bottom-full right-0 mb-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200" onMouseEnter={() => setHoveredLink(hoveredLink)} onMouseLeave={() => setHoveredLink(null)}>
                  <div className="absolute top-full right-8">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#0a1628]/40"></div>
                  </div>
                  {renderTooltip(hoveredLink)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};