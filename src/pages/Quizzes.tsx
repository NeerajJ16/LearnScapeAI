"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { CheckCircle, Clock, FileText, Plus } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Progress } from "../components/ui/progress"
import { CustomQuizForm } from "../components/custom-quiz-form"

export default function Quizzes() {
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [customQuiz, setCustomQuiz] = useState<null | {
    title: string
    description: string
    questions: number
    difficulty: string
    file?: string
  }>(null)

  const handleCreateCustomQuiz = (data: {
    title: string
    description: string
    questions: number
    difficulty: string
    file?: string
  }) => {
    setLoading(true)
    setProgress(0)
    setCustomQuiz(data)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setLoading(false)
          setShowCustomForm(false)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const quizzes = [
    {
      title: "JavaScript Basics",
      description: "Test your understanding of JavaScript fundamentals",
      questions: 15,
      time: "10 min",
      difficulty: "Beginner",
      completed: true,
    },
    {
      title: "DOM Manipulation",
      description: "Test your knowledge of working with the Document Object Model",
      questions: 12,
      time: "8 min",
      difficulty: "Intermediate",
      completed: false,
    },
    {
      title: "Asynchronous JavaScript",
      description: "Test your understanding of promises, async/await, and callbacks",
      questions: 10,
      time: "15 min",
      difficulty: "Advanced",
      completed: false,
    },
    {
      title: "ES6+ Features",
      description: "Test your knowledge of modern JavaScript features",
      questions: 20,
      time: "20 min",
      difficulty: "Intermediate",
      completed: false,
    },
    {
      title: "JavaScript Arrays",
      description: "Test your understanding of array methods and operations",
      questions: 15,
      time: "12 min",
      difficulty: "Beginner",
      completed: false,
    },
    {
      title: "Error Handling",
      description: "Test your knowledge of JavaScript error handling techniques",
      questions: 8,
      time: "10 min",
      difficulty: "Intermediate",
      completed: false,
    },
  ]

  if (customQuiz) {
    quizzes.unshift({
      title: customQuiz.title,
      description: customQuiz.description,
      questions: customQuiz.questions,
      time: `${Math.ceil(customQuiz.questions * 0.8)} min`,
      difficulty: customQuiz.difficulty,
      completed: false,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <AnimatePresence mode="wait">
        {showCustomForm ? (
          <motion.div
            key="custom-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <div className="w-full max-w-3xl mx-auto space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Creating Your Custom Quiz</h2>
                  <p className="text-muted-foreground mt-2">Generating questions based on your preferences...</p>
                </div>
                <Progress value={progress} className="h-2 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" onClick={() => setShowCustomForm(false)}>
                    Back to Quizzes
                  </Button>
                </div>
                <CustomQuizForm onSubmit={handleCreateCustomQuiz} />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="quiz-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
                <p className="text-muted-foreground mt-2">Test your knowledge and reinforce your learning</p>
              </div>
              <Button onClick={() => setShowCustomForm(true)} className="gap-1 shadow-md">
                <Plus className="h-4 w-4" /> Create Custom Quiz
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {quizzes.map((quiz, i) => (
                <Card
                  key={i}
                  className="border shadow-md hover:shadow-lg transition-all duration-300 border-border/30 rounded-xl"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle>{quiz.title}</CardTitle>
                      {quiz.completed && (
                        <div className="rounded-full bg-primary/10 p-1">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex items-center gap-1 shadow-sm">
                        <Clock className="h-3 w-3" /> {quiz.time}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1 shadow-sm">
                        <FileText className="h-3 w-3" /> {quiz.questions} questions
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          quiz.difficulty === "Beginner"
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500 shadow-sm"
                            : quiz.difficulty === "Intermediate"
                              ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-500 shadow-sm"
                              : "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500 shadow-sm"
                        }
                      >
                        {quiz.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1 shadow-sm hover:shadow-md transition-shadow">
                      {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                    </Button>
                    <Button variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
                      Customize
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
