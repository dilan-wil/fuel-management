"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, LineChart, Filter, PieChart } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for usage analytics
const usageTrendData = [
  { month: "Jan", diesel: 12500, petrol: 15000, average: 13750 },
  { month: "Feb", diesel: 11800, petrol: 14200, average: 13000 },
  { month: "Mar", diesel: 13200, petrol: 16500, average: 14850 },
  { month: "Apr", diesel: 14500, petrol: 17800, average: 16150 },
  { month: "May", diesel: 15800, petrol: 18200, average: 17000 },
  { month: "Jun", diesel: 16200, petrol: 19500, average: 17850 },
  { month: "Jul", diesel: 17500, petrol: 21000, average: 19250 },
  { month: "Aug", diesel: 16800, petrol: 20500, average: 18650 },
  { month: "Sep", diesel: 15500, petrol: 19800, average: 17650 },
  { month: "Oct", diesel: 14200, petrol: 18500, average: 16350 },
  { month: "Nov", diesel: 13500, petrol: 17200, average: 15350 },
  { month: "Dec", diesel: 12800, petrol: 16500, average: 14650 },
]

// Mock data for fuel distribution
const fuelDistributionData = [
  { name: "Diesel", value: 174300 },
  { name: "Petrol", value: 194700 },
]

// Mock data for department distribution
const departmentDistributionData = [
  { name: "Sales", value: 120000 },
  { name: "Operations", value: 157000 },
  { name: "Admin", value: 63000 },
  { name: "Management", value: 37000 },
  { name: "IT", value: 20000 },
]

// Colors for pie charts
const COLORS = ["#E3000F", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function UsageAnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Fuel Usage Analytics</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/reports">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Reports
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Analytics
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-nestle-red" />
              Analytics Filters
            </CardTitle>
            <CardDescription>Select time period for analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trends">Usage Trends</TabsTrigger>
            <TabsTrigger value="distribution">Fuel Distribution</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-nestle-red" />
                  Fuel Consumption Trends
                </CardTitle>
                <CardDescription>Monthly consumption trends for {selectedYear}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      diesel: {
                        label: "Diesel (Liters)",
                        color: "hsl(var(--chart-1))",
                      },
                      petrol: {
                        label: "Petrol (Liters)",
                        color: "hsl(var(--chart-2))",
                      },
                      average: {
                        label: "Average (Liters)",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={usageTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="diesel" stroke="var(--color-diesel)" name="Diesel" />
                        <Line type="monotone" dataKey="petrol" stroke="var(--color-petrol)" name="Petrol" />
                        <Line
                          type="monotone"
                          dataKey="average"
                          stroke="var(--color-average)"
                          name="Average"
                          strokeDasharray="5 5"
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Year-over-Year Growth</CardTitle>
                  <CardDescription>Compared to previous year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">+5.2%</div>
                  <p className="text-sm text-muted-foreground">Total consumption increased by 5.2%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Peak Consumption</CardTitle>
                  <CardDescription>Highest usage month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">July</div>
                  <p className="text-sm text-muted-foreground">38,500 liters consumed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Monthly</CardTitle>
                  <CardDescription>Average monthly consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">30,750 L</div>
                  <p className="text-sm text-muted-foreground">Across all fuel types</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-nestle-red" />
                    Fuel Type Distribution
                  </CardTitle>
                  <CardDescription>Distribution by fuel type for {selectedYear}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={fuelDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {fuelDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value.toLocaleString()} liters`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-2">
                      {fuelDistributionData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm">
                            {entry.name}: {entry.value.toLocaleString()} L
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-nestle-red" />
                    Department Distribution
                  </CardTitle>
                  <CardDescription>Distribution by department for {selectedYear}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={departmentDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {departmentDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value.toLocaleString()} liters`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-2">
                      {departmentDistributionData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm">
                            {entry.name}: {entry.value.toLocaleString()} L
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Distribution Analysis</CardTitle>
                <CardDescription>Key insights from fuel distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Key Findings</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Petrol consumption is 11.7% higher than diesel consumption</li>
                      <li>Operations department is the highest consumer at 39.5% of total fuel</li>
                      <li>IT department has the lowest consumption at 5.0% of total fuel</li>
                      <li>Sales and Operations together account for 69.7% of all fuel consumption</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Consider optimizing routes for Operations department vehicles</li>
                      <li>Implement fuel efficiency training for Sales team drivers</li>
                      <li>Review vehicle assignments for potential optimization</li>
                      <li>Consider transitioning some vehicles to more efficient models</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Consumption</CardTitle>
                  <CardDescription>Per vehicle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">245 L</div>
                  <p className="text-sm text-muted-foreground">Monthly average per vehicle</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Efficiency Rating</CardTitle>
                  <CardDescription>Overall fleet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-500">B+</div>
                  <p className="text-sm text-muted-foreground">Good, with room for improvement</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Cost per Kilometer</CardTitle>
                  <CardDescription>Fleet average</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">85.2FCFA</div>
                  <p className="text-sm text-muted-foreground">-2.3% from previous year</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency Metrics</CardTitle>
                <CardDescription>Key performance indicators for fuel efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Department</th>
                        <th className="text-right py-3 px-4">Avg. L/100km</th>
                        <th className="text-right py-3 px-4">Avg. Cost/km</th>
                        <th className="text-right py-3 px-4">Efficiency Rating</th>
                        <th className="text-right py-3 px-4">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Sales</td>
                        <td className="text-right py-3 px-4">9.2</td>
                        <td className="text-right py-3 px-4">78.2FCFA</td>
                        <td className="text-right py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                            A-
                          </span>
                        </td>
                        <td className="text-right py-3 px-4 text-green-600">-3.2%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Operations</td>
                        <td className="text-right py-3 px-4">12.5</td>
                        <td className="text-right py-3 px-4">106.3FCFA</td>
                        <td className="text-right py-3 px-4">
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-medium">
                            B
                          </span>
                        </td>
                        <td className="text-right py-3 px-4 text-green-600">-1.8%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Admin</td>
                        <td className="text-right py-3 px-4">8.7</td>
                        <td className="text-right py-3 px-4">74.0FCFA</td>
                        <td className="text-right py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                            A
                          </span>
                        </td>
                        <td className="text-right py-3 px-4 text-green-600">-4.5%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Management</td>
                        <td className="text-right py-3 px-4">10.2</td>
                        <td className="text-right py-3 px-4">86.7FCFA</td>
                        <td className="text-right py-3 px-4">
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-medium">
                            B+
                          </span>
                        </td>
                        <td className="text-right py-3 px-4 text-red-600">+1.2%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">IT</td>
                        <td className="text-right py-3 px-4">7.8</td>
                        <td className="text-right py-3 px-4">66.3FCFA</td>
                        <td className="text-right py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                            A+
                          </span>
                        </td>
                        <td className="text-right py-3 px-4 text-green-600">-5.8%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

