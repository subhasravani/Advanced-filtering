"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, Filter, Zap, BarChart3, Settings } from "lucide-react"
import ScrapingEngine from "./scraping-engine"
import AdvancedFilters from "./advanced-filters"
import CRMIntegration from "./crm-integration"
import AIQualification from "./ai-qualification"
import DataQuality from "./data-quality"
import ReportingDashboard from "./reporting-dashboard"

export default function LeadGenerationDashboard() {
  const [activeTab, setActiveTab] = useState("scraping")
  const [stats] = useState({
    totalLeads: 15847,
    qualifiedLeads: 3421,
    crmSynced: 2156,
    activeFilters: 7,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Lead Generation Platform</h1>
          <p className="text-muted-foreground text-lg">AI-powered lead scraping, qualification, and CRM integration</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                  <p className="text-3xl font-bold">{stats.totalLeads.toLocaleString()}</p>
                </div>
                <Database className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">AI Qualified</p>
                  <p className="text-3xl font-bold">{stats.qualifiedLeads.toLocaleString()}</p>
                  <Badge variant="secondary" className="mt-1">
                    {Math.round((stats.qualifiedLeads / stats.totalLeads) * 100)}% qualified
                  </Badge>
                </div>
                <Zap className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CRM Synced</p>
                  <p className="text-3xl font-bold">{stats.crmSynced.toLocaleString()}</p>
                  <Badge variant="outline" className="mt-1">
                    {Math.round((stats.crmSynced / stats.qualifiedLeads) * 100)}% synced
                  </Badge>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Filters</p>
                  <p className="text-3xl font-bold">{stats.activeFilters}</p>
                  <Badge variant="destructive" className="mt-1">
                    High precision
                  </Badge>
                </div>
                <Filter className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="scraping" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Scraping
            </TabsTrigger>
            <TabsTrigger value="filters" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              AI Qualification
            </TabsTrigger>
            <TabsTrigger value="crm" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              CRM Integration
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Data Quality
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scraping">
            <ScrapingEngine />
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
