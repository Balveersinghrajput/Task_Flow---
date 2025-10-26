import CompanyCarousel from "@/components/company-carousel";
import FAQAccordion from "@/components/faq-accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart,
  Calendar,
  ChevronRight,
  Layout,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description:
      "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description:
      "Gain insights into your team&apos;s performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Decorative elements */}
        <div className="absolute top-10 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative z-10">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold backdrop-blur-sm">
              ✨ Your Ultimate Project Management Solution
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold gradient-title pb-4 sm:pb-6 leading-tight px-2">
            Stay on Track, Stay Ahead
            <span className="flex mx-auto gap-2 sm:gap-3 md:gap-4 items-center justify-center mt-4 sm:mt-6 flex-wrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                with
              </span>
              <Image
                src="/companies/Task-logo.png"
                alt="Task Logo"
                width={400}
                height={80}
                className="h-10 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto object-contain drop-shadow-2xl"
                priority
              />
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Simplify task management and boost your team&apos;s productivity.
            <br className="hidden sm:block" />
            <span className="text-blue-400 font-medium">
              Collaborate, plan, and execute projects seamlessly — all in one place.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
              >
                Get Started Free
                <ChevronRight 
                  size={18} 
                  className="ml-2 group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5" 
                />
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 backdrop-blur-sm px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Projects Completed", value: "50K+" },
              { label: "Team Satisfaction", value: "99%" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-bold gradient-title mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 gradient-title">
              Powerful Features
            </h3>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Everything you need to manage projects efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:-translate-y-2"
              >
                <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
                  <div className="mb-4 sm:mb-6 inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 sm:mt-6 flex items-center text-sm sm:text-base text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Carousel */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 gradient-title">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-400 text-base sm:text-lg">
              Join thousands of companies already transforming their workflow
            </p>
          </div>
          <CompanyCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 gradient-title">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-400 text-base sm:text-lg">
              Everything you need to know about Task-Flow
            </p>
          </div>
          <div 
            suppressHydrationWarning
            className="rounded-xl sm:rounded-2xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm p-4 sm:p-6 shadow-xl"
          >
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-blue-500/20 bg-gray-900/40 backdrop-blur-xl shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6 sm:mb-8 shadow-lg">
              <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-title px-4">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-4">
              Join thousands of teams already using <span className="font-bold text-blue-400">Task-Flow</span> to streamline their
              projects and boost productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link href="/onboarding" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-bold w-full sm:w-auto"
                >
                  Start For Free
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <div className="text-xs sm:text-sm text-gray-400">
                No credit card required • Free forever
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}