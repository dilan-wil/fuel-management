"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Download,
  Filter,
  MoreHorizontal,
  FileText,
  Eye,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedFuelType, setSelectedFuelType] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const { transactions } = useAuth();
  // Get unique employees for filter
  const uniqueEmployees = Array.from(
    new Set(transactions.map((tx: any) => tx.employeeId))
  ).map((id) => {
    const tx = transactions.find((t: any) => t.employeeId === id);
    return { id, name: tx?.employee };
  });

  // Get unique vehicles for filter
  const uniqueVehicles = Array.from(
    new Set(transactions.map((tx: any) => tx.vehiclePlate))
  ).map((plate) => {
    const tx = transactions.find((t: any) => t.vehiclePlate === plate);
    return { plate, name: tx?.vehicle };
  });

  // Filter transactions based on search query and filters
  const filteredTransactions = transactions.filter((transaction: any) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.vehiclePlate
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEmployee =
      selectedEmployee === "all" || transaction.employeeId === selectedEmployee;
    const matchesVehicle =
      selectedVehicle === "all" || transaction.vehiclePlate === selectedVehicle;
    const matchesStatus =
      selectedStatus === "all" || transaction.status === selectedStatus;
    const matchesFuelType =
      selectedFuelType === "all" || transaction.fuelType === selectedFuelType;

    const txDate = new Date(transaction.date);
    const matchesDateFrom = !dateFrom || txDate >= dateFrom;
    const matchesDateTo = !dateTo || txDate <= dateTo;

    return (
      matchesSearch &&
      matchesEmployee &&
      matchesVehicle &&
      matchesStatus &&
      matchesFuelType &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

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
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Transaction History</h1>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex items-center"
            >
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
              Filter Transactions
            </CardTitle>
            <CardDescription>
              Find transactions by ID, employee, vehicle, or date range
            </CardDescription>
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
                <Select
                  value={selectedEmployee}
                  onValueChange={setSelectedEmployee}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    {uniqueEmployees.map((emp: any) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select
                  value={selectedVehicle}
                  onValueChange={setSelectedVehicle}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    {uniqueVehicles.map((veh: any) => (
                      <SelectItem key={veh.plate} value={veh.plate}>
                        {veh.name} ({veh.plate})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 md:max-w-[200px]">
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select
                  value={selectedFuelType}
                  onValueChange={setSelectedFuelType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fuel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fuel Types</SelectItem>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction List</CardTitle>
            <CardDescription>
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction: any) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Checkbox id={`select-${transaction.id}`} />
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32`}
                            alt={transaction.employee}
                          />
                          <AvatarFallback>
                            {transaction.employeeName
                              .split(" ")
                              .map((n: any) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {transaction.employeeName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {transaction.employeeId}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{transaction.vehicleModel}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.vehiclePlate}
                        </div>
                      </div>
                    </TableCell>
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
                          {transaction.fuelType.charAt(0).toUpperCase() +
                            transaction.fuelType.slice(1)}
                        </Badge>
                        <span>{transaction.amount} L</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatCurrency(transaction.totalCost)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>
                          {format(new Date(transaction.date), "MMM dd, yyyy")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(transaction.date), "HH:mm")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.status === "completed" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Completed
                        </Badge>
                      ) : transaction.status === "pending" ? (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          Pending
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                          Flagged
                        </Badge>
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
                            <Link
                              href={`/admin/transactions/${transaction.id}`}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/transactions/receipt/${transaction.id}`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Receipt
                            </Link>
                          </DropdownMenuItem>
                          {transaction.status === "flagged" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/admin/alerts/investigate/${transaction.id}`}
                                >
                                  <AlertTriangle className="mr-2 h-4 w-4" />
                                  Investigate
                                </Link>
                              </DropdownMenuItem>
                            </>
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
  );
}
