import type { Metadata } from "next"
import { VehicleInfo } from "@/components/vehicle-info"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, AlertTriangle, Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "My Vehicle | Nestle Cameroon Fuel Management",
  description: "View and manage your assigned vehicle details",
}

// Mock maintenance history data
const maintenanceHistory = [
  {
    id: "MH-001",
    type: "Oil Change",
    date: "2023-10-15",
    odometer: 24000,
    description: "Regular oil change and filter replacement",
    technician: "John Smith",
    location: "Douala Service Center",
    cost: "45000 FCFA",
  },
  {
    id: "MH-002",
    type: "Tire Rotation",
    date: "2023-09-01",
    odometer: 23200,
    description: "Rotation of all four tires and pressure check",
    technician: "Paul Biya",
    location: "Douala Service Center",
    cost: "15000 FCFA",
  },
  {
    id: "MH-003",
    type: "Brake Inspection",
    date: "2023-07-20",
    odometer: 22500,
    description: "Inspection of brake pads and rotors, no replacement needed",
    technician: "John Smith",
    location: "Yaounde Service Center",
    cost: "10000 FCFA",
  },
]

// Mock trip logs data
const tripLogs = [
  {
    id: "TL-001",
    date: "2023-11-25",
    startOdometer: 24500,
    endOdometer: 24560,
    distance: 60,
    purpose: "Client Visit",
    destination: "Douala Business Center",
    fuelConsumed: 5.2,
  },
  {
    id: "TL-002",
    date: "2023-11-20",
    startOdometer: 24350,
    endOdometer: 24500,
    distance: 150,
    purpose: "Field Work",
    destination: "Limbe Industrial Zone",
    fuelConsumed: 12.8,
  },
  {
    id: "TL-003",
    date: "2023-11-15",
    startOdometer: 24100,
    endOdometer: 24350,
    distance: 250,
    purpose: "Delivery",
    destination: "Bafoussam Distribution Center",
    fuelConsumed: 21.5,
  },
]

export default function VehiclePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">My Vehicle</h1>
        <p className="text-muted-foreground">View and manage your assigned vehicle details</p>
      </div>

      <VehicleInfo />

      <Tabs defaultValue="maintenance" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
          <TabsTrigger value="trips">Trip Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Maintenance History
              </CardTitle>
              <CardDescription>Record of all maintenance activities for your vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceHistory.map((item) => (
                  <div key={item.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{item.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()} • Odometer: {item.odometer} km
                        </p>
                      </div>
                      <Badge variant="outline">{item.id}</Badge>
                    </div>
                    <p className="text-sm mb-2">{item.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Technician:</span> {item.technician}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span> {item.location}
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Cost:</span> {item.cost}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Maintenance Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Maintenance
              </CardTitle>
              <CardDescription>Scheduled maintenance for your vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-md border border-amber-100">
                  <div className="bg-amber-100 rounded-full p-1.5 mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800">Oil Change Due</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Your vehicle is due for an oil change in 5 days or 500 km. Please schedule a service appointment.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2 border-amber-200 text-amber-700">
                      Schedule Service
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md border border-blue-100">
                  <div className="bg-blue-100 rounded-full p-1.5 mt-0.5">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Annual Inspection</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Annual vehicle inspection scheduled for January 15, 2024.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Trip Logs
              </CardTitle>
              <CardDescription>Record of your recent trips and mileage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tripLogs.map((trip) => (
                  <div key={trip.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{trip.purpose}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(trip.date).toLocaleDateString()} • Destination: {trip.destination}
                        </p>
                      </div>
                      <Badge variant="outline">{trip.distance} km</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Start Odometer:</span> {trip.startOdometer} km
                      </div>
                      <div>
                        <span className="text-muted-foreground">End Odometer:</span> {trip.endOdometer} km
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fuel Consumed:</span> {trip.fuelConsumed} L
                      </div>
                      <div>
                        <span className="text-muted-foreground">Efficiency:</span>{" "}
                        {((trip.fuelConsumed / trip.distance) * 100).toFixed(1)} L/100km
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between">
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Log New Trip
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Trip Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

