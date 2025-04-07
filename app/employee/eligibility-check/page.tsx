import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Fuel, AlertCircle, CheckCircle2, Info, Car, BarChart3 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts"

export const metadata: Metadata = {
  title: "Eligibility Check | Nestle Cameroon Fuel Management",
  description: "Check your eligibility for fuel requests based on mileage and consumption limits",
}

// Mock data
const vehicleData = {
  id: "VH-2023-0042",
  make: "Toyota",
  model: "Land Cruiser",
  licensePlate: "CM 234-AB",
  fuelType: "Diesel",
  fuelCapacity: 80,
  currentFuelLevel: 35,
  mileage: 24560,
  lastMileage: 24100,
  lastRefill: "2023-11-10",
  lastRefillAmount: 38.5,
  minimumMileageBetweenRefills: 150,
  averageFuelEfficiency: 8.6, // L/100km
}

const fuelLimitData = {
  monthlyLimit: 250,
  consumed: 175,
  remaining: 75,
  dailyLimit: 20,
  dailyUsed: 0,
  weeklyLimit: 100,
  weeklyUsed: 45,
}

const mileageHistory = [
  { date: "2023-11-25", odometer: 24560, distance: 460, refill: 45.2 },
  { date: "2023-11-10", odometer: 24100, distance: 500, refill: 38.5 },
  { date: "2023-10-28", odometer: 23600, distance: 450, refill: 42.0 },
  { date: "2023-10-15", odometer: 23150, distance: 400, refill: 35.5 },
  { date: "2023-09-30", odometer: 22750, distance: 480, refill: 40.0 },
]

const efficiencyData = [
  { month: "Jul", efficiency: 8.6 },
  { month: "Aug", efficiency: 8.9 },
  { month: "Sep", efficiency: 8.7 },
  { month: "Oct", efficiency: 8.5 },
  { month: "Nov", efficiency: 8.6 },
]

export default function EligibilityCheckPage() {
  const consumedPercentage = (fuelLimitData.consumed / fuelLimitData.monthlyLimit) * 100
  const dailyUsedPercentage = (fuelLimitData.dailyUsed / fuelLimitData.dailyLimit) * 100
  const weeklyUsedPercentage = (fuelLimitData.weeklyUsed / fuelLimitData.weeklyLimit) * 100

  const mileageSinceLastRefill = vehicleData.mileage - vehicleData.lastMileage
  const isMileageEligible = mileageSinceLastRefill >= vehicleData.minimumMileageBetweenRefills

  const spaceInTank = vehicleData.fuelCapacity - vehicleData.currentFuelLevel
  const maxRequestAmount = Math.min(fuelLimitData.remaining, spaceInTank)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Eligibility Check</h1>
        <p className="text-muted-foreground">
          Check your eligibility for fuel requests based on mileage and consumption limits
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
        <h3 className="text-blue-800 font-medium flex items-center gap-2">
          <Info className="h-5 w-5" />
          How Eligibility Works
        </h3>
        <p className="text-blue-700 mt-1">Your eligibility for fuel is determined by two main factors:</p>
        <ul className="text-blue-700 mt-2 space-y-1 list-disc pl-5">
          <li>You must have driven at least {vehicleData.minimumMileageBetweenRefills} km since your last refill</li>
          <li>You must have sufficient remaining allocation in your daily, weekly, and monthly limits</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Mileage Eligibility
            </CardTitle>
            <CardDescription>Check if you've driven enough distance since your last refill</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Current Status</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Odometer</span>
                      <span className="font-medium">{vehicleData.mileage} km</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Last Refill Odometer</span>
                      <span className="font-medium">{vehicleData.lastMileage} km</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Distance Since Last Refill</span>
                      <span className="font-medium">{mileageSinceLastRefill} km</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Minimum Required</span>
                      <span className="font-medium">{vehicleData.minimumMileageBetweenRefills} km</span>
                    </div>
                  </div>

                  <Alert variant={isMileageEligible ? "success" : "destructive"}>
                    {isMileageEligible ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertTitle>
                      {isMileageEligible ? "Eligible Based on Mileage" : "Not Eligible Based on Mileage"}
                    </AlertTitle>
                    <AlertDescription>
                      {isMileageEligible
                        ? `You've driven ${mileageSinceLastRefill} km since your last refill, which exceeds the minimum requirement of ${vehicleData.minimumMileageBetweenRefills} km.`
                        : `You've only driven ${mileageSinceLastRefill} km since your last refill. You need to drive at least ${vehicleData.minimumMileageBetweenRefills - mileageSinceLastRefill} km more to be eligible.`}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Check with New Odometer</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="new-odometer">Enter New Odometer Reading (km)</Label>
                    <Input
                      id="new-odometer"
                      type="number"
                      placeholder="Enter current odometer reading"
                      defaultValue={vehicleData.mileage}
                    />
                    <p className="text-xs text-muted-foreground">
                      Last recorded: {vehicleData.lastMileage} km on{" "}
                      {new Date(vehicleData.lastRefill).toLocaleDateString()}
                    </p>
                  </div>

                  <Button className="w-full">Check Eligibility</Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Mileage History</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Odometer</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Distance</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Refill</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mileageHistory.map((entry, index) => (
                      <tr key={index} className={index === 0 ? "bg-muted/20" : ""}>
                        <td className="px-4 py-2 text-sm">{new Date(entry.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2 text-sm">{entry.odometer} km</td>
                        <td className="px-4 py-2 text-sm">{entry.distance} km</td>
                        <td className="px-4 py-2 text-sm">{entry.refill} L</td>
                        <td className="px-4 py-2 text-sm">
                          {((entry.refill / entry.distance) * 100).toFixed(1)} L/100km
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Consumption Limits
            </CardTitle>
            <CardDescription>Your current fuel allocation status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Monthly Limit</span>
                <span>
                  {fuelLimitData.consumed}L / {fuelLimitData.monthlyLimit}L
                </span>
              </div>
              <Progress value={consumedPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Remaining: {fuelLimitData.remaining}L</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Weekly Limit</span>
                <span>
                  {fuelLimitData.weeklyUsed}L / {fuelLimitData.weeklyLimit}L
                </span>
              </div>
              <Progress value={weeklyUsedPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Remaining: {fuelLimitData.weeklyLimit - fuelLimitData.weeklyUsed}L
              </p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Daily Limit</span>
                <span>
                  {fuelLimitData.dailyUsed}L / {fuelLimitData.dailyLimit}L
                </span>
              </div>
              <Progress value={dailyUsedPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Remaining: {fuelLimitData.dailyLimit - fuelLimitData.dailyUsed}L
              </p>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">Vehicle Capacity</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Current Level</span>
                  <span>
                    {vehicleData.currentFuelLevel}L / {vehicleData.fuelCapacity}L
                  </span>
                </div>
                <Progress value={(vehicleData.currentFuelLevel / vehicleData.fuelCapacity) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Available space: {spaceInTank}L</p>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">Maximum Request</h3>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Based on your limits and vehicle capacity, you can request up to{" "}
                  <strong>{maxRequestAmount} liters</strong> of fuel.
                </AlertDescription>
              </Alert>
            </div>

            <Button className="w-full" asChild>
              <a href="/employee/quick-actions">Request Fuel</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="efficiency" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="efficiency">Efficiency Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Fuel Efficiency Analysis
              </CardTitle>
              <CardDescription>Track your vehicle's fuel efficiency over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={efficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[8, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="efficiency" name="Fuel Efficiency (L/100km)" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Current Efficiency</h4>
                  <p className="text-xl font-bold">{vehicleData.averageFuelEfficiency} L/100km</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on your last 5 refills</p>
                </div>

                <div className="bg-muted/50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Best Efficiency</h4>
                  <p className="text-xl font-bold">8.5 L/100km</p>
                  <p className="text-xs text-muted-foreground mt-1">Achieved in October 2023</p>
                </div>

                <div className="bg-muted/50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Fleet Average</h4>
                  <p className="text-xl font-bold">9.2 L/100km</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your efficiency is 6.5% better than fleet average
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Fuel Efficiency Recommendations
              </CardTitle>
              <CardDescription>Tips to improve your fuel efficiency and maximize your allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-medium">Driving Habits</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Maintain a steady speed and avoid rapid acceleration</li>
                    <li>• Use cruise control on highways when possible</li>
                    <li>• Avoid excessive idling (turn off engine if stopped for more than 1 minute)</li>
                    <li>• Plan your routes to avoid traffic congestion and minimize distance</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-medium">Vehicle Maintenance</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Ensure tires are properly inflated (check weekly)</li>
                    <li>• Keep up with regular maintenance schedule</li>
                    <li>• Replace air filters as recommended</li>
                    <li>• Use the recommended grade of motor oil</li>
                  </ul>
                </div>

                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h3 className="font-medium">Load Management</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Remove unnecessary items from the vehicle to reduce weight</li>
                    <li>• Avoid carrying heavy loads when not necessary</li>
                    <li>• Use roof racks only when needed (they increase drag)</li>
                  </ul>
                </div>

                <Alert className="bg-blue-50 border-blue-100">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Personalized Recommendation</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Based on your driving patterns, you could improve your efficiency by approximately 0.3 L/100km by
                    maintaining a more consistent speed on your regular routes. This could save up to 15 liters of fuel
                    per month.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/employee/help">Get More Efficiency Tips</a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

