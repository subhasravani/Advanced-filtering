"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Workflow, Filter, Zap, Activity, Shield, BarChart3 } from "lucide-react"
import SmartScrapingEngine from "./smart-scraping-engine"
import AdvancedFilters from "./advanced-filters"
import CRMIntegration from "./crm-integration"
import AIQualification from "./ai-qualification"
import DataQuality from "./data-quality"
import ReportingDashboard from "./reporting-dashboard"
import WorkflowOrchestrator from "./workflow-orchestrator"

export default function LeadGenerationDashboard() {
  const [activeTab, setActiveTab] = useState("smart-scraping")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Lead Generation Platform
          </h1>
          <p className="text-muted-foreground text-lg">
            Just enter a website URL - our AI handles everything automatically
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white shadow-sm">
            <TabsTrigger value="smart-scraping" className="flex items-center gap-2 py-3">
              <Brain className="h-4 w-4" />
              AI Extraction
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center gap-2 py-3">
              <Workflow className="h-4 w-4" />
              Workflow
            </TabsTrigger>
            <TabsTrigger value="filters" className="flex items-center gap-2 py-3">
              <Filter className="h-4 w-4" />
              Filters
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 py-3">
              <Zap className="h-4 w-4" />
              AI Qualification
            </TabsTrigger>
            <TabsTrigger value="crm" className="flex items-center gap-2 py-3">
              <Activity className="h-4 w-4" />
              CRM Integration
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center gap-2 py-3">
              <Shield className="h-4 w-4" />
              Data Quality
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 py-3">
              <BarChart3 className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="smart-scraping">
            <SmartScrapingEngine />
          </TabsContent>

          <TabsContent value="workflow">
            <WorkflowOrchestrator />
          </TabsContent>

          <TabsContent value="filters">
            <AdvancedFilters />
          </TabsContent>

          <TabsContent value="ai">
            <AIQualification />
          </TabsContent>

          <TabsContent value="crm">
            <CRMIntegration />
          </TabsContent>

          <TabsContent value="quality">
            <DataQuality />
          </TabsContent>

          <TabsContent value="reports">
            <ReportingDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
