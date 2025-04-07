"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Download, Filter, MoreHorizontal, FileText, Eye, Calendar } from "lucide-react"
import EmployeeLayout from "@/components/employee-layout"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

// Mock data for transactions
const transactionsData = [
  {
    id: "TRX-001",
    amount: 45.2,
    cost: 101700,
    date: "2025-07-24T10:23:00",
    location: "Douala Station 1",
    status: "completed",
    fuelType: "petrol",
    odometer: 45678,
  },
  {
    id: "TRX-002",
    amount: 38.5,
    cost: 86625,
    date: "2025-07-15T09:15:00",
    location: "Douala Station 2",
    status: "completed",
    fuelType: "petrol",
    odometer: 45123,
  },
  {
    id: "TRX-003",
    amount: 42.0,
    cost: 94500,
    date: "2025-07-08T16:42:00",
    location: "Yaounde Station 1",
    status: "completed",
    fuelType: "petrol",
    odometer: 44678,
  },
  {
    id: "TRX-004",
    amount: 35.8,
    cost: 80550,
    date: "2025-06-30T14:18:00",
    location: "Douala Station 1",
    status: "completed",
    fuelType: "petrol",
    odometer: 44223,
  },
  {
    id: "TRX-005",
    amount: 40.5,
    cost: 91125,
    date: "2025-06-22T11:30:00",
    location: "Douala Station 3",
    status: "completed",
    fuelType: "petrol",
    odometer: 43789,
  },
  {
    id: "TRX-006",
    amount: 43.2,
    cost: 97200,
    date: "2025-06-15T09:45:00",
    location: "Yaounde Station 2",
    status: "completed",
    fuelType: "petrol",
    odometer: 43345,
  },
  {
    id: "TRX-007",
    amount: 37.5,
    cost: 84375,
    date: "2025-06-08T15:20:00",
    location: "Douala Station 2",
    status: "completed",
    fuelType: "petrol",
    odometer: 42890,
  },
  {
    id: "TRX-008",
    amount: 41.8,
    cost: 94050,
    date: "2025-06-01T13:10:00",
    location: "Douala Station 1",
    status: "completed",
    fuelType: "petrol",
    odometer: 42456,
  },
]

export default function EmployeeTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)

  // Get unique locations for filter
  const uniqueLocations = Array.from(new Set(transactionsData.map((tx) => tx.location)))

  // Filter transactions based on search query and filters
  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus
    const matchesLocation = selectedLocation === "all" || transaction.location === selectedLocation

    const txDate = new Date(transaction.date)
    const matchesDateFrom = !dateFrom || txDate >= dateFrom
    const matchesDateTo = !dateTo || txDate <= dateTo

    return matchesSearch && matchesStatus && matchesLocation && matchesDateFrom && matchesDateTo
  })

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <EmployeeLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">My Transactions</h1>
            <p className="text-muted-foreground">View your fuel transaction history</p>
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
              Filter Transactions
            </CardTitle>
            <CardDescription>Find transactions by ID, location, or date range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {uniqueLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
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
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Showing {filteredTransactions.length} of {transactionsData.length} transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Odometer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{format(new Date(transaction.date), "MMM dd, yyyy")}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(transaction.date), "HH:mm")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            transaction.fuelType === "petrol"
                              ? "border-green-200 text-green-700"
                              : "border-blue-200 text-blue-700"
                          }
                        >
                          {transaction.fuelType.charAt(0).toUpperCase() + transaction.fuelType.slice(1)}
                        </Badge>
                        <span>{transaction.amount} L</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(transaction.cost)}</TableCell>
                    <TableCell>{transaction.odometer.toLocaleString()} km</TableCell>
                    <TableCell>
                      {transaction.status === "completed" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
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
                            <Link href={`/employee/transactions/${transaction.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/employee/transactions/receipt/${transaction.id}`}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Receipt
                            </Link>
                          </DropdownMenuItem>
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
    </EmployeeLayout>
  )
}

