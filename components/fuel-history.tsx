"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Search, Calendar, TrendingUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { describe } from "node:test";

// Mock transaction history data
const transactionHistory: any[] = [
  // ... (your transaction data goes here)
];

// Prepare data for efficiency chart
const efficiencyData = transactionHistory
  .slice()
  .reverse()
  .map((tx) => ({
    date: tx.date,
    efficiency: tx.efficiency,
    mileage: tx.mileageSinceLastRefill,
    amount: tx.amount,
  }));

export function FuelHistory() {
  const [month, setMonth] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showTransactionDetails, setShowTransactionDetails] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showEfficiencyChart, setShowEfficiencyChart] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null);

  // Filter transactions by month and search query
  const filteredTransactions = transactionHistory.filter((transaction) => {
    const matchesMonth = month === "all" || transaction.date.startsWith(month);
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.purpose.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMonth && matchesSearch;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;

    if (a[key] < b[key]) {
      return direction === "ascending" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
      currencyDisplay: "name",
    }).format(amount);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Fuel Transaction History
              </CardTitle>
              <CardDescription>View your past fuel transactions and consumption patterns</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8 w-full sm:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="2023-11">November 2023</SelectItem>
                  <SelectItem value="2023-10">October 2023</SelectItem>
                  <SelectItem value="2023-09">September 2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={() => setShowEfficiencyChart(true)}>
                <TrendingUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("date")}>
                      Date
                      {sortConfig?.key === "date" && <ArrowUpDown className="ml-2 h-3 w-3 inline" />}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("station")}>
                      Station
                      {sortConfig?.key === "station" && <ArrowUpDown className="ml-2 h-3 w-3 inline" />}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("amount")}>
                      Amount
                      {sortConfig?.key === "amount" && <ArrowUpDown className="ml-2 h-3 w-3 inline" />}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("efficiency")}>
                      Efficiency
                      {sortConfig?.key === "efficiency" && <ArrowUpDown className="ml-2 h-3 w-3 inline" />}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTransactions.length > 0 ? (
                  sortedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {new Date(transaction.date).toLocaleDateString()}
                        <div className="text-xs text-muted-foreground">{transaction.time}</div>
                      </TableCell>
                      <TableCell>
                        {transaction.station}
                        <div className="text-xs text-muted-foreground">{transaction.purpose}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        {transaction.amount} L
                        <div className="text-xs text-muted-foreground">{formatCurrency(transaction.cost)}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        {transaction.efficiency} L/100km
                        <div className="text-xs text-muted-foreground">{transaction.mileageSinceLastRefill} km driven</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={transaction.status === "completed" ? "success" : "outline"}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(transaction)}>
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={showTransactionDetails} onOpenChange={setShowTransactionDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Complete information about this fuel transaction</DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Transaction #{selectedTransaction.id}</h3>
                <Badge variant={selectedTransaction.status === "completed" ? "success" : "outline"}>
                  {selectedTransaction.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Date & Time</p>
                  <p className="font-medium">
                    {new Date(selectedTransaction.date).toLocaleDateString()} {selectedTransaction.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Station</p>
                  <p className="font-medium">{selectedTransaction.station}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-medium">{selectedTransaction.amount} L</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cost</p>
                  <p className="font-medium">{formatCurrency(selectedTransaction.cost)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Purpose</p>
                  <p className="font-medium">{selectedTransaction.purpose}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Odometer Reading</p>
                  <p className="font-medium">{selectedTransaction.odometer} km</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Distance Since Last Refill</p>
                  <p className="font-medium">{selectedTransaction.mileageSinceLastRefill} km</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fuel Efficiency</p>
                  <p className="font-medium">{selectedTransaction.efficiency} L/100km</p>
                </div>
              </div>

              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs text-muted-foreground mb-1">Efficiency Analysis</p>
                <p className="text-sm">
                  {selectedTransaction.efficiency < 8.7
                    ? "Your fuel efficiency was better than average for this trip."
                    : selectedTransaction.efficiency > 9.0
                      ? "Your fuel efficiency was below average for this trip. Consider checking your driving habits or vehicle condition."
                      : "Your fuel efficiency was within normal range for this trip."}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransactionDetails(false)}>
              Close
            </Button>
            <Button asChild>
              <a href={`/employee/transactions/receipt/${selectedTransaction?.id}`} target="_blank" rel="noreferrer">
                View Receipt
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Efficiency Chart Dialog */}
      <Dialog open={showEfficiencyChart} onOpenChange={setShowEfficiencyChart}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Fuel Efficiency Trends</DialogTitle>
            <DialogDescription>Track your vehicle's fuel efficiency over time</DialogDescription>
          </DialogHeader>

          <div className="h-[300px]">
            <ChartContainer
              config={{
                efficiency: {
                  label: "Efficiency (L/100km)",
                  color: "hsl(var(--chart-1))",
                },
                mileage: {
                  label: "Distance (km)",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" domain={[8, 10]} />
                  <YAxis yAxisId="right" orientation="right" domain={[300, 600]} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="var(--color-efficiency)"
                    name="Fuel Efficiency (L/100km)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="mileage"
                    stroke="var(--color-mileage)"
                    name="Distance Driven (km)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="space-y-2 mt-2">
            <h4 className="text-sm font-medium">Efficiency Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Your average fuel efficiency over the last 5 refills is 8.8 L/100km. The most efficient refill was on
              November 10, 2023 with 8.5 L/100km.
            </p>
            <p className="text-sm text-muted-foreground">
              Maintaining consistent driving habits and regular vehicle maintenance can help improve your fuel
              efficiency.
            </p>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowEfficiencyChart(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}