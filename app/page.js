import CompanyCarousel from "@/components/company-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const faqs = [
  {
    question: "What is Task-Flow?",
    answer:
      "Task-Flow is a powerful project management tool designed to help teams organize, track, and manage their work efficiently. It combines intuitive design with robust features to streamline your workflow and boost productivity.",
  },
  {
    question: "How does Task-Flow compare to other project management tools?",
    answer:
      "Task-Flow offers a unique combination of intuitive design, powerful features, and flexibility. Unlike other tools, we focus on providing a seamless experience for both agile and traditional project management methodologies, making it versatile for various team structures and project types.",
  },
  {
    question: "Is Task-Flow suitable for small teams?",
    answer:
      "Absolutely! Task-Flow is designed to be scalable and flexible. It works great for small teams and can easily grow with your organization as it expands. Our user-friendly interface ensures that teams of any size can quickly adapt and start benefiting from Task-Flow's features.",
  },
  {
    question: "What key features does Task-Flow offer?",
    answer:
      "Task-Flow provides a range of powerful features including intuitive Kanban boards for visualizing workflow, robust sprint planning tools for agile teams, comprehensive reporting for data-driven decisions, customizable workflows, time tracking, and team collaboration tools. These features work seamlessly together to enhance your project management experience.",
  },
  {
    question: "Can Task-Flow handle multiple projects simultaneously?",
    answer:
      "Yes, Task-Flow is built to manage multiple projects concurrently. You can easily switch between projects, and get a bird's-eye view of all your ongoing work. This makes Task-Flow ideal for organizations juggling multiple projects or clients.",
  },
  {
    question: "Is there a learning curve for new users?",
    answer:
      "While Task-Flow is packed with features, we've designed it with user-friendliness in mind. New users can quickly get up to speed thanks to our intuitive interface, helpful onboarding process, and comprehensive documentation.",
  },
];

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

  let hello;

  return (
    <div className="min-h-screen">
  {/* Hero Section */}
  <section className="container mx-auto py-20 text-center">
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold gradient-title pb-6 leading-tight">
    Stay on Track, Stay Ahead<br />
      <span className="flex mx-auto gap-3 sm:gap-4 items-center justify-center mt-3">
        with
        <Image
          src="/companies/meta.svg"
          alt="Task Logo"
          width={400}
          height={80}
          className="h-14 sm:h-20 lg:h-24 w-auto object-contain drop-shadow-lg"
        />
      </span>
    </h1>

    <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
      Simplify task management and boost your team’s productivity, <br />
      Collaborate, plan, and execute projects seamlessly — all in one place.
    </p>
    
        <Link href="/onboarding">
          <Button size="lg" className="mr-4">
            Get Started <ChevronRight size={18} className="ml-1" />
          </Button>
        </Link>
        <Link href="#features">
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </Link>
      </section>

      {/* Features Section */}
<section id="features" className="py-20 px-5">
  <div className="container mx-auto">
    <h3 className="text-3xl font-bold mb-12 text-center ">Key Features</h3>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="bg-gray-950 transition-shadow duration-300 hover:shadow-[0_0_25px_#010814e5]"
        >
          <CardContent className="pt-6">
            <feature.icon className="h-12 w-12 mb-4 text-blue-400" />
            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
            <p className="text-gray-300">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

      
      {/* Companies Carousel */}
      <section className="py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center ">
            Trusted by Industry Leaders
          </h3>
          <CompanyCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className=" py-20 px-5 ">
        <div className="container mx-auto ">
          <h3 className="text-3xl font-bold mb-12 text-center ">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full  ">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed bg-white/5 backdrop-blur-sm rounded-md p-3">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-6 ">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-xl mb-12">
            Join thousands of teams already using Task-Flow to streamline their
            projects and boost productivity.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="animate-bounce">
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

 