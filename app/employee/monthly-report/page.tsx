"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Download, FileText, Printer, Share2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import EmployeeLayout from "@/components/employee-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function EmployeeMonthlyReportPage() {
  const [date, setDate] = useState<Date>(new Date())

  // Sample data for monthly report
  const fuelConsumptionByWeek = [
    { name: "Week 1", consumption: 60 },
    { name: "Week 2", consumption: 75 },
    { name: "Week 3", consumption: 50 },
    { name: "Week 4", consumption: 45 },
  ]

  const fuelTypeDistribution = [
    { name: "Petrol", value: 70 },
    { name: "Diesel", value: 30 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const transactions = [
    {
      id: "T001",
      date: "2023-10-05",
      station: "Douala Station 1",
      fuelType: "Petrol",
      quantity: "45.2 L",
      amount: "25,000 FCFA",
    },
    {
      id: "T002",
      date: "2023-10-12",
      station: "Yaoundé Station 3",
      fuelType: "Diesel",
      quantity: "60.0 L",
      amount: "33,000 FCFA",
    },
    {
      id: "T003",
      date: "2023-10-18",
      station: "Douala Station 2",
      fuelType: "Petrol",
      quantity: "30.5 L",
      amount: "16,775 FCFA",
    },
    {
      id: "T004",
      date: "2023-10-25",
      station: "Bafoussam Station 1",
      fuelType: "Diesel",
      quantity: "50.0 L",
      amount: "27,500 FCFA",
    },
  ]

  // Monthly summary data
  const totalConsumption = 185.7
  const totalCost = 102275
  const averageConsumption = 46.4
  const distanceCovered = 1250
  const fuelEfficiency = 8.5

  return (
    <EmployeeLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold">Monthly Report</h1>
            <p className="text-muted-foreground">Fuel consumption report for {format(date, "MMMM yyyy")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
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
            <Select defaultValue="pdf">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>Overview of your fuel consumption for {format(date, "MMMM yyyy")}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Consumption</p>
                <p className="text-2xl font-bold">{totalConsumption} L</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">{totalCost.toLocaleString()} FCFA</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg. Transaction</p>
                <p className="text-2xl font-bold">{averageConsumption} L</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Distance Covered</p>
                <p className="text-2xl font-bold">{distanceCovered} km</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                <p className="text-2xl font-bold">{fuelEfficiency} L/100km</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Weekly Consumption</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={fuelConsumptionByWeek}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Liters", angle: -90, position: "insideLeft" }} />
                      <RechartsTooltip formatter={(value) => [`${value} Liters`, "Consumption"]} />
                      <Legend />
                      <Bar dataKey="consumption" fill="#8884d8" name="Fuel Consumption (Liters)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Fuel Type Distribution</h3>
                <div className="h-[250px]">
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
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-medium mb-4">Transaction Details</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Station</TableHead>
                      <TableHead>Fuel Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.station}</TableCell>
                        <TableCell>{transaction.fuelType}</TableCell>
                        <TableCell>{transaction.quantity}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Suggestions to improve your fuel efficiency and reduce costs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-md font-medium text-blue-800 mb-2">Fuel Efficiency</h3>
                <p className="text-sm text-blue-700">
                  Your fuel efficiency is 8.5 L/100km, which is 5% better than the company average. Continue maintaining
                  proper tire pressure and avoiding rapid acceleration to maintain good efficiency.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="text-md font-medium text-green-800 mb-2">Cost Saving</h3>
                <p className="text-sm text-green-700">
                  Consider refueling at Douala Station 2 more frequently, as it offers better rates compared to other
                  stations you've used this month.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="text-md font-medium text-amber-800 mb-2">Usage Pattern</h3>
                <p className="text-sm text-amber-700">
                  Your fuel consumption was highest in Week 2. Review your travel routes during this period to identify
                  opportunities for optimization.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  )
}

