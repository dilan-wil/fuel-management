"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { doc, deleteDoc, addDoc, collection, setDoc } from "firebase/firestore";


import {
  ArrowLeft,
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Shield,
  Key,
  CreditCard,
  UserCog,
  Loader2,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"


// Mock data for employees
// const employeesData = [
//   {
//     id: "EMP001",
//     name: "John Doe",
//     email: "john.doe@nestlecameroon.com",
//     department: "Sales",
//     position: "Sales Manager",
//     phone: "+237 654 321 987",
//     status: "active",
//     lastLogin: "2025-03-24 09:15:22",
//   },
//   {
//     id: "EMP002",
//     name: "Jane Smith",
//     email: "jane.smith@nestlecameroon.com",
//     department: "Operations",
//     position: "Operations Supervisor",
//     phone: "+237 654 123 456",
//     status: "active",
//     lastLogin: "2025-03-23 14:30:45",
//   },
//   {
//     id: "EMP003",
//     name: "Robert Johnson",
//     email: "robert.johnson@nestlecameroon.com",
//     department: "Admin",
//     position: "Administrative Assistant",
//     phone: "+237 678 987 654",
//     status: "inactive",
//     lastLogin: "2025-03-10 11:20:18",
//   },
//   {
//     id: "EMP004",
//     name: "Emily Davis",
//     email: "emily.davis@nestlecameroon.com",
//     department: "Management",
//     position: "Regional Manager",
//     phone: "+237 699 876 543",
//     status: "active",
//     lastLogin: "2025-03-22 08:45:33",
//   },
//   {
//     id: "EMP005",
//     name: "Michael Wilson",
//     email: "michael.wilson@nestlecameroon.com",
//     department: "IT",
//     position: "IT Specialist",
//     phone: "+237 677 765 432",
//     status: "active",
//     lastLogin: "2025-03-24 10:05:17",
//   },
//   {
//     id: "EMP006",
//     name: "Sarah Brown",
//     email: "sarah.brown@nestlecameroon.com",
//     department: "Sales",
//     position: "Sales Representative",
//     phone: "+237 651 234 567",
//     status: "active",
//     lastLogin: "2025-03-23 16:12:40",
//   },
//   {
//     id: "EMP007",
//     name: "David Miller",
//     email: "david.miller@nestlecameroon.com",
//     department: "Operations",
//     position: "Fleet Coordinator",
//     phone: "+237 670 345 678",
//     status: "active",
//     lastLogin: "2025-03-22 13:25:50",
//   },
//   {
//     id: "EMP008",
//     name: "Jennifer Taylor",
//     email: "jennifer.taylor@nestlecameroon.com",
//     department: "Admin",
//     position: "Office Manager",
//     phone: "+237 698 456 789",
//     status: "inactive",
//     lastLogin: "2025-02-15 09:30:22",
//   },
// ]

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentAction, setCurrentAction] = useState<{ type: string; employee?: any }>({ type: "" })
  const [otpValue, setOtpValue] = useState("")
  const [showAccessCardDialog, setShowAccessCardDialog] = useState(false)
  const [accessCardAction, setAccessCardAction] = useState("")
  const {employees, vehicles} = useAuth()
  const [elementToDelete, setElementToDelete] = useState<any>({})
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [showIssueCardDialog, setShowIssueCardDialog] = useState(false)
  const [showDisableCardDialog, setShowDisableCardDialog] = useState(false)
  const [showEnableCardDialog, setShowEnableCardDialog] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    vehicleId: "",
    employeeId: selectedEmployee?.id || "",
    employee: selectedEmployee,
    balance: 50000,
    status: "active"
  })

  useEffect(() => {
    console.log(employees)
    }, [employees])
  // Filter employees based on search query and filters
  const filteredEmployees = employees?.filter((employee: any ) => {
    const matchesSearch =
      employee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.id?.toLowerCase().includes(searchQuery.toLowerCase())

    // const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment
    // const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus

   return matchesSearch //&& matchesDepartment && matchesStatus
  })
  // Handle employee actions with OTP verification
  const handleEmployeeAction = (type: string, employee?: any) => {
    setCurrentAction({ type, employee })
    setShowDeleteDialog(true)
  }

const handleDelete = async () => { 
  await deleteDoc(doc(db, "employees", elementToDelete.id));
  setShowDeleteDialog(false);
} 


  // Handle employee status change
  const handleEmployeeStatusChange = (employee : any, newStatus:any) => {
    // In a real app, you would update the employee status in the database
    toast({
      title: `Employee ${newStatus}`,
      description: `${employee.name} has been ${newStatus}.`,
    })
  }

  // Handle access card actions
  const handleAccessCardAction = (employee : any, action : any) => {
    setCurrentAction({ type: action, employee })
    setAccessCardAction(action)
    setShowAccessCardDialog(true)
    setOtpValue("")
  }

  const handleIssueNewCard = async () => {
    setLoading(true)
    console.log(selectedEmployee)
    try {
      const newCardDatas = {
        ...newCard, 
        employeeId: selectedEmployee?.id || "",
        employee: selectedEmployee
      }
      await setDoc(doc(db, "cards", newCardDatas.cardNumber), newCardDatas)

      toast({
        title: "Card issued",
        description: `A new access card has been issued to ${selectedEmployee?.name}.`,
      })
      setLoading(false)
    } catch(error) {
      console.log(error)
    }
    
    // setShowIssueCardDialog(false)
  }

  // Verify OTP and perform action
  const verifyOtpAndPerformAction = () => {
    // In a real app, you would verify the OTP with a server
    // For this demo, we'll just check if it's "123456"
    if (otpValue === "123456") {
      // Perform the action based on currentAction.type
      switch (currentAction.type) {
        case "edit":
          // Logic to edit employee
          alert(`Edit employee: ${currentAction.employee?.name}`)
          break
        case "delete":
          // Logic to delete employee
          alert(`Delete employee: ${currentAction.employee?.name}`)
          break
        case "add":
          // Logic to add employee
          alert("Add new employee")
          break
        case "reset":
          // Logic to reset password
          alert(`Reset password for: ${currentAction.employee?.name}`)
          break
        default:
          break
      }
      setShowDeleteDialog(true)
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  function setValue(value: string): void {
    throw new Error("Function not implemented.")
  }


  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Employee Management</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleEmployeeAction("add")}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
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
              Filter Employees
            </CardTitle>
            <CardDescription>Find employees by name, email, department, or status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employee List</CardTitle>
            <CardDescription>
              Showing {filteredEmployees.length} of {employees.length} employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees?.map((employee : any) => (
                  <TableRow key={employee?.id}>
                    <TableCell>
                      <Checkbox id={`select-${employee.id}`} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={employee.name} />
                          <AvatarFallback>
                            {employee?.name
                              ?.split(" ")
                              ?.map((n : any) => n[0])
                              ?.join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm">
                          <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                          {employee.tel}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                          {employee.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {employee.status === "active" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{employee.lastLogin}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleEmployeeAction("edit", employee)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEmployeeAction("reset", employee)}>
                            <Key className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Access Card</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedEmployee(employee);
                            setShowIssueCardDialog(true)
                          }}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Issue New Card
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAccessCardAction(employee, "disable")}>
                            <Shield className="mr-2 h-4 w-4" />
                            Disable Card
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAccessCardAction(employee, "enable")}>
                            <Key className="mr-2 h-4 w-4" />
                            Enable Card
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {employee.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleEmployeeStatusChange(employee, "disabled")}>
                              <UserCog className="mr-2 h-4 w-4" />
                              Disable Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleEmployeeStatusChange(employee, "activated")}>
                              <UserCog className="mr-2 h-4 w-4" />
                              Enable Account
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setElementToDelete(employee);
                           setShowDeleteDialog(true)
                           }}
                          >
                            
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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

        {/* OTP Verification Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-nestle-red" />
                Are you sure you want to delete?
              </DialogTitle>
              <DialogDescription>
                there's no turning back
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                {/* {/* <Label htmlFor="otp">One-Time Password (OTP)</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otpValue}
                  onChange={(e) => setValue(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                /> */}
                
              </div>
              {/* <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>OTP sent to: {currentAction.employee?.email || "admin@nestlecameroon.com"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>OTP sent to: {currentAction.employee?.tel || "+237 654 321 987"}</span>
                </div> 
              </div>*/}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-nestle-red hover:bg-nestle-darkred" onClick={handleDelete}>
               Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        

        {/* Access Card Dialog */}
        <Dialog open={showAccessCardDialog} onOpenChange={setShowAccessCardDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-nestle-red" />
                {accessCardAction === "issue"
                  ? "Issue New Access Card"
                  : accessCardAction === "disable"
                    ? "Disable Access Card"
                    : "Enable Access Card"}
              </DialogTitle>
              <DialogDescription>
                {accessCardAction === "issue"
                  ? "Issue a new access card to the employee. This will invalidate any existing cards."
                  : accessCardAction === "disable"
                    ? "Disable the employee's access card. The employee will not be able to use it until it is enabled again."
                    : "Enable the employee's access card. The employee will be able to use it again."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="otp-card">One-Time Password (OTP)</Label>
                <Input
                  id="otp-card"
                  placeholder="Enter 6-digit OTP"
                  value={otpValue}
                  onChange={(e) => setValue(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
                <p className="text-xs text-muted-foreground">
                  For demo purposes, use OTP: <span className="font-mono font-bold">123456</span>
                </p>
              </div>
              {currentAction.employee && (
                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span>Employee: {currentAction.employee.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Department: {currentAction.employee.department}</span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAccessCardDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-nestle-red hover:bg-nestle-darkred"
                onClick={() => {
                  if (otpValue === "123456") {
                    // In a real app, you would perform the action on the server
                    toast({
                      title: `Access card ${accessCardAction}d`,
                      description: `The access card for ${currentAction.employee?.name} has been ${accessCardAction}d successfully.`,
                    })
                    setShowAccessCardDialog(false)
                  } else {
                    alert("Invalid OTP. Please try again.")
                  }
                }}
              >
                Verify & Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Issue New Card Dialog */}
        <Dialog open={showIssueCardDialog} onOpenChange={setShowIssueCardDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-nestle-red" />
                Issue New Access Card
              </DialogTitle>
              <DialogDescription>
                Issue a new access card to the employee. This will invalidate any existing cards.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
            {selectedEmployee && (
              <div className="space-y-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span>Employee: {selectedEmployee.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Department: {selectedEmployee.department}</span>
                  </div>
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    type="text"
                    placeholder="Enter card number"
                    value={newCard.cardNumber}
                    onChange={(e) =>
                      setNewCard((prev) => ({
                        ...prev,
                        cardNumber: e.target.value
                      }))
                    }
                  />
                </div>

                {/* Expiry Date */}
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    type="month"
                    value={newCard.expiryDate}
                    onChange={(e) =>
                      setNewCard((prev) => ({
                        ...prev,
                        expiryDate: e.target.value
                      }))
                    }
                  />
                </div>

                {/* Vehicle Selection */}
                <div className="space-y-2">
                  <Label htmlFor="card-vehicle">Assign Vehicle</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewCard((prev) => ({ ...prev, vehicleId: value }))
                    }
                  >
                    <SelectTrigger id="card-vehicle">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle: any) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.plate})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Initial Balance */}
                <div className="space-y-2">
                  <Label htmlFor="card-amount">Card Amount (FCFA)</Label>
                  <Input
                    id="card-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={newCard.balance}
                    onChange={(e) =>
                      setNewCard((prev) => ({
                        ...prev,
                        balance: parseFloat(e.target.value) || 0
                      }))
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    This is the initial amount loaded on the card.
                  </p>
                </div>
              </div>
            )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowIssueCardDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleIssueNewCard}
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin"/>}
                Issue Card
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Disable Card Dialog */}
        <Dialog open={showDisableCardDialog} onOpenChange={setShowDisableCardDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-nestle-red" />
                Disable Access Card
              </DialogTitle>
              <DialogDescription>
                Select the card you want to disable. The employee will not be able to use it until it is enabled again.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedEmployee && (
                <div className="space-y-4">
                  <div className="bg-muted/30 p-3 rounded-md mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span>Employee: {selectedEmployee.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Active Cards</Label>
                    {/* <div className="border rounded-md divide-y">
                      {employeeCardsData
                        .filter((card) => card.employeeId === selectedEmployee.id && card.status === "active")
                        .map((card) => {
                          const vehicle = vehiclesData.find((v) => v.id === card.vehicleId)
                          return (
                            <div key={card.id} className="p-3 flex justify-between items-center">
                              <div>
                                <div className="font-medium">{card.id}</div>
                                <div className="text-sm text-muted-foreground">
                                  {vehicle ? `${vehicle.name} (${vehicle.plate})` : "Unknown Vehicle"}
                                </div>
                                <div className="text-sm">Balance: {card.amount.toLocaleString()} FCFA</div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Card disabled",
                                    description: `Card ${card.id} has been disabled.`,
                                  })
                                  setShowDisableCardDialog(false)
                                }}
                              >
                                Disable
                              </Button>
                            </div>
                          )
                        })}
                      {employeeCardsData.filter(
                        (card) => card.employeeId === selectedEmployee.id && card.status === "active",
                      ).length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">
                          No active cards found for this employee.
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDisableCardDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Enable Card Dialog */}
        <Dialog open={showEnableCardDialog} onOpenChange={setShowEnableCardDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-nestle-red" />
                Enable Access Card
              </DialogTitle>
              <DialogDescription>
                Select the card you want to enable. The employee will be able to use it again.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedEmployee && (
                <div className="space-y-4">
                  <div className="bg-muted/30 p-3 rounded-md mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span>Employee: {selectedEmployee.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Inactive Cards</Label>
                    {/* <div className="border rounded-md divide-y">
                      {employeeCardsData
                        .filter((card) => card.employeeId === selectedEmployee.id && card.status === "inactive")
                        .map((card) => {
                          const vehicle = vehiclesData.find((v) => v.id === card.vehicleId)
                          return (
                            <div key={card.id} className="p-3 flex justify-between items-center">
                              <div>
                                <div className="font-medium">{card.id}</div>
                                <div className="text-sm text-muted-foreground">
                                  {vehicle ? `${vehicle.name} (${vehicle.plate})` : "Unknown Vehicle"}
                                </div>
                                <div className="text-sm">Balance: {card.amount.toLocaleString()} FCFA</div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Card enabled",
                                    description: `Card ${card.id} has been enabled.`,
                                  })
                                  setShowEnableCardDialog(false)
                                }}
                              >
                                Enable
                              </Button>
                            </div>
                          )
                        })}
                      {employeeCardsData.filter(
                        (card) => card.employeeId === selectedEmployee.id && card.status === "inactive",
                      ).length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">
                          No inactive cards found for this employee.
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEnableCardDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

