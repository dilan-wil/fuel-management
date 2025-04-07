"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Download, FileText, Filter, Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import EmployeeLayout from "@/components/employee-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function EmployeeReportsPage() {
  const [date, setDate] = useState<Date>()

  // Sample data for reports
  const fuelReports = [
    {
      id: "FR001",
      date: "2023-10-15",
      station: "Douala Station 1",
      fuelType: "Petrol",
      quantity: "45.2 L",
      amount: "25,000 FCFA",
      status: "Completed",
    },
    {
      id: "FR002",
      date: "2023-10-10",
      station: "Yaoundé Station 3",
      fuelType: "Diesel",
      quantity: "60.0 L",
      amount: "33,000 FCFA",
      status: "Completed",
    },
    {
      id: "FR003",
      date: "2023-10-05",
      station: "Douala Station 2",
      fuelType: "Petrol",
      quantity: "30.5 L",
      amount: "16,775 FCFA",
      status: "Completed",
    },
    {
      id: "FR004",
      date: "2023-09-28",
      station: "Bafoussam Station 1",
      fuelType: "Diesel",
      quantity: "50.0 L",
      amount: "27,500 FCFA",
      status: "Completed",
    },
    {
      id: "FR005",
      date: "2023-09-20",
      station: "Douala Station 1",
      fuelType: "Petrol",
      quantity: "35.8 L",
      amount: "19,690 FCFA",
      status: "Completed",
    },
  ]

  const maintenanceReports = [
    {
      id: "MR001",
      date: "2023-09-15",
      service: "Oil Change",
      provider: "Nestle Auto Service",
      cost: "15,000 FCFA",
      status: "Completed",
    },
    {
      id: "MR002",
      date: "2023-08-20",
      service: "Tire Replacement",
      provider: "Douala Tire Center",
      cost: "120,000 FCFA",
      status: "Completed",
    },
    {
      id: "MR003",
      date: "2023-07-10",
      service: "Brake Service",
      provider: "Nestle Auto Service",
      cost: "45,000 FCFA",
      status: "Completed",
    },
  ]

  const expenseReports = [
    {
      id: "ER001",
      date: "2023-10-12",
      category: "Fuel",
      description: "Weekly fuel expenses",
      amount: "75,000 FCFA",
      status: "Approved",
    },
    {
      id: "ER002",
      date: "2023-09-30",
      category: "Maintenance",
      description: "Quarterly maintenance",
      amount: "150,000 FCFA",
      status: "Approved",
    },
    {
      id: "ER003",
      date: "2023-09-15",
      category: "Toll",
      description: "Highway tolls for Douala-Yaoundé trip",
      amount: "5,000 FCFA",
      status: "Approved",
    },
    {
      id: "ER004",
      date: "2023-09-05",
      category: "Parking",
      description: "Monthly parking fee",
      amount: "25,000 FCFA",
      status: "Approved",
    },
  ]

  return (
    <EmployeeLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">View and download your vehicle and fuel reports</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <Button>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="fuel">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="fuel">Fuel Reports</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance Reports</TabsTrigger>
              <TabsTrigger value="expense">Expense Reports</TabsTrigger>
            </TabsList>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <TabsContent value="fuel" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Fuel Consumption Reports</CardTitle>
                <CardDescription>View your fuel consumption history and download reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search reports..." className="pl-8" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fuel Types</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stations</SelectItem>
                        <SelectItem value="douala1">Douala Station 1</SelectItem>
                        <SelectItem value="douala2">Douala Station 2</SelectItem>
                        <SelectItem value="yaounde3">Yaoundé Station 3</SelectItem>
                        <SelectItem value="bafoussam1">Bafoussam Station 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Station</TableHead>
                        <TableHead>Fuel Type</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fuelReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.station}</TableCell>
                          <TableCell>{report.fuelType}</TableCell>
                          <TableCell>{report.quantity}</TableCell>
                          <TableCell>{report.amount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View Report</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download Report</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Maintenance Reports</CardTitle>
                <CardDescription>View your vehicle maintenance history and service records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search maintenance records..." className="pl-8" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Service Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="oil">Oil Change</SelectItem>
                        <SelectItem value="tire">Tire Service</SelectItem>
                        <SelectItem value="brake">Brake Service</SelectItem>
                        <SelectItem value="general">General Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {maintenanceReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.service}</TableCell>
                          <TableCell>{report.provider}</TableCell>
                          <TableCell>{report.cost}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View Report</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download Report</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expense" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Expense Reports</CardTitle>
                <CardDescription>View your submitted expense reports and reimbursement status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search expenses..." className="pl-8" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Expense Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="fuel">Fuel</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="toll">Toll</SelectItem>
                        <SelectItem value="parking">Parking</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenseReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.category}</TableCell>
                          <TableCell>{report.description}</TableCell>
                          <TableCell>{report.amount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View Report</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download Report</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  )
}

