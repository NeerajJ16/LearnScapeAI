import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import { Progress as ProgressUI } from "../components/ui/progress"
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function Progress() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl font-montserrat">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">My Progress</h1>
        <p className="text-muted-foreground mt-2 text-base">Track your learning journey</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            icon: <Calendar className="h-6 w-6 text-primary" />,
            label: "Current Streak",
            value: "7 days",
          },
          {
            icon: <Clock className="h-6 w-6 text-primary" />,
            label: "Study Time",
            value: "24 hours",
          },
          {
            icon: <CheckCircle className="h-6 w-6 text-primary" />,
            label: "Completed",
            value: "12 topics",
          },
        ].map((card, i) => (
          <Card key={i} className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">{card.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <h3 className="text-2xl font-semibold">{card.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Progress Section */}
      <Card className="border border-border/30 shadow-lg mt-12">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">JavaScript Mastery</CardTitle>
          <CardDescription>Overall progress: 35% complete</CardDescription>
          <ProgressUI value={35} className="h-2 mt-2" />
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="modules">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            {/* Modules Tab */}
            <TabsContent value="modules" className="pt-4 space-y-4">
              {[
                { name: "JavaScript Fundamentals", progress: 100 },
                { name: "DOM Manipulation", progress: 60 },
                { name: "Asynchronous JavaScript", progress: 10 },
                { name: "Building Projects", progress: 0 },
              ].map((module, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{module.name}</h3>
                    <span className="text-sm">{module.progress}%</span>
                  </div>
                  <ProgressUI value={module.progress} className="h-2" />
                </div>
              ))}
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities" className="pt-4">
              <div className="space-y-4">
                <h3 className="font-medium">Recent Activities</h3>
                <div className="space-y-3">
                  {[
                    {
                      date: "Today",
                      activity: "Completed quiz on JavaScript Arrays",
                      type: "Quiz",
                    },
                    {
                      date: "Yesterday",
                      activity: "Watched tutorial on DOM Events",
                      type: "Video",
                    },
                    {
                      date: "2 days ago",
                      activity: "Completed exercise on Functions",
                      type: "Exercise",
                    },
                    {
                      date: "3 days ago",
                      activity: "Created flashcards for JavaScript Basics",
                      type: "Study",
                    },
                    {
                      date: "1 week ago",
                      activity: "Completed milestone: JavaScript Fundamentals",
                      type: "Milestone",
                    },
                  ].map((activity, i) => (
                    <Card
                      key={i}
                      className="p-3 border border-border/30 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{activity.activity}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                        <div className="text-xs bg-muted px-2 py-1 rounded-full">
                          {activity.type}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="pt-4">
              <div className="flex justify-center p-6 relative">
                <div className="w-full max-w-md aspect-square flex items-center justify-center relative">
                  <BarChart3 className="w-full h-full text-muted-foreground opacity-50" />
                  <div className="absolute text-center">
                    <p className="text-sm text-muted-foreground">Statistics visualization</p>
                    <p className="text-xs text-muted-foreground">Coming soon</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
