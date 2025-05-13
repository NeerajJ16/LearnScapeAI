"use client"

import { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { API_BASE_URL } from "../lib/config"
import { auth } from "../lib/firebase"
import ForgotPassword from "./ForgotPassword"

interface SignUpProps {
  onClose: () => void
  onSwitchMode: (mode: "signin" | "signup") => void
}

export default function SignUp({ onClose, onSwitchMode }: SignUpProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [step, setStep] = useState<"initial" | "password">("initial")
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setErrors({ ...errors, email: "Email is required" })
      return
    }
    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Please enter a valid email" })
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.detail || "Failed to save user to backend")
        }
      } catch (backendError: any) {
        console.warn("Backend error (ignored):", backendError.message)
        // Proceed anyway
      }

      alert("Sign-up successful! Please sign in.")
      onSwitchMode("signin")

    } catch (error: any) {
      console.error("Sign-up failed:", error.message)
      alert("Error: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

 const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider()
    setIsLoading(true)

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      console.log("Google Sign-In UID:", user.uid)
      console.log("Email:", user.email)

      alert("Signed in with Google!")
      onClose();
      setTimeout(() => {
      window.location.assign("https://weblearnscape.vercel.app/")
    }, 150)

    } catch (error: any) {
      console.error("Google Sign-In failed:", error.message)
      alert("Google Sign-In failed: " + error.message)
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
          <button
            onClick={handleGoogleSignUp}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-white py-2.5 text-sm font-medium text-black transition hover:bg-gray-100"
          >
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#121212] px-2 text-gray-400">Or</span>
            </div>
          </div>

          <form onSubmit={handleContinue}>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none`}
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
            <button
              type="button"
              onClick={() => onSwitchMode("signin")}
              className="text-white hover:underline"
            >
              Sign in
            </button>
          </p>
          <p className="mt-2 text-center text-sm text-white">
            Forgot your password?{" "}
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-400 hover:underline"
            >
              Reset here
            </button>
          </p>
        </div>
      )}

      {step === "password" && (
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignUp}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-white py-2.5 text-sm font-medium text-black transition hover:bg-gray-100"
          >
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#121212] px-2 text-gray-400">Or</span>
            </div>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className={`mb-1 block text-sm font-medium ${
                    errors.password ? "text-red-500" : "text-white"
                  }`}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`w-full rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {(errors.password || password.length < 8) && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password || "String must contain at least 8 character(s)"}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className={`mb-1 block text-sm font-medium ${
                    errors.confirmPassword ? "text-red-500" : "text-white"
                  }`}
                >
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className={`w-full rounded-md border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-700"
                  } bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {(errors.confirmPassword || confirmPassword.length < 8) && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword || "String must contain at least 8 character(s)"}
                  </p>
                )}
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
