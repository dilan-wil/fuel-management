"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  CreditCard,
  Car,
  FileText,
  Calendar,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  FuelIcon as GasPump,
  HelpCircle,
} from "lucide-react";
import EmployeeLayout from "@/components/employee-layout";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth-context";

// Mock data for dashboard
const consumptionData = [
  { month: "Jan", amount: 180 },
  { month: "Feb", amount: 210 },
  { month: "Mar", amount: 195 },
  { month: "Apr", amount: 240 },
  { month: "May", amount: 225 },
  { month: "Jun", amount: 260 },
  { month: "Jul", amount: 230 },
  { month: "Aug", amount: 0 },
  { month: "Sep", amount: 0 },
  { month: "Oct", amount: 0 },
  { month: "Nov", amount: 0 },
  { month: "Dec", amount: 0 },
];

const efficiencyData = [
  { month: "Jan", efficiency: 9.2 },
  { month: "Feb", efficiency: 8.9 },
  { month: "Mar", efficiency: 9.1 },
  { month: "Apr", efficiency: 8.7 },
  { month: "May", efficiency: 8.5 },
  { month: "Jun", efficiency: 8.8 },
  { month: "Jul", efficiency: 8.6 },
];

const recentTransactions = [
  {
    id: "TRX-001",
    date: "Today, 10:23 AM",
    location: "Douala Station 1",
    amount: "45.2 L",
    cost: "101 700 FCFA",
    status: "completed",
  },
  {
    id: "TRX-002",
    date: "Jul 15, 09:15 AM",
    location: "Douala Station 2",
    amount: "38.5 L",
    cost: "86 625 FCFA",
    status: "completed",
  },
  {
    id: "TRX-003",
    date: "Jul 8, 16:42 PM",
    location: "Yaounde Station 1",
    amount: "42.0 L",
    cost: "94 500 FCFA",
    status: "completed",
  },
];

export default function EmployeeDashboardPage() {
  const [timeRange, setTimeRange] = useState("year");
  const [lastUpdated, setLastUpdated] = useState("2 minutes ago");
  const [employeeCard, setEmployeeCard] = useState<any>({});
  const { employee, cards, transactions } = useAuth();

  useEffect(() => {
    const hisCard = cards?.find((card: any) => card.employeeId == employee.id);
    setEmployeeCard(hisCard);
  }, [employee, cards]);
  // Function to handle refresh
  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    setLastUpdated("Just now");
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <EmployeeLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Employee Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {employee?.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Consumption
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employee?.liter ?? 0} L</div>
              <p className="text-xs text-muted-foreground">
                -11.5% from last month
              </p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div
                  className="h-1 bg-nestle-red"
                  style={{ width: "92%" }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                92% of monthly limit (250L)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Fuel Card Balance
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {employeeCard?.balance ?? 0} FCFA
              </div>
              <p className="text-xs text-muted-foreground">
                Card: {employeeCard?.cardNumber ?? "none"}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Active
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Expires: 12/25
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vehicle Status
              </CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Ford Focus</div>
              <p className="text-xs text-muted-foreground">Plate: LT128BR</p>
              <div className="mt-4 flex items-center gap-2">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  Maintenance Due
                </Badge>
                <span className="text-xs text-muted-foreground">In 5 days</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Fuel Efficiency
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.6 L/100km</div>
              <p className="text-xs text-muted-foreground">
                +0.1 from last month
              </p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div
                  className="h-1 bg-green-500"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Good efficiency rating
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-nestle-red" />
                Fuel Consumption History
              </CardTitle>
              <CardDescription>
                Monthly fuel consumption for {new Date().getFullYear()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    amount: {
                      label: "Fuel Amount (Liters)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={consumptionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar
                        dataKey="amount"
                        fill="var(--color-amount)"
                        name="Fuel Amount"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-nestle-red" />
                Recent Transactions
              </CardTitle>
              <CardDescription>Your latest fuel transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions
                  ?.filter(
                    (transaction: any) => transaction.employeeId === employee.id
                  )
                  .map((transaction: any) => (
                    <div
                      key={transaction.id}
                      className="flex flex-col gap-2 border-b pb-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{transaction.date}</div>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {transaction.location}
                        </span>
                        <span>{transaction.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Transaction ID: {transaction.id}
                        </span>
                        <span>{transaction.cost}</span>
                      </div>
                    </div>
                  ))}
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/employee/transactions">
                    View All Transactions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-nestle-red" />
                Fuel Efficiency Trend
              </CardTitle>
              <CardDescription>
                Monthly fuel efficiency in L/100km
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    efficiency: {
                      label: "Efficiency (L/100km)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={efficiencyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[8, 10]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="var(--color-efficiency)"
                        name="Fuel Efficiency"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-nestle-red" />
                Important Notices
              </CardTitle>
              <CardDescription>Updates and information for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-md border border-amber-100">
                  <div className="bg-amber-100 rounded-full p-1.5 mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800">
                      Vehicle Maintenance Due
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      Your vehicle is due for maintenance in 5 days. Please
                      schedule a service appointment.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 border-amber-200 text-amber-700"
                    >
                      Schedule Service
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md border border-blue-100">
                  <div className="bg-blue-100 rounded-full p-1.5 mt-0.5">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">
                      Fuel Card Update
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Your monthly fuel limit has been updated to 250 liters for
                      the current month.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-md border border-green-100">
                  <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">
                      Efficiency Improvement
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Your fuel efficiency has improved by 3.5% compared to the
                      previous quarter. Keep up the good work!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Fuel Limit Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Daily Limit</span>
                    <span>15 / 20 L</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weekly Limit</span>
                    <span>85 / 100 L</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Monthly Limit</span>
                    <span>230 / 250 L</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Model:</span>
                  <span className="text-sm font-medium">Toyota Camry</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Plate Number:
                  </span>
                  <span className="text-sm font-medium">ABC-1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Odometer:
                  </span>
                  <span className="text-sm font-medium">45,678 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last Service:
                  </span>
                  <span className="text-sm font-medium">June 15, 2025</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                asChild
              >
                <Link href="/employee/vehicle">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/employee/quick-actions">
                    <GasPump className="mr-2 h-4 w-4" />
                    Request Fuel
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/employee/vehicle">
                    <Car className="mr-2 h-4 w-4" />
                    Vehicle Details
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/employee/fuel-card">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manage Fuel Card
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/employee/help">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Get Help
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </EmployeeLayout>
  );
}
