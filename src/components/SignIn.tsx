"use client"

import { useState } from "react"
import ForgotPassword from "./ForgotPassword"

interface SignInProps {
  onClose: () => void
  onSwitchMode: (mode: "signin" | "signup") => void
}

export default function SignIn({ onClose, onSwitchMode }: SignInProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [step, setStep] = useState<"initial" | "password">("initial")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors: { email?: string } = {}

    if (!email) validationErrors.email = "Email is required"
    else if (!validateEmail(email)) validationErrors.email = "Please enter a valid email"

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setStep("password")
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    if (!password || password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters" })
      setIsLoading(false)
      return
    }

    try {
      const formData = new URLSearchParams()
      formData.append("username", email)
      formData.append("password", password)
      formData.append("grant_type", "password") // ✅ Required by OAuth2 password flow
      formData.append("scope", "")
      formData.append("client_id", "")
      formData.append("client_secret", "")

      const res = await fetch("http://44.201.125.113:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        const message = data?.detail || `Login failed with status ${res.status}`
        throw new Error(message)
      }

      localStorage.setItem("token", data.access_token)

      alert("Signed in successfully!")
      onClose()
      setTimeout(() => {
        window.location.assign("https://weblearnscape.vercel.app/")
      }, 150)
    } catch (error: any) {
      console.error("Sign-in failed:", error)
      alert("Sign-in failed: " + (error.message || "Unknown error"))
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
        <h1 className="text-2xl font-bold text-white">Sign in</h1>
      </div>

      {step === "initial" && (
        <div className="space-y-4">
          <form onSubmit={handleContinue}>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-white">
                Email
              </label>
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
            Don&apos;t have an account?{" "}
            <button type="button" onClick={() => onSwitchMode("signup")} className="text-white hover:underline">
              Sign up
            </button>
          </p>
        </div>
      )}

      {step === "password" && (
        <div className="space-y-4">
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={`mb-1 block text-sm font-medium ${errors.password ? "text-red-500" : "text-white"}`}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-400 hover:underline"
                >
                  Forgot your password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                className={`w-full rounded-md border ${errors.password ? "border-red-500" : "border-gray-700"} bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#333333] py-2.5 text-sm font-medium text-white transition hover:bg-[#444444]"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
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
