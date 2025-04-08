"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, AlertTriangle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock vehicle data
const vehicleData = {
  id: "VH-2023-0042",
  make: "Toyota",
  model: "Land Cruiser",
  year: 2021,
  licensePlate: "CM 234-AB",
  fuelType: "Diesel",
  fuelCapacity: 80,
  currentFuelLevel: 35,
  mileage: 24560,
  lastMaintenance: "2023-10-15",
  nextMaintenance: "2024-01-15",
  status: "Active",
  location: "Douala, Cameroon",
  department: "Sales",
  assignedTo: "John Doe",
  assignedDate: "2022-05-10",
  maintenanceAlerts: [
    {
      id: "MA-001",
      type: "Oil Change",
      dueDate: "2024-01-15",
      status: "Upcoming",
      description: "Regular oil change required based on mileage",
    },
    {
      id: "MA-002",
      type: "Tire Rotation",
      dueDate: "2023-12-20",
      status: "Upcoming",
      description: "Tire rotation recommended every 10,000 km",
    },
  ],
};

export default function VehicleInfo() {
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const fuelPercentage =
    (vehicleData.currentFuelLevel / vehicleData.fuelCapacity) * 100;
  const fuelColor =
    fuelPercentage < 20
      ? "bg-red-500"
      : fuelPercentage < 50
      ? "bg-yellow-500"
      : "bg-green-500";

  const handleAlertClick = (alert: any) => {
    setSelectedAlert(alert);
    setShowMaintenanceDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Car className="h-5 w-5" />
                {vehicleData.make} {vehicleData.model} ({vehicleData.year})
              </CardTitle>
              <CardDescription>
                License Plate: {vehicleData.licensePlate}
              </CardDescription>
            </div>
            <Badge
              variant={
                vehicleData.status === "Active" ? "default" : "destructive"
              }
            >
              {vehicleData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Vehicle Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Vehicle ID</p>
                    <p className="font-medium">{vehicleData.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-medium">{vehicleData.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{vehicleData.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Assigned Date
                    </p>
                    <p className="font-medium">
                      {new Date(vehicleData.assignedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Fuel Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Fuel Type</p>
                    <p className="font-medium">{vehicleData.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Fuel Capacity
                    </p>
                    <p className="font-medium">
                      {vehicleData.fuelCapacity} liters
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">
                      Current Fuel Level
                    </p>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className={`${fuelColor} h-2.5 rounded-full`}
                        style={{ width: `${fuelPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>{vehicleData.currentFuelLevel} liters</span>
                      <span>{fuelPercentage.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Maintenance Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Current Mileage
                    </p>
                    <p className="font-medium">
                      {vehicleData.mileage.toLocaleString()} km
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Last Maintenance
                    </p>
                    <p className="font-medium">
                      {new Date(
                        vehicleData.lastMaintenance
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Next Maintenance
                    </p>
                    <p className="font-medium">
                      {new Date(
                        vehicleData.nextMaintenance
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Current Location
                    </p>
                    <p className="font-medium">{vehicleData.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Maintenance Alerts
                </h3>
                <div className="space-y-2">
                  {vehicleData.maintenanceAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-md cursor-pointer hover:bg-muted"
                      onClick={() => handleAlertClick(alert)}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">{alert.type}</p>
                          <p className="text-xs text-muted-foreground">
                            Due: {new Date(alert.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{alert.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Report Issue</Button>
            <Button>Schedule Maintenance</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={showMaintenanceDialog}
        onOpenChange={setShowMaintenanceDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maintenance Alert Details</DialogTitle>
            <DialogDescription>
              Review the details of this maintenance alert
            </DialogDescription>
          </DialogHeader>

          {selectedAlert && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Alert ID</p>
                  <p className="font-medium">{selectedAlert.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedAlert.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Due Date</p>
                  <p className="font-medium">
                    {new Date(selectedAlert.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant="outline">{selectedAlert.status}</Badge>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="text-sm">{selectedAlert.description}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowMaintenanceDialog(false)}
            >
              Close
            </Button>
            <Button>Schedule Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
