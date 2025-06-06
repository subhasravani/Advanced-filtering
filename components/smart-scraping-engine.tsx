"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Search, CheckCircle, AlertTriangle, X, Zap, Database, Settings, Download, Eye } from "lucide-react"

interface AnalysisStep {
  name: string
  status: "pending" | "running" | "completed" | "failed"
  message: string
  details?: string
}

interface LeadPreview {
  companyName: string
  industry: string
  location: string
  employees: number
  revenue: number
  contactEmail: string
  confidence: number
}

interface AnalysisResult {
  canScrape: boolean
  estimatedLeads: number
  leadPreviews: LeadPreview[]
  issues: string[]
  recommendations: string[]
  dataFields: string[]
}

export default function SmartScrapingEngine() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([])
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractionProgress, setExtractionProgress] = useState(0)

  const steps = [
    { name: "Accessing Website", message: "Checking if website is accessible..." },
    { name: "AI Analysis", message: "AI is analyzing page structure and content..." },
    { name: "Data Detection", message: "Identifying company data patterns..." },
    { name: "Lead Validation", message: "Validating found leads and data quality..." },
    { name: "Extraction Test", message: "Testing data extraction methods..." },
  ]

  const mockLeadPreviews: LeadPreview[] = [
    {
      companyName: "TechCorp Solutions",
      industry: "Technology",
      location: "San Francisco, CA",
      employees: 250,
      revenue: 15000000,
      contactEmail: "contact@techcorp.com",
      confidence: 95,
    },
    {
      companyName: "DataFlow Systems",
      industry: "Technology",
      location: "San Francisco, CA",
      employees: 180,
      revenue: 12500000,
      contactEmail: "info@dataflow.com",
      confidence: 92,
    },
    {
      companyName: "CloudTech Innovations",
      industry: "Technology",
      location: "San Francisco, CA",
      employees: 320,
      revenue: 18700000,
      contactEmail: "hello@cloudtech.com",
      confidence: 88,
    },
  ]

  const handleAnalyze = async () => {
    if (!url) return

    setIsAnalyzing(true)
    setAnalysisSteps([])
    setAnalysisResult(null)
    setShowAdvancedOptions(false)

    // Simulate AI analysis process
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]

      // Add step as running
      setAnalysisSteps((prev) => [...prev, { name: step.name, status: "running", message: step.message }])

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

      // Update step as completed
      setAnalysisSteps((prev) =>
        prev.map((s, index) =>
          index === i ? { ...s, status: "completed", message: `${step.name} completed successfully` } : s,
        ),
      )
    }

    // Simulate analysis result
    const result: AnalysisResult = {
      canScrape: true,
      estimatedLeads: 1247,
      leadPreviews: mockLeadPreviews,
      issues: [],
      recommendations: [
        "AI detected structured company data",
        "High-quality contact information available",
        "Recommended extraction method: Intelligent parsing",
      ],
      dataFields: [
        "Company Name",
        "Industry",
        "Location",
        "Employee Count",
        "Revenue",
        "Contact Email",
        "Website",
        "Description",
      ],
    }

    setAnalysisResult(result)
    setIsAnalyzing(false)
  }

  const handleStartExtraction = async () => {
    setIsExtracting(true)
    setExtractionProgress(0)

    // Simulate extraction progress
    const interval = setInterval(() => {
      setExtractionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExtracting(false)
          return 100
        }
        return prev + Math.random() * 8
      })
    }, 500)
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "running":
        return <Brain className="h-4 w-4 text-blue-600 animate-pulse" />
      case "failed":
        return <X className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Simple URL Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Lead Extraction
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Just enter a website URL. Our AI will analyze it and extract leads automatically.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="websiteUrl">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="websiteUrl"
                placeholder="https://example.com/companies"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAnalyze} disabled={isAnalyzing || !url} className="min-w-32">
                {isAnalyzing ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze & Extract
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Analysis Progress */}
          {analysisSteps.length > 0 && (
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-sm">AI Analysis Progress</h3>
              {analysisSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {getStepIcon(step.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.name}</p>
                    <p className="text-xs text-muted-foreground">{step.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Analysis Complete
              </div>
              <Badge className="bg-green-100 text-green-800">{analysisResult.estimatedLeads} leads found</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Success Message */}
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Great news!</strong> Our AI successfully analyzed the website and found{" "}
                {analysisResult.estimatedLeads} potential leads. The data quality looks excellent with high confidence
                scores.
              </AlertDescription>
            </Alert>

            {/* Lead Previews */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Lead Preview (First 3 results)
              </h3>
              <div className="space-y-3">
                {analysisResult.leadPreviews.map((lead, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{lead.companyName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {lead.industry} • {lead.location}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {lead.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Employees:</span>
                        <span className="ml-1 font-medium">{lead.employees}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="ml-1 font-medium">${(lead.revenue / 1000000).toFixed(1)}M</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Contact:</span>
                        <span className="ml-1 font-medium text-blue-600">{lead.contactEmail}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quality:</span>
                        <span className="ml-1 font-medium text-green-600">High</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Fields Detected */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Fields Detected
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.dataFields.map((field, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {field}
                  </Badge>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                AI Recommendations
              </h3>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleStartExtraction} disabled={isExtracting} className="flex-1">
                {isExtracting ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-pulse" />
                    Extracting {Math.round(extractionProgress)}%
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Extract All {analysisResult.estimatedLeads} Leads
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
                <Settings className="h-4 w-4 mr-2" />
                {showAdvancedOptions ? "Hide" : "Show"} Options
              </Button>
            </div>

            {/* Extraction Progress */}
            {isExtracting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Extracting leads...</span>
                  <span>{Math.round(extractionProgress)}%</span>
                </div>
                <Progress value={extractionProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  AI is intelligently extracting and validating lead data...
                </p>
              </div>
            )}

            {/* Advanced Options (Only shown after successful analysis) */}
            {showAdvancedOptions && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Advanced Options</CardTitle>
                  <p className="text-sm text-muted-foreground">Fine-tune the extraction since we've proven it works</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Max Leads to Extract</Label>
                      <Input type="number" defaultValue={analysisResult.estimatedLeads} />
                    </div>
                    <div>
                      <Label className="text-sm">Extraction Speed</Label>
                      <select className="w-full p-2 border rounded text-sm">
                        <option>Careful (Recommended)</option>
                        <option>Balanced</option>
                        <option>Fast</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Additional Filters</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Input placeholder="Min employees" type="number" />
                      <Input placeholder="Max employees" type="number" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Required Fields</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Only extract leads that have these fields populated
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Email", "Phone", "Revenue", "Employee Count"].map((field) => (
                        <label key={field} className="flex items-center space-x-2 text-xs">
                          <input type="checkbox" className="rounded" />
                          <span>{field}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {/* Zero Leads Troubleshooting (Only shown if analysis fails) */}
      {analysisResult && !analysisResult.canScrape && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              No Leads Found - Let's Fix This
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-100">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Our AI couldn't find any leads on this website. Here are the most likely reasons and automatic fixes:
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {analysisResult.issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white border rounded">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">{issue}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full" variant="outline">
              <Brain className="h-4 w-4 mr-2" />
              Try Alternative AI Analysis Methods
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
