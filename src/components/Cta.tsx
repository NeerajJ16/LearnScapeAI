import { Button } from "./ui/button"
import { EnterIcon } from "@radix-ui/react-icons"

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-24 sm:my-32"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Learning Anything —
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Your Way, Your Pace{" "}
            </span>
            In One Click
          </h2>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <a href="https://app.learnscapeai.com/signup" target="_blank" rel="noopener noreferrer">
            <Button className="w-full md:w-auto border" variant="secondary">
              <EnterIcon className="mr-2 w-5 h-5" />
              Get Started
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
