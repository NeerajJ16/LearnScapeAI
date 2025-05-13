import { Button } from "./ui/button"
import { EnterIcon, Pencil1Icon } from "@radix-ui/react-icons"

interface CtaProps {
  openAuthModal: (mode: "signin" | "signup") => void
}

export const Cta = ({ openAuthModal }: CtaProps) => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-24 sm:my-32"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Start Learning Anything —
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Your Way, Your Pace{" "}
            </span>
            In One Click
          </h2>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button
            className="w-full md:mr-4 md:w-auto border"
            variant="secondary"
            onClick={() => openAuthModal("signin")}
          >
            <EnterIcon className="mr-2 w-5 h-5" />
            Sign In
          </Button>
          <Button
            className="w-full md:w-auto border"
            variant="secondary"
            onClick={() => openAuthModal("signup")}
          >
            <Pencil1Icon className="mr-2 w-5 h-5" />
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  )
}
