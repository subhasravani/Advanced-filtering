"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Download, Target, Users, DollarSign, Activity, Mail } from "lucide-react"

export default function ReportingDashboard() {
  const [timeRange, setTimeRange] = useState("30d")

  const metrics = {
    totalLeads: 15847,
    qualifiedLeads: 3421,
    conversionRate: 21.6,
    avgDealSize: 47500,
    pipelineValue: 2340000,
    activeCampaigns: 12,
  }

  const leadSources = [
    { name: "LinkedIn Scraping", leads: 5234, percentage: 33 },
    { name: "Company Websites", leads: 3892, percentage: 25 },
    { name: "Industry Directories", leads: 2847, percentage: 18 },
    { name: "API Integrations", leads: 2156, percentage: 14 },
    { name: "Manual Research", leads: 1718, percentage: 10 },
  ]

  const industryBreakdown = [
    { industry: "Technology", leads: 4234, qualified: 1156, rate: 27.3 },
    { industry: "Healthcare", leads: 3456, qualified: 892, rate: 25.8 },
    { industry: "Finance", leads: 2847, qualified: 634, rate: 22.3 },
    { industry: "Education", leads: 2156, qualified: 445, rate: 20.6 },
    { industry: "Retail", leads: 1892, qualified: 294, rate: 15.5 },
    { industry: "Energy", leads: 1262, qualified: 189, rate: 15.0 },
  ]

  const campaignPerformance = [
    {
      name: "Q1 Tech Outreach",
      leads: 1247,
      qualified: 342,
      contacted: 892,
      responded: 156,
      meetings: 89,
      deals: 23,
    },
    {
      name: "Healthcare AI Focus",
      leads: 892,
      qualified: 267,
      contacted: 634,
      responded: 134,
      meetings: 67,
      deals: 18,
    },
    {
      name: "SMB Expansion",
      leads: 1456,
      qualified: 234,
      contacted: 567,
      responded: 89,
      meetings: 34,
      deals: 12,
    },
  ]

  const exportReport = (type: string) => {
    console.log(`Exporting ${type} report`)
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
          <p className="text-muted-foreground">Comprehensive insights into your lead generation performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportReport("summary")}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Lead Sources</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                    <p className="text-2xl font-bold">{metrics.totalLeads.toLocaleString()}</p>
                  </div>
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Qualified</p>
                    <p className="text-2xl font-bold">{metrics.qualifiedLeads.toLocaleString()}</p>
                  </div>
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+8.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion</p>
                    <p className="text-2xl font-bold">{metrics.conversionRate}%</p>
                  </div>
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+2.1%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Deal</p>
                    <p className="text-2xl font-bold">${(metrics.avgDealSize / 1000).toFixed(0)}K</p>
                  </div>
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+15.7%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pipeline</p>
                    <p className="text-2xl font-bold">${(metrics.pipelineValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <Activity className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+23.4%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Campaigns</p>
                    <p className="text-2xl font-bold">{metrics.activeCampaigns}</p>
                  </div>
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Industry Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryBreakdown.map((item) => (
                  <div key={item.industry} className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-24 text-sm font-medium">{item.industry}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(item.leads / metrics.totalLeads) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground w-16">{item.leads}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{item.qualified} qualified</Badge>
                      <Badge className="bg-green-100 text-green-800">{item.rate}% rate</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources Performance</CardTitle>
              <p className="text-sm text-muted-foreground">
                Breakdown of leads by acquisition source and their performance metrics
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {leadSources.map((source) => (
                  <div key={source.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{source.name}</h3>
                      <Badge variant="outline">{source.percentage}% of total</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${source.percentage}%` }} />
                      </div>
                      <div className="text-sm font-medium w-20">{source.leads.toLocaleString()}</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Cost per Lead</p>
                        <p className="font-semibold">$12.50</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Qualification Rate</p>
                        <p className="font-semibold">23.4%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Quality Score</p>
                        <p className="font-semibold">78</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ROI</p>
                        <p className="font-semibold text-green-600">340%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Track the performance of your lead generation campaigns</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaignPerformance.map((campaign) => (
                  <div key={campaign.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline">{campaign.leads} leads</Badge>
                        <Badge className="bg-green-100 text-green-800">{campaign.deals} deals</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Qualified</p>
                        <p className="text-lg font-semibold">{campaign.qualified}</p>
                        <p className="text-xs text-green-600">
                          {((campaign.qualified / campaign.leads) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Contacted</p>
                        <p className="text-lg font-semibold">{campaign.contacted}</p>
                        <p className="text-xs text-blue-600">
                          {((campaign.contacted / campaign.qualified) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Responded</p>
                        <p className="text-lg font-semibold">{campaign.responded}</p>
                        <p className="text-xs text-purple-600">
                          {((campaign.responded / campaign.contacted) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Meetings</p>
                        <p className="text-lg font-semibold">{campaign.meetings}</p>
                        <p className="text-xs text-orange-600">
                          {((campaign.meetings / campaign.responded) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Deals</p>
                        <p className="text-lg font-semibold">{campaign.deals}</p>
                        <p className="text-xs text-red-600">
                          {((campaign.deals / campaign.meetings) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">ROI</p>
                        <p className="text-lg font-semibold">245%</p>
                        <p className="text-xs text-green-600">+12% vs target</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track leads through your conversion funnel and identify optimization opportunities
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { stage: "Raw Leads", count: 15847, percentage: 100, color: "bg-blue-500" },
                  { stage: "Qualified Leads", count: 3421, percentage: 21.6, color: "bg-green-500" },
                  { stage: "Contacted", count: 2156, percentage: 13.6, color: "bg-yellow-500" },
                  { stage: "Responded", count: 892, percentage: 5.6, color: "bg-orange-500" },
                  { stage: "Meetings Scheduled", count: 445, percentage: 2.8, color: "bg-purple-500" },
                  { stage: "Proposals Sent", count: 234, percentage: 1.5, color: "bg-pink-500" },
                  { stage: "Closed Deals", count: 89, percentage: 0.6, color: "bg-red-500" },
                ].map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{stage.stage}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{stage.count.toLocaleString()}</span>
                        <Badge variant="outline">{stage.percentage.toFixed(1)}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 relative">
                      <div
                        className={`${stage.color} h-4 rounded-full transition-all duration-500`}
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                    {index < 6 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Drop-off: {((1 - stage.percentage / 100) * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversion Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lead to Qualified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">21.6%</div>
                <p className="text-sm text-muted-foreground">3,421 of 15,847 leads</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+2.3% vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Qualified to Meeting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">13.0%</div>
                <p className="text-sm text-muted-foreground">445 of 3,421 qualified</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+1.8% vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meeting to Close</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">20.0%</div>
                <p className="text-sm text-muted-foreground">89 of 445 meetings</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+4.2% vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
