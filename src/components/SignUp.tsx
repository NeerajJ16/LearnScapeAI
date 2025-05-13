"use client"

import { useState } from "react"
import ForgotPassword from "./ForgotPassword"

interface SignUpProps {
  onClose: () => void
  onSwitchMode: (mode: "signin" | "signup") => void
}

export default function SignUp({ onClose, onSwitchMode }: SignUpProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [step, setStep] = useState<"initial" | "password">("initial")
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors: { name?: string; email?: string } = {}

    if (!name) validationErrors.name = "Name is required"
    if (!email) validationErrors.email = "Email is required"
    else if (!validateEmail(email)) validationErrors.email = "Please enter a valid email"

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setStep("password")
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const validationErrors: { password?: string; confirmPassword?: string } = {}
    if (!password || password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters"
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("http://44.201.125.113:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || "Failed to register")
      }

      alert("Sign-up successful! Please sign in.")
      onClose()
      onSwitchMode("signin")
    } catch (err: any) {
      console.error("Registration failed:", err.message)
      alert("Error: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setStep("initial")
    setErrors({})
  }

  if (showForgotPassword) {
    return (
      <ForgotPassword
        email={email}
        onClose={() => setShowForgotPassword(false)}
      />
    )
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white">Sign up</h1>
      </div>

      {step === "initial" && (
        <div className="space-y-4">
          <form onSubmit={handleContinue}>
            <div className="mb-4">
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-white">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className={`w-full rounded-md border ${errors.name ? "border-red-500" : "border-gray-700"} bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-white">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-700"} bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#333333] py-2.5 text-sm font-medium text-white transition hover:bg-[#444444]"
            >
              Continue
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-white">
            Already have an account?{" "}
            <button type="button" onClick={() => onSwitchMode("signin")} className="text-white hover:underline">
              Sign in
            </button>
          </p>
        </div>
      )}

      {step === "password" && (
        <div className="space-y-4">
          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className={`mb-1 block text-sm font-medium ${errors.password ? "text-red-500" : "text-white"}`}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`w-full rounded-md border ${errors.password ? "border-red-500" : "border-gray-700"} bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirm-password" className={`mb-1 block text-sm font-medium ${errors.confirmPassword ? "text-red-500" : "text-white"}`}>
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className={`w-full rounded-md border ${errors.confirmPassword ? "border-red-500" : "border-gray-700"} bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-[#333333] py-2.5 text-sm font-medium text-white transition hover:bg-[#444444]"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create an account"}
            </button>
          </form>

          <button
            onClick={handleBack}
            className="mt-4 flex w-full items-center justify-center text-sm text-white hover:underline"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  )
}
