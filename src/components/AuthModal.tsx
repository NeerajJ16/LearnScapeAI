"use client"

import SignIn from "./SignIn"
import SignUp from "./SignUp"

interface AuthModalProps {
  isOpen: boolean
  mode: "signin" | "signup"
  onClose: () => void
  onSwitchMode: (mode: "signin" | "signup") => void
}

export default function AuthModal({ isOpen, mode, onClose, onSwitchMode }: AuthModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={onClose}></div>
      <div className="relative w-full max-w-md rounded-xl bg-[#181818] p-6 shadow-lg">
        {mode === "signin" && <SignIn onClose={onClose} onSwitchMode={onSwitchMode} />}
        {mode === "signup" && <SignUp onClose={onClose} onSwitchMode={onSwitchMode} />}
      </div>
    </div>
  )
}
