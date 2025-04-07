"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Car,
  Plus,
  Calendar,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
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
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

// Mock data for vehicles
const vehiclesData = [
  {
    id: "VEH001",
    name: "Toyota Camry",
    plate: "ABC-1234",
    department: "Sales",
    driver: "John Doe",
    status: "active",
    fuelType: "petrol",
    efficiency: 8.5,
    lastMaintenance: "2025-02-15",
    nextMaintenance: "2025-05-15",
  },
  {
    id: "VEH002",
    name: "Honda Civic",
    plate: "DEF-5678",
    department: "Operations",
    driver: "Jane Smith",
    status: "active",
    fuelType: "petrol",
    efficiency: 7.2,
    lastMaintenance: "2025-03-10",
    nextMaintenance: "2025-06-10",
  },
  {
    id: "VEH003",
    name: "Nissan Altima",
    plate: "JKL-3456",
    department: "Admin",
    driver: "Robert Johnson",
    status: "maintenance",
    fuelType: "petrol",
    efficiency: 8.2,
    lastMaintenance: "2025-03-20",
    nextMaintenance: "2025-06-20",
  },
  {
    id: "VEH004",
    name: "Ford Focus",
    plate: "GHI-9012",
    department: "Management",
    driver: "Emily Davis",
    status: "active",
    fuelType: "petrol",
    efficiency: 7.8,
    lastMaintenance: "2025-01-25",
    nextMaintenance: "2025-04-25",
  },
  {
    id: "VEH005",
    name: "Toyota Hilux",
    plate: "MNO-7890",
    department: "Operations",
    driver: "Michael Wilson",
    status: "active",
    fuelType: "diesel",
    efficiency: 10.5,
    lastMaintenance: "2025-02-05",
    nextMaintenance: "2025-05-05",
  },
  {
    id: "VEH006",
    name: "Nissan Patrol",
    plate: "PQR-1357",
    department: "Operations",
    driver: "Sarah Brown",
    status: "inactive",
    fuelType: "diesel",
    efficiency: 12.8,
    lastMaintenance: "2025-01-15",
    nextMaintenance: "2025-04-15",
  },
  {
    id: "VEH007",
    name: "Toyota Corolla",
    plate: "STU-2468",
    department: "Sales",
    driver: "David Miller",
    status: "active",
    fuelType: "petrol",
    efficiency: 6.9,
    lastMaintenance: "2025-03-05",
    nextMaintenance: "2025-06-05",
  },
  {
    id: "VEH008",
    name: "Honda Accord",
    plate: "VWX-3690",
    department: "Management",
    driver: "Jennifer Taylor",
    status: "active",
    fuelType: "petrol",
    efficiency: 8.0,
    lastMaintenance: "2025-02-20",
    nextMaintenance: "2025-05-20",
  },
]

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedFuelType, setSelectedFuelType] = useState("all")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [showAddVehicleDialog, setShowAddVehicleDialog] = useState(false)
  const { vehicles } = useAuth()
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    plate: "",
    department: "Sales",
    driver: "",
    fuelType: "petrol",
  })

  // Filter vehicles based on search query and filters
  const filteredVehicles = vehicles.filter((vehicle: any) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || vehicle.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || vehicle.status === selectedStatus
    const matchesFuelType = selectedFuelType === "all" || vehicle.fuelType === selectedFuelType

    return matchesSearch && matchesDepartment && matchesStatus && matchesFuelType
  })

  // Handle vehicle deletion
  const handleDeleteVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setShowDeleteDialog(true)
  }

  // Confirm vehicle deletion
  const confirmDeleteVehicle = async () => {
    setLoading(true)
    await deleteDoc(doc(db, "vehicles", selectedVehicle.id));
    setLoading(false)
    setShowDeleteDialog(false);
  }

  // Handle vehicle status change
  const handleVehicleStatusChange = (vehicle: any, newStatus: any) => {
    // In a real app, you would update the vehicle status in the database
    toast({
      title: `Vehicle ${newStatus}`,
      description: `${vehicle.name} (${vehicle.plate}) has been ${newStatus}.`,
    })
  }

  const handleAddVehicle = async () => {
    try {
      setLoading(true)
      if(!newVehicle.plate) return
      console.log(newVehicle)
      // Save employee details to Firestore
      await setDoc(doc(db, "vehicles", newVehicle.plate), newVehicle);
      
  
      toast({
        title: "Successful.",
        description: "You have registered successfully. Redirecting to dashboard...",
      });
  
      setLoading(false)
      setShowAddVehicleDialog(false)
    } catch (error) {
      console.error("Registration Error:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed.",
        description: "An error occurred while registering. Please try again.",
      });
    } finally {
      setNewVehicle({
        name: "",
        plate: "",
        department: "Sales",
        driver: "",
        fuelType: "petrol",
      })
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Vehicle Management</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAddVehicleDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
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
              Filter Vehicles
            </CardTitle>
            <CardDescription>Find vehicles by name, plate number, department, or status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles..."
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
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:max-w-[200px]">
                <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle List</CardTitle>
            <CardDescription>
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Fuel Type</TableHead>
                  {/* <TableHead>Efficiency</TableHead> */}
                  <TableHead>Status</TableHead>
                  <TableHead>Maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle: any) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <Checkbox id={`select-${vehicle.id}`} />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{vehicle.name}</div>
                      <div className="text-sm text-muted-foreground">{vehicle.plate}</div>
                    </TableCell>
                    <TableCell>{vehicle.department}</TableCell>
                    <TableCell>{vehicle.driver=="" ? "none" : vehicle.driver}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          vehicle.fuelType === "petrol"
                            ? "border-green-200 text-green-700"
                            : "border-blue-200 text-blue-700"
                        }
                      >
                        {vehicle.fuelType.charAt(0).toUpperCase() + vehicle.fuelType.slice(1)}
                      </Badge>
                    </TableCell>
                    {/* <TableCell>{vehicle.efficiency} L/100km</TableCell> */}
                    <TableCell>
                      {vehicle.status === "active" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      ) : vehicle.status === "maintenance" ? (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Maintenance</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(vehicle.nextMaintenance).toLocaleDateString()}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={
                            ((new Date().getTime() - new Date(vehicle.lastMaintenance).getTime()) /
                              (new Date(vehicle.nextMaintenance).getTime() -
                                new Date(vehicle.lastMaintenance).getTime())) *
                            100
                          }
                          className="h-1.5"
                        />
                      </div>
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
                            <Link href={`/admin/vehicles/${vehicle.id}`}>
                              <Car className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/vehicles/edit/${vehicle.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/vehicles/maintenance/${vehicle.id}`}>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Maintenance
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {vehicle.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleVehicleStatusChange(vehicle, "disabled")}>
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Disable Vehicle
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleVehicleStatusChange(vehicle, "activated")}>
                              <Car className="mr-2 h-4 w-4" />
                              Enable Vehicle
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteVehicle(vehicle)}>
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

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Confirm Vehicle Deletion
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this vehicle? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedVehicle && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Vehicle:</span>
                    <span>
                      {selectedVehicle.name} ({selectedVehicle.plate})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Department:</span>
                    <span>{selectedVehicle.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Driver:</span>
                    <span>{selectedVehicle.driver}</span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button disabled={loading} variant="destructive" onClick={confirmDeleteVehicle}>
                {loading && <Loader2 className="animate-spin"/>}
                Delete Vehicle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Vehicle Dialog */}
        <Dialog open={showAddVehicleDialog} onOpenChange={setShowAddVehicleDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-nestle-red" />
                Add New Vehicle
              </DialogTitle>
              <DialogDescription>Enter the details of the new vehicle to add it to the system.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-name">Vehicle Name</Label>
                  <Input
                    id="vehicle-name"
                    placeholder="e.g. Toyota Camry"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-plate">License Plate</Label>
                  <Input
                    id="vehicle-plate"
                    placeholder="e.g. ABC-1234"
                    value={newVehicle.plate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-department">Department</Label>
                  <Select
                    value={newVehicle.department}
                    onValueChange={(value) => setNewVehicle({ ...newVehicle, department: value })}
                  >
                    <SelectTrigger id="vehicle-department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="vehicle-driver">Assigned Driver</Label>
                  <Input
                    id="vehicle-driver"
                    placeholder="e.g. John Doe"
                    value={newVehicle.driver}
                    onChange={(e) => setNewVehicle({ ...newVehicle, driver: e.target.value })}
                  />
                </div> */}
                <div className="space-y-2">
                  <Label htmlFor="vehicle-fuel-type">Fuel Type</Label>
                  <Select
                    value={newVehicle.fuelType}
                    onValueChange={(value) => setNewVehicle({ ...newVehicle, fuelType: value })}
                  >
                    <SelectTrigger id="vehicle-fuel-type">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddVehicleDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddVehicle}
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin"/>}
                Add Vehicle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

