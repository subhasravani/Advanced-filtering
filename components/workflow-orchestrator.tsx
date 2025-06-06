"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  CheckCircle,
  Clock,
  ArrowRight,
  Database,
  Filter,
  Brain,
  FolderSyncIcon as Sync,
  Shield,
  BarChart3,
  AlertTriangle,
  Zap,
} from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  status: "pending" | "running" | "completed" | "failed"
  progress: number
  duration?: number
  results?: any
}

interface WorkflowExecution {
  id: string
  name: string
  status: "running" | "completed" | "failed"
  currentStep: number
  steps: WorkflowStep[]
  startTime: Date
  totalLeads: number
  qualifiedLeads: number
  syncedLeads: number
}

export default function WorkflowOrchestrator() {
  const [workflows, setWorkflows] = useState<WorkflowExecution[]>([])
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)

  const createWorkflow = () => {
    const newWorkflow: WorkflowExecution = {
      id: Date.now().toString(),
      name: "Healthcare AI Prospects - Complete Pipeline",
      status: "running",
      currentStep: 0,
      startTime: new Date(),
      totalLeads: 0,
      qualifiedLeads: 0,
      syncedLeads: 0,
      steps: [
        {
          id: "scraping",
          name: "Web Scraping",
          status: "running",
          progress: 0,
          results: null,
        },
        {
          id: "filtering",
          name: "Advanced Filtering",
          status: "pending",
          progress: 0,
          results: null,
        },
        {
          id: "qualification",
          name: "AI Qualification",
          status: "pending",
          progress: 0,
          results: null,
        },
        {
          id: "crm_sync",
          name: "CRM Integration",
          status: "pending",
          progress: 0,
          results: null,
        },
        {
          id: "quality_check",
          name: "Data Quality Check",
          status: "pending",
          progress: 0,
          results: null,
        },
        {
          id: "reporting",
          name: "Report Generation",
          status: "pending",
          progress: 0,
          results: null,
        },
      ],
    }

    setWorkflows([newWorkflow, ...workflows])
    setSelectedWorkflow(newWorkflow.id)
    simulateWorkflow(newWorkflow.id)
  }

  const simulateWorkflow = async (workflowId: string) => {
    const stepDurations = [15000, 8000, 12000, 6000, 5000, 3000] // Duration for each step in ms
    const stepResults = [
      { totalLeads: 2847, filteredLeads: 2847, sources: ["LinkedIn", "Company Websites", "Industry Directories"] },
      {
        filteredLeads: 1234,
        removedLeads: 1613,
        appliedFilters: ["Healthcare Industry", "100+ Employees", "$5M+ Revenue"],
      },
      { qualifiedLeads: 342, highPriority: 89, mediumPriority: 156, lowPriority: 97 },
      { syncedLeads: 298, salesforce: 189, hubspot: 109, failedSync: 44 },
      { qualityScore: 94, duplicatesFound: 23, missingData: 12, enrichedRecords: 267 },
      { reportsGenerated: 5, dashboardUpdated: true, alertsSent: 3 },
    ]

    for (let stepIndex = 0; stepIndex < 6; stepIndex++) {
      // Update current step to running
      setWorkflows((prev) =>
        prev.map((workflow) => {
          if (workflow.id === workflowId) {
            const updatedSteps = [...workflow.steps]
            updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], status: "running" }
            return { ...workflow, currentStep: stepIndex, steps: updatedSteps }
          }
          return workflow
        }),
      )

      // Simulate step progress
      const duration = stepDurations[stepIndex]
      const progressInterval = setInterval(() => {
        setWorkflows((prev) =>
          prev.map((workflow) => {
            if (workflow.id === workflowId) {
              const updatedSteps = [...workflow.steps]
              const currentProgress = updatedSteps[stepIndex].progress
              if (currentProgress < 100) {
                updatedSteps[stepIndex] = {
                  ...updatedSteps[stepIndex],
                  progress: Math.min(currentProgress + Math.random() * 15, 100),
                }
                return { ...workflow, steps: updatedSteps }
              }
            }
            return workflow
          }),
        )
      }, 500)

      // Wait for step completion
      await new Promise((resolve) => setTimeout(resolve, duration))
      clearInterval(progressInterval)

      // Mark step as completed and update results
      setWorkflows((prev) =>
        prev.map((workflow) => {
          if (workflow.id === workflowId) {
            const updatedSteps = [...workflow.steps]
            updatedSteps[stepIndex] = {
              ...updatedSteps[stepIndex],
              status: "completed",
              progress: 100,
              duration: duration / 1000,
              results: stepResults[stepIndex],
            }

            // Update workflow totals based on step results
            const updates: any = { steps: updatedSteps }
            if (stepIndex === 0) updates.totalLeads = stepResults[stepIndex].totalLeads
            if (stepIndex === 2) updates.qualifiedLeads = stepResults[stepIndex].qualifiedLeads
            if (stepIndex === 3) updates.syncedLeads = stepResults[stepIndex].syncedLeads

            return { ...workflow, ...updates }
          }
          return workflow
        }),
      )

      // Prepare next step
      if (stepIndex < 5) {
        setWorkflows((prev) =>
          prev.map((workflow) => {
            if (workflow.id === workflowId) {
              const updatedSteps = [...workflow.steps]
              updatedSteps[stepIndex + 1] = { ...updatedSteps[stepIndex + 1], status: "pending" }
              return { ...workflow, steps: updatedSteps }
            }
            return workflow
          }),
        )
      }
    }

    // Mark workflow as completed
    setWorkflows((prev) =>
      prev.map((workflow) => {
        if (workflow.id === workflowId) {
          return { ...workflow, status: "completed" }
        }
        return workflow
      }),
    )
  }

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case "scraping":
        return <Database className="h-4 w-4" />
      case "filtering":
        return <Filter className="h-4 w-4" />
      case "qualification":
        return <Brain className="h-4 w-4" />
      case "crm_sync":
        return <Sync className="h-4 w-4" />
      case "quality_check":
        return <Shield className="h-4 w-4" />
      case "reporting":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "running":
        return "text-blue-600"
      case "failed":
        return "text-red-600"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const selectedWorkflowData = workflows.find((w) => w.id === selectedWorkflow)

  return (
    <div className="space-y-6">
      {/* Workflow Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Complete Lead Generation Workflow
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            End-to-end pipeline: Scraping → Filtering → AI Qualification → CRM Sync → Quality Check → Reporting
          </p>
        </CardHeader>
        <CardContent>
          <Button onClick={createWorkflow} className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Start Complete Workflow
          </Button>
        </CardContent>
      </Card>

      {/* Workflow Executions */}
      {workflows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedWorkflow === workflow.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedWorkflow(workflow.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <p className="text-sm text-muted-foreground">Started {workflow.startTime.toLocaleTimeString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(workflow.status)}
                      <Badge variant="outline">Step {workflow.currentStep + 1}/6</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Leads</p>
                      <p className="font-semibold">{workflow.totalLeads.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Qualified</p>
                      <p className="font-semibold">{workflow.qualifiedLeads.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Synced to CRM</p>
                      <p className="font-semibold">{workflow.syncedLeads.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Workflow View */}
      {selectedWorkflowData && (
        <Card>
          <CardHeader>
            <CardTitle>Workflow Details - {selectedWorkflowData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pipeline" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
                <TabsTrigger value="results">Step Results</TabsTrigger>
                <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="pipeline" className="space-y-6">
                <div className="space-y-4">
                  {selectedWorkflowData.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          step.status === "completed"
                            ? "border-green-500 bg-green-50"
                            : step.status === "running"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        <div className={getStatusColor(step.status)}>{getStepIcon(step.id)}</div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{step.name}</h3>
                          <div className="flex items-center gap-2">
                            {step.duration && (
                              <Badge variant="outline" className="text-xs">
                                {step.duration}s
                              </Badge>
                            )}
                            <Badge
                              className={
                                step.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : step.status === "running"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {step.status}
                            </Badge>
                          </div>
                        </div>

                        {step.status === "running" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{Math.round(step.progress)}%</span>
                            </div>
                            <Progress value={step.progress} className="h-2" />
                          </div>
                        )}

                        {step.results && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            {step.id === "scraping" && (
                              <p>
                                Extracted {step.results.totalLeads} leads from {step.results.sources.length} sources
                              </p>
                            )}
                            {step.id === "filtering" && (
                              <p>
                                Filtered to {step.results.filteredLeads} leads (removed {step.results.removedLeads})
                              </p>
                            )}
                            {step.id === "qualification" && (
                              <p>
                                Qualified {step.results.qualifiedLeads} leads: {step.results.highPriority} high priority
                              </p>
                            )}
                            {step.id === "crm_sync" && <p>Synced {step.results.syncedLeads} leads to CRM systems</p>}
                            {step.id === "quality_check" && (
                              <p>
                                Quality score: {step.results.qualityScore}% - Enriched {step.results.enrichedRecords}{" "}
                                records
                              </p>
                            )}
                            {step.id === "reporting" && (
                              <p>Generated {step.results.reportsGenerated} reports and updated dashboard</p>
                            )}
                          </div>
                        )}
                      </div>

                      {index < selectedWorkflowData.steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedWorkflowData.steps
                    .filter((step) => step.results)
                    .map((step) => (
                      <Card key={step.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {getStepIcon(step.id)}
                            {step.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {step.id === "scraping" && step.results && (
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Total Leads Extracted</span>
                                <span className="font-semibold">{step.results.totalLeads}</span>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Data Sources:</p>
                                <div className="flex flex-wrap gap-1">
                                  {step.results.sources.map((source: string) => (
                                    <Badge key={source} variant="outline" className="text-xs">
                                      {source}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {step.id === "filtering" && step.results && (
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Filtered Leads</span>
                                <span className="font-semibold">{step.results.filteredLeads}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Removed Leads</span>
                                <span className="font-semibold text-red-600">{step.results.removedLeads}</span>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Applied Filters:</p>
                                <div className="flex flex-wrap gap-1">
                                  {step.results.appliedFilters.map((filter: string) => (
                                    <Badge key={filter} variant="outline" className="text-xs">
                                      {filter}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {step.id === "qualification" && step.results && (
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Total Qualified</span>
                                <span className="font-semibold">{step.results.qualifiedLeads}</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>High Priority</span>
                                  <span className="font-semibold text-red-600">{step.results.highPriority}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Medium Priority</span>
                                  <span className="font-semibold text-yellow-600">{step.results.mediumPriority}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Low Priority</span>
                                  <span className="font-semibold text-green-600">{step.results.lowPriority}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {step.id === "crm_sync" && step.results && (
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Successfully Synced</span>
                                <span className="font-semibold text-green-600">{step.results.syncedLeads}</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Salesforce</span>
                                  <span className="font-semibold">{step.results.salesforce}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>HubSpot</span>
                                  <span className="font-semibold">{step.results.hubspot}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Failed Sync</span>
                                  <span className="font-semibold text-red-600">{step.results.failedSync}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {step.id === "quality_check" && step.results && (
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Quality Score</span>
                                <span className="font-semibold text-green-600">{step.results.qualityScore}%</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Duplicates Found</span>
                                  <span className="font-semibold text-yellow-600">{step.results.duplicatesFound}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Missing Data</span>
                                  <span className="font-semibold text-red-600">{step.results.missingData}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Enriched Records</span>
                                  <span className="font-semibold text-green-600">{step.results.enrichedRecords}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {step.id === "reporting" && step.results && (
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Reports Generated</span>
                                <span className="font-semibold">{step.results.reportsGenerated}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Dashboard Updated</span>
                                <span className="font-semibold text-green-600">
                                  {step.results.dashboardUpdated ? "Yes" : "No"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Alerts Sent</span>
                                <span className="font-semibold">{step.results.alertsSent}</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                          <p className="text-3xl font-bold">
                            {selectedWorkflowData.totalLeads > 0
                              ? Math.round(
                                  (selectedWorkflowData.qualifiedLeads / selectedWorkflowData.totalLeads) * 100,
                                )
                              : 0}
                            %
                          </p>
                        </div>
                        <Filter className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Sync Success Rate</p>
                          <p className="text-3xl font-bold">
                            {selectedWorkflowData.qualifiedLeads > 0
                              ? Math.round(
                                  (selectedWorkflowData.syncedLeads / selectedWorkflowData.qualifiedLeads) * 100,
                                )
                              : 0}
                            %
                          </p>
                        </div>
                        <Sync className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Processing Time</p>
                          <p className="text-3xl font-bold">
                            {selectedWorkflowData.steps
                              .filter((s) => s.duration)
                              .reduce((sum, s) => sum + (s.duration || 0), 0)
                              .toFixed(0)}
                            s
                          </p>
                        </div>
                        <Clock className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Step Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedWorkflowData.steps
                        .filter((s) => s.duration)
                        .map((step) => (
                          <div key={step.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getStepIcon(step.id)}
                              <span className="font-medium">{step.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">{step.duration}s</span>
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{
                                    width: `${((step.duration || 0) / Math.max(...selectedWorkflowData.steps.map((s) => s.duration || 0))) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
