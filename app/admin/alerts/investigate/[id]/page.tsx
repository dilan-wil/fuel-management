"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, AlertTriangle, FileText, Car, User, Calendar, Save } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock transaction data
const transactionsData = [
  {
    id: "TRX-001",
    employee: "John Doe",
    employeeId: "EMP001",
    vehicle: "Toyota Camry",
    vehiclePlate: "ABC-1234",
    amount: 45.2,
    cost: 101700,
    date: "2025-03-24T10:23:00",
    location: "Douala Station 1",
    status: "completed",
    fuelType: "petrol",
    odometer: 45678,
    previousOdometer: 45123,
    distance: 555,
    efficiency: 8.2,
    paymentMethod: "Fuel Card",
    cardNumber: "**** **** **** 1234",
    notes: "Regular refill",
    attendant: "James Wilson",
    pumpNumber: "3",
    invoiceNumber: "INV-20250324-001",
  },
  {
    id: "TRX-006",
    employee: "Sarah Brown",
    employeeId: "EMP006",
    vehicle: "Nissan Patrol",
    vehiclePlate: "PQR-1357",
    amount: 78.2,
    cost: 175950,
    date: "2025-03-22T09:45:00",
    location: "Yaounde Station 2",
    status: "flagged",
    fuelType: "diesel",
    odometer: 56789,
    previousOdometer: 56234,
    distance: 555,
    efficiency: 14.1,
    paymentMethod: "Fuel Card",
    cardNumber: "**** **** **** 1357",
    notes: "Unusual volume for vehicle type",
    attendant: "David Wilson",
    pumpNumber: "4",
    invoiceNumber: "INV-20250322-006",
    flagReason: "Volume exceeds typical refill by 35%",
  },
]

// Mock alert data
const alertsData = [
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
    status: "investigating",
    transactionId: "TRX-006",
    details:
      "Vehicle has exceeded its monthly fuel allocation by 25%. Normal monthly allocation is 250 liters, current month usage is 312.5 liters.",
    previousTransactions: [
      { date: "2025-03-15", amount: 65.3, location: "Douala Station 1" },
      { date: "2025-03-08", amount: 70.5, location: "Yaounde Station 2" },
      { date: "2025-03-01", amount: 68.7, location: "Douala Station 3" },
      { date: "2025-02-22", amount: 62.1, location: "Yaounde Station 1" },
    ],
  },
]

export default function InvestigateAlertPage() {
  const params = useParams()
  const transactionId = params.id as string

  // Find the transaction by ID
  const transaction = transactionsData.find((tx) => tx.id === transactionId) || transactionsData[1]

  // Find the alert related to this transaction
  const alert = alertsData.find((a) => a.transactionId === transactionId) || alertsData[0]

  // State for investigation form
  const [investigationNotes, setInvestigationNotes] = useState("")
  const [resolution, setResolution] = useState("")
  const [actionTaken, setActionTaken] = useState("")
  const [suspendCard, setSuspendCard] = useState(false)
  const [adjustLimit, setAdjustLimit] = useState(false)
  const [newLimit, setNewLimit] = useState("250")

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Handle form submission
  const handleSubmit = () => {
    alert('Investigation submitted successfully!')
    // In a real app, this would submit the investigation to the server
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Investigate Alert</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/alerts">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Alerts
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/transactions/${transaction.id}`}>
                <FileText className="mr-2 h-4 w-4" />
                View Transaction
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-red-50 border-b border-red-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
                  <div>
                    <CardTitle className="text-red-800">{alert.type}</CardTitle>
                    <CardDescription className="text-red-700">{alert.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="bg-muted/30 p-4 rounded-md">
                  <p className="font-medium">Alert Details</p>
                  <p className="text-sm mt-2">{alert.details}</p>
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-3">Previous Transactions</p>
                  <div className="space-y-3">
                    {alert.previousTransactions.map((tx, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/20 rounded-md">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{format(new Date(tx.date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>{tx.amount} Liters</span>
                          <span className="text-sm text-muted-foreground">{tx.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-3">Investigation Notes</p>
                  <Textarea
                    placeholder="Enter your investigation notes here..."
                    className="min-h-[150px]"
                    value={investigationNotes}
                    onChange={(e) => setInvestigationNotes(e.target.value)}
                  />
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-3">Resolution</p>
                  <RadioGroup value={resolution} onValueChange={setResolution}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="legitimate" id="legitimate" />
                      <Label htmlFor="legitimate">Legitimate Transaction</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="suspicious" id="suspicious" />
                      <Label htmlFor="suspicious">Suspicious Activity</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fraud" id="fraud" />
                      <Label htmlFor="fraud">Confirmed Fraud</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="error" id="error" />
                      <Label htmlFor="error">System Error</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-3">Action Taken</p>
                  <Select value={actionTaken} onValueChange={setActionTaken}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action taken" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Action Required</SelectItem>
                      <SelectItem value="warning">Issue Warning</SelectItem>
                      <SelectItem value="limit">Adjust Fuel Limit</SelectItem>
                      <SelectItem value="suspend">Suspend Fuel Card</SelectItem>
                      <SelectItem value="report">Report to Management</SelectItem>
                    </SelectContent>
                  </Select>

                  {actionTaken === "limit" && (
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="new-limit">New Monthly Limit (Liters)</Label>
                      <Input id="new-limit" value={newLimit} onChange={(e) => setNewLimit(e.target.value)} />
                    </div>
                  )}

                  {actionTaken === "suspend" && (
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="suspension-reason">Suspension Reason</Label>
                      <Textarea id="suspension-reason" placeholder="Enter reason for card suspension..." />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t pt-6">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-nestle-red hover:bg-nestle-darkred" onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  Submit Investigation
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Information</CardTitle>
                <CardDescription>Details of the flagged transaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Transaction ID</p>
                    <p className="font-medium">{transaction.id}</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Flagged</Badge>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium">
                    {format(new Date(transaction.date), "MMM dd, yyyy")} at{" "}
                    {format(new Date(transaction.date), "HH:mm")}
                  </p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Fuel Details</p>
                  <div className="flex justify-between mt-1">
                    <span>Type:</span>
                    <span className="font-medium">
                      {transaction.fuelType.charAt(0).toUpperCase() + transaction.fuelType.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Amount:</span>
                    <span className="font-medium">{transaction.amount} Liters</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Cost:</span>
                    <span className="font-medium">{formatCurrency(transaction.cost)}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{transaction.location}</p>
                </div>

                <Button variant="outline" asChild className="w-full mt-2">
                  <Link href={`/admin/transactions/${transaction.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Full Transaction
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employee Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={transaction.employee} />
                    <AvatarFallback>
                      {transaction.employee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{transaction.employee}</p>
                    <p className="text-sm text-muted-foreground">{transaction.employeeId}</p>
                  </div>
                </div>

                <Button variant="outline" asChild className="w-full">
                  <Link href={`/admin/employees/${transaction.employeeId}`}>
                    <User className="mr-2 h-4 w-4" />
                    View Employee Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">{transaction.vehicle}</p>
                  <p className="text-sm text-muted-foreground">{transaction.vehiclePlate}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex justify-between mt-1">
                    <span>Odometer:</span>
                    <span className="font-medium">{transaction.odometer.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Distance:</span>
                    <span className="font-medium">{transaction.distance.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Efficiency:</span>
                    <span className="font-medium">{transaction.efficiency} L/100km</span>
                  </div>
                </div>

                <Button variant="outline" asChild className="w-full">
                  <Link href={`/admin/vehicles/${transaction.vehiclePlate}`}>
                    <Car className="mr-2 h-4 w-4" />
                    View Vehicle Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

