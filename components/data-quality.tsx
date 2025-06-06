"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Merge,
  Database,
  Search,
  Filter,
  TrendingUp,
} from "lucide-react"

interface DataQualityIssue {
  id: string
  type: "duplicate" | "incomplete" | "invalid" | "outdated"
  severity: "high" | "medium" | "low"
  description: string
  affectedRecords: number
  autoFixable: boolean
}

interface DuplicateGroup {
  id: string
  leads: Array<{
    id: string
    companyName: string
    similarity: number
    source: string
    lastUpdated: Date
  }>
  suggestedMaster: string
}

export default function DataQuality() {
  const [qualityIssues] = useState<DataQualityIssue[]>([
    {
      id: "1",
      type: "duplicate",
      severity: "high",
      description: "147 potential duplicate companies found",
      affectedRecords: 147,
      autoFixable: true,
    },
    {
      id: "2",
      type: "incomplete",
      severity: "medium",
      description: "Missing revenue data for 89 companies",
      affectedRecords: 89,
      autoFixable: false,
    },
    {
      id: "3",
      type: "invalid",
      severity: "high",
      description: "23 companies with invalid email formats",
      affectedRecords: 23,
      autoFixable: true,
    },
    {
      id: "4",
      type: "outdated",
      severity: "low",
      description: "312 companies not updated in 90+ days",
      affectedRecords: 312,
      autoFixable: false,
    },
  ])

  const [duplicateGroups] = useState<DuplicateGroup[]>([
    {
      id: "1",
      leads: [
        {
          id: "1",
          companyName: "TechCorp Solutions",
          similarity: 100,
          source: "LinkedIn Scraper",
          lastUpdated: new Date("2024-01-15"),
        },
        {
          id: "2",
          companyName: "TechCorp Solutions Inc.",
          similarity: 95,
          source: "Company Database",
          lastUpdated: new Date("2024-01-10"),
        },
        {
          id: "3",
          companyName: "Tech Corp Solutions",
          similarity: 90,
          source: "Manual Entry",
          lastUpdated: new Date("2024-01-05"),
        },
      ],
      suggestedMaster: "1",
    },
    {
      id: "2",
      leads: [
        {
          id: "4",
          companyName: "HealthTech Dynamics",
          similarity: 100,
          source: "Web Scraper",
          lastUpdated: new Date("2024-01-16"),
        },
        {
          id: "5",
          companyName: "Health Tech Dynamics LLC",
          similarity: 88,
          source: "API Import",
          lastUpdated: new Date("2024-01-12"),
        },
      ],
      suggestedMaster: "4",
    },
  ])

  const [enrichmentProgress, setEnrichmentProgress] = useState(0)
  const [isEnriching, setIsEnriching] = useState(false)

  const handleAutoFix = (issueId: string) => {
    console.log(`Auto-fixing issue ${issueId}`)
  }

  const handleMergeDuplicates = (groupId: string, masterId: string) => {
    console.log(`Merging duplicates in group ${groupId} with master ${masterId}`)
  }

  const handleEnrichData = () => {
    setIsEnriching(true)
    setEnrichmentProgress(0)

    const interval = setInterval(() => {
      setEnrichmentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsEnriching(false)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 500)
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "duplicate":
        return <Merge className="h-4 w-4" />
      case "incomplete":
        return <AlertTriangle className="h-4 w-4" />
      case "invalid":
        return <AlertTriangle className="h-4 w-4" />
      case "outdated":
        return <RefreshCw className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "duplicate":
        return "bg-purple-100 text-purple-800"
      case "incomplete":
        return "bg-orange-100 text-orange-800"
      case "invalid":
        return "bg-red-100 text-red-800"
      case "outdated":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
          <TabsTrigger value="enrichment">Enrichment</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quality Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Data Quality Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-4xl font-bold text-green-600">87%</div>
                  <p className="text-sm text-muted-foreground">Overall quality score</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">15,847 records</div>
                  <p className="text-sm text-muted-foreground">Total leads in database</p>
                </div>
              </div>
              <Progress value={87} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">Quality improved by 12% this month</p>
            </CardContent>
          </Card>

          {/* Quality Issues */}
          <Card>
            <CardHeader>
              <CardTitle>Data Quality Issues</CardTitle>
              <p className="text-sm text-muted-foreground">
                Identified issues that may affect lead quality and conversion rates
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityIssues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getIssueIcon(issue.type)}
                        <div>
                          <h3 className="font-semibold">{issue.description}</h3>
                          <p className="text-sm text-muted-foreground">{issue.affectedRecords} records affected</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(issue.severity)}>{issue.severity} priority</Badge>
                        <Badge className={getTypeColor(issue.type)}>{issue.type}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {issue.autoFixable ? (
                        <Button size="sm" onClick={() => handleAutoFix(issue.id)}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Auto Fix
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Search className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duplicates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Duplicate Detection & Merging</CardTitle>
              <p className="text-sm text-muted-foreground">
                Review and merge duplicate company records to maintain data integrity
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {duplicateGroups.map((group) => (
                  <div key={group.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Duplicate Group #{group.id}</h3>
                      <Badge variant="outline">{group.leads.length} records</Badge>
                    </div>

                    <div className="space-y-3">
                      {group.leads.map((lead) => (
                        <div
                          key={lead.id}
                          className={`p-3 rounded border-2 ${
                            lead.id === group.suggestedMaster ? "border-green-200 bg-green-50" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{lead.companyName}</h4>
                              <p className="text-sm text-muted-foreground">
                                Source: {lead.source} • Updated: {lead.lastUpdated.toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{lead.similarity}% match</Badge>
                              {lead.id === group.suggestedMaster && (
                                <Badge className="bg-green-100 text-green-800">Suggested Master</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleMergeDuplicates(group.id, group.suggestedMaster)}>
                        <Merge className="h-3 w-3 mr-1" />
                        Merge Records
                      </Button>
                      <Button size="sm" variant="outline">
                        <Filter className="h-3 w-3 mr-1" />
                        Review Manually
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Mark as Not Duplicate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrichment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Data Enrichment
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Enhance lead data with additional information from external sources
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Enrichment Sources</Label>
                  <div className="space-y-2">
                    {[
                      { name: "Clearbit", status: "connected", fields: "Company info, logos, social" },
                      { name: "ZoomInfo", status: "connected", fields: "Contact details, revenue" },
                      { name: "LinkedIn Sales Navigator", status: "disconnected", fields: "Employee data" },
                      { name: "Crunchbase", status: "connected", fields: "Funding, investors" },
                    ].map((source) => (
                      <div key={source.name} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">{source.name}</h4>
                          <p className="text-xs text-muted-foreground">{source.fields}</p>
                        </div>
                        <Badge
                          className={
                            source.status === "connected" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {source.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-3 block">Enrichment Settings</Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Auto-enrich new leads</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                          <SelectItem value="manual">Manual approval</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm">Enrichment frequency</Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm">Batch size</Label>
                      <Input type="number" defaultValue="100" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button onClick={handleEnrichData} disabled={isEnriching} className="w-full">
                  <Database className={`h-4 w-4 mr-2 ${isEnriching ? "animate-pulse" : ""}`} />
                  {isEnriching ? "Enriching Data..." : "Start Data Enrichment"}
                </Button>

                {isEnriching && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Enriching lead data...</span>
                      <span>{Math.round(enrichmentProgress)}%</span>
                    </div>
                    <Progress value={enrichmentProgress} className="h-2" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-sm text-muted-foreground">Records enriched</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-sm text-muted-foreground">Success rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">$0.12</div>
                  <p className="text-sm text-muted-foreground">Avg cost per record</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Validation Rules</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure validation rules to maintain data quality standards
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    field: "Email",
                    rule: "Valid email format",
                    status: "active",
                    violations: 23,
                  },
                  {
                    field: "Phone",
                    rule: "Valid phone number format",
                    status: "active",
                    violations: 12,
                  },
                  {
                    field: "Website",
                    rule: "Valid URL format",
                    status: "active",
                    violations: 8,
                  },
                  {
                    field: "Revenue",
                    rule: "Numeric value > 0",
                    status: "active",
                    violations: 45,
                  },
                  {
                    field: "Employee Count",
                    rule: "Integer value >= 1",
                    status: "active",
                    violations: 3,
                  },
                ].map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">{rule.field}</h4>
                      <p className="text-sm text-muted-foreground">{rule.rule}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {rule.violations > 0 && <Badge variant="destructive">{rule.violations} violations</Badge>}
                      <Badge className="bg-green-100 text-green-800">{rule.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full" variant="outline">
                + Add New Validation Rule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
