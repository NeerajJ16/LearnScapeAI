//import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
//import { Badge } from "./ui/badge";
//import { Button, buttonVariants } from "@/components/ui/button";
import graph1 from "../assets/graph1.svg";
import graph2 from "../assets/graph2.svg";
import graph3 from "../assets/graph3.svg";
import graph4 from "../assets/graph4.svg";
import {
  Card,
  CardContent,
  CardDescription,
//  CardHeader,
//  CardTitle,
//  CardFooter,
} from "@/components/ui/card";
//import { Check, Linkedin } from "lucide-react";
//import { LightBulbIcon } from "./Icons";
//import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[80px] bg-transparent border-none drop-shadow-xl shadow-black/10 dark:shadow-white/10">
      <CardContent className="flex justify-center items-center p-4">
          <img src={graph2} alt="Graph" className="w-full h-auto max-w-md" />
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] bg-transparent border-none top-0 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
      <CardContent className="flex justify-center items-center p-4">
          <img src={graph3} alt="Graph" className="w-full h-auto max-w-md" />
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] bg-transparent border-none w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardContent className="flex justify-center items-center p-4">
          <img src={graph1} alt="Graph" className="w-full h-auto max-w-md" />
        </CardContent>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px]  top-[350px] bg-transparent border-none drop-shadow-xl shadow-black/10 dark:shadow-white/10">

            <CardDescription className="text-md mt-2">
            <img src={graph4} alt="Graph" className="w-full h-auto max-w-md" />
            </CardDescription>
      </Card>
    </div>
  );
};
