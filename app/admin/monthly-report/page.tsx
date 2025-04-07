"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, BarChart3, Filter, Printer, FileText, FileSpreadsheet } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { toast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for monthly report
const monthlyData = [
  { month: "Jan", diesel: 12500, petrol: 15000, total: 27500 },
  { month: "Feb", diesel: 11800, petrol: 14200, total: 26000 },
  { month: "Mar", diesel: 13200, petrol: 16500, total: 29700 },
  { month: "Apr", diesel: 14500, petrol: 17800, total: 32300 },
  { month: "May", diesel: 15800, petrol: 18200, total: 34000 },
  { month: "Jun", diesel: 16200, petrol: 19500, total: 35700 },
  { month: "Jul", diesel: 17500, petrol: 21000, total: 38500 },
  { month: "Aug", diesel: 16800, petrol: 20500, total: 37300 },
  { month: "Sep", diesel: 15500, petrol: 19800, total: 35300 },
  { month: "Oct", diesel: 14200, petrol: 18500, total: 32700 },
  { month: "Nov", diesel: 13500, petrol: 17200, total: 30700 },
  { month: "Dec", diesel: 12800, petrol: 16500, total: 29300 },
]

// Mock data for department consumption
const departmentData = [
  { department: "Sales", diesel: 5200, petrol: 6800, total: 12000 },
  { department: "Operations", diesel: 7500, petrol: 8200, total: 15700 },
  { department: "Admin", diesel: 2800, petrol: 3500, total: 6300 },
  { department: "Management", diesel: 1500, petrol: 2200, total: 3700 },
  { department: "IT", diesel: 800, petrol: 1200, total: 2000 },
]

// Mock data for vehicle consumption
const vehicleData = [
  { vehicle: "Toyota Camry", id: "ABC-1234", diesel: 0, petrol: 2500, total: 2500 },
  { vehicle: "Toyota Hilux", id: "DEF-5678", diesel: 3200, petrol: 0, total: 3200 },
  { vehicle: "Nissan Patrol", id: "GHI-9012", diesel: 4500, petrol: 0, total: 4500 },
  { vehicle: "Honda Civic", id: "JKL-3456", diesel: 0, petrol: 1800, total: 1800 },
  { vehicle: "Ford Ranger", id: "MNO-7890", diesel: 3800, petrol: 0, total: 3800 },
]

export default function MonthlyReportPage() {
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedVehicle, setSelectedVehicle] = useState("all")
  const [isPrinting, setIsPrinting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const reportRef = useRef(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Function to handle printing
  const handlePrint = () => {
    setIsPrinting(true)

    // Add a small delay to ensure the print-only styles are applied
    setTimeout(() => {
      window.print()

      // Reset printing state after print dialog closes
      setTimeout(() => {
        setIsPrinting(false)
        toast({
          title: "Report printed",
          description: "Your report has been sent to the printer.",
        })
      }, 500)
    }, 100)
  }

  // Function to export data as CSV
  const exportAsCSV = () => {
    setIsExporting(true)

    try {
      // Determine which data to export based on active tab
      let dataToExport = monthlyData
      let filename = "monthly-fuel-report"

      if (activeTab === "departments") {
        dataToExport = departmentData
        filename = "department-fuel-report"
      } else if (activeTab === "vehicles") {
        dataToExport = vehicleData
        filename = "vehicle-fuel-report"
      }

      // Create CSV header
      const headers = Object.keys(dataToExport[0]).join(",")

      // Create CSV rows
      const rows = dataToExport.map((item) => Object.values(item).join(",")).join("\n")

      // Combine header and rows
      const csvContent = `${headers}\n${rows}`

      // Create a Blob with the CSV data
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

      // Create a download link
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)

      // Set link properties
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}-${selectedYear}-${selectedMonth}.csv`)
      link.style.visibility = "hidden"

      // Add link to document, click it, and remove it
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Export successful",
        description: "Your report has been exported as CSV.",
      })
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title: "Export failed",
        description: "There was an error exporting your report.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  // Function to export data as Excel
  const exportAsExcel = () => {
    setIsExporting(true)

    // In a real implementation, we would use a library like xlsx
    // For this demo, we'll simulate the export
    setTimeout(() => {
      toast({
        title: "Export successful",
        description: "Your report has been exported as Excel.",
      })
      setIsExporting(false)
    }, 1000)
  }

  // Function to export data as PDF
  const exportAsPDF = () => {
    setIsExporting(true)

    // In a real implementation, we would use a library like jsPDF
    // For this demo, we'll simulate the export
    setTimeout(() => {
      toast({
        title: "Export successful",
        description: "Your report has been exported as PDF.",
      })
      setIsExporting(false)
    }, 1000)
  }

  // Add print-specific styles when printing
  useEffect(() => {
    // Create a style element for print-only styles
    const style = document.createElement("style")
    style.id = "print-styles"
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #report-content, #report-content * {
          visibility: visible;
        }
        #report-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
        .print-full-width {
          width: 100% !important;
          max-width: 100% !important;
        }
        .print-break-after {
          page-break-after: always;
        }
        .print-m-0 {
          margin: 0 !important;
        }
        .print-p-0 {
          padding: 0 !important;
        }
      }
    `

    // Add the style element to the document head
    document.head.appendChild(style)

    // Clean up function to remove the style element when component unmounts
    return () => {
      const styleElement = document.getElementById("print-styles")
      if (styleElement) {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  return (
    <AdminLayout>
      <div className={`container mx-auto p-4 md:p-6 space-y-6 ${isPrinting ? "print-m-0 print-p-0" : ""}`}>
        <div
          className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isPrinting ? "no-print" : ""}`}
        >
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Monthly Fuel Consumption Report</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/reports">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Reports
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint} disabled={isPrinting || isExporting}>
              <Printer className="mr-2 h-4 w-4" />
              {isPrinting ? "Printing..." : "Print Report"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isExporting}>
                  <Download className="mr-2 h-4 w-4" />
                  {isExporting ? "Exporting..." : "Export Report"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportAsPDF}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportAsExcel}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportAsCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card className={isPrinting ? "no-print" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-nestle-red" />
              Report Filters
            </CardTitle>
            <CardDescription>Select time period for the report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="jan">January</SelectItem>
                    <SelectItem value="feb">February</SelectItem>
                    <SelectItem value="mar">March</SelectItem>
                    <SelectItem value="apr">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="jun">June</SelectItem>
                    <SelectItem value="jul">July</SelectItem>
                    <SelectItem value="aug">August</SelectItem>
                    <SelectItem value="sep">September</SelectItem>
                    <SelectItem value="oct">October</SelectItem>
                    <SelectItem value="nov">November</SelectItem>
                    <SelectItem value="dec">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="Toyota Camry">Toyota Camry</SelectItem>
                    <SelectItem value="Toyota Hilux">Toyota Hilux</SelectItem>
                    <SelectItem value="Nissan Patrol">Nissan Patrol</SelectItem>
                    <SelectItem value="Honda Civic">Honda Civic</SelectItem>
                    <SelectItem value="Ford Ranger">Ford Ranger</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div id="report-content" ref={reportRef}>
          {/* Report Header for Print */}
          <div className={`mb-6 ${!isPrinting ? "hidden" : ""}`}>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Monthly Fuel Consumption Report</h1>
              <p className="text-muted-foreground">
                {selectedMonth !== "all"
                  ? `Month: ${selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}`
                  : "All Months"}{" "}
                | Year: {selectedYear} |
                {selectedDepartment !== "all" ? ` Department: ${selectedDepartment}` : " All Departments"} |
                {selectedVehicle !== "all" ? ` Vehicle: ${selectedVehicle}` : " All Vehicles"}
              </p>
              <p className="text-sm text-muted-foreground">Generated on: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={isPrinting ? "no-print" : ""}>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">By Department</TabsTrigger>
              <TabsTrigger value="vehicles">By Vehicle</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className={`${isPrinting ? "print-full-width border-0 shadow-none" : ""}`}>
                <CardHeader className={isPrinting ? "print-p-0 pb-2" : ""}>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-nestle-red" />
                    Monthly Fuel Consumption Overview
                  </CardTitle>
                  <CardDescription>Fuel consumption by month for {selectedYear}</CardDescription>
                </CardHeader>
                <CardContent className={isPrinting ? "print-p-0" : ""}>
                  <div className="h-[400px]">
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
                        total: {
                          label: "Total (Liters)",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
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

              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isPrinting ? "print-break-after" : ""}`}>
                <Card className={isPrinting ? "border-0 shadow-none" : ""}>
                  <CardHeader className={`pb-2 ${isPrinting ? "print-p-0" : ""}`}>
                    <CardTitle className="text-lg">Total Consumption</CardTitle>
                    <CardDescription>All fuel types</CardDescription>
                  </CardHeader>
                  <CardContent className={isPrinting ? "print-p-0" : ""}>
                    <div className="text-3xl font-bold">369,000 L</div>
                    <p className="text-sm text-muted-foreground">+5.2% from previous year</p>
                  </CardContent>
                </Card>
                <Card className={isPrinting ? "border-0 shadow-none" : ""}>
                  <CardHeader className={`pb-2 ${isPrinting ? "print-p-0" : ""}`}>
                    <CardTitle className="text-lg">Diesel Consumption</CardTitle>
                    <CardDescription>Total diesel used</CardDescription>
                  </CardHeader>
                  <CardContent className={isPrinting ? "print-p-0" : ""}>
                    <div className="text-3xl font-bold">174,300 L</div>
                    <p className="text-sm text-muted-foreground">+3.8% from previous year</p>
                  </CardContent>
                </Card>
                <Card className={isPrinting ? "border-0 shadow-none" : ""}>
                  <CardHeader className={`pb-2 ${isPrinting ? "print-p-0" : ""}`}>
                    <CardTitle className="text-lg">Petrol Consumption</CardTitle>
                    <CardDescription>Total petrol used</CardDescription>
                  </CardHeader>
                  <CardContent className={isPrinting ? "print-p-0" : ""}>
                    <div className="text-3xl font-bold">194,700 L</div>
                    <p className="text-sm text-muted-foreground">+6.5% from previous year</p>
                  </CardContent>
                </Card>
              </div>

              <Card className={isPrinting ? "print-full-width border-0 shadow-none" : ""}>
                <CardHeader className={isPrinting ? "print-p-0" : ""}>
                  <CardTitle>Consumption Trend</CardTitle>
                  <CardDescription>Monthly trend for {selectedYear}</CardDescription>
                </CardHeader>
                <CardContent className={isPrinting ? "print-p-0" : ""}>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        total: {
                          label: "Total Consumption",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="total" stroke="var(--color-total)" name="Total Consumption" />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments" className="space-y-4">
              <Card className={isPrinting ? "print-full-width border-0 shadow-none" : ""}>
                <CardHeader className={isPrinting ? "print-p-0" : ""}>
                  <CardTitle>Department Consumption</CardTitle>
                  <CardDescription>Fuel consumption by department for {selectedYear}</CardDescription>
                </CardHeader>
                <CardContent className={isPrinting ? "print-p-0" : ""}>
                  <div className="h-[400px]">
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
                        <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="department" />
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

              <Card className={`${isPrinting ? "print-full-width border-0 shadow-none print-break-after" : ""}`}>
                <CardHeader className={isPrinting ? "print-p-0" : ""}>
                  <CardTitle>Department Breakdown</CardTitle>
                  <CardDescription>Detailed consumption by department</CardDescription>
                </CardHeader>
                <CardContent className={isPrinting ? "print-p-0" : ""}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Department</th>
                          <th className="text-right py-3 px-4">Diesel (L)</th>
                          <th className="text-right py-3 px-4">Petrol (L)</th>
                          <th className="text-right py-3 px-4">Total (L)</th>
                          <th className="text-right py-3 px-4">% of Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departmentData.map((dept) => (
                          <tr key={dept.department} className="border-b">
                            <td className="py-3 px-4 font-medium">{dept.department}</td>
                            <td className="text-right py-3 px-4">{dept.diesel.toLocaleString()}</td>
                            <td className="text-right py-3 px-4">{dept.petrol.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-medium">{dept.total.toLocaleString()}</td>
                            <td className="text-right py-3 px-4">{((dept.total / 39700) * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50">
                          <td className="py-3 px-4 font-bold">Total</td>
                          <td className="text-right py-3 px-4 font-bold">
                            {departmentData.reduce((sum, dept) => sum + dept.diesel, 0).toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-4 font-bold">
                            {departmentData.reduce((sum, dept) => sum + dept.petrol, 0).toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-4 font-bold">
                            {departmentData.reduce((sum, dept) => sum + dept.total, 0).toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-4 font-bold">100.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vehicles" className="space-y-4">
              <Card className={isPrinting ? "print-full-width border-0 shadow-none" : ""}>
                <CardHeader className={isPrinting ? "print-p-0" : ""}>
                  <CardTitle>Vehicle Consumption</CardTitle>
                  <CardDescription>Fuel consumption by vehicle for {selectedYear}</CardDescription>
                </CardHeader>
                <CardContent className={isPrinting ? "print-p-0" : ""}>
                  <div className="h-[400px]">
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
                        <BarChart data={vehicleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="vehicle" />
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

              <Card className={`${isPrinting ? "print-full-width border-0 shadow-none" : ""}`}>
                <CardHeader className={isPrinting ? "print-p-0" : ""}>
                  <CardTitle>Vehicle Breakdown</CardTitle>
                  <CardDescription>Detailed consumption by vehicle</CardDescription>
                </CardHeader>
                <CardContent className={isPrinting ? "print-p-0" : ""}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Vehicle</th>
                          <th className="text-left py-3 px-4">ID</th>
                          <th className="text-right py-3 px-4">Diesel (L)</th>
                          <th className="text-right py-3 px-4">Petrol (L)</th>
                          <th className="text-right py-3 px-4">Total (L)</th>
                          <th className="text-right py-3 px-4">% of Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehicleData.map((vehicle) => (
                          <tr key={vehicle.id} className="border-b">
                            <td className="py-3 px-4 font-medium">{vehicle.vehicle}</td>
                            <td className="py-3 px-4">{vehicle.id}</td>
                            <td className="text-right py-3 px-4">{vehicle.diesel.toLocaleString()}</td>
                            <td className="text-right py-3 px-4">{vehicle.petrol.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 font-medium">{vehicle.total.toLocaleString()}</td>
                            <td className="text-right py-3 px-4">{((vehicle.total / 15800) * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50">
                          <td className="py-3 px-4 font-bold" colSpan={2}>
                            Total
                          </td>
                          <td className="text-right py-3 px-4 font-bold">
                            {vehicleData.reduce((sum, vehicle) => sum + vehicle.diesel, 0).toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-4 font-bold">
                            {vehicleData.reduce((sum, vehicle) => sum + vehicle.petrol, 0).toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-4 font-bold">
                            {vehicleData.reduce((sum, vehicle) => sum + vehicle.total, 0).toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-4 font-bold">100.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  )
}

