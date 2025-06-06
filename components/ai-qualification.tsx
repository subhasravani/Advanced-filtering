"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Zap,
  Target,
  TrendingUp,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
} from "lucide-react"

interface QualificationCriteria {
  id: string
  name: string
  weight: number
  enabled: boolean
  description: string
}

interface LeadScore {
  leadId: string
  companyName: string
  overallScore: number
  criteriaScores: { [key: string]: number }
  reasoning: string
  priority: "high" | "medium" | "low"
  recommendations: string[]
}

export default function AIQualification() {
  const [criteria, setCriteria] = useState<QualificationCriteria[]>([
    {
      id: "company_size",
      name: "Company Size",
      weight: 25,
      enabled: true,
      description: "Employee count and organizational structure",
    },
    {
      id: "revenue",
      name: "Revenue Potential",
      weight: 30,
      enabled: true,
      description: "Annual revenue and growth indicators",
    },
    {
      id: "technology_fit",
      name: "Technology Fit",
      weight: 20,
      enabled: true,
      description: "Technology stack alignment with our solutions",
    },
    {
      id: "market_presence",
      name: "Market Presence",
      weight: 15,
      enabled: true,
      description: "Industry reputation and market position",
    },
    {
      id: "growth_stage",
      name: "Growth Stage",
      weight: 10,
      enabled: true,
      description: "Company maturity and expansion phase",
    },
  ])

  const [leadScores, setLeadScores] = useState<LeadScore[]>([
    {
      leadId: "1",
      companyName: "TechCorp Solutions",
      overallScore: 85,
      criteriaScores: {
        company_size: 80,
        revenue: 90,
        technology_fit: 95,
        market_presence: 75,
        growth_stage: 85,
      },
      reasoning:
        "High-potential lead with strong technology alignment. Large enterprise with significant revenue and proven market presence. AI/ML focus matches our solutions perfectly.",
      priority: "high",
      recommendations: [
        "Schedule executive-level meeting",
        "Prepare AI/ML case studies",
        "Highlight enterprise scalability",
      ],
    },
    {
      leadId: "2",
      companyName: "HealthTech Dynamics",
      overallScore: 91,
      criteriaScores: {
        company_size: 85,
        revenue: 95,
        technology_fit: 90,
        market_presence: 90,
        growth_stage: 95,
      },
      reasoning:
        "Exceptional lead with highest qualification score. Healthcare tech leader with strong growth trajectory and perfect technology fit for our AI diagnostic solutions.",
      priority: "high",
      recommendations: [
        "Priority outreach within 24 hours",
        "Healthcare-specific demo preparation",
        "Compliance documentation ready",
      ],
    },
    {
      leadId: "3",
      companyName: "EduLearn Platform",
      overallScore: 68,
      criteriaScores: {
        company_size: 45,
        revenue: 60,
        technology_fit: 85,
        market_presence: 55,
        growth_stage: 95,
      },
      reasoning:
        "Moderate potential with excellent growth stage and technology fit. Smaller company but high growth potential in EdTech sector. May need nurturing approach.",
      priority: "medium",
      recommendations: ["Add to nurturing campaign", "Share EdTech success stories", "Monitor growth milestones"],
    },
  ])

  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)

  const handleRequalifyAll = () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          // Simulate score updates
          setLeadScores((scores) =>
            scores.map((score) => ({
              ...score,
              overallScore: Math.max(0, Math.min(100, score.overallScore + (Math.random() - 0.5) * 10)),
            })),
          )
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)
  }

  const updateCriteriaWeight = (criteriaId: string, weight: number) => {
    setCriteria(criteria.map((c) => (c.id === criteriaId ? { ...c, weight } : c)))
  }

  const toggleCriteria = (criteriaId: string) => {
    setCriteria(criteria.map((c) => (c.id === criteriaId ? { ...c, enabled: !c.enabled } : c)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Clock className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scores" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scores">Lead Scores</TabsTrigger>
          <TabsTrigger value="criteria">Criteria Setup</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="training">AI Training</TabsTrigger>
        </TabsList>

        <TabsContent value="scores" className="space-y-6">
          {/* AI Processing Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Qualification Engine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {leadScores.length} leads analyzed • Last updated 5 minutes ago
                  </p>
                </div>
                <Button onClick={handleRequalifyAll} disabled={isProcessing}>
                  <Zap className={`h-4 w-4 mr-2 ${isProcessing ? "animate-pulse" : ""}`} />
                  {isProcessing ? "Processing..." : "Requalify All"}
                </Button>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI processing leads...</span>
                    <span>{Math.round(processingProgress)}%</span>
                  </div>
                  <Progress value={processingProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lead Scores */}
          <div className="space-y-4">
            {leadScores
              .sort((a, b) => b.overallScore - a.overallScore)
              .map((lead) => (
                <Card key={lead.leadId} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          {lead.companyName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getPriorityColor(lead.priority)}>
                            {getPriorityIcon(lead.priority)}
                            <span className="ml-1">{lead.priority} priority</span>
                          </Badge>
                          <Badge variant="outline">
                            <Star className="h-3 w-3 mr-1" />
                            {lead.overallScore}% qualified
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(lead.overallScore)}`}>
                          {lead.overallScore}
                        </div>
                        <p className="text-sm text-muted-foreground">Overall Score</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label className="text-sm font-semibold mb-2 block">Criteria Breakdown</Label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {Object.entries(lead.criteriaScores).map(([criteriaId, score]) => {
                          const criteriaName = criteria.find((c) => c.id === criteriaId)?.name || criteriaId
                          return (
                            <div key={criteriaId} className="text-center">
                              <div className={`text-lg font-semibold ${getScoreColor(score)}`}>{score}</div>
                              <p className="text-xs text-muted-foreground">{criteriaName}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label className="text-sm font-semibold mb-2 block">AI Reasoning</Label>
                      <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">{lead.reasoning}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Recommended Actions</Label>
                      <div className="flex flex-wrap gap-2">
                        {lead.recommendations.map((rec, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {rec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="criteria" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Qualification Criteria Configuration</CardTitle>
              <p className="text-sm text-muted-foreground">Customize the AI qualification criteria and their weights</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {criteria.map((criterion) => (
                <div key={criterion.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={criterion.enabled}
                        onChange={() => toggleCriteria(criterion.id)}
                        className="rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{criterion.name}</h3>
                        <p className="text-sm text-muted-foreground">{criterion.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{criterion.weight}% weight</Badge>
                  </div>

                  {criterion.enabled && (
                    <div className="space-y-2">
                      <Label className="text-sm">Weight ({criterion.weight}%)</Label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={criterion.weight}
                        onChange={(e) => updateCriteriaWeight(criterion.id, Number.parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              ))}

              <Button className="w-full">Save Criteria Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">High Priority Leads</p>
                    <p className="text-3xl font-bold">{leadScores.filter((lead) => lead.priority === "high").length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                    <p className="text-3xl font-bold">
                      {Math.round(leadScores.reduce((sum, lead) => sum + lead.overallScore, 0) / leadScores.length)}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Qualified Rate</p>
                    <p className="text-3xl font-bold">
                      {Math.round(
                        (leadScores.filter((lead) => lead.overallScore >= 70).length / leadScores.length) * 100,
                      )}
                      %
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { range: "90-100", count: 1, color: "bg-green-500" },
                  { range: "80-89", count: 1, color: "bg-green-400" },
                  { range: "70-79", count: 0, color: "bg-yellow-400" },
                  { range: "60-69", count: 1, color: "bg-yellow-500" },
                  { range: "Below 60", count: 0, color: "bg-red-400" },
                ].map((bucket) => (
                  <div key={bucket.range} className="flex items-center gap-4">
                    <div className="w-20 text-sm">{bucket.range}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                      <div
                        className={`${bucket.color} h-4 rounded-full`}
                        style={{ width: `${(bucket.count / leadScores.length) * 100}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm text-right">{bucket.count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                AI Model Training
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Improve qualification accuracy by training the AI with your feedback
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-semibold mb-2 block">Training Data</Label>
                <Textarea
                  placeholder="Provide examples of ideal customer profiles, successful deals, or qualification criteria..."
                  rows={4}
                />
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Industry Focus</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary industry focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Deal Size Preference</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Minimum Deal Size ($)</Label>
                    <Input type="number" placeholder="10000" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Target Deal Size ($)</Label>
                    <Input type="number" placeholder="50000" />
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Retrain AI Model
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
