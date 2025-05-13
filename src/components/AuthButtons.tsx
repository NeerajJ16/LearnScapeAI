// components/AuthButtons.tsx
import { EnterIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { buttonVariants } from "./ui/button"

interface AuthButtonsProps {
  onSignIn: () => void
  onSignUp: () => void
  className?: string
}

const AuthButtons = ({ onSignIn, onSignUp, className = "" }: AuthButtonsProps) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <button
        onClick={onSignIn}
        className={`border ${buttonVariants({ variant: "secondary" })}`}
      >
        <EnterIcon className="mr-2 w-5 h-5" />
        Sign In
      </button>
      <button
        onClick={onSignUp}
        className={`border ${buttonVariants({ variant: "secondary" })}`}
      >
        <Pencil1Icon className="mr-2 w-5 h-5" />
        Sign Up
      </button>
    </div>
  )
}

export default AuthButtons
