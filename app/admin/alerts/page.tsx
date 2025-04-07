"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Download,
  Filter,
  MoreHorizontal,
  AlertTriangle,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

// Mock data for alerts
const alertsData = [
  {
    id: "ALT-001",
    type: "Unusual Volume",
    description: "Unusual fuel volume for Toyota Camry (ABC-1234)",
    employee: "John Doe",
    employeeId: "EMP001",
    vehicle: "Toyota Camry",
    vehiclePlate: "ABC-1234",
    amount: 45.2,
    date: "2025-03-24T11:32:00",
    location: "Douala Station 1",
    severity: "high",
    status: "new",
  },
  {
    id: "ALT-002",
    type: "Multiple Refills",
    description: "Multiple refills in short period for Honda Civic (DEF-5678)",
    employee: "Jane Smith",
    employeeId: "EMP002",
    vehicle: "Honda Civic",
    vehiclePlate: "DEF-5678",
    amount: 38.5,
    date: "2025-03-24T09:45:00",
    location: "Douala Station 2",
    severity: "medium",
    status: "investigating",
  },
  {
    id: "ALT-003",
    type: "Odometer Discrepancy",
    description: "Odometer reading inconsistency for Nissan Altima (JKL-3456)",
    employee: "Robert Johnson",
    employeeId: "EMP003",
    vehicle: "Nissan Altima",
    vehiclePlate: "JKL-3456",
    amount: 42.0,
    date: "2025-03-23T15:20:00",
    location: "Yaounde Station 1",
    severity: "low",
    status: "resolved",
  },
  {
    id: "ALT-004",
    type: "Off-Hours Refill",
    description: "Refill outside of working hours for Ford Focus (GHI-9012)",
    employee: "Emily Davis",
    employeeId: "EMP004",
    vehicle: "Ford Focus",
    vehiclePlate: "GHI-9012",
    amount: 35.8,
    date: "2025-03-23T22:18:00",
    location: "Douala Station 1",
    severity: "medium",
    status: "new",
  },
  {
    id: "ALT-005",
    type: "Unusual Location",
    description: "Refill at unauthorized location for Toyota Hilux (MNO-7890)",
    employee: "Michael Wilson",
    employeeId: "EMP005",
    vehicle: "Toyota Hilux",
    vehiclePlate: "MNO-7890",
    amount: 65.5,
    date: "2025-03-22T11:30:00",
    location: "Bafoussam Station 1",
    severity: "high",
    status: "investigating",
  },
  {
    id: "ALT-006",
    type: "Exceeded Limit",
    description: "Monthly fuel limit exceeded for Nissan Patrol (PQR-1357)",
    employee: "Sarah Brown",
    employeeId: "EMP006",
    vehicle: "Nissan Patrol",
    vehiclePlate: "PQR-1357",
    amount: 78.2,
    date: "2025-03-22T09:45:00",
    location: "Yaounde Station 2",
    severity: "medium",
    status: "resolved",
  },
  {
    id: "ALT-007",
    type: "Suspicious Pattern",
    description: "Suspicious refill pattern detected for Toyota Corolla (STU-2468)",
    employee: "David Miller",
    employeeId: "EMP007",
    vehicle: "Toyota Corolla",
    vehiclePlate: "STU-2468",
    amount: 32.5,
    date: "2025-03-21T15:20:00",
    location: "Douala Station 2",
    severity: "low",
    status: "new",
  },
  {
    id: "ALT-008",
    type: "Card Misuse",
    description: "Possible fuel card misuse for Honda Accord (VWX-3690)",
    employee: "Jennifer Taylor",
    employeeId: "EMP008",
    vehicle: "Honda Accord",
    vehiclePlate: "VWX-3690",
    amount: 40.8,
    date: "2025-03-21T13:10:00",
    location: "Douala Station 1",
    severity: "high",
    status: "investigating",
  },
]

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)

  // Get unique alert types for filter
  const uniqueAlertTypes = Array.from(new Set(alertsData.map((alert) => alert.type)))

  // Filter alerts based on search query and filters
  const filteredAlerts = alertsData.filter((alert) => {
    const matchesSearch =
      alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSeverity = selectedSeverity === "all" || alert.severity === selectedSeverity
    const matchesStatus = selectedStatus === "all" || alert.status === selectedStatus
    const matchesType = selectedType === "all" || alert.type === selectedType

    const alertDate = new Date(alert.date)
    const matchesDateFrom = !dateFrom || alertDate >= dateFrom
    const matchesDateTo = !dateTo || alertDate <= dateTo

    return matchesSearch && matchesSeverity && matchesStatus && matchesType && matchesDateFrom && matchesDateTo
  })

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Fraud Alerts</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-nestle-red" />
              Filter Alerts
            </CardTitle>
            <CardDescription>Find alerts by description, employee, vehicle, or date range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alert Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {uniqueAlertTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert List</CardTitle>
            <CardDescription>
              Showing {filteredAlerts.length} of {alertsData.length} alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Employee/Vehicle</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <Checkbox id={`select-${alert.id}`} />
                    </TableCell>
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell>{alert.type}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{alert.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={alert.employee} />
                          <AvatarFallback>
                            {alert.employee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{alert.employee}</div>
                          <div className="text-xs text-muted-foreground">{alert.vehiclePlate}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{format(new Date(alert.date), "MMM dd, yyyy")}</div>
                        <div className="text-xs text-muted-foreground">{format(new Date(alert.date), "HH:mm")}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {alert.severity === "high" ? (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
                      ) : alert.severity === "medium" ? (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {alert.status === "new" ? (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>
                      ) : alert.status === "investigating" ? (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Investigating</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/alerts/${alert.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          {alert.status !== "resolved" && (
                            <>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/alerts/investigate/${alert.id}`}>
                                  <AlertTriangle className="mr-2 h-4 w-4" />
                                  Investigate
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                Mark as Resolved
                              </DropdownMenuItem>
                            </>
                          )}
                          {alert.status === "new" && (
                            <DropdownMenuItem>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Dismiss
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

