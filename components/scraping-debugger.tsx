"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Bug,
  Search,
  Globe,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  Code,
  Zap,
  RefreshCw,
  HelpCircle,
  Database,
} from "lucide-react"

interface DebugResult {
  step: string
  status: "success" | "warning" | "error"
  message: string
  details?: string
  suggestion?: string
}

interface SiteAnalysis {
  url: string
  accessible: boolean
  hasRobotsTxt: boolean
  requiresJS: boolean
  hasAntiBot: boolean
  structure: string
  dataFormat: string
  estimatedLeads: number
  recommendations: string[]
}

export default function ScrapingDebugger() {
  const [debugUrl, setDebugUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [debugResults, setDebugResults] = useState<DebugResult[]>([])
  const [siteAnalysis, setSiteAnalysis] = useState<SiteAnalysis | null>(null)
  const [testSelectors, setTestSelectors] = useState({
    companyName: "",
    industry: "",
    location: "",
    employees: "",
    revenue: "",
  })

  const commonIssues = [
    {
      issue: "Website blocks automated requests",
      symptoms: ["403 Forbidden errors", "Captcha challenges", "Empty responses"],
      solutions: [
        "Add realistic User-Agent headers",
        "Implement request delays (1-3 seconds)",
        "Use rotating IP addresses",
        "Try headless browser mode",
      ],
    },
    {
      issue: "Content loaded by JavaScript",
      symptoms: ["HTML source is empty", "Data appears in browser but not in scraper", "Loading spinners visible"],
      solutions: [
        "Use browser automation (Puppeteer/Selenium)",
        "Wait for content to load with delays",
        "Look for API endpoints in Network tab",
        "Check for AJAX requests",
      ],
    },
    {
      issue: "Incorrect CSS selectors",
      symptoms: ["Selectors return empty results", "Wrong data extracted", "Inconsistent results"],
      solutions: [
        "Inspect element to verify selectors",
        "Use more specific selectors",
        "Test selectors in browser console",
        "Handle dynamic class names",
      ],
    },
    {
      issue: "Rate limiting or IP blocking",
      symptoms: ["Requests timing out", "Gradual decrease in success rate", "429 Too Many Requests"],
      solutions: [
        "Reduce request frequency",
        "Implement exponential backoff",
        "Use proxy rotation",
        "Respect robots.txt delays",
      ],
    },
    {
      issue: "Data structure changes",
      symptoms: ["Previously working selectors fail", "Inconsistent data format", "Missing fields"],
      solutions: [
        "Update selectors for new layout",
        "Implement fallback selectors",
        "Monitor for layout changes",
        "Use more robust selection methods",
      ],
    },
  ]

  const handleAnalyzeSite = async () => {
    if (!debugUrl) return

    setIsAnalyzing(true)
    setDebugResults([])

    // Simulate comprehensive site analysis
    const results: DebugResult[] = []

    // Step 1: URL Accessibility
    await new Promise((resolve) => setTimeout(resolve, 1000))
    results.push({
      step: "URL Accessibility",
      status: "success",
      message: "Website is accessible",
      details: "HTTP 200 OK response received",
    })
    setDebugResults([...results])

    // Step 2: Robots.txt Check
    await new Promise((resolve) => setTimeout(resolve, 800))
    results.push({
      step: "Robots.txt Analysis",
      status: "warning",
      message: "Robots.txt restricts crawling",
      details: "Crawl-delay: 2 seconds specified",
      suggestion: "Respect the crawl delay to avoid being blocked",
    })
    setDebugResults([...results])

    // Step 3: JavaScript Detection
    await new Promise((resolve) => setTimeout(resolve, 1200))
    results.push({
      step: "JavaScript Dependency",
      status: "error",
      message: "Content requires JavaScript execution",
      details: "Page content is dynamically loaded via AJAX",
      suggestion: "Switch to browser automation mode or find API endpoints",
    })
    setDebugResults([...results])

    // Step 4: Anti-bot Detection
    await new Promise((resolve) => setTimeout(resolve, 900))
    results.push({
      step: "Anti-bot Protection",
      status: "warning",
      message: "Cloudflare protection detected",
      details: "Site uses Cloudflare with challenge pages",
      suggestion: "Use residential proxies and realistic browser headers",
    })
    setDebugResults([...results])

    // Step 5: Data Structure Analysis
    await new Promise((resolve) => setTimeout(resolve, 1100))
    results.push({
      step: "Data Structure",
      status: "success",
      message: "Company data structure identified",
      details: "Data is in structured JSON-LD format",
      suggestion: "Use JSON-LD parser for more reliable extraction",
    })
    setDebugResults([...results])

    // Generate site analysis
    const analysis: SiteAnalysis = {
      url: debugUrl,
      accessible: true,
      hasRobotsTxt: true,
      requiresJS: true,
      hasAntiBot: true,
      structure: "Dynamic SPA with JSON-LD",
      dataFormat: "Structured Data + DOM elements",
      estimatedLeads: 0,
      recommendations: [
        "Enable JavaScript execution in scraper",
        "Implement 2-second delays between requests",
        "Use browser automation (Puppeteer/Selenium)",
        "Add realistic User-Agent and headers",
        "Consider using the site's API if available",
      ],
    }

    setSiteAnalysis(analysis)
    setIsAnalyzing(false)
  }

  const handleTestSelectors = () => {
    // Simulate selector testing
    const selectorResults = Object.entries(testSelectors)
      .map(([field, selector]) => {
        if (!selector) return null

        const isValid = Math.random() > 0.3 // Simulate some selectors working
        return {
          field,
          selector,
          status: isValid ? "success" : "error",
          result: isValid ? "Found 15 matches" : "No matches found",
          suggestion: isValid ? "Selector working correctly" : "Try a more specific selector",
        }
      })
      .filter(Boolean)

    console.log("Selector test results:", selectorResults)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <X className="h-4 w-4 text-red-600" />
      default:
        return <HelpCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "error":
        return "border-red-200 bg-red-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Scraping Debugger
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Diagnose why your scraping job returned zero leads and get actionable solutions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="debugUrl">Website URL to Analyze</Label>
            <div className="flex gap-2">
              <Input
                id="debugUrl"
                placeholder="https://example.com/companies"
                value={debugUrl}
                onChange={(e) => setDebugUrl(e.target.value)}
              />
              <Button onClick={handleAnalyzeSite} disabled={isAnalyzing || !debugUrl}>
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze Site
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Analysis Results */}
          {debugResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Diagnostic Results:</h3>
              {debugResults.map((result, index) => (
                <div key={index} className={`border rounded-lg p-3 ${getStatusColor(result.status)}`}>
                  <div className="flex items-start gap-3">
                    {getStatusIcon(result.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{result.step}</h4>
                        <Badge
                          variant={
                            result.status === "success"
                              ? "default"
                              : result.status === "warning"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {result.status}
                        </Badge>
                      </div>
                      <p className="text-sm mt-1">{result.message}</p>
                      {result.details && <p className="text-xs text-muted-foreground mt-1">{result.details}</p>}
                      {result.suggestion && (
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                          <strong>Suggestion:</strong> {result.suggestion}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Site Analysis Summary */}
          {siteAnalysis && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">Site Analysis Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Structure:</p>
                  <p className="font-medium">{siteAnalysis.structure}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Data Format:</p>
                  <p className="font-medium">{siteAnalysis.dataFormat}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">JavaScript Required:</p>
                  <p className="font-medium">{siteAnalysis.requiresJS ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Anti-bot Protection:</p>
                  <p className="font-medium">{siteAnalysis.hasAntiBot ? "Detected" : "None"}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Recommendations:</p>
                <ul className="text-sm space-y-1">
                  {siteAnalysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="common-issues" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="common-issues">Common Issues</TabsTrigger>
          <TabsTrigger value="selector-tester">Selector Tester</TabsTrigger>
          <TabsTrigger value="configuration">Configuration Fix</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
        </TabsList>

        <TabsContent value="common-issues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Scraping Issues & Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {commonIssues.map((issue, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-red-600 mb-2">{issue.issue}</h3>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Symptoms:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {issue.symptoms.map((symptom, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">Solutions:</p>
                      <ul className="text-sm space-y-1">
                        {issue.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selector-tester" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSS Selector Tester</CardTitle>
              <p className="text-sm text-muted-foreground">
                Test your CSS selectors to ensure they're correctly targeting the data
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companySelector">Company Name Selector</Label>
                  <Input
                    id="companySelector"
                    placeholder=".company-name, h1.title"
                    value={testSelectors.companyName}
                    onChange={(e) => setTestSelectors({ ...testSelectors, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="industrySelector">Industry Selector</Label>
                  <Input
                    id="industrySelector"
                    placeholder=".industry, [data-industry]"
                    value={testSelectors.industry}
                    onChange={(e) => setTestSelectors({ ...testSelectors, industry: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="locationSelector">Location Selector</Label>
                  <Input
                    id="locationSelector"
                    placeholder=".location, .address"
                    value={testSelectors.location}
                    onChange={(e) => setTestSelectors({ ...testSelectors, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="employeesSelector">Employee Count Selector</Label>
                  <Input
                    id="employeesSelector"
                    placeholder=".employees, .company-size"
                    value={testSelectors.employees}
                    onChange={(e) => setTestSelectors({ ...testSelectors, employees: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleTestSelectors} className="w-full">
                <Code className="h-4 w-4 mr-2" />
                Test Selectors
              </Button>

              <Alert>
                <Eye className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro Tip:</strong> Right-click on the element you want to scrape, select "Inspect", then
                  right-click on the highlighted HTML and choose "Copy selector" to get the exact CSS selector.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Configuration Fixes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-semibold text-blue-800 mb-2">Enable JavaScript Execution</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Many modern websites load content dynamically. Enable browser automation mode.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <Label className="text-sm font-medium">Scraping Strategy</Label>
                    <Select defaultValue="intelligent">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="intelligent">AI-Powered Intelligent Scraping</SelectItem>
                        <SelectItem value="browser">Browser Automation (Recommended)</SelectItem>
                        <SelectItem value="hybrid">Hybrid (AI + Browser)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-800 mb-2">Adjust Request Settings</h3>
                  <p className="text-sm text-green-700 mb-3">
                    Optimize request timing and headers to avoid being blocked.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm">Delay (ms)</Label>
                      <Input defaultValue="2000" />
                    </div>
                    <div>
                      <Label className="text-sm">Timeout (ms)</Label>
                      <Input defaultValue="30000" />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-semibold text-yellow-800 mb-2">User Agent & Headers</h3>
                  <p className="text-sm text-yellow-700 mb-3">Use realistic browser headers to avoid detection.</p>
                  <div>
                    <Label className="text-sm">User Agent</Label>
                    <Select defaultValue="chrome">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chrome">Chrome (Latest)</SelectItem>
                        <SelectItem value="firefox">Firefox (Latest)</SelectItem>
                        <SelectItem value="safari">Safari (Latest)</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alternative Data Sources</CardTitle>
              <p className="text-sm text-muted-foreground">
                If direct scraping isn't working, consider these alternative approaches
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4" />
                    API Integration
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Many websites offer APIs that provide structured data access
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Check for official APIs in website documentation</li>
                    <li>• Look for GraphQL endpoints</li>
                    <li>• Monitor network requests for API calls</li>
                    <li>• Contact the website for API access</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Database className="h-4 w-4" />
                    Third-Party Data Providers
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Professional data providers with pre-cleaned, structured data
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• ZoomInfo - B2B contact and company data</li>
                    <li>• Clearbit - Company enrichment and discovery</li>
                    <li>• Apollo - Sales intelligence platform</li>
                    <li>• LinkedIn Sales Navigator - Professional network data</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4" />
                    Hybrid Approach
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Combine multiple sources for comprehensive lead generation
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Use APIs for basic company info</li>
                    <li>• Scrape for specific details not in APIs</li>
                    <li>• Cross-reference multiple sources</li>
                    <li>• Enrich data with third-party services</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
