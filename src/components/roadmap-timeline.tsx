import { CheckCircle, Circle } from "lucide-react"
import { Badge } from "./ui/badge"

export function RoadmapTimeline() {
  const modules = [
    {
      title: "Getting Started",
      completed: true,
      duration: "Week 1",
      topics: [
        { name: "Introduction to the subject", completed: true },
        { name: "Setting up your learning environment", completed: true },
        { name: "Core concepts and terminology", completed: true },
      ],
    },
    {
      title: "Fundamentals",
      completed: true,
      duration: "Weeks 2-3",
      topics: [
        { name: "Basic principles and patterns", completed: true },
        { name: "Solving simple problems", completed: true },
        { name: "Building your first project", completed: true },
      ],
    },
    {
      title: "Intermediate Concepts",
      completed: false,
      duration: "Weeks 4-6",
      topics: [
        { name: "Advanced techniques", completed: false },
        { name: "Optimization strategies", completed: false },
        { name: "Real-world applications", completed: false },
      ],
    },
    {
      title: "Advanced Topics",
      completed: false,
      duration: "Weeks 7-9",
      topics: [
        { name: "Complex problem solving", completed: false },
        { name: "Industry best practices", completed: false },
        { name: "Building a comprehensive project", completed: false },
      ],
    },
    {
      title: "Mastery",
      completed: false,
      duration: "Weeks 10-12",
      topics: [
        { name: "Specialized areas and niches", completed: false },
        { name: "Contributing to open source", completed: false },
        { name: "Final capstone project", completed: false },
      ],
    },
  ]

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:left-9 before:border-l-2 before:border-border/30 ml-5 pl-10">
      {modules.map((module, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-14 mt-1">
            {module.completed ? (
              <div className="rounded-full bg-primary/20 p-1">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            ) : (
              <div className="rounded-full bg-muted p-1">
                <Circle className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold">{module.title}</h3>
              <Badge variant="outline" className="text-xs font-normal shadow-sm">
                {module.duration}
              </Badge>
            </div>

            <ul className="space-y-2 mb-6">
              {module.topics.map((topic, j) => (
                <li key={j} className="flex items-start gap-2">
                  {topic.completed ? (
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <span className={topic.completed ? "" : "text-muted-foreground"}>{topic.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
