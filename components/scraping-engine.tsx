"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Play, Pause, Square, Globe, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface ScrapingJob {
  id: string
  name: string
  status: "running" | "paused" | "completed" | "failed"
  progress: number
  leadsFound: number
  startTime: Date
  estimatedCompletion?: Date
}

export default function ScrapingEngine() {
  const [jobs, setJobs] = useState<ScrapingJob[]>([
    {
      id: "1",
      name: "Tech Companies - San Francisco",
      status: "running",
      progress: 67,
      leadsFound: 1247,
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() + 45 * 60 * 1000),
    },
    {
      id: "2",
      name: "Healthcare Startups - Boston",
      status: "completed",
      progress: 100,
      leadsFound: 892,
      startTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
  ])

  const [newJob, setNewJob] = useState({
    name: "",
    urls: "",
    selectors: {
      companyName: "",
      description: "",
      employees: "",
      revenue: "",
      contact: "",
    },
    filters: {
      minEmployees: "",
      maxEmployees: "",
      industries: [] as string[],
      locations: [] as string[],
    },
    advanced: {
      respectRobots: true,
      delay: "1000",
      maxPages: "100",
      followLinks: false,
    },
  })

  const [isCreating, setIsCreating] = useState(false)

  const handleStartJob = () => {
    setIsCreating(true)
    // Simulate job creation
    setTimeout(() => {
      const job: ScrapingJob = {
        id: Date.now().toString(),
        name: newJob.name || "New Scraping Job",
        status: "running",
        progress: 0,
        leadsFound: 0,
        startTime: new Date(),
        estimatedCompletion: new Date(Date.now() + 3 * 60 * 60 * 1000),
      }
      setJobs([job, ...jobs])
      setIsCreating(false)
      setNewJob({
        name: "",
        urls: "",
        selectors: {
          companyName: "",
          description: "",
          employees: "",
          revenue: "",
          contact: "",
        },
        filters: {
          minEmployees: "",
          maxEmployees: "",
          industries: [],
          locations: [],
        },
        advanced: {
          respectRobots: true,
          delay: "1000",
          maxPages: "100",
          followLinks: false,
        },
      })
    }, 2000)
  }

  const handleJobAction = (jobId: string, action: "pause" | "resume" | "stop") => {
    setJobs(
      jobs.map((job) => {
        if (job.id === jobId) {
          switch (action) {
            case "pause":
              return { ...job, status: "paused" as const }
            case "resume":
              return { ...job, status: "running" as const }
            case "stop":
              return { ...job, status: "completed" as const, progress: 100 }
            default:
              return job
          }
        }
        return job
      }),
    )
  }

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((currentJobs) =>
        currentJobs.map((job) => {
          if (job.status === "running" && job.progress < 100) {
            const newProgress = Math.min(job.progress + Math.random() * 5, 100)
            const newLeadsFound = job.leadsFound + Math.floor(Math.random() * 10)
            return {
              ...job,
              progress: newProgress,
              leadsFound: newLeadsFound,
              status: newProgress >= 100 ? ("completed" as const) : job.status,
            }
          }
          return job
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: ScrapingJob["status"]) => {
    switch (status) {
      case "running":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: ScrapingJob["status"]) => {
    switch (status) {
      case "running":
        return "bg-blue-600"
      case "paused":
        return "bg-yellow-600"
      case "completed":
        return "bg-green-600"
      case "failed":
        return "bg-red-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Create New Job */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Create Scraping Job
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="jobName">Job Name</Label>
                <Input
                  id="jobName"
                  placeholder="e.g., Tech Companies - San Francisco"
                  value={newJob.name}
                  onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="urls">Target URLs</Label>
                <Textarea
                  id="urls"
                  placeholder="https://example.com/companies&#10;https://directory.com/listings"
                  value={newJob.urls}
                  onChange={(e) => setNewJob({ ...newJob, urls: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label>Scraping Strategy</Label>
                <Select defaultValue="intelligent">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intelligent">AI-Powered Intelligent Scraping</SelectItem>
                    <SelectItem value="custom">Custom CSS Selectors</SelectItem>
                    <SelectItem value="api">API Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Data Fields to Extract</Label>
                <div className="space-y-2 mt-2">
                  {[
                    { key: "companyName", label: "Company Name" },
                    { key: "description", label: "Description" },
                    { key: "employees", label: "Employee Count" },
                    { key: "revenue", label: "Revenue" },
                    { key: "contact", label: "Contact Info" },
                  ].map((field) => (
                    <div key={field.key} className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <Label className="text-sm font-normal">{field.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="delay">Delay (ms)</Label>
                  <Input
                    id="delay"
                    type="number"
                    value={newJob.advanced.delay}
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        advanced: { ...newJob.advanced, delay: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="maxPages">Max Pages</Label>
                  <Input
                    id="maxPages"
                    type="number"
                    value={newJob.advanced.maxPages}
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        advanced: { ...newJob.advanced, maxPages: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={newJob.advanced.respectRobots}
                  onCheckedChange={(checked) =>
                    setNewJob({
                      ...newJob,
                      advanced: { ...newJob.advanced, respectRobots: checked as boolean },
                    })
                  }
                />
                <Label className="text-sm">Respect robots.txt</Label>
              </div>
            </div>
          </div>

          <Button onClick={handleStartJob} disabled={isCreating} className="w-full">
            {isCreating ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Creating Job...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Scraping Job
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Active Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Active Scraping Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(job.status)}
                    <div>
                      <h3 className="font-semibold">{job.name}</h3>
                      <p className="text-sm text-muted-foreground">Started {job.startTime.toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{job.leadsFound} leads found</Badge>
                    <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{job.progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                  {job.estimatedCompletion && job.status === "running" && (
                    <p className="text-xs text-muted-foreground">
                      Estimated completion: {job.estimatedCompletion.toLocaleTimeString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {job.status === "running" && (
                    <Button size="sm" variant="outline" onClick={() => handleJobAction(job.id, "pause")}>
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                  )}
                  {job.status === "paused" && (
                    <Button size="sm" variant="outline" onClick={() => handleJobAction(job.id, "resume")}>
                      <Play className="h-3 w-3 mr-1" />
                      Resume
                    </Button>
                  )}
                  {(job.status === "running" || job.status === "paused") && (
                    <Button size="sm" variant="destructive" onClick={() => handleJobAction(job.id, "stop")}>
                      <Square className="h-3 w-3 mr-1" />
                      Stop
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
