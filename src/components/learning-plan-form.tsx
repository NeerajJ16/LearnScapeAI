"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { BookOpen, Clock, Calendar, Upload } from "lucide-react"

interface LearningPlanFormProps {
  onSubmit: (data: { subject: string; daysPerWeek: number; hoursPerDay: number; months: string }) => void
}

export function LearningPlanForm({ onSubmit }: LearningPlanFormProps) {
  const [subject, setSubject] = useState("")
  const [daysPerWeek, setDaysPerWeek] = useState(3)
  const [hoursPerDay, setHoursPerDay] = useState(1)
  const [months, setMonths] = useState("3")
  const [fileName, setFileName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      subject,
      daysPerWeek,
      hoursPerDay,
      months,
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
        <CardTitle className="text-2xl">Create Your Learning Plan</CardTitle>
        <CardDescription>Tell us what you want to learn and your availability</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-6 form-scrollbar max-h-[60vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-base font-medium">
              What do you want to learn?
            </Label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="subject"
                placeholder="e.g., JavaScript, React, Machine Learning"
                className="pl-10"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Why do you want to learn this? (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Tell us about your goals and motivation"
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-4 pt-2">
            <Label className="text-base font-medium">How many days per week can you study?</Label>
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <Slider
                  value={[daysPerWeek]}
                  min={1}
                  max={7}
                  step={1}
                  onValueChange={(value:any) => setDaysPerWeek(value[0])}
                  className="py-4"
                />
              </div>
              <span className="font-medium text-lg min-w-[30px] text-center">{daysPerWeek}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">How many hours per day?</Label>
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <Slider
                  value={[hoursPerDay]}
                  min={0.5}
                  max={4}
                  step={0.5}
                  onValueChange={(value:any) => setHoursPerDay(value[0])}
                  className="py-4"
                />
              </div>
              <span className="font-medium text-lg min-w-[30px] text-center">{hoursPerDay}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="months" className="text-base font-medium">
              How many months do you want to learn?
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {["1", "3", "6"].map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={months === option ? "default" : "outline"}
                  className={`${months === option ? "" : "border-border/40"} shadow-sm`}
                  onClick={() => setMonths(option)}
                >
                  {option} {Number.parseInt(option) === 1 ? "Month" : "Months"}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label className="text-base font-medium">Upload learning materials (Optional)</Label>
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
          <Button type="submit" className="w-full shadow-md hover:shadow-lg transition-all" disabled={!subject}>
            Create Learning Plan
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
