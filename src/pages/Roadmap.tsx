"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { RoadmapView } from "../components/roadmap-view"
import { motion, AnimatePresence } from "framer-motion"

export default function Roadmap() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null)

  const roadmaps = [
    {
      id: "javascript",
      title: "JavaScript Mastery",
      description: "A comprehensive guide to modern JavaScript development",
      duration: "3 months",
      hoursPerWeek: "12 hours",
      progress: 35,
    },
    {
      id: "react",
      title: "React Development",
      description: "Learn to build interactive UIs with React",
      duration: "2 months",
      hoursPerWeek: "10 hours",
      progress: 0,
    },
    {
      id: "python",
      title: "Python for Data Science",
      description: "Master Python for data analysis and visualization",
      duration: "4 months",
      hoursPerWeek: "8 hours",
      progress: 15,
    },
  ]

  const handleViewRoadmap = (id: string) => {
    setSelectedRoadmap(id)
  }

  const handleBack = () => {
    setSelectedRoadmap(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {!selectedRoadmap ? (
          <motion.div
            key="roadmap-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Your Learning Roadmaps</h1>
              <p className="text-muted-foreground mt-2">Select a roadmap to view detailed content</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {roadmaps.map((roadmap) => (
                <Card
                  key={roadmap.id}
                  className="border border-border/30 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle>{roadmap.title}</CardTitle>
                    <CardDescription>{roadmap.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{roadmap.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{roadmap.hoursPerWeek}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full gap-1 shadow-sm hover:shadow-md"
                      onClick={() => handleViewRoadmap(roadmap.id)}
                    >
                      View Roadmap <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="roadmap-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RoadmapView
              subject={roadmaps.find((r) => r.id === selectedRoadmap)?.title || ""}
              daysPerWeek={3}
              hoursPerDay={1}
              months="3"
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
