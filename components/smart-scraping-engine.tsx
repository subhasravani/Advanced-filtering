"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Brain,
  Search,
  CheckCircle,
  AlertTriangle,
  Download,
  Eye,
  Zap,
  Activity,
  Shield,
  BarChart3,
} from "lucide-react"

interface AnalysisStep {
  name: string
  status: "pending" | "running" | "completed" | "failed"
  message: string
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

interface ExtractedLeads {
  leads: LeadPreview[]
  totalCount: number
  extractedAt: Date
}

interface QualificationResult {
  totalLeads: number
  qualifiedLeads: number
  highPriority: number
  mediumPriority: number
  lowPriority: number
  avgScore: number
}

interface CRMSyncResult {
  syncedLeads: number
  salesforce: number
  hubspot: number
  failedSync: number
  syncedAt: Date
}

interface QualityCheckResult {
  qualityScore: number
  duplicatesFound: number
  missingData: number
  enrichedRecords: number
  cleanedLeads: number
}

type WorkflowStep = "analysis" | "extraction" | "qualification" | "crm" | "quality" | "report"

export default function SmartScrapingEngine() {
  const [url, setUrl] = useState("")
  const [currentStep, setCurrentStep] = useState<WorkflowStep | null>(null)

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([])
  const [canExtract, setCanExtract] = useState(false)
  const [estimatedLeads, setEstimatedLeads] = useState(0)

  // Extraction state
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractionProgress, setExtractionProgress] = useState(0)
  const [extractedLeads, setExtractedLeads] = useState<ExtractedLeads | null>(null)

  // Qualification state
  const [isQualifying, setIsQualifying] = useState(false)
  const [qualificationProgress, setQualificationProgress] = useState(0)
  const [qualificationResult, setQualificationResult] = useState<QualificationResult | null>(null)

  // CRM state
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [crmResult, setCrmResult] = useState<CRMSyncResult | null>(null)

  // Quality state
  const [isCheckingQuality, setIsCheckingQuality] = useState(false)
  const [qualityProgress, setQualityProgress] = useState(0)
  const [qualityResult, setQualityResult] = useState<QualityCheckResult | null>(null)

  const analysisStepsList = [
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

    setCurrentStep("analysis")
    setIsAnalyzing(true)
    setAnalysisSteps([])
    setCanExtract(false)

    // Simulate AI analysis process
    for (let i = 0; i < analysisStepsList.length; i++) {
      const step = analysisStepsList[i]

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

    // Set results
    setCanExtract(true)
    setEstimatedLeads(1247)
    setIsAnalyzing(false)
  }

  const handleExtractLeads = async () => {
    setCurrentStep("extraction")
    setIsExtracting(true)
    setExtractionProgress(0)

    // Simulate extraction progress
    const interval = setInterval(() => {
      setExtractionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExtracting(false)

          // Set extracted leads
          setExtractedLeads({
            leads: mockLeadPreviews,
            totalCount: 1247,
            extractedAt: new Date(),
          })

          return 100
        }
        return prev + Math.random() * 8
      })
    }, 500)
  }

  const handleDownloadCSV = () => {
    if (!extractedLeads) return

    const csvContent = [
      "Company Name,Industry,Location,Employees,Revenue,Contact Email,Confidence",
      ...extractedLeads.leads.map(
        (lead) =>
          `"${lead.companyName}","${lead.industry}","${lead.location}",${lead.employees},${lead.revenue},"${lead.contactEmail}",${lead.confidence}%`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleAIQualification = async () => {
    setCurrentStep("qualification")
    setIsQualifying(true)
    setQualificationProgress(0)

    // Simulate qualification progress
    const interval = setInterval(() => {
      setQualificationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsQualifying(false)

          // Set qualification results
          setQualificationResult({
            totalLeads: 1247,
            qualifiedLeads: 342,
            highPriority: 89,
            mediumPriority: 156,
            lowPriority: 97,
            avgScore: 78,
          })

          return 100
        }
        return prev + Math.random() * 12
      })
    }, 600)
  }

  const handleCRMSync = async () => {
    setCurrentStep("crm")
    setIsSyncing(true)
    setSyncProgress(0)

    // Simulate CRM sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSyncing(false)

          // Set CRM sync results
          setCrmResult({
            syncedLeads: 298,
            salesforce: 189,
            hubspot: 109,
            failedSync: 44,
            syncedAt: new Date(),
          })

          return 100
        }
        return prev + Math.random() * 10
      })
    }, 700)
  }

  const handleQualityCheck = async () => {
    setCurrentStep("quality")
    setIsCheckingQuality(true)
    setQualityProgress(0)

    // Simulate quality check progress
    const interval = setInterval(() => {
      setQualityProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCheckingQuality(false)

          // Set quality check results
          setQualityResult({
            qualityScore: 94,
            duplicatesFound: 23,
            missingData: 12,
            enrichedRecords: 267,
            cleanedLeads: 275,
          })

          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const handleGenerateReport = () => {
    setCurrentStep("report")
    // This would generate and show the final report
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "running":
        return <Brain className="h-4 w-4 text-blue-600 animate-pulse" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Step 1: URL Input and Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Step 1: AI Website Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter a website URL and let our AI analyze it for potential leads.
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
                disabled={currentStep !== null}
              />
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url || currentStep !== null}
                className="min-w-32"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze Website
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

          {/* Analysis Success */}
          {canExtract && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Analysis Complete!</strong> AI found {estimatedLeads} potential leads on this website.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Lead Extraction */}
      {canExtract && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Step 2: Extract Leads
            </CardTitle>
            <p className="text-sm text-muted-foreground">Extract all {estimatedLeads} leads from the website.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleExtractLeads} disabled={isExtracting || extractedLeads !== null} className="w-full">
              {isExtracting ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Extracting {Math.round(extractionProgress)}%
                </>
              ) : extractedLeads ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Extraction Complete
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Extract All {estimatedLeads} Leads
                </>
              )}
            </Button>

            {/* Extraction Progress */}
            {isExtracting && (
              <div className="space-y-2">
                <Progress value={extractionProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">AI is extracting and validating lead data...</p>
              </div>
            )}

            {/* Extraction Results */}
            {extractedLeads && (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Success!</strong> Extracted {extractedLeads.totalCount} leads from the website.
                  </AlertDescription>
                </Alert>

                {/* Lead Preview */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Lead Preview (First 3 results)
                  </h3>
                  <div className="space-y-3">
                    {extractedLeads.leads.slice(0, 3).map((lead, index) => (
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

                <Button onClick={handleDownloadCSV} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download All {extractedLeads.totalCount} Leads as CSV
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: AI Qualification */}
      {extractedLeads && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Step 3: AI Lead Qualification
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Let AI analyze and score each lead for quality and potential.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleAIQualification}
              disabled={isQualifying || qualificationResult !== null}
              className="w-full"
            >
              {isQualifying ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-pulse" />
                  Qualifying Leads {Math.round(qualificationProgress)}%
                </>
              ) : qualificationResult ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Qualification Complete
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Start AI Qualification
                </>
              )}
            </Button>

            {/* Qualification Progress */}
            {isQualifying && (
              <div className="space-y-2">
                <Progress value={qualificationProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">AI is analyzing lead quality and scoring potential...</p>
              </div>
            )}

            {/* Qualification Results */}
            {qualificationResult && (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Qualification Complete!</strong> {qualificationResult.qualifiedLeads} out of{" "}
                    {qualificationResult.totalLeads} leads qualified (Average score: {qualificationResult.avgScore}%).
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{qualificationResult.highPriority}</div>
                    <div className="text-sm text-muted-foreground">High Priority</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{qualificationResult.mediumPriority}</div>
                    <div className="text-sm text-muted-foreground">Medium Priority</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{qualificationResult.lowPriority}</div>
                    <div className="text-sm text-muted-foreground">Low Priority</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 4: CRM Integration */}
      {qualificationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Step 4: CRM Integration
            </CardTitle>
            <p className="text-sm text-muted-foreground">Sync qualified leads to your CRM systems.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleCRMSync} disabled={isSyncing || crmResult !== null} className="w-full">
              {isSyncing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Syncing to CRM {Math.round(syncProgress)}%
                </>
              ) : crmResult ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  CRM Sync Complete
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4 mr-2" />
                  Sync to CRM Systems
                </>
              )}
            </Button>

            {/* Sync Progress */}
            {isSyncing && (
              <div className="space-y-2">
                <Progress value={syncProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">Syncing qualified leads to Salesforce and HubSpot...</p>
              </div>
            )}

            {/* CRM Results */}
            {crmResult && (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>CRM Sync Complete!</strong> {crmResult.syncedLeads} leads successfully synced to your CRM
                    systems.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{crmResult.salesforce}</div>
                    <div className="text-sm text-muted-foreground">Salesforce</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{crmResult.hubspot}</div>
                    <div className="text-sm text-muted-foreground">HubSpot</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{crmResult.failedSync}</div>
                    <div className="text-sm text-muted-foreground">Failed</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 5: Data Quality Check */}
      {crmResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Step 5: Data Quality Check
            </CardTitle>
            <p className="text-sm text-muted-foreground">Validate and clean the lead data for optimal quality.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleQualityCheck}
              disabled={isCheckingQuality || qualityResult !== null}
              className="w-full"
            >
              {isCheckingQuality ? (
                <>
                  <Shield className="h-4 w-4 mr-2 animate-pulse" />
                  Checking Quality {Math.round(qualityProgress)}%
                </>
              ) : qualityResult ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Quality Check Complete
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Run Quality Check
                </>
              )}
            </Button>

            {/* Quality Progress */}
            {isCheckingQuality && (
              <div className="space-y-2">
                <Progress value={qualityProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Checking for duplicates, missing data, and enriching records...
                </p>
              </div>
            )}

            {/* Quality Results */}
            {qualityResult && (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Quality Check Complete!</strong> Data quality score: {qualityResult.qualityScore}%.{" "}
                    {qualityResult.cleanedLeads} leads are now CRM-ready.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">{qualityResult.duplicatesFound}</div>
                    <div className="text-sm text-muted-foreground">Duplicates Removed</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{qualityResult.enrichedRecords}</div>
                    <div className="text-sm text-muted-foreground">Records Enriched</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 6: Generate Report */}
      {qualityResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Step 6: Generate Final Report
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Generate a comprehensive report of the entire lead generation process.
            </p>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGenerateReport} className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Complete Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
