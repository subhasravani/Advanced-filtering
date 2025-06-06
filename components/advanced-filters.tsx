"use client"

import { useState, useMemo } from "react"
import { Search, Building2, DollarSign, Users, MapPin, Briefcase, Filter, X, Save, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Enhanced mock data with more detailed information
const mockLeads = [
  {
    id: 1,
    companyName: "TechCorp Solutions",
    industry: "Technology",
    location: "San Francisco, CA",
    employeeCount: 250,
    revenue: 15000000,
    description:
      "Leading provider of cloud-based software solutions for enterprise customers. Specializes in AI-powered analytics and machine learning platforms.",
    website: "techcorp.com",
    contactEmail: "contact@techcorp.com",
    foundingYear: 2018,
    technologies: ["AI", "Machine Learning", "Cloud Computing"],
    qualificationScore: 85,
    lastUpdated: new Date("2024-01-15"),
  },
  {
    id: 2,
    companyName: "GreenEnergy Innovations",
    industry: "Energy",
    location: "Austin, TX",
    employeeCount: 75,
    revenue: 8500000,
    description:
      "Renewable energy company focused on solar panel manufacturing and installation services for residential and commercial properties.",
    website: "greenenergy.com",
    contactEmail: "info@greenenergy.com",
    foundingYear: 2020,
    technologies: ["Solar", "Renewable Energy", "IoT"],
    qualificationScore: 72,
    lastUpdated: new Date("2024-01-14"),
  },
  {
    id: 3,
    companyName: "HealthTech Dynamics",
    industry: "Healthcare",
    location: "Boston, MA",
    employeeCount: 450,
    revenue: 32000000,
    description:
      "Healthcare technology company developing AI-driven diagnostic tools and telemedicine platforms for hospitals and clinics.",
    website: "healthtech.com",
    contactEmail: "hello@healthtech.com",
    foundingYear: 2016,
    technologies: ["AI", "Healthcare", "Telemedicine"],
    qualificationScore: 91,
    lastUpdated: new Date("2024-01-16"),
  },
  {
    id: 4,
    companyName: "FinanceFlow Systems",
    industry: "Finance",
    location: "New York, NY",
    employeeCount: 120,
    revenue: 18500000,
    description:
      "Financial software company providing automated accounting solutions and payment processing systems for small to medium businesses.",
    website: "financeflow.com",
    contactEmail: "support@financeflow.com",
    foundingYear: 2019,
    technologies: ["Fintech", "Automation", "Blockchain"],
    qualificationScore: 78,
    lastUpdated: new Date("2024-01-13"),
  },
  {
    id: 5,
    companyName: "EduLearn Platform",
    industry: "Education",
    location: "Seattle, WA",
    employeeCount: 35,
    revenue: 2800000,
    description:
      "Online learning platform offering AI-powered personalized education courses and certification programs for professionals.",
    website: "edulearn.com",
    contactEmail: "team@edulearn.com",
    foundingYear: 2021,
    technologies: ["AI", "EdTech", "Machine Learning"],
    qualificationScore: 68,
    lastUpdated: new Date("2024-01-12"),
  },
  {
    id: 6,
    companyName: "RetailMax Analytics",
    industry: "Retail",
    location: "Chicago, IL",
    employeeCount: 180,
    revenue: 12300000,
    description:
      "Retail analytics company providing machine learning solutions for inventory management and customer behavior analysis.",
    website: "retailmax.com",
    contactEmail: "contact@retailmax.com",
    foundingYear: 2017,
    technologies: ["Machine Learning", "Analytics", "Retail Tech"],
    qualificationScore: 82,
    lastUpdated: new Date("2024-01-11"),
  },
]

interface FilterState {
  industry: string[]
  location: string[]
  companySizes: string[]
  revenueRanges: string[]
  keywords: string
  technologies: string[]
  foundingYearRange: { min: string; max: string }
  qualificationScore: { min: string; max: string }
  minEmployees: string
  maxEmployees: string
  minRevenue: string
  maxRevenue: string
  lastUpdated: string
}

const companySizeOptions = [
  { value: "startup", label: "Startup (1-10)", min: 1, max: 10 },
  { value: "small", label: "Small (11-50)", min: 11, max: 50 },
  { value: "medium", label: "Medium (51-200)", min: 51, max: 200 },
  { value: "large", label: "Large (201-1000)", min: 201, max: 1000 },
  { value: "enterprise", label: "Enterprise (1000+)", min: 1000, max: Number.POSITIVE_INFINITY },
]

const revenueRangeOptions = [
  { value: "under1m", label: "Under $1M", min: 0, max: 1000000 },
  { value: "1m-5m", label: "$1M - $5M", min: 1000000, max: 5000000 },
  { value: "5m-10m", label: "$5M - $10M", min: 5000000, max: 10000000 },
  { value: "10m-50m", label: "$10M - $50M", min: 10000000, max: 50000000 },
  { value: "over50m", label: "Over $50M", min: 50000000, max: Number.POSITIVE_INFINITY },
]

export default function AdvancedFilters() {
  const [filters, setFilters] = useState<FilterState>({
    industry: [],
    location: [],
    companySizes: [],
    revenueRanges: [],
    keywords: "",
    technologies: [],
    foundingYearRange: { min: "", max: "" },
    qualificationScore: { min: "", max: "" },
    minEmployees: "",
    maxEmployees: "",
    minRevenue: "",
    maxRevenue: "",
    lastUpdated: "",
  })

  const [savedFilters, setSavedFilters] = useState<string[]>([
    "High-Value Tech Companies",
    "Healthcare Startups",
    "AI-Powered SMBs",
  ])

  // Extract unique values for filter options
  const industries = [...new Set(mockLeads.map((lead) => lead.industry))]
  const locations = [...new Set(mockLeads.map((lead) => lead.location))]
  const allTechnologies = [...new Set(mockLeads.flatMap((lead) => lead.technologies))]

  // Enhanced filter logic
  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      // Industry filter
      if (filters.industry.length > 0 && !filters.industry.includes(lead.industry)) {
        return false
      }

      // Location filter
      if (filters.location.length > 0 && !filters.location.includes(lead.location)) {
        return false
      }

      // Company size filters
      if (filters.companySizes.length > 0) {
        const matchesSize = filters.companySizes.some((sizeKey) => {
          const sizeOption = companySizeOptions.find((opt) => opt.value === sizeKey)
          return sizeOption && lead.employeeCount >= sizeOption.min && lead.employeeCount <= sizeOption.max
        })
        if (!matchesSize) return false
      }

      // Revenue range filters
      if (filters.revenueRanges.length > 0) {
        const matchesRevenue = filters.revenueRanges.some((revenueKey) => {
          const revenueOption = revenueRangeOptions.find((opt) => opt.value === revenueKey)
          return revenueOption && lead.revenue >= revenueOption.min && lead.revenue <= revenueOption.max
        })
        if (!matchesRevenue) return false
      }

      // Technology filters
      if (filters.technologies.length > 0) {
        const matchesTech = filters.technologies.some((tech) => lead.technologies.includes(tech))
        if (!matchesTech) return false
      }

      // Custom ranges
      if (filters.minEmployees && lead.employeeCount < Number.parseInt(filters.minEmployees)) return false
      if (filters.maxEmployees && lead.employeeCount > Number.parseInt(filters.maxEmployees)) return false
      if (filters.minRevenue && lead.revenue < Number.parseInt(filters.minRevenue)) return false
      if (filters.maxRevenue && lead.revenue > Number.parseInt(filters.maxRevenue)) return false

      // Founding year range
      if (filters.foundingYearRange.min && lead.foundingYear < Number.parseInt(filters.foundingYearRange.min))
        return false
      if (filters.foundingYearRange.max && lead.foundingYear > Number.parseInt(filters.foundingYearRange.max))
        return false

      // Qualification score range
      if (filters.qualificationScore.min && lead.qualificationScore < Number.parseInt(filters.qualificationScore.min))
        return false
      if (filters.qualificationScore.max && lead.qualificationScore > Number.parseInt(filters.qualificationScore.max))
        return false

      // Keywords in description or company name
      if (filters.keywords) {
        const keywords = filters.keywords
          .toLowerCase()
          .split(",")
          .map((k) => k.trim())
        const searchText = `${lead.description} ${lead.companyName}`.toLowerCase()
        const matchesKeywords = keywords.some((keyword) => searchText.includes(keyword))
        if (!matchesKeywords) return false
      }

      // Last updated filter
      if (filters.lastUpdated) {
        const daysDiff = Math.floor((Date.now() - lead.lastUpdated.getTime()) / (1000 * 60 * 60 * 24))
        const maxDays = Number.parseInt(filters.lastUpdated)
        if (daysDiff > maxDays) return false
      }

      return true
    })
  }, [filters])

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleCheckboxFilter = (
    filterType: "industry" | "location" | "companySizes" | "revenueRanges" | "technologies",
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      industry: [],
      location: [],
      companySizes: [],
      revenueRanges: [],
      keywords: "",
      technologies: [],
      foundingYearRange: { min: "", max: "" },
      qualificationScore: { min: "", max: "" },
      minEmployees: "",
      maxEmployees: "",
      minRevenue: "",
      maxRevenue: "",
      lastUpdated: "",
    })
  }

  const saveCurrentFilters = () => {
    const filterName = prompt("Enter a name for this filter set:")
    if (filterName) {
      setSavedFilters([...savedFilters, filterName])
    }
  }

  const exportResults = () => {
    // Simulate CSV export
    const csvContent = [
      "Company Name,Industry,Location,Employees,Revenue,Qualification Score",
      ...filteredLeads.map(
        (lead) =>
          `${lead.companyName},${lead.industry},${lead.location},${lead.employeeCount},${lead.revenue},${lead.qualificationScore}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "filtered_leads.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getActiveFilterCount = () => {
    return (
      filters.industry.length +
      filters.location.length +
      filters.companySizes.length +
      filters.revenueRanges.length +
      filters.technologies.length +
      (filters.keywords ? 1 : 0) +
      (filters.foundingYearRange.min || filters.foundingYearRange.max ? 1 : 0) +
      (filters.qualificationScore.min || filters.qualificationScore.max ? 1 : 0) +
      (filters.minEmployees ? 1 : 0) +
      (filters.maxEmployees ? 1 : 0) +
      (filters.minRevenue ? 1 : 0) +
      (filters.maxRevenue ? 1 : 0) +
      (filters.lastUpdated ? 1 : 0)
    )
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={saveCurrentFilters}>
                  <Save className="h-4 w-4" />
                </Button>
                {getActiveFilterCount() > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            {getActiveFilterCount() > 0 && <Badge variant="secondary">{getActiveFilterCount()} active</Badge>}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Saved Filters */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Saved Filter Sets</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Load saved filters..." />
                </SelectTrigger>
                <SelectContent>
                  {savedFilters.map((filterName) => (
                    <SelectItem key={filterName} value={filterName || "default"}>
                      {filterName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Industry Filter */}
            <div>
              <Label className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4" />
                Industry
              </Label>
              <div className="space-y-2">
                {industries.map((industry) => (
                  <Label key={industry} className="flex items-center space-x-2 font-normal">
                    <Checkbox
                      checked={filters.industry.includes(industry)}
                      onCheckedChange={() => handleCheckboxFilter("industry", industry)}
                    />
                    <span className="text-sm">{industry}</span>
                  </Label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Location Filter */}
            <div>
              <Label className="text-sm font-semibold flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <div className="space-y-2">
                {locations.map((location) => (
                  <Label key={location} className="flex items-center space-x-2 font-normal">
                    <Checkbox
                      checked={filters.location.includes(location)}
                      onCheckedChange={() => handleCheckboxFilter("location", location)}
                    />
                    <span className="text-sm">{location}</span>
                  </Label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Company Size Filter */}
            <div>
              <Label className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Users className="h-4 w-4" />
                Company Size
              </Label>
              <div className="space-y-2">
                {companySizeOptions.map((option) => (
                  <Label key={option.value} className="flex items-center space-x-2 font-normal">
                    <Checkbox
                      checked={filters.companySizes.includes(option.value)}
                      onCheckedChange={() => handleCheckboxFilter("companySizes", option.value)}
                    />
                    <span className="text-sm">{option.label}</span>
                  </Label>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                <Label className="text-xs text-muted-foreground">Custom Range</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={filters.minEmployees}
                    onChange={(e) => handleFilterChange("minEmployees", e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={filters.maxEmployees}
                    onChange={(e) => handleFilterChange("maxEmployees", e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Revenue Filter */}
            <div>
              <Label className="text-sm font-semibold flex items-center gap-2 mb-3">
                <DollarSign className="h-4 w-4" />
                Revenue Range
              </Label>
              <div className="space-y-2">
                {revenueRangeOptions.map((option) => (
                  <Label key={option.value} className="flex items-center space-x-2 font-normal">
                    <Checkbox
                      checked={filters.revenueRanges.includes(option.value)}
                      onCheckedChange={() => handleCheckboxFilter("revenueRanges", option.value)}
                    />
                    <span className="text-sm">{option.label}</span>
                  </Label>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                <Label className="text-xs text-muted-foreground">Custom Range ($)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={filters.minRevenue}
                    onChange={(e) => handleFilterChange("minRevenue", e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={filters.maxRevenue}
                    onChange={(e) => handleFilterChange("maxRevenue", e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Technology Filter */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Technologies</Label>
              <div className="space-y-2">
                {allTechnologies.map((tech) => (
                  <Label key={tech} className="flex items-center space-x-2 font-normal">
                    <Checkbox
                      checked={filters.technologies.includes(tech)}
                      onCheckedChange={() => handleCheckboxFilter("technologies", tech)}
                    />
                    <span className="text-sm">{tech}</span>
                  </Label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Keywords Filter */}
            <div>
              <Label className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Search className="h-4 w-4" />
                Keywords
              </Label>
              <Input
                placeholder="AI, machine learning, cloud..."
                value={filters.keywords}
                onChange={(e) => handleFilterChange("keywords", e.target.value)}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate multiple keywords with commas</p>
            </div>

            <Separator />

            {/* Additional Filters */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">Founding Year</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="From"
                    type="number"
                    value={filters.foundingYearRange.min}
                    onChange={(e) =>
                      handleFilterChange("foundingYearRange", {
                        ...filters.foundingYearRange,
                        min: e.target.value,
                      })
                    }
                    className="text-sm"
                  />
                  <Input
                    placeholder="To"
                    type="number"
                    value={filters.foundingYearRange.max}
                    onChange={(e) =>
                      handleFilterChange("foundingYearRange", {
                        ...filters.foundingYearRange,
                        max: e.target.value,
                      })
                    }
                    className="text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">AI Qualification Score</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    min="0"
                    max="100"
                    value={filters.qualificationScore.min}
                    onChange={(e) =>
                      handleFilterChange("qualificationScore", {
                        ...filters.qualificationScore,
                        min: e.target.value,
                      })
                    }
                    className="text-sm"
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    min="0"
                    max="100"
                    value={filters.qualificationScore.max}
                    onChange={(e) =>
                      handleFilterChange("qualificationScore", {
                        ...filters.qualificationScore,
                        max: e.target.value,
                      })
                    }
                    className="text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Last Updated (days ago)</Label>
                <Select value={filters.lastUpdated} onValueChange={(value) => handleFilterChange("lastUpdated", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any time</SelectItem>
                    <SelectItem value="1">Last 24 hours</SelectItem>
                    <SelectItem value="7">Last week</SelectItem>
                    <SelectItem value="30">Last month</SelectItem>
                    <SelectItem value="90">Last 3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {filteredLeads.length} Lead{filteredLeads.length !== 1 ? "s" : ""} Found
            </h2>
            <p className="text-sm text-muted-foreground">Showing results based on your filter criteria</p>
          </div>
          <Button onClick={exportResults} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {lead.companyName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{lead.website}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{lead.industry}</Badge>
                    <Badge
                      variant={
                        lead.qualificationScore >= 80
                          ? "default"
                          : lead.qualificationScore >= 60
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {lead.qualificationScore}% qualified
                    </Badge>
                  </div>
                </div>

                <p className="text-sm mb-4 text-muted-foreground">{lead.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {lead.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{lead.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{lead.employeeCount} employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>${(lead.revenue / 1000000).toFixed(1)}M revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Founded:</span>
                    <span>{lead.foundingYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Contact:</span>
                    <span className="text-blue-600">{lead.contactEmail}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredLeads.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No leads found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={clearAllFilters}>Clear All Filters</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
