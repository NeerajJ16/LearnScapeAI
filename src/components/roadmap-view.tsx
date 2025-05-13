"use client"

import { Button } from "./ui/button"
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

// Define the props interface for the component
interface RoadmapViewProps {
  subject: string
  daysPerWeek: number
  hoursPerDay: number
  months: string
  onBack: () => void
}

interface Lesson {
  title: string
  duration: string
  resources: string[]
}

// Updated module data with lesson-level resources
const modulesData = [
  {
    title: "Building the Foundation",
    duration: "54 min",
    progress: "0/8",
    description:
      "This module focuses on the project outline and essential functionalities. You will lay the groundwork with API integration, basic state setup, and card rendering.",
    lessons: [
      { title: "Intro", duration: "5:31", resources: ["JavaScript: The Definitive Guide", "MDN Web Docs"] },
      { title: "Boilerplate code", duration: "5:49", resources: ["JavaScript.info"] },
      { title: "Fetch data from API", duration: "5:22", resources: ["Eloquent JavaScript"] },
      { title: "Store API data in state", duration: "3:57", resources: ["Additional Resource 1", "Additional Resource 2"] },
    ] as Lesson[],
  },
  {
    title: "Creating the User Interface",
    duration: "48 min",
    progress: "0/6",
    description:
      "Learn how to build a responsive and intuitive user interface for your application using modern design principles.",
    lessons: [
      { title: "Component structure", duration: "6:12", resources: ["CSS-Tricks", "Smashing Magazine"] },
      { title: "Styling with CSS", duration: "7:45", resources: ["A List Apart"] },
      { title: "Responsive design", duration: "8:30", resources: ["Web Design in 4 Minutes"] },
    ] as Lesson[],
  },
  {
    title: "Advanced Interactions",
    duration: "62 min",
    progress: "0/7",
    description:
      "Take your application to the next level by implementing advanced user interactions and animations.",
    lessons: [
      { title: "Event handling", duration: "6:18", resources: ["JavaScript Event Reference"] },
      { title: "Form validation", duration: "7:22", resources: ["Form Validation Best Practices"] },
      { title: "Animation basics", duration: "8:45", resources: ["Animation Performance Guide", "Interaction Design Principles"] },
    ] as Lesson[],
  },
]

// Main RoadmapView component
export function RoadmapView({
  subject,
  daysPerWeek,
  hoursPerDay,
  months,
  onBack,
}: RoadmapViewProps) {
  // State for tracking which module is currently expanded (use -1 when none)
  const [expandedModule, setExpandedModule] = useState<number>(-1)
  // State for tracking the selected lesson within the expanded module (null if none)
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  // State for tracking completed lessons per module (key: module index, value: array of lesson indices)
  const [completedLessons, setCompletedLessons] = useState<{ [key: number]: number[] }>({})

  // Toggle a module's expanded state – when expanding, default to first lesson
  const toggleModule = (moduleIndex: number) => {
    if (expandedModule === moduleIndex) {
      setExpandedModule(-1)
      setSelectedLesson(null)
    } else {
      setExpandedModule(moduleIndex)
      setSelectedLesson(0)
    }
  }

  // Toggle a lesson's completion state within a module
  const toggleLessonCompletion = (moduleIndex: number, lessonIndex: number, event: React.MouseEvent) => {
    event.stopPropagation()
    setCompletedLessons((prev) => {
      const moduleCompleted = prev[moduleIndex] || []
      if (moduleCompleted.includes(lessonIndex)) {
        return { ...prev, [moduleIndex]: moduleCompleted.filter((i) => i !== lessonIndex) }
      } else {
        return { ...prev, [moduleIndex]: [...moduleCompleted, lessonIndex] }
      }
    })
  }

  // Calculate overall progress: total lessons across modules vs. completed lessons
  const totalLessons = modulesData.reduce((sum, mod) => sum + mod.lessons.length, 0)
  const completedLessonCount = Object.values(completedLessons).reduce((sum, arr) => sum + arr.length, 0)
  const overallCompletionRate = Math.floor((completedLessonCount / totalLessons) * 100)

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between px-2">
  {/* Left: Back button */}
  <div className="flex-shrink-0">
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 px-0 text-muted-foreground hover:bg-transparent hover:text-primary"
      onClick={onBack}
    >
      <ArrowLeft className="h-4 w-4" /> Back
    </Button>
  </div>

  {/* Right: Study info */}
  <div className="text-sm text-muted-foreground ml-auto">
    {daysPerWeek} days/week · {hoursPerDay} {hoursPerDay > 1 ? "hours" : "hour"}/day ·{" "}
    {months} {months === "1" ? "month" : "months"}
  </div>
</div>


      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{subject} Learning Roadmap</h1>
        <p className="text-muted-foreground mt-2 text-lg">Your personalized learning journey</p>
      </div>

      {/* Global Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1 text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{overallCompletionRate}% completed</span>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${overallCompletionRate}%` }}
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-5">
      {modulesData.map((module, moduleIndex) => (
  <div
    key={moduleIndex}
    className={`bg-card rounded-xl border border-border/30 shadow-md transition-all ${
      expandedModule === moduleIndex ? "shadow-lg" : ""
    }`}
  >
    {/* Module Header */}
    <div
      className="cursor-pointer py-5 px-6 flex flex-row items-center justify-between"
      onClick={() => toggleModule(moduleIndex)}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted/50">
          {expandedModule === moduleIndex ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <h3 className="text-lg font-medium">{module.title}</h3>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{module.duration}</span>
        <span className="bg-muted/50 py-1 px-2.5 rounded-full text-xs font-medium">
          {module.progress}
        </span>
      </div>
    </div>

    {/* Expanded Module Content */}
    {expandedModule === moduleIndex && (
      <div className="pt-0 pb-6 px-6">
        <div className="pl-9 border-l border-border/40 ml-[11px] mt-1 mb-6">
          <p className="text-muted-foreground text-sm">{module.description}</p>
        </div>

        {/* Lessons and Resources: Two-column layout */}
        <div className="flex gap-8">
          {/* Left Column: Lessons List */}
          <div className="space-y-1.5 flex-1">
            {module.lessons.map((lesson, lessonIndex) => {
              const isCompleted = (completedLessons[moduleIndex] || []).includes(lessonIndex)
              const isSelected = selectedLesson === lessonIndex
              return (
                <div
                  key={lessonIndex}
                  onClick={() => setSelectedLesson(lessonIndex)}
                  className={`flex items-center gap-4 py-2.5 px-3.5 rounded-lg transition-colors cursor-pointer ${
                    isSelected ? "bg-muted/50" : "hover:bg-muted/40"
                  }`}
                >
                  <div
                    onClick={(e) => toggleLessonCompletion(moduleIndex, lessonIndex, e)}
                    className={`cursor-pointer rounded-full p-1 transition-colors duration-300 ${
                      isCompleted
                        ? "text-green-500"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1 font-medium text-sm">{lesson.title}</div>
                  <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Resources for the Selected Lesson */}
          <div className="w-64 border-l-2 border-border pl-6 pt-1">
            {selectedLesson !== null && module.lessons[selectedLesson] && (
              <>
                <h4 className="font-medium text-sm mb-3.5">Resources</h4>
                <ul className="space-y-2.5">
                  {module.lessons[selectedLesson].resources.map((resource, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm transition"
                      >
                        <FileText className="h-3.5 w-3.5 flex-shrink-0" /> {resource}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
))}

      </div>
    </div>
  )
}
