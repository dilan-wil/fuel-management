import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CreditCard, FileText, Clock, CheckCircle2, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Fuel Card | Nestle Cameroon Fuel Management",
  description: "Manage your fuel card and view transaction history",
}

// Mock fuel card data
const fuelCardData = {
  cardNumber: "**** **** **** 1234",
  cardHolder: "John Doe",
  expiryDate: "12/25",
  status: "Active",
  balance: 562500,
  monthlyLimit: 250, // liters
  consumed: 175,
  remaining: 75,
  lastTransaction: {
    date: "2023-11-25",
    amount: 45,
    location: "Douala Station 1",
    cost: 101250,
  },
}

// Mock transaction history
const transactionHistory = [
  {
    id: "TRX-001",
    date: "2023-11-25",
    time: "10:23 AM",
    location: "Douala Station 1",
    amount: 45.2,
    cost: 101700,
    odometer: 24560,
    status: "completed",
  },
  {
    id: "TRX-002",
    date: "2023-11-10",
    time: "09:15 AM",
    location: "Douala Station 2",
    amount: 38.5,
    cost: 86625,
    odometer: 24100,
    status: "completed",
  },
  {
    id: "TRX-003",
    date: "2023-10-28",
    time: "16:42 PM",
    location: "Yaounde Station 1",
    amount: 42.0,
    cost: 94500,
    odometer: 23600,
    status: "completed",
  },
]

// Mock pending requests
const pendingRequests = [
  {
    id: "REQ-001",
    date: "2023-11-28",
    time: "14:05 PM",
    station: "Douala Station 1",
    amount: 40.0,
    purpose: "Official Travel",
    status: "pending",
    submittedAt: "2 hours ago",
  },
]

export default function FuelCardPage() {
  const consumedPercentage = (fuelCardData.consumed / fuelCardData.monthlyLimit) * 100
  const remainingPercentage = (fuelCardData.remaining / fuelCardData.monthlyLimit) * 100

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
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Fuel Card</h1>
        <p className="text-muted-foreground">Manage your fuel card and view transaction history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">Nestle Cameroon Fuel Card</CardTitle>
                <CardDescription className="text-slate-300">Corporate Fuel Management</CardDescription>
              </div>
              <ShieldCheck className="h-6 w-6 text-slate-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-400">Card Number</p>
                  <p className="text-lg font-medium">{fuelCardData.cardNumber}</p>
                </div>
                <CreditCard className="h-8 w-8 text-slate-300" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Card Holder</p>
                  <p>{fuelCardData.cardHolder}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Expires</p>
                  <p>{fuelCardData.expiryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <Badge className="bg-green-500 hover:bg-green-600 text-white">{fuelCardData.status}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-700 pt-4">
            <div className="w-full flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-400">Available Balance</p>
                <p className="text-xl font-bold">{formatCurrency(fuelCardData.balance)}</p>
              </div>
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                Request Top-up
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fuel Limit Status</CardTitle>
            <CardDescription>Your current monthly fuel allocation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Monthly Limit</span>
                <span className="font-medium">{fuelCardData.monthlyLimit}L</span>
              </div>
              <Progress value={consumedPercentage} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Used: {fuelCardData.consumed}L ({consumedPercentage.toFixed(0)}%)
                </span>
                <span className="text-muted-foreground">Remaining: {fuelCardData.remaining}L</span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Last Transaction</h4>
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{new Date(fuelCardData.lastTransaction.date).toLocaleDateString()}</span>
                  <Badge variant="outline">{fuelCardData.lastTransaction.amount}L</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">At {fuelCardData.lastTransaction.location}</p>
                <p className="text-xs text-muted-foreground">
                  Cost: {formatCurrency(fuelCardData.lastTransaction.cost)}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="/employee/quick-actions">Request Fuel</a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Transaction History
              </CardTitle>
              <CardDescription>Your recent fuel card transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionHistory.map((transaction) => (
                  <div key={transaction.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{transaction.location}</h3>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date} at {transaction.time}
                        </p>
                      </div>
                      <Badge variant="outline">{transaction.id}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Amount:</span> {transaction.amount} L
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost:</span> {formatCurrency(transaction.cost)}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Odometer:</span> {transaction.odometer} km
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <Badge
                          variant="outline"
                          className="ml-1 bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/employee/transactions/receipt/${transaction.id}`}>View Receipt</a>
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button variant="outline" asChild>
                    <a href="/employee/transactions">
                      <FileText className="mr-2 h-4 w-4" />
                      View All Transactions
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Requests
              </CardTitle>
              <CardDescription>Your fuel requests awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{request.purpose}</h3>
                          <p className="text-sm text-muted-foreground">
                            {request.date} at {request.time}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200"
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Station:</span> {request.station}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span> {request.amount} L
                        </div>
                        <div>
                          <span className="text-muted-foreground">Request ID:</span> {request.id}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Submitted:</span> {request.submittedAt}
                        </div>
                      </div>
                      <Alert className="mt-3">
                        <Clock className="h-4 w-4" />
                        <AlertTitle>Awaiting Approval</AlertTitle>
                        <AlertDescription>
                          Your request is pending approval from your supervisor. You will be notified once it's
                          approved.
                        </AlertDescription>
                      </Alert>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No Pending Requests</h3>
                  <p className="text-muted-foreground mt-1">You don't have any pending fuel requests at the moment.</p>
                  <Button className="mt-4" asChild>
                    <a href="/employee/quick-actions">Request Fuel</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

