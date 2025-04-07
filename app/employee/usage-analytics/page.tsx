"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Download, Info } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import EmployeeLayout from "@/components/employee-layout"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function EmployeeUsageAnalyticsPage() {
  const [date, setDate] = useState<Date>()

  // Sample data for fuel consumption
  const monthlyConsumption = [
    { month: "Jan", consumption: 180 },
    { month: "Feb", consumption: 200 },
    { month: "Mar", consumption: 220 },
    { month: "Apr", consumption: 190 },
    { month: "May", consumption: 240 },
    { month: "Jun", consumption: 230 },
    { month: "Jul", consumption: 250 },
    { month: "Aug", consumption: 210 },
    { month: "Sep", consumption: 220 },
    { month: "Oct", consumption: 230 },
    { month: "Nov", consumption: 0 },
    { month: "Dec", consumption: 0 },
  ]

  const weeklyConsumption = [
    { day: "Mon", consumption: 35 },
    { day: "Tue", consumption: 40 },
    { day: "Wed", consumption: 30 },
    { day: "Thu", consumption: 45 },
    { day: "Fri", consumption: 50 },
    { day: "Sat", consumption: 20 },
    { day: "Sun", consumption: 10 },
  ]

  const fuelTypeDistribution = [
    { name: "Petrol", value: 70 },
    { name: "Diesel", value: 30 },
  ]

  const stationUsage = [
    { name: "Douala Station 1", value: 45 },
    { name: "Douala Station 2", value: 25 },
    { name: "Yaoundé Station 3", value: 20 },
    { name: "Bafoussam Station 1", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  // Current usage stats
  const currentMonthUsage = 230
  const monthlyLimit = 250
  const monthlyUsagePercentage = (currentMonthUsage / monthlyLimit) * 100

  const currentWeekUsage = 120
  const weeklyLimit = 150
  const weeklyUsagePercentage = (currentWeekUsage / weeklyLimit) * 100

  const currentDayUsage = 15
  const dailyLimit = 20
  const dailyUsagePercentage = (currentDayUsage / dailyLimit) * 100

  return (
    <EmployeeLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold">Usage Analytics</h1>
            <p className="text-muted-foreground">Monitor your fuel consumption and usage patterns</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select defaultValue="2023">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMMM yyyy") : <span>Select month</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
              <CardDescription>
                <div className="flex justify-between items-center">
                  <span>
                    {currentMonthUsage} / {monthlyLimit} Liters
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your monthly fuel limit is {monthlyLimit} liters</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={monthlyUsagePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {monthlyLimit - currentMonthUsage} liters remaining this month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Weekly Usage</CardTitle>
              <CardDescription>
                <div className="flex justify-between items-center">
                  <span>
                    {currentWeekUsage} / {weeklyLimit} Liters
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your weekly fuel limit is {weeklyLimit} liters</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={weeklyUsagePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {weeklyLimit - currentWeekUsage} liters remaining this week
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Daily Usage</CardTitle>
              <CardDescription>
                <div className="flex justify-between items-center">
                  <span>
                    {currentDayUsage} / {dailyLimit} Liters
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your daily fuel limit is {dailyLimit} liters</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={dailyUsagePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">{dailyLimit - currentDayUsage} liters remaining today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="monthly">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
              <TabsTrigger value="distribution">Usage Distribution</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Fuel Consumption</CardTitle>
                <CardDescription>Your fuel consumption trend over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyConsumption}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: "Liters", angle: -90, position: "insideLeft" }} />
                      <RechartsTooltip formatter={(value) => [`${value} Liters`, "Consumption"]} />
                      <Legend />
                      <Bar dataKey="consumption" fill="#8884d8" name="Fuel Consumption (Liters)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Fuel Consumption</CardTitle>
                <CardDescription>Your fuel consumption trend over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyConsumption}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis label={{ value: "Liters", angle: -90, position: "insideLeft" }} />
                      <RechartsTooltip formatter={(value) => [`${value} Liters`, "Consumption"]} />
                      <Legend />
                      <Line type="monotone" dataKey="consumption" stroke="#8884d8" name="Fuel Consumption (Liters)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fuel Type Distribution</CardTitle>
                  <CardDescription>Distribution of fuel types used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={fuelTypeDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {fuelTypeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Station Usage</CardTitle>
                  <CardDescription>Distribution of fuel stations used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stationUsage}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name.split(" ").pop()}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {stationUsage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Fuel Efficiency Analysis</CardTitle>
            <CardDescription>Analysis of your vehicle's fuel efficiency and consumption patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Average Consumption</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">8.5</span>
                  <span className="text-muted-foreground">L/100km</span>
                </div>
                <p className="text-sm text-muted-foreground">5% better than company average</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Distance Covered</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">1,250</span>
                  <span className="text-muted-foreground">km this month</span>
                </div>
                <p className="text-sm text-muted-foreground">10% more than last month</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Cost per Kilometer</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">85</span>
                  <span className="text-muted-foreground">FCFA/km</span>
                </div>
                <p className="text-sm text-muted-foreground">3% lower than last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  )
}

