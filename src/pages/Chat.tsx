"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Bot, Paperclip, Send, User } from "lucide-react"
import { motion } from "framer-motion"

export default function Chat() {
  const [input, setInput] = useState("")
  const [fileName, setFileName] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI learning assistant. How can I help you with your JavaScript learning journey today?",
    },
  ])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !fileName) return

    // Add user message
    const content = input + (fileName ? ` [Attached: ${fileName}]` : "")
    const newMessages = [...messages, { role: "user", content }]
    setMessages(newMessages)
    setInput("")
    setFileName("")

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I'm here to help with your JavaScript questions! Feel free to ask about any concept you're struggling with or request explanations on specific topics.",
        },
      ])
    }, 1000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Learning Assistant</h1>
        <p className="text-muted-foreground mt-2">Ask questions, get explanations, and receive personalized help</p>
      </div>

      <Card className="border border-border/30 shadow-lg h-[calc(100vh-16rem)]">
        <CardContent className="p-4 overflow-y-auto h-[calc(100%-5rem)]">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={message.role === "assistant" ? "bg-primary/10 text-primary" : "bg-muted"}>
                    {message.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    <AvatarFallback>{message.role === "assistant" ? "AI" : "You"}</AvatarFallback>
                  </Avatar>

                  <div
                    className={`rounded-lg p-3 shadow-md ${
                      message.role === "assistant"
                        ? "bg-card border border-border/30"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Ask a question about JavaScript..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pr-10 h-12 shadow-sm focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:border-primary/50"
              />
              <div className="absolute right-3 top-3">
                <label htmlFor="chat-file-upload" className="cursor-pointer">
                  <Paperclip className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  <span className="sr-only">Upload file</span>
                </label>
                <input
                  id="chat-file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
              </div>
              {fileName && (
                <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">File: {fileName}</div>
              )}
            </div>
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
