"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Zap, CheckCircle, AlertCircle, FolderSyncIcon as Sync, Upload, Download } from "lucide-react"

interface CRMConnection {
  id: string
  name: string
  logo: string
  status: "connected" | "disconnected" | "syncing" | "error"
  lastSync: Date
  leadsCount: number
  apiKey?: string
}

interface SyncRule {
  id: string
  name: string
  condition: string
  action: string
  enabled: boolean
}

export default function CRMIntegration() {
  const [connections, setConnections] = useState<CRMConnection[]>([
    {
      id: "salesforce",
      name: "Salesforce",
      logo: "🏢",
      status: "connected",
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
      leadsCount: 1247,
      apiKey: "sk_live_***************",
    },
    {
      id: "hubspot",
      name: "HubSpot",
      logo: "🧡",
      status: "connected",
      lastSync: new Date(Date.now() - 30 * 60 * 1000),
      leadsCount: 892,
      apiKey: "pat-na1-***************",
    },
    {
      id: "pipedrive",
      name: "Pipedrive",
      logo: "🟢",
      status: "disconnected",
      lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
      leadsCount: 0,
    },
    {
      id: "zoho",
      name: "Zoho CRM",
      logo: "🔵",
      status: "error",
      lastSync: new Date(Date.now() - 6 * 60 * 60 * 1000),
      leadsCount: 234,
    },
  ])

  const [syncRules, setSyncRules] = useState<SyncRule[]>([
    {
      id: "1",
      name: "High-Value Leads",
      condition: "Qualification Score > 80 AND Revenue > $10M",
      action: "Create Lead + Schedule Follow-up",
      enabled: true,
    },
    {
      id: "2",
      name: "Tech Companies",
      condition: "Industry = Technology AND Employee Count > 50",
      action: "Create Lead + Add to Tech Pipeline",
      enabled: true,
    },
    {
      id: "3",
      name: "Recent Updates",
      condition: "Last Updated < 7 days",
      action: "Update Existing Lead",
      enabled: false,
    },
  ])

  const [syncProgress, setSyncProgress] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)

  const handleConnect = (crmId: string) => {
    setConnections(
      connections.map((conn) =>
        conn.id === crmId ? { ...conn, status: "connected" as const, lastSync: new Date() } : conn,
      ),
    )
  }

  const handleDisconnect = (crmId: string) => {
    setConnections(connections.map((conn) => (conn.id === crmId ? { ...conn, status: "disconnected" as const } : conn)))
  }

  const handleSync = async (crmId: string) => {
    setIsSyncing(true)
    setSyncProgress(0)

    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSyncing(false)
          setConnections(
            connections.map((conn) =>
              conn.id === crmId
                ? {
                    ...conn,
                    status: "connected" as const,
                    lastSync: new Date(),
                    leadsCount: conn.leadsCount + Math.floor(Math.random() * 50),
                  }
                : conn,
            ),
          )
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const handleBulkSync = () => {
    const connectedCRMs = connections.filter((conn) => conn.status === "connected")
    connectedCRMs.forEach((crm) => handleSync(crm.id))
  }

  const toggleSyncRule = (ruleId: string) => {
    setSyncRules(syncRules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const getStatusIcon = (status: CRMConnection["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "syncing":
        return <Sync className="h-4 w-4 text-blue-600 animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: CRMConnection["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "syncing":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="sync-rules">Sync Rules</TabsTrigger>
          <TabsTrigger value="field-mapping">Field Mapping</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-6">
          {/* Bulk Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Bulk Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button onClick={handleBulkSync} disabled={isSyncing}>
                  <Sync className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
                  Sync All Connected CRMs
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Import
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
              {isSyncing && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Syncing leads...</span>
                    <span>{Math.round(syncProgress)}%</span>
                  </div>
                  <Progress value={syncProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* CRM Connections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connections.map((connection) => (
              <Card key={connection.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{connection.logo}</span>
                      <div>
                        <CardTitle className="text-lg">{connection.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Last sync: {connection.lastSync.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(connection.status)}
                      <Badge className={getStatusColor(connection.status)}>{connection.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Leads Synced</span>
                    <span className="font-semibold">{connection.leadsCount.toLocaleString()}</span>
                  </div>

                  {connection.apiKey && (
                    <div>
                      <Label className="text-sm">API Key</Label>
                      <Input value={connection.apiKey} readOnly className="text-sm" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    {connection.status === "connected" ? (
                      <>
                        <Button size="sm" onClick={() => handleSync(connection.id)} disabled={isSyncing}>
                          <Sync className="h-3 w-3 mr-1" />
                          Sync Now
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDisconnect(connection.id)}>
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => handleConnect(connection.id)}>
                        Connect
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sync-rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Sync Rules</CardTitle>
              <p className="text-sm text-muted-foreground">
                Define conditions for automatically syncing leads to your CRM systems
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {syncRules.map((rule) => (
                <div key={rule.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={rule.enabled} onCheckedChange={() => toggleSyncRule(rule.id)} />
                      <div>
                        <h3 className="font-semibold">{rule.name}</h3>
                        <p className="text-sm text-muted-foreground">{rule.condition}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{rule.action}</Badge>
                  </div>
                </div>
              ))}

              <Button className="w-full" variant="outline">
                + Add New Rule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="field-mapping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Field Mapping Configuration</CardTitle>
              <p className="text-sm text-muted-foreground">Map lead data fields to your CRM system fields</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Lead Generation Fields</Label>
                  <div className="space-y-2">
                    {[
                      "Company Name",
                      "Industry",
                      "Employee Count",
                      "Revenue",
                      "Location",
                      "Description",
                      "Contact Email",
                      "Website",
                      "Technologies",
                      "Qualification Score",
                    ].map((field) => (
                      <div key={field} className="p-2 border rounded text-sm">
                        {field}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-3 block">CRM Fields (Salesforce)</Label>
                  <div className="space-y-2">
                    {[
                      "Account Name",
                      "Industry",
                      "Number of Employees",
                      "Annual Revenue",
                      "Billing Address",
                      "Description",
                      "Email",
                      "Website",
                      "Custom Field: Tech Stack",
                      "Lead Score",
                    ].map((field, index) => (
                      <Select key={field}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder={field} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={field.toLowerCase().replace(/\s+/g, "_")}>{field}</SelectItem>
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="w-full">Save Field Mapping</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sync Activity Log</CardTitle>
              <p className="text-sm text-muted-foreground">Track all CRM synchronization activities and their status</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "2 minutes ago",
                    action: "Synced 15 leads to Salesforce",
                    status: "success",
                    details: "High-value tech companies pipeline",
                  },
                  {
                    time: "30 minutes ago",
                    action: "Synced 8 leads to HubSpot",
                    status: "success",
                    details: "Healthcare startups campaign",
                  },
                  {
                    time: "1 hour ago",
                    action: "Failed to sync to Zoho CRM",
                    status: "error",
                    details: "API rate limit exceeded",
                  },
                  {
                    time: "2 hours ago",
                    action: "Updated 23 existing leads in Salesforce",
                    status: "success",
                    details: "Qualification score updates",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="mt-1">
                      {activity.status === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
