"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";

interface ForgotPasswordProps {
  email?: string;
  onClose: () => void;
}

export default function ForgotPassword({ email: initialEmail = "", onClose }: ForgotPasswordProps) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
      onClose();
    } catch (error: any) {
      console.error("Error sending reset email:", error.message);
      setError("Failed to send reset email: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="forgot-email"
            className="block text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            id="forgot-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-md border ${
              error ? "border-red-500" : "border-gray-700"
            } bg-[#1a1a1a] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none`}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-[#333333] py-2.5 text-sm font-medium text-white transition hover:bg-[#444444]"
        >
          {isLoading ? "Sending..." : "Reset Password"}
        </button>
      </form>
      <button
        onClick={onClose}
        className="mt-4 text-sm text-white hover:underline"
      >
        ← Back
      </button>
    </div>
  );
}
