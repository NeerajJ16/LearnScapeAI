"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Calendar, Clock, Upload } from "lucide-react"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Progress } from "../components/ui/progress"
import { RoadmapView } from "../components/roadmap-view"

/* ---------------
   FORM COMPONENT
   --------------- */
function CreatePlanForm({
  subject,
  setSubject,
  daysPerWeek,
  setDaysPerWeek,
  hoursPerDay,
  setHoursPerDay,
  months,
  setMonths,
  totalHours,
  handleCreatePlan,
}: {
  subject: string
  setSubject: (val: string) => void
  daysPerWeek: number
  setDaysPerWeek: (val: number) => void
  hoursPerDay: number
  setHoursPerDay: (val: number) => void
  months: string
  setMonths: (val: string) => void
  totalHours: number
  handleCreatePlan: (e: React.FormEvent) => void
}) {
  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl"
    >
      {/* Outer card container */}
      <div className="bg-card rounded-xl shadow-form border border-border/20 overflow-hidden">
        {/* Header / Title */}
        <div className="p-8 pb-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Create Your Learning Plan
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Tell us about your availability and goals to get a personalized
            learning roadmap
          </p>
        </div>

        {/* The main form content */}
        <form onSubmit={handleCreatePlan} className="px-8 pb-8 space-y-8">
          {/* Subject / What to Learn */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-base font-medium tracking-tight">
              What do you want to learn?
            </Label>
            <div className="relative">
              <Input
                id="subject"
                placeholder="e.g. JavaScript, Machine Learning, Spanish..."
                className="h-12 bg-background/50 border-border/30 shadow-sm
                  focus-visible:ring-primary/30 focus-visible:border-primary/50 text-base shadow-lg"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <div className="absolute right-3 top-3">
                <Upload className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </div>
            </div>
          </div>

          {/* Time Commitment & Duration */}
          {/* Time Commitment & Duration */}
<div className="grid md:grid-cols-2 gap-8">

{/* Left box: Time Commitment */}
<div className="p-6 bg-card rounded-xl shadow-lg space-y-6 border border-border/20">
  <div className="flex items-center gap-2 mb-2">
    <Calendar className="h-5 w-5 text-primary" />
    <h3 className="font-semibold text-lg">Time Commitment</h3>
  </div>

  {/* Days per week */}
  <div className="space-y-2">
    <div className="flex justify-between">
      <Label htmlFor="days-per-week" className="text-base font-medium tracking-tight">
        Days per week
      </Label>
      <span className="text-sm font-medium">{daysPerWeek} days</span>
    </div>
    <input
  type="range"
  id="days-per-week"
  min={1}
  max={7}
  step={1}
  value={daysPerWeek}
  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer
    accent-primary [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
    [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary"
/>

  </div>

  {/* Hours per day */}
  <div className="space-y-2">
    <div className="flex justify-between">
      <Label htmlFor="hours-per-day" className="text-base font-medium tracking-tight">
        Hours per day
      </Label>
      <span className="text-sm font-medium">
        {hoursPerDay} {hoursPerDay === 1 ? "hour" : "hours"}
      </span>
    </div>
    <input
  type="range"
  id="hours-per-day"
  min={0.5}
  max={6}
  step={0.5}
  value={hoursPerDay}
  onChange={(e) => setHoursPerDay(Number(e.target.value))}
  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer
    accent-primary [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
    [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary"
/>

  </div>
</div>

{/* Right box: Duration */}
<div className="p-6 bg-card rounded-xl shadow-lg space-y-6 border border-border/20">
  <div className="flex items-center gap-2 mb-2">
    <Clock className="h-5 w-5 text-primary" />
    <h3 className="font-semibold text-lg">Duration</h3>
  </div>

  <div className="space-y-2">
    <Label htmlFor="months" className="text-base font-medium tracking-tight">
      How many months?
    </Label>
    <Select value={months} onValueChange={setMonths}>
      <SelectTrigger
        id="months"
        className="bg-background/50 border-border/30 shadow-md h-10 text-base"
      >
        <SelectValue placeholder="Select duration" />
      </SelectTrigger>
      <SelectContent>
  {[...Array(12)].map((_, i) => (
    <SelectItem key={i + 1} value={(i + 1).toString()}>
      {i + 1} {i === 0 ? "month" : "months"}
    </SelectItem>
  ))}
</SelectContent>

    </Select>

    <div className="mt-4 text-sm text-muted-foreground">
      Total learning hours: {totalHours} hours
    </div>
  </div>
</div>

</div>


          {/* Submit button */}
          <Button
            type="submit"
            className="w-full h-12 text-base shadow-md hover:shadow-lg
              transition-all duration-300 mt-6 bg-primary hover:bg-primary/90 font-semibold"
            disabled={!subject}
          >
            Create My Learning Plan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

/* ----------------
   LOADING COMPONENT
   ---------------- */
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-3xl space-y-4"
    >
      <div className="text-center">
        <h2 className="text-l font-bold">Creating Your Roadmap</h2>
        <p className="text-muted-foreground mt-2">
          Analyzing your learning preferences...
        </p>
      </div>
      <Progress value={progress} className="h-2 w-full" />
    </motion.div>
  )
}

/* --------------------
   ROADMAP VIEW WRAPPER
   -------------------- */
function RoadmapSection({
  subject,
  daysPerWeek,
  hoursPerDay,
  months,
  onBack,
}: {
  subject: string
  daysPerWeek: number
  hoursPerDay: number
  months: string
  onBack: () => void
}) {
  return (
    <motion.div
      key="roadmap"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl"
    >
      <RoadmapView
        subject={subject}
        daysPerWeek={daysPerWeek}
        hoursPerDay={hoursPerDay}
        months={months}
        onBack={onBack}
      />
    </motion.div>
  )
}

/* ----------------
   MAIN HOME SCREEN
   ---------------- */
export default function Home() {
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [subject, setSubject] = useState("")
  const [daysPerWeek, setDaysPerWeek] = useState(3)
  const [hoursPerDay, setHoursPerDay] = useState(1)
  const [months, setMonths] = useState("3")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setLoading(false)
            setShowRoadmap(true)
            return 100
          }
          return prev + 5
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [loading])

  // Handle the main "Create My Learning Plan" button
  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setProgress(0)
  }

  // Calculate total learning hours
  const totalHours = daysPerWeek * hoursPerDay * 4 * Number.parseInt(months)

  return (
    <div
      className="
        container mx-auto px-4 py-8
        flex flex-col items-center justify-center
        min-h-screen font-sans
      "
    >
      <AnimatePresence mode="wait">
        {/* 1) Show form  */}
        {!loading && !showRoadmap && (
          <CreatePlanForm
            subject={subject}
            setSubject={setSubject}
            daysPerWeek={daysPerWeek}
            setDaysPerWeek={setDaysPerWeek}
            hoursPerDay={hoursPerDay}
            setHoursPerDay={setHoursPerDay}
            months={months}
            setMonths={setMonths}
            totalHours={totalHours}
            handleCreatePlan={handleCreatePlan}
          />
        )}

        {/* 2) Show loading  */}
        {loading && <LoadingScreen progress={progress} />}

        {/* 3) Show final roadmap */}
        {!loading && showRoadmap && (
          <RoadmapSection
            subject={subject}
            daysPerWeek={daysPerWeek}
            hoursPerDay={hoursPerDay}
            months={months}
            onBack={() => setShowRoadmap(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
