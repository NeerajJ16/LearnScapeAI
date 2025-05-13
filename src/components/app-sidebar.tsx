"use client"

import { useLocation, Link } from "react-router-dom"
import { BarChart, BookOpen, CheckCircle, LogOut, Map, Menu, Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useTheme } from "./theme-provider"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function AppSidebar() {
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const sidebarVariants = {
    open: { width: "280px", transition: { duration: 0.3 } },
    closed: { width: "80px", transition: { duration: 0.3 } },
  }

  const navItems = [
    { path: "/", label: "Home", icon: BookOpen },
    { path: "/roadmap", label: "Roadmaps", icon: Map },
    { path: "/progress", label: "Progress", icon: BarChart },
    { path: "/quizzes", label: "Quizzes", icon: CheckCircle },
    
  ]

  return (
    <motion.div
      className="fixed h-screen border-r border-border/30 bg-card/95 backdrop-blur-sm flex flex-col shadow-md z-40"
      variants={sidebarVariants}
      animate={isOpen ? "open" : "closed"}
      initial="open"
    >
      <div className="p-4 border-b border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="rounded-md bg-primary/10 p-1.5 flex-shrink-0">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                className="font-semibold text-lg whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                LearnScape AI
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="flex-shrink-0">
          {isOpen ? <Menu className="h-5 w-5 rotate-90" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive(item.path) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border/30">
        <div className={`flex ${isOpen ? "items-center justify-between" : "flex-col items-center gap-3"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="text-sm font-medium whitespace-nowrap">User Name</div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">Free Plan</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={`flex ${isOpen ? "gap-1" : "flex-col gap-3 mt-3"}`}>
            {mounted && (
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="flex-shrink-0">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
