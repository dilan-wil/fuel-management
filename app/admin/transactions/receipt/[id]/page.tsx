"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Printer, Share } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
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

export default function TransactionReceiptPage() {
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
            <h1 className="text-2xl font-bold">Transaction Receipt</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href={`/admin/transactions/${transaction.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Transaction Details
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center border-b">
            <div className="flex justify-center mb-2">
              <div className="h-16 w-16 bg-nestle-red rounded-full flex items-center justify-center text-white font-bold text-2xl">
                NC
              </div>
            </div>
            <CardTitle className="text-xl">Nestle Cameroon Fuel Management</CardTitle>
            <p className="text-muted-foreground">Transaction Receipt</p>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receipt No.</p>
                <p className="font-medium">{transaction.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium">
                  {format(new Date(transaction.date), "MMM dd, yyyy")} at {format(new Date(transaction.date), "HH:mm")}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{transaction.location}</p>
              <p className="text-sm">Pump #{transaction.pumpNumber}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Employee</p>
                <p className="font-medium">{transaction.employee}</p>
                <p className="text-sm">{transaction.employeeId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vehicle</p>
                <p className="font-medium">{transaction.vehicle}</p>
                <p className="text-sm">{transaction.vehiclePlate}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Fuel Type</p>
                <p className="font-medium">
                  {transaction.fuelType.charAt(0).toUpperCase() + transaction.fuelType.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Odometer</p>
                <p className="font-medium">{transaction.odometer.toLocaleString()} km</p>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between py-1">
                <span>Quantity</span>
                <span>{transaction.amount} Liters</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Unit Price</span>
                <span>{formatCurrency(transaction.cost / transaction.amount)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{formatCurrency(transaction.cost)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax (0%)</span>
                <span>{formatCurrency(0)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-1 font-bold">
                <span>Total</span>
                <span>{formatCurrency(transaction.cost)}</span>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{transaction.paymentMethod}</p>
                <p className="text-sm">{transaction.cardNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendant</p>
                <p className="font-medium">{transaction.attendant}</p>
              </div>
            </div>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Invoice Number</p>
              <p className="font-medium">{transaction.invoiceNumber}</p>
            </div>

            {transaction.notes && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p>{transaction.notes}</p>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex-col space-y-2 text-center text-sm text-muted-foreground border-t pt-6">
            <p>Thank you for using Nestle Cameroon Fuel Management System</p>
            <p>This is an electronically generated receipt</p>
            <div className="mt-4 flex justify-center">
              <div className="h-24 w-24 bg-muted flex items-center justify-center text-xs">QR Code</div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  )
}

