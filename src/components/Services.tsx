import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
//import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../assets/cube-leg.png";
import {
  Brain,
  Share2,
  Layers,
  FileText,
} from "lucide-react";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "AI-Generated Quizzes",
    description:
      "Test your understanding with automatically generated quizzes tailored to your journey.",
    icon: <Brain className="w-6 h-6 text-primary" />,
  },
  {
    title: "Mind Map Generator",
    description:
      "Convert topics into visual mind maps to grasp complex concepts more intuitively.",
    icon: <Share2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Smart Flashcards",
    description:
      "Automatically generate flashcards from your topics to boost memory using spaced repetition.",
    icon: <Layers className="w-6 h-6 text-primary" />,
  },
  {
    title: "Cheat Sheet Builder",
    description:
      "Create quick-reference sheets that summarize key ideas — perfect for last-minute review.",
    icon: <FileText className="w-6 h-6 text-primary" />,
  },
];

export const Services = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              What's{" "}
            </span>
            Next
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Learn. Build. Automate. Repeat — with features designed for the self-learner of tomorrow.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={cubeLeg}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        />
      </div>
    </section>
  );
};
