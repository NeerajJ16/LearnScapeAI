"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Upload } from "lucide-react"

interface CustomQuizFormProps {
  onSubmit: (data: {
    title: string
    description: string
    questions: number
    difficulty: string
    file?: string
  }) => void
}

export function CustomQuizForm({ onSubmit }: CustomQuizFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState(10)
  const [difficulty, setDifficulty] = useState("Intermediate")
  const [fileName, setFileName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      questions,
      difficulty,
      file: fileName,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <Card className="border border-border/30 shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-border/20">
        <CardTitle className="text-2xl">Create Custom Quiz</CardTitle>
        <CardDescription>Design a quiz tailored to your learning needs</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-6 form-scrollbar max-h-[60vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">
              Quiz Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., JavaScript Fundamentals Quiz"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what this quiz will cover"
              className="min-h-[100px] resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="questions" className="text-base font-medium">
              Number of Questions
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((num) => (
                <Button
                  key={num}
                  type="button"
                  variant={questions === num ? "default" : "outline"}
                  className={`${questions === num ? "" : "border-border/40"} shadow-sm`}
                  onClick={() => setQuestions(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Difficulty Level</Label>
            <RadioGroup value={difficulty} onValueChange={setDifficulty} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Beginner" id="beginner" />
                <Label htmlFor="beginner" className="text-green-500">
                  Beginner
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="text-yellow-500">
                  Intermediate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Advanced" id="advanced" />
                <Label htmlFor="advanced" className="text-red-500">
                  Advanced
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2 pt-2">
            <Label className="text-base font-medium">Upload Study Material (Optional)</Label>
            <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Drag & drop files here or <span className="text-primary font-medium">browse</span>
                  </span>
                  <span className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT (max 10MB)</span>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                />
              </label>
              {fileName && <div className="mt-4 text-sm bg-primary/10 p-2 rounded-md text-primary">{fileName}</div>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-6 border-t border-border/20">
          <Button type="submit" className="w-full shadow-md hover:shadow-lg transition-all" disabled={!title}>
            Generate Quiz
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
