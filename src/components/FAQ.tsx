import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What does the app do?",
    answer: "Our app creates personalized learning roadmaps tailored to your goals, skill level, and schedule. Whether you're starting a new subject or advancing your expertise, we help you stay on track with curated resources, progress tracking, and smart reminders.",
    value: "item-1",
  },
  {
    question: "Who is this app for?",
    answer:
      "The app is ideal for students, professionals, and lifelong learners looking to learn efficiently and stay organized. Whether you're preparing for a certification, switching careers, or simply exploring a new subject, we've got you covered.",
    value: "item-2",
  },
  {
    question:
      "How do I get started?",
    answer:
      "Just sign up, select your goal, answer a few quick questions, and your roadmap will be ready in minutes. You can start learning right away!",
    value: "item-3",
  },
  {
  question: "How can I get in touch with the LearnScape team?",
  answer: 'You can reach out to us anytime at njawahirani@learnscapeai.com — we\'re happy to help!',
  value: "item-4",
},
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
