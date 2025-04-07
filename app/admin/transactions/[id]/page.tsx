"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Download, Car, User, AlertTriangle } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { useParams } from "next/navigation"

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
    id: "TRX-002",
    employee: "Jane Smith",
    employeeId: "EMP002",
    vehicle: "Honda Civic",
    vehiclePlate: "DEF-5678",
    amount: 38.5,
    cost: 86625,
    date: "2025-03-24T09:15:00",
    location: "Douala Station 2",
    status: "completed",
    fuelType: "petrol",
    odometer: 32456,
    previousOdometer: 32056,
    distance: 400,
    efficiency: 9.6,
    paymentMethod: "Fuel Card",
    cardNumber: "**** **** **** 5678",
    notes: "Regular refill",
    attendant: "Sarah Johnson",
    pumpNumber: "2",
    invoiceNumber: "INV-20250324-002",
  },
  {
    id: "TRX-003",
    employee: "Robert Johnson",
    employeeId: "EMP003",
    vehicle: "Nissan Altima",
    vehiclePlate: "JKL-3456",
    amount: 42.0,
    cost: 94500,
    date: "2025-03-23T16:42:00",
    location: "Yaounde Station 1",
    status: "completed",
    fuelType: "petrol",
    odometer: 28765,
    previousOdometer: 28321,
    distance: 444,
    efficiency: 9.5,
    paymentMethod: "Fuel Card",
    cardNumber: "**** **** **** 3456",
    notes: "Regular refill",
    attendant: "Michael Brown",
    pumpNumber: "1",
    invoiceNumber: "INV-20250323-003",
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

export default function TransactionDetailsPage() {
  const params = useParams()
  const transactionId = params.id as string

  // Find the transaction by ID
  const transaction = transactionsData.find((tx) => tx.id === transactionId) || transactionsData[0]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
      currencyDisplay: "name",
    }).format(amount)
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Transaction Details</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/transactions">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Transactions
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/transactions/receipt/${transaction.id}`}>
                <FileText className="mr-2 h-4 w-4" />
                View Receipt
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Details
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Information</CardTitle>
                <CardDescription>Details of transaction {transaction.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Transaction ID</p>
                    <p className="font-medium">{transaction.id}</p>
                  </div>
                  <Badge
                    className={
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : transaction.status === "pending"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Badge>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{format(new Date(transaction.date), "MMMM dd, yyyy")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{format(new Date(transaction.date), "HH:mm")}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fuel Type</p>
                    <p className="font-medium">
                      {transaction.fuelType.charAt(0).toUpperCase() + transaction.fuelType.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">{transaction.amount} Liters</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Unit Price</p>
                    <p className="font-medium">{formatCurrency(transaction.cost / transaction.amount)} / Liter</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="font-medium">{formatCurrency(transaction.cost)}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{transaction.location}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Attendant</p>
                    <p className="font-medium">{transaction.attendant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pump Number</p>
                    <p className="font-medium">{transaction.pumpNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice Number</p>
                    <p className="font-medium">{transaction.invoiceNumber}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{transaction.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Card Number</p>
                    <p className="font-medium">{transaction.cardNumber}</p>
                  </div>
                </div>

                {transaction.status === "flagged" && (
                  <>
                    <Separator />
                    <div className="bg-red-50 p-4 rounded-md border border-red-100">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-800">Transaction Flagged</p>
                          <p className="text-sm text-red-700 mt-1">{transaction.flagReason}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {transaction.notes && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <p className="font-medium">{transaction.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
              {transaction.status === "flagged" && (
                <CardFooter>
                  <Button asChild className="ml-auto bg-nestle-red hover:bg-nestle-darkred">
                    <Link href={`/admin/alerts/investigate/${transaction.id}`}>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Investigate
                    </Link>
                  </Button>
                </CardFooter>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>Details of the vehicle used in this transaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full p-3">
                    <Car className="h-6 w-6 text-nestle-red" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{transaction.vehicle}</p>
                    <p className="text-muted-foreground">{transaction.vehiclePlate}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Odometer</p>
                    <p className="font-medium">{transaction.odometer.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Previous Odometer</p>
                    <p className="font-medium">{transaction.previousOdometer.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Distance Traveled</p>
                    <p className="font-medium">{transaction.distance.toLocaleString()} km</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                  <p className="font-medium">{transaction.efficiency} L/100km</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Information</CardTitle>
                <CardDescription>Details of the employee who made this transaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={transaction.employee} />
                    <AvatarFallback className="text-lg">
                      {transaction.employee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-lg">{transaction.employee}</p>
                    <p className="text-muted-foreground">{transaction.employeeId}</p>
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
                <CardTitle>Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Amount:</span>
                  <span className="font-medium">{transaction.amount} Liters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Unit Price:</span>
                  <span className="font-medium">{formatCurrency(transaction.cost / transaction.amount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(transaction.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (0%):</span>
                  <span className="font-medium">{formatCurrency(0)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">{formatCurrency(transaction.cost)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/admin/transactions/receipt/${transaction.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Receipt
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/admin/vehicles/${transaction.vehiclePlate}`}>
                    <Car className="mr-2 h-4 w-4" />
                    View Vehicle Details
                  </Link>
                </Button>
                {transaction.status === "flagged" && (
                  <Button className="w-full justify-start bg-nestle-red hover:bg-nestle-darkred" asChild>
                    <Link href={`/admin/alerts/investigate/${transaction.id}`}>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Investigate
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

