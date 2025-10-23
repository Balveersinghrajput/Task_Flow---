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
      "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 text-center relative">
        {/* Decorative elements */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative z-10">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold backdrop-blur-sm">
              ✨ Your Ultimate Project Management Solution
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold gradient-title pb-6 leading-tight">
            Stay on Track, Stay Ahead
            <span className="flex mx-auto gap-3 sm:gap-4 items-center justify-center mt-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                with
              </span>
              <Image
                src="/companies/Task-logo.png"
                alt="Task Logo"
                width={400}
                height={80}
                className="h-14 sm:h-20 lg:h-24 w-auto object-contain drop-shadow-2xl"
                priority
              />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Simplify task management and boost your team's productivity.
            <br />
            <span className="text-blue-400 font-medium">
              Collaborate, plan, and execute projects seamlessly — all in one place.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/onboarding">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold"
              >
                Get Started Free
                <ChevronRight 
                  size={20} 
                  className="ml-2 group-hover:translate-x-1 transition-transform" 
                />
              </Button>
            </Link>
            <Link href="#features">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 backdrop-blur-sm px-8 py-6 text-lg font-semibold transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Projects Completed", value: "50K+" },
              { label: "Team Satisfaction", value: "99%" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="text-4xl font-bold gradient-title mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold mb-4 gradient-title">
              Powerful Features
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage projects efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:-translate-y-2"
              >
                <CardContent className="pt-8 pb-8 px-6">
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Carousel */}
      <section className="py-20 px-5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold mb-4 gradient-title">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-400 text-lg">
              Join thousands of companies already transforming their workflow
            </p>
          </div>
          <CompanyCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold mb-4 gradient-title">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-400 text-lg">
              Everything you need to know about Task-Flow
            </p>
          </div>
          <div 
            suppressHydrationWarning
            className="rounded-2xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm p-6 shadow-xl"
          >
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl border border-blue-500/20 bg-gray-900/40 backdrop-blur-xl shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-8 shadow-lg">
              <ArrowRight className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-4xl sm:text-5xl font-bold mb-6 gradient-title">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of teams already using <span className="font-bold text-blue-400">Task-Flow</span> to streamline their
              projects and boost productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/onboarding">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 px-10 py-7 text-lg font-bold"
                >
                  Start For Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <div className="text-sm text-gray-400">
                No credit card required • Free forever
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
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