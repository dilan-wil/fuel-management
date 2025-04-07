"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Fuel, AlertCircle, CheckCircle2, XCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock fuel limit data
const fuelLimitData = {
  monthlyLimit: 250,
  consumed: 175,
  remaining: 75,
  lastRefill: "2023-11-25",
  lastAmount: 45,
  eligibleForRefill: true,
  nextEligibleDate: null,
  lastOdometerReading: 24560,
  averageFuelEfficiency: 8.6, // L/100km
  minimumMileageBetweenRefills: 150, // km
  vehicle: {
    id: "VH-2023-0042",
    make: "Toyota",
    model: "Land Cruiser",
    licensePlate: "CM 234-AB",
    fuelType: "Diesel",
    fuelCapacity: 80,
    currentFuelLevel: 35,
  },
  nearbyStations: [
    { id: "ST001", name: "Douala Station 1", address: "123 Main St, Douala", distance: "2.5 km", available: true },
    { id: "ST002", name: "Douala Station 2", address: "456 Central Ave, Douala", distance: "4.8 km", available: true },
    { id: "ST003", name: "Yaounde Station 1", address: "789 North Rd, Yaounde", distance: "120 km", available: false },
  ],
  consumptionHistory: [
    { date: "2023-11-25", amount: 45, odometer: 24560, efficiency: 8.7 },
    { date: "2023-11-10", amount: 42, odometer: 24100, efficiency: 8.5 },
    { date: "2023-10-28", amount: 48, odometer: 23600, efficiency: 8.9 },
  ],
}

export function FuelRequest() {
  const [amount, setAmount] = useState<number>(20)
  const [station, setStation] = useState<string>("")
  const [purpose, setPurpose] = useState<string>("")
  const [odometer, setOdometer] = useState<string>("")
  const [isEmergency, setIsEmergency] = useState<boolean>(false)
  const [isChecking, setIsChecking] = useState<boolean>(false)
  const [checkResult, setCheckResult] = useState<null | {
    eligible: boolean
    message: string
    details?: Array<{ type: "success" | "warning" | "error"; message: string }>
  }>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [showEligibilityDetails, setShowEligibilityDetails] = useState<boolean>(false)

  const consumedPercentage = (fuelLimitData.consumed / fuelLimitData.monthlyLimit) * 100
  const remainingPercentage = (fuelLimitData.remaining / fuelLimitData.monthlyLimit) * 100

  const handleCheckEligibility = () => {
    if (!station || !purpose || !odometer) {
      setCheckResult({
        eligible: false,
        message: "Please fill in all required fields before checking eligibility.",
      })
      return
    }

    setIsChecking(true)
    setCheckResult(null)

    // Simulate API call
    setTimeout(() => {
      setIsChecking(false)

      const currentOdometer = Number.parseInt(odometer)
      const lastOdometer = fuelLimitData.lastOdometerReading
      const mileageDifference = currentOdometer - lastOdometer

      const details = []
      let isEligible = true

      // Check if odometer reading is valid
      if (currentOdometer <= lastOdometer) {
        details.push({
          type: "error" as const,
          message: `Invalid odometer reading. Current reading (${currentOdometer} km) must be greater than last reading (${lastOdometer} km).`,
        })
        isEligible = false
      }

      // Check minimum mileage between refills
      if (mileageDifference < fuelLimitData.minimumMileageBetweenRefills && !isEmergency) {
        details.push({
          type: "error" as const,
          message: `Minimum mileage between refills not met. You've driven ${mileageDifference} km since last refill, minimum required is ${fuelLimitData.minimumMileageBetweenRefills} km.`,
        })
        isEligible = false
      } else if (mileageDifference >= fuelLimitData.minimumMileageBetweenRefills) {
        details.push({
          type: "success" as const,
          message: `Mileage requirement met. You've driven ${mileageDifference} km since last refill.`,
        })
      }

      // Check if amount is more than remaining monthly allocation
      if (amount > fuelLimitData.remaining) {
        details.push({
          type: "error" as const,
          message: `Request exceeds your remaining monthly limit of ${fuelLimitData.remaining} liters.`,
        })
        isEligible = false
      } else {
        details.push({
          type: "success" as const,
          message: `Request amount (${amount} liters) is within your monthly allocation.`,
        })
      }

      // Check if amount is more than vehicle capacity
      const spaceInTank = fuelLimitData.vehicle.fuelCapacity - fuelLimitData.vehicle.currentFuelLevel
      if (amount > spaceInTank) {
        details.push({
          type: "error" as const,
          message: `Request exceeds your vehicle's available tank capacity. Maximum fillable amount is ${spaceInTank} liters.`,
        })
        isEligible = false
      } else {
        details.push({
          type: "success" as const,
          message: `Request amount (${amount} liters) fits within your vehicle's tank capacity.`,
        })
      }

      // Check fuel efficiency
      if (mileageDifference > 0) {
        const estimatedEfficiency = (fuelLimitData.vehicle.currentFuelLevel / mileageDifference) * 100
        if (estimatedEfficiency > fuelLimitData.averageFuelEfficiency * 1.2) {
          details.push({
            type: "warning" as const,
            message: `Your current fuel efficiency (${estimatedEfficiency.toFixed(1)} L/100km) is higher than your average (${fuelLimitData.averageFuelEfficiency} L/100km). This may indicate a vehicle issue.`,
          })
        } else {
          details.push({
            type: "success" as const,
            message: `Your fuel efficiency is within normal range.`,
          })
        }
      }

      // Emergency override for certain checks
      if (isEmergency && !isEligible) {
        const hasNonOverridableError = details.some(
          (detail) =>
            detail.type === "error" &&
            (detail.message.includes("Invalid odometer") || detail.message.includes("exceeds your remaining monthly")),
        )

        if (!hasNonOverridableError) {
          isEligible = true
          details.push({
            type: "warning" as const,
            message: `Emergency override applied. Some eligibility requirements have been waived.`,
          })
        }
      }

      // Set final result
      setCheckResult({
        eligible: isEligible,
        message: isEligible
          ? "You are eligible for this fuel request. You can proceed with your request."
          : "You are not eligible for this fuel request. Please review the details.",
        details: details,
      })
    }, 1500)
  }

  const handleSubmitRequest = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowConfirmDialog(false)
      setIsSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setAmount(20)
        setStation("")
        setPurpose("")
        setOdometer("")
        setIsEmergency(false)
        setCheckResult(null)
        setIsSuccess(false)
      }, 3000)
    }, 2000)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Request Fuel
            </CardTitle>
            <CardDescription>Fill in the details below to request fuel for your vehicle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (Liters)</Label>
              <div className="space-y-2">
                <Slider
                  id="amount"
                  min={5}
                  max={Math.min(
                    fuelLimitData.remaining,
                    fuelLimitData.vehicle.fuelCapacity - fuelLimitData.vehicle.currentFuelLevel,
                  )}
                  step={1}
                  value={[amount]}
                  onValueChange={(value) => setAmount(value[0])}
                />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">5L</span>
                  <span className="text-sm font-medium">{amount}L</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.min(
                      fuelLimitData.remaining,
                      fuelLimitData.vehicle.fuelCapacity - fuelLimitData.vehicle.currentFuelLevel,
                    )}
                    L
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="station">Fuel Station</Label>
                <Select value={station} onValueChange={setStation}>
                  <SelectTrigger id="station">
                    <SelectValue placeholder="Select a station" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelLimitData.nearbyStations
                      .filter((s) => s.available)
                      .map((station) => (
                        <SelectItem key={station.id} value={station.id}>
                          {station.name} ({station.distance})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="odometer">Current Odometer (km)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Info className="h-3 w-3 mr-1" />
                          Last reading: {fuelLimitData.lastOdometerReading} km
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Your last recorded odometer reading was {fuelLimitData.lastOdometerReading} km on{" "}
                          {new Date(fuelLimitData.lastRefill).toLocaleDateString()}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="odometer"
                  type="number"
                  placeholder="Enter current odometer reading"
                  value={odometer}
                  onChange={(e) => setOdometer(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Request</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="official_travel">Official Travel</SelectItem>
                  <SelectItem value="field_work">Field Work</SelectItem>
                  <SelectItem value="client_visit">Client Visit</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="emergency" checked={isEmergency} onCheckedChange={setIsEmergency} />
              <Label htmlFor="emergency" className="flex items-center gap-1">
                This is an emergency request
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Emergency requests may override certain eligibility criteria. This should only be used in
                        genuine emergencies and will be subject to review.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>

            {checkResult && (
              <Alert variant={checkResult.eligible ? "success" : "destructive"}>
                <div className="flex justify-between w-full">
                  <div className="flex items-start gap-2">
                    {checkResult.eligible ? (
                      <CheckCircle2 className="h-4 w-4 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 mt-0.5" />
                    )}
                    <div>
                      <AlertTitle>{checkResult.eligible ? "Eligible for Fuel" : "Not Eligible"}</AlertTitle>
                      <AlertDescription>{checkResult.message}</AlertDescription>
                    </div>
                  </div>
                  {checkResult.details && checkResult.details.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEligibilityDetails(true)}
                      className="h-8 px-2"
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setCheckResult(null)}>
              Reset
            </Button>
            <div className="space-x-2">
              <Button variant="secondary" onClick={handleCheckEligibility} disabled={isChecking}>
                {isChecking ? "Checking..." : "Check Eligibility"}
              </Button>
              <Button onClick={() => setShowConfirmDialog(true)} disabled={!checkResult?.eligible || isChecking}>
                Submit Request
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
                <span className="font-medium">{fuelLimitData.monthlyLimit}L</span>
              </div>
              <Progress value={consumedPercentage} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Used: {fuelLimitData.consumed}L ({consumedPercentage.toFixed(0)}%)
                </span>
                <span className="text-muted-foreground">Remaining: {fuelLimitData.remaining}L</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <h4 className="text-sm font-medium">Vehicle Information</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Vehicle</p>
                  <p>
                    {fuelLimitData.vehicle.make} {fuelLimitData.vehicle.model}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">License Plate</p>
                  <p>{fuelLimitData.vehicle.licensePlate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fuel Type</p>
                  <p>{fuelLimitData.vehicle.fuelType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Level</p>
                  <p>
                    {fuelLimitData.vehicle.currentFuelLevel}L / {fuelLimitData.vehicle.fuelCapacity}L
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Last Refill</h4>
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{new Date(fuelLimitData.lastRefill).toLocaleDateString()}</span>
                  <Badge variant="outline">{fuelLimitData.lastAmount}L</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">At Douala Station 1</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Odometer: {fuelLimitData.lastOdometerReading} km</span>
                  <span>Efficiency: {fuelLimitData.averageFuelEfficiency} L/100km</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Eligibility Rules</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-[10px] font-bold">1</span>
                  </div>
                  <p>Minimum {fuelLimitData.minimumMileageBetweenRefills} km must be driven between refills</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-[10px] font-bold">2</span>
                  </div>
                  <p>Request amount must not exceed your remaining monthly allocation</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-[10px] font-bold">3</span>
                  </div>
                  <p>Request amount must not exceed your vehicle's available tank capacity</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Fuel Request</DialogTitle>
            <DialogDescription>Please review your fuel request details before submitting</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="font-medium">{amount} liters</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Station</p>
                <p className="font-medium">
                  {fuelLimitData.nearbyStations.find((s) => s.id === station)?.name || "Not selected"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Purpose</p>
                <p className="font-medium">
                  {purpose === "official_travel"
                    ? "Official Travel"
                    : purpose === "field_work"
                      ? "Field Work"
                      : purpose === "client_visit"
                        ? "Client Visit"
                        : purpose === "delivery"
                          ? "Delivery"
                          : purpose === "other"
                            ? "Other"
                            : "Not selected"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Odometer</p>
                <p className="font-medium">{odometer} km</p>
              </div>
            </div>

            {isEmergency && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Emergency Request</AlertTitle>
                <AlertDescription>
                  This request has been marked as an emergency and will be prioritized.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Confirm Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              Request Submitted Successfully
            </DialogTitle>
            <DialogDescription>Your fuel request has been submitted and is pending approval</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Request ID</span>
                <Badge>
                  FR-
                  {Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Your request for {amount} liters of {fuelLimitData.vehicle.fuelType} has been submitted.
              </p>
              <p className="text-sm text-muted-foreground">
                You will receive a notification once your request has been approved. You can then proceed to the
                selected fuel station.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsSuccess(false)}>Close</Button>
            <Button variant="outline" asChild>
              <a href="/employee/transactions">View All Transactions</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEligibilityDetails} onOpenChange={setShowEligibilityDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eligibility Check Details</DialogTitle>
            <DialogDescription>Detailed results of your eligibility check</DialogDescription>
          </DialogHeader>

          {checkResult?.details && (
            <div className="space-y-3">
              {checkResult.details.map((detail, index) => (
                <Alert
                  key={index}
                  variant={
                    detail.type === "success" ? "success" : detail.type === "warning" ? "warning" : "destructive"
                  }
                >
                  {detail.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : detail.type === "warning" ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{detail.message}</AlertDescription>
                </Alert>
              ))}

              {isEmergency &&
                checkResult.eligible &&
                checkResult.details.some((d) => d.type === "warning" && d.message.includes("Emergency override")) && (
                  <div className="text-sm text-muted-foreground border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
                    <p className="font-medium text-yellow-800">Emergency Override Applied</p>
                    <p className="mt-1">
                      Your request has been marked as an emergency, which has overridden some eligibility criteria.
                      Please note that emergency requests are subject to additional review by administrators.
                    </p>
                  </div>
                )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowEligibilityDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

