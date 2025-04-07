"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Car,
  Users,
  FileText,
  Calendar,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { VehicleInfo } from "@/components/vehicle-info"
import { db } from "@/lib/firebase"
import { onSnapshot, collection, query, where } from "firebase/firestore"
// Mock data for dashboard
const consumptionData = [
  { day: "Mon", diesel: 450, petrol: 580 },
  { day: "Tue", diesel: 520, petrol: 620 },
  { day: "Wed", diesel: 480, petrol: 550 },
  { day: "Thu", diesel: 510, petrol: 590 },
  { day: "Fri", diesel: 530, petrol: 610 },
  { day: "Sat", diesel: 320, petrol: 380 },
  { day: "Sun", diesel: 280, petrol: 320 },
]

const departmentData = [
  { name: "Sales", value: 35 },
  { name: "Operations", value: 40 },
  { name: "Admin", value: 10 },
  { name: "Management", value: 10 },
  { name: "IT", value: 5 },
]

const COLORS = ["#E3000F", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const recentTransactions = [
  {
    id: "TRX-001",
    employee: "John Doe",
    vehicle: "Toyota Camry (ABC-1234)",
    amount: "45.2 L",
    cost: "101,700 FCFA",
    date: "Today, 10:23 AM",
    status: "completed",
  },
  {
    id: "TRX-002",
    employee: "Jane Smith",
    vehicle: "Honda Civic (DEF-5678)",
    amount: "38.5 L",
    cost: "86,625 FCFA",
    date: "Today, 09:15 AM",
    status: "completed",
  },
  {
    id: "TRX-003",
    employee: "Robert Johnson",
    vehicle: "Nissan Altima (JKL-3456)",
    amount: "42.0 L",
    cost: "94,500 FCFA",
    date: "Yesterday, 16:42 PM",
    status: "completed",
  },
  {
    id: "TRX-004",
    employee: "Emily Davis",
    vehicle: "Ford Focus (GHI-9012)",
    amount: "35.8 L",
    cost: "80,550 FCFA",
    date: "Yesterday, 14:18 PM",
    status: "completed",
  },
]

const alertsData = [
  {
    id: "ALT-001",
    type: "Unusual Volume",
    description: "Unusual fuel volume for Toyota Camry (ABC-1234)",
    severity: "high",
    date: "Today, 11:32 AM",
    status: "new",
  },
  {
    id: "ALT-002",
    type: "Multiple Refills",
    description: "Multiple refills in short period for Honda Civic (DEF-5678)",
    severity: "medium",
    date: "Today, 09:45 AM",
    status: "investigating",
  },
  {
    id: "ALT-003",
    type: "Odometer Discrepancy",
    description: "Odometer reading inconsistency for Nissan Altima (JKL-3456)",
    severity: "low",
    date: "Yesterday, 15:20 PM",
    status: "resolved",
  },
]
interface Refill {
  fuel_quantity: any
  createdAt: any
  id: string
  employee: string
  vehicle: string
  liters: number
  cost: number
  timestamp: { seconds: number; nanoseconds: number }
  status: string
}

interface Alert {
  id: string
  message: string
  severity: "low" | "medium" | "high"
  timestamp: { seconds: number; nanoseconds: number }
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [lastUpdated, setLastUpdated] = useState("2 minutes ago")
const { employees } = useAuth()
const [totalLiters, setTotalLiters] = useState(0)
  const [activeVehicles, setActiveVehicles] = useState(0)
  const [transactions, setTransactions] = useState<Refill[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])

  // Function to handle refresh
  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    setLastUpdated("Just now")
  }
  const unsubscribeRefill = onSnapshot(collection(db, "refill"), (snapshot) => {
    let total = 0
    const vehicleSet = new Set()
    const refillList: Refill[] = []

    snapshot.forEach((doc) => {
      const data = doc.data()
      total += parseFloat(data.liters || 0)
      vehicleSet.add(data.vehicle)
      refillList.push({
        id: doc.id, ...data,
        employee: "",
        vehicle: "",
        liters: 0,
        cost: 0,
        timestamp: {
          seconds: 0,
          nanoseconds: 0
        },
        status: "",
        fuel_quantity: undefined,
        createdAt: undefined
      })
    })

    setTotalLiters(total)
    setActiveVehicles(vehicleSet.size)
    const sorted = refillList.sort(
      (a, b) => b.timestamp?.seconds - a.timestamp?.seconds
    )
    setTransactions(sorted.slice(0, 4))
  })

  const unsubscribeAlerts = onSnapshot(collection(db, "alerts"), (snapshot) => {
    const alertList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Alert[]
    setAlerts(alertList)
  })
  const [activeEmployeeCount, setActiveEmployeeCount] = useState<number>(0);
  const [totalFuelRefilled, setTotalFuelRefilled] = useState<number>(0);
  const [refillHistory, setRefillHistory] = useState<Refill[]>([]);

  // Realtime active employees
  useEffect(() => {
    const q = query(collection(db, 'employees'), where('status', '==', 'active'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setActiveEmployeeCount(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Realtime fuel refills
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'refill'), (snapshot) => {
      const refills: Refill[] = [];
      let total = 0;
      snapshot.forEach((doc) => {
        const data = doc.data() as Refill;
        if (data.fuel_quantity && data.createdAt) {
          refills.push(data);
          total += data.fuel_quantity;
        }
      });
      setRefillHistory(refills);
      setTotalFuelRefilled(total);
    });
    return () => unsubscribe();
  }, []);

  // Format data for chart (last 7 days)
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const label = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

    const totalForDay = refillHistory
      .filter((refill) => {
        const refillDate = refill.createdAt.toDate();
        return (
          refillDate.getDate() === date.getDate() &&
          refillDate.getMonth() === date.getMonth() &&
          refillDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((sum, refill) => sum + refill.fuel_quantity, 0);

    return {
      date: label,
      fuel: totalForDay,
    };
  });


  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {employees?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
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
              <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLiters}</div>
              <p className="text-xs text-muted-foreground">+5.2% from last week</p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 bg-nestle-red" style={{ width: "" }}></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">65% of monthly target</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeVehicles}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 bg-blue-500" style={{ width: "80%" }}></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">80% of fleet in use</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees?.length}</div>
              <p className="text-xs text-muted-foreground">No change from last week</p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 bg-green-500" style={{ width: "90%" }}></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">90% of employees active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
              <p className="text-xs text-muted-foreground">+1 from last week</p>
              <div className="mt-4 flex items-center gap-2">
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">1 High</Badge>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">1 Medium</Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">1 Low</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-nestle-red" />
                Weekly Consumption
              </CardTitle>
              <CardDescription>Fuel consumption for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    diesel: {
                      label: "Diesel (Liters)",
                      color: "hsl(var(--chart-1))",
                    },
                    petrol: {
                      label: "Petrol (Liters)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={consumptionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="diesel" fill="var(--color-diesel)" name="Diesel" />
                      <Bar dataKey="petrol" fill="var(--color-petrol)" name="Petrol" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-nestle-red" />
                Department Breakdown
              </CardTitle>
              <CardDescription>Consumption by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-nestle-red" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Latest fuel transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/transactions">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-4 border-b pb-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={transaction.employee} />
                      <AvatarFallback>
                        {transaction.employee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{transaction.employee}</p>
                        <p className="text-sm font-medium">{transaction.amount}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{transaction.vehicle}</p>
                        <p className="text-xs text-muted-foreground">{transaction.cost}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-nestle-red" />
                  Fraud Alerts
                </CardTitle>
                <CardDescription>Recent suspicious activities</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/alerts">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertsData.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 border-b pb-4">
                    <div
                      className={`mt-0.5 rounded-full p-1 ${
                        alert.severity === "high"
                          ? "bg-red-100"
                          : alert.severity === "medium"
                            ? "bg-amber-100"
                            : "bg-blue-100"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-4 w-4 ${
                          alert.severity === "high"
                            ? "text-red-600"
                            : alert.severity === "medium"
                              ? "text-amber-600"
                              : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{alert.type}</p>
                        <Badge
                          variant="outline"
                          className={
                            alert.status === "new"
                              ? "text-red-600 border-red-200"
                              : alert.status === "investigating"
                                ? "text-amber-600 border-amber-200"
                                : "text-green-600 border-green-200"
                          }
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Monthly Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6 750 000 FCFA</div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span>4 387 500 FCFA</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">65% used</span>
                  <span className="text-muted-foreground">2 362 500 FCFA remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Upcoming Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Vehicles</div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Toyota Camry (ABC-1234)</span>
                  <Badge variant="outline" className="text-amber-600 border-amber-200">
                    2 days
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Honda Civic (DEF-5678)</span>
                  <Badge variant="outline" className="text-amber-600 border-amber-200">
                    3 days
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Ford Focus (GHI-9012)</span>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    5 days
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/monthly-report">
                    <Calendar className="mr-2 h-4 w-4" />
                    Generate Monthly Report
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/employees/add">
                    <Users className="mr-2 h-4 w-4" />
                    Add New Employee
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/vehicles/add">
                    <Car className="mr-2 h-4 w-4" />
                    Add New Vehicle
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Services</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Gateway</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS Notifications</span>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Degraded</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

