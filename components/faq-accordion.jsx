"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
    question: "Can I use Task-Flow for different types of projects?",
    answer:
      "Absolutely! Task-Flow is designed to be flexible and adaptable to various project types, including software development, marketing campaigns, event planning, research projects, and more. Our customizable features allow you to tailor the tool to your specific needs.",
  },
  {
    question: "Is Task-Flow suitable for small teams?",
    answer:
      "Yes, Task-Flow is perfect for teams of all sizes, from small startups to large enterprises. Our scalable design ensures that the tool grows with your team while maintaining ease of use and efficiency.",
  },
  {
    question: "How secure is my data in Task-Flow?",
    answer:
      "Security is our top priority. Task-Flow uses enterprise-grade security measures, including data encryption, secure authentication, and regular security audits to protect your sensitive information and ensure compliance with industry standards.",
  },
  {
    question: "Can I integrate Task-Flow with other tools?",
    answer:
      "Yes, Task-Flow offers extensive integration capabilities with popular tools like Slack, GitHub, Google Workspace, and many others. Our API also allows for custom integrations to fit your specific workflow requirements.",
  },
];

export default function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-gray-400 leading-relaxed bg-white/5 backdrop-blur-sm rounded-md p-3">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
