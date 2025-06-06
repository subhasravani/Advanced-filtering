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
import { Play, Pause, Square, Globe, AlertCircle, CheckCircle, Clock, X, Download, Bug } from "lucide-react"
import { Alert, AlertTriangle, AlertDescription } from "@/components/ui/alert"

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
    strategy: "intelligent",
    dataFields: {
      companyName: { enabled: true, selector: "", required: true },
      industry: { enabled: true, selector: "", required: false },
      description: { enabled: true, selector: "", required: false },
      employees: { enabled: true, selector: "", required: false },
      revenue: { enabled: true, selector: "", required: false },
      location: { enabled: true, selector: "", required: false },
      website: { enabled: true, selector: "", required: false },
      contactEmail: { enabled: true, selector: "", required: false },
      contactPhone: { enabled: false, selector: "", required: false },
      foundingYear: { enabled: false, selector: "", required: false },
      technologies: { enabled: false, selector: "", required: false },
      socialMedia: { enabled: false, selector: "", required: false },
      customField1: { enabled: false, selector: "", required: false, label: "" },
      customField2: { enabled: false, selector: "", required: false, label: "" },
    },
    filters: {
      industries: [] as string[],
      locations: [] as string[],
      minEmployees: "",
      maxEmployees: "",
      minRevenue: "",
      maxRevenue: "",
      keywords: "",
      excludeKeywords: "",
      companySizes: [] as string[],
      foundingYearRange: { min: "", max: "" },
      requiredFields: [] as string[],
    },
    advanced: {
      respectRobots: true,
      delay: "1000",
      maxPages: "100",
      followLinks: false,
      maxDepth: "2",
      userAgent: "default",
      timeout: "30000",
      retryAttempts: "3",
    },
  })

  const [isCreating, setIsCreating] = useState(false)

  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<any[]>([])
  const [showJobDetails, setShowJobDetails] = useState(false)

  const mockExtractedData = {
    "1": [
      {
        id: "lead_001",
        companyName: "TechCorp Solutions",
        industry: "Technology",
        employees: 250,
        revenue: 15000000,
        location: "San Francisco, CA",
        website: "techcorp.com",
        contactEmail: "contact@techcorp.com",
        description: "Leading provider of cloud-based software solutions",
        extractedAt: new Date("2024-01-15T10:30:00"),
      },
      {
        id: "lead_002",
        companyName: "DataFlow Systems",
        industry: "Technology",
        employees: 180,
        revenue: 12500000,
        location: "San Francisco, CA",
        website: "dataflow.com",
        contactEmail: "info@dataflow.com",
        description: "Enterprise data analytics and visualization platform",
        extractedAt: new Date("2024-01-15T10:45:00"),
      },
      // Add more mock data...
    ],
    "2": [
      {
        id: "lead_003",
        companyName: "HealthTech Dynamics",
        industry: "Healthcare",
        employees: 450,
        revenue: 32000000,
        location: "Boston, MA",
        website: "healthtech.com",
        contactEmail: "hello@healthtech.com",
        description: "AI-driven diagnostic tools and telemedicine platforms",
        extractedAt: new Date("2024-01-14T14:20:00"),
      },
      // Add more healthcare leads...
    ],
  }

  const handleViewJobData = (jobId: string) => {
    setSelectedJob(jobId)
    setExtractedData(mockExtractedData[jobId] || [])
    setShowJobDetails(true)
  }

  const handleDownloadData = (format: "csv" | "excel" | "json") => {
    if (!extractedData.length) return

    let content = ""
    let filename = `scraped_data_${selectedJob}.${format}`
    let mimeType = ""

    switch (format) {
      case "csv":
        const headers = Object.keys(extractedData[0]).join(",")
        const rows = extractedData.map((row) =>
          Object.values(row)
            .map((value) => (typeof value === "string" ? `"${value}"` : value))
            .join(","),
        )
        content = [headers, ...rows].join("\n")
        mimeType = "text/csv"
        break

      case "json":
        content = JSON.stringify(extractedData, null, 2)
        mimeType = "application/json"
        break

      case "excel":
        // For demo purposes, we'll export as CSV with .xlsx extension
        const excelHeaders = Object.keys(extractedData[0]).join(",")
        const excelRows = extractedData.map((row) =>
          Object.values(row)
            .map((value) => (typeof value === "string" ? `"${value}"` : value))
            .join(","),
        )
        content = [excelHeaders, ...excelRows].join("\n")
        mimeType = "text/csv"
        filename = `scraped_data_${selectedJob}.csv`
        break
    }

    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

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
        strategy: "intelligent",
        dataFields: {
          companyName: { enabled: true, selector: "", required: true },
          industry: { enabled: true, selector: "", required: false },
          description: { enabled: true, selector: "", required: false },
          employees: { enabled: true, selector: "", required: false },
          revenue: { enabled: true, selector: "", required: false },
          location: { enabled: true, selector: "", required: false },
          website: { enabled: true, selector: "", required: false },
          contactEmail: { enabled: true, selector: "", required: false },
          contactPhone: { enabled: false, selector: "", required: false },
          foundingYear: { enabled: false, selector: "", required: false },
          technologies: { enabled: false, selector: "", required: false },
          socialMedia: { enabled: false, selector: "", required: false },
          customField1: { enabled: false, selector: "", required: false, label: "" },
          customField2: { enabled: false, selector: "", required: false, label: "" },
        },
        filters: {
          industries: [] as string[],
          locations: [] as string[],
          minEmployees: "",
          maxEmployees: "",
          minRevenue: "",
          maxRevenue: "",
          keywords: "",
          excludeKeywords: "",
          companySizes: [] as string[],
          foundingYearRange: { min: "", max: "" },
          requiredFields: [] as string[],
        },
        advanced: {
          respectRobots: true,
          delay: "1000",
          maxPages: "100",
          followLinks: false,
          maxDepth: "2",
          userAgent: "default",
          timeout: "30000",
          retryAttempts: "3",
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
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Create Scraping Job
            </div>
            <Button variant="outline" size="sm" onClick={() => window.open("/debug", "_blank")}>
              <Bug className="h-4 w-4 mr-2" />
              Debug Issues
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Configuration */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Basic Configuration</h3>

              <div>
                <Label htmlFor="jobName">Job Name *</Label>
                <Input
                  id="jobName"
                  placeholder="e.g., Tech Companies - San Francisco"
                  value={newJob.name}
                  onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="urls">Target URLs *</Label>
                <Textarea
                  id="urls"
                  placeholder="https://example.com/companies&#10;https://directory.com/listings&#10;https://industry-database.com"
                  value={newJob.urls}
                  onChange={(e) => setNewJob({ ...newJob, urls: e.target.value })}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">Enter one URL per line</p>
              </div>

              <div>
                <Label>Scraping Strategy</Label>
                <Select value={newJob.strategy} onValueChange={(value) => setNewJob({ ...newJob, strategy: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intelligent">AI-Powered Intelligent Scraping</SelectItem>
                    <SelectItem value="custom">Custom CSS Selectors</SelectItem>
                    <SelectItem value="api">API Integration</SelectItem>
                    <SelectItem value="hybrid">Hybrid (AI + Custom)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Data Fields Configuration */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Data Fields to Extract</h3>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {Object.entries(newJob.dataFields).map(([fieldKey, fieldConfig]) => (
                  <div key={fieldKey} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={fieldConfig.enabled}
                          onCheckedChange={(checked) =>
                            setNewJob({
                              ...newJob,
                              dataFields: {
                                ...newJob.dataFields,
                                [fieldKey]: { ...fieldConfig, enabled: checked as boolean },
                              },
                            })
                          }
                        />
                        <Label className="text-sm font-medium">
                          {fieldKey === "customField1" || fieldKey === "customField2"
                            ? fieldConfig.label || `Custom Field ${fieldKey.slice(-1)}`
                            : fieldKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          {fieldConfig.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                      </div>
                      {fieldConfig.required && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>

                    {fieldConfig.enabled && (
                      <div className="space-y-2">
                        {(fieldKey === "customField1" || fieldKey === "customField2") && (
                          <Input
                            placeholder="Field label (e.g., 'CEO Name', 'Funding Stage')"
                            value={fieldConfig.label}
                            onChange={(e) =>
                              setNewJob({
                                ...newJob,
                                dataFields: {
                                  ...newJob.dataFields,
                                  [fieldKey]: { ...fieldConfig, label: e.target.value },
                                },
                              })
                            }
                            className="text-xs"
                          />
                        )}

                        {newJob.strategy === "custom" || newJob.strategy === "hybrid" ? (
                          <Input
                            placeholder="CSS selector (e.g., '.company-name', '#revenue')"
                            value={fieldConfig.selector}
                            onChange={(e) =>
                              setNewJob({
                                ...newJob,
                                dataFields: {
                                  ...newJob.dataFields,
                                  [fieldKey]: { ...fieldConfig, selector: e.target.value },
                                },
                              })
                            }
                            className="text-xs"
                          />
                        ) : (
                          <p className="text-xs text-muted-foreground">AI will automatically detect this field</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Filtering Options */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Pre-Filtering Options</h3>

              <div className="space-y-4">
                <div>
                  <Label>Target Industries</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing"].map((industry) => (
                      <Label key={industry} className="flex items-center space-x-2 text-xs">
                        <Checkbox
                          checked={newJob.filters.industries.includes(industry)}
                          onCheckedChange={(checked) => {
                            const industries = checked
                              ? [...newJob.filters.industries, industry]
                              : newJob.filters.industries.filter((i) => i !== industry)
                            setNewJob({
                              ...newJob,
                              filters: { ...newJob.filters, industries },
                            })
                          }}
                        />
                        <span>{industry}</span>
                      </Label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Company Size</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {[
                      { value: "startup", label: "Startup (1-10)" },
                      { value: "small", label: "Small (11-50)" },
                      { value: "medium", label: "Medium (51-200)" },
                      { value: "large", label: "Large (201-1000)" },
                      { value: "enterprise", label: "Enterprise (1000+)" },
                    ].map((size) => (
                      <Label key={size.value} className="flex items-center space-x-2 text-xs">
                        <Checkbox
                          checked={newJob.filters.companySizes.includes(size.value)}
                          onCheckedChange={(checked) => {
                            const sizes = checked
                              ? [...newJob.filters.companySizes, size.value]
                              : newJob.filters.companySizes.filter((s) => s !== size.value)
                            setNewJob({
                              ...newJob,
                              filters: { ...newJob.filters, companySizes: sizes },
                            })
                          }}
                        />
                        <span>{size.label}</span>
                      </Label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Min Employees</Label>
                    <Input
                      type="number"
                      placeholder="10"
                      value={newJob.filters.minEmployees}
                      onChange={(e) =>
                        setNewJob({
                          ...newJob,
                          filters: { ...newJob.filters, minEmployees: e.target.value },
                        })
                      }
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Max Employees</Label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={newJob.filters.maxEmployees}
                      onChange={(e) =>
                        setNewJob({
                          ...newJob,
                          filters: { ...newJob.filters, maxEmployees: e.target.value },
                        })
                      }
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Min Revenue ($)</Label>
                    <Input
                      type="number"
                      placeholder="1000000"
                      value={newJob.filters.minRevenue}
                      onChange={(e) =>
                        setNewJob({
                          ...newJob,
                          filters: { ...newJob.filters, minRevenue: e.target.value },
                        })
                      }
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Max Revenue ($)</Label>
                    <Input
                      type="number"
                      placeholder="100000000"
                      value={newJob.filters.maxRevenue}
                      onChange={(e) =>
                        setNewJob({
                          ...newJob,
                          filters: { ...newJob.filters, maxRevenue: e.target.value },
                        })
                      }
                      className="text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Include Keywords</Label>
                  <Input
                    placeholder="AI, machine learning, SaaS, cloud"
                    value={newJob.filters.keywords}
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        filters: { ...newJob.filters, keywords: e.target.value },
                      })
                    }
                    className="text-xs"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Comma-separated keywords to include</p>
                </div>

                <div>
                  <Label className="text-xs">Exclude Keywords</Label>
                  <Input
                    placeholder="non-profit, government, consulting"
                    value={newJob.filters.excludeKeywords}
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        filters: { ...newJob.filters, excludeKeywords: e.target.value },
                      })
                    }
                    className="text-xs"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Comma-separated keywords to exclude</p>
                </div>

                <div>
                  <Label className="text-xs">Required Data Fields</Label>
                  <div className="grid grid-cols-2 gap-1 mt-2">
                    {["contactEmail", "revenue", "employees", "website"].map((field) => (
                      <Label key={field} className="flex items-center space-x-2 text-xs">
                        <Checkbox
                          checked={newJob.filters.requiredFields.includes(field)}
                          onCheckedChange={(checked) => {
                            const fields = checked
                              ? [...newJob.filters.requiredFields, field]
                              : newJob.filters.requiredFields.filter((f) => f !== field)
                            setNewJob({
                              ...newJob,
                              filters: { ...newJob.filters, requiredFields: fields },
                            })
                          }}
                        />
                        <span>{field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</span>
                      </Label>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Only include leads with these fields populated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Advanced Settings</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-xs">Delay (ms)</Label>
                <Input
                  type="number"
                  value={newJob.advanced.delay}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      advanced: { ...newJob.advanced, delay: e.target.value },
                    })
                  }
                  className="text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Max Pages</Label>
                <Input
                  type="number"
                  value={newJob.advanced.maxPages}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      advanced: { ...newJob.advanced, maxPages: e.target.value },
                    })
                  }
                  className="text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Max Depth</Label>
                <Input
                  type="number"
                  value={newJob.advanced.maxDepth}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      advanced: { ...newJob.advanced, maxDepth: e.target.value },
                    })
                  }
                  className="text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Timeout (ms)</Label>
                <Input
                  type="number"
                  value={newJob.advanced.timeout}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      advanced: { ...newJob.advanced, timeout: e.target.value },
                    })
                  }
                  className="text-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
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
                <Label className="text-xs">Respect robots.txt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={newJob.advanced.followLinks}
                  onCheckedChange={(checked) =>
                    setNewJob({
                      ...newJob,
                      advanced: { ...newJob.advanced, followLinks: checked as boolean },
                    })
                  }
                />
                <Label className="text-xs">Follow internal links</Label>
              </div>
            </div>
          </div>

          {/* Troubleshooting Section */}
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Getting zero leads?</strong> Common issues include JavaScript-heavy sites, anti-bot protection, or
              incorrect selectors.
              <Button variant="link" className="p-0 h-auto ml-1" onClick={() => window.open("/debug", "_blank")}>
                Use our debugging tool
              </Button>{" "}
              to diagnose the problem.
            </AlertDescription>
          </Alert>

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
                      {job.status === "completed" ? (
                        <button
                          onClick={() => handleViewJobData(job.id)}
                          className="font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          {job.name}
                        </button>
                      ) : (
                        <h3 className="font-semibold">{job.name}</h3>
                      )}
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

      {/* Job Details Modal */}
      {showJobDetails && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-6xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Scraped Data - {jobs.find((j) => j.id === selectedJob)?.name}</h2>
              <button onClick={() => setShowJobDetails(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4 flex gap-2">
              <Button onClick={() => handleDownloadData("csv")} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
              <Button onClick={() => handleDownloadData("excel")} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Excel
              </Button>
              <Button onClick={() => handleDownloadData("json")} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3 border-b">
                <p className="text-sm text-gray-600">{extractedData.length} leads extracted</p>
              </div>

              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2 text-left">Company</th>
                      <th className="p-2 text-left">Industry</th>
                      <th className="p-2 text-left">Employees</th>
                      <th className="p-2 text-left">Revenue</th>
                      <th className="p-2 text-left">Location</th>
                      <th className="p-2 text-left">Website</th>
                      <th className="p-2 text-left">Contact</th>
                      <th className="p-2 text-left">Extracted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedData.map((lead, index) => (
                      <tr key={lead.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-2 font-medium">{lead.companyName}</td>
                        <td className="p-2">{lead.industry}</td>
                        <td className="p-2">{lead.employees?.toLocaleString()}</td>
                        <td className="p-2">${(lead.revenue / 1000000).toFixed(1)}M</td>
                        <td className="p-2">{lead.location}</td>
                        <td className="p-2">
                          <a
                            href={`https://${lead.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {lead.website}
                          </a>
                        </td>
                        <td className="p-2">{lead.contactEmail}</td>
                        <td className="p-2">{lead.extractedAt?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
