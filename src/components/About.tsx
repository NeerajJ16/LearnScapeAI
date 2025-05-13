//import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";
import { Compass, Layers, CheckCircle, Sparkles, BookOpen, Users } from "lucide-react";



export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Us
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
              <div className="mt-6 space-y-4 text-muted-foreground text-lg">
  <div className="flex items-start gap-3">
    <Compass className="w-5 h-5 text-primary mt-1" />
    <span>Build a personalized learning path for any topic — based on your time, pace, and goals.</span>
  </div>
  <div className="flex items-start gap-3">
    <Layers className="w-5 h-5 text-primary mt-1" />
    <span>Get a structured roadmap with handpicked, free resources instead of sifting through random videos and articles.</span>
  </div>
  <div className="flex items-start gap-3">
    <CheckCircle className="w-5 h-5 text-primary mt-1" />
    <span>Track your progress, mark what’s completed, and always know what to focus on next.</span>
  </div>
  <div className="flex items-start gap-3">
    <Sparkles className="w-5 h-5 text-primary mt-1" />
    <span>Simple, flexible, and designed for self-learners who want clarity and consistency — without the clutter or cost.</span>
  </div>
  <div className="flex items-start gap-3">
    <BookOpen className="w-5 h-5 text-primary mt-1" />
    <span>Works for any subject — from Data Science to Design — and adapts to both short-term and long-term learning goals.</span>
  </div>
  <div className="flex items-start gap-3">
    <Users className="w-5 h-5 text-primary mt-1" />
    <span>Whether you're a student, a professional, or just curious, LearnScape AI brings structure and simplicity to self-learning.</span>
  </div>
</div>

              </p>
            </div>
           
            {/* <Statistics /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
