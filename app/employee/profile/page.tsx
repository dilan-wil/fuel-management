"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Building, Camera, Save } from "lucide-react"
import EmployeeLayout from "@/components/employee-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <EmployeeLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">View and update your profile information</p>
          </div>
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? "" : "bg-nestle-red hover:bg-nestle-darkred"}
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal information and photo</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="John Doe" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-background border-2 border-muted"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-muted-foreground">Sales Representative</p>
              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@nestlecameroon.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+237 654 321 987</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Sales Department</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Douala, Cameroon</span>
                </div>
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-center">
                <Button className="bg-nestle-red hover:bg-nestle-darkred">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>

          <Card className="lg:col-span-2">
            <Tabs defaultValue="personal">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Account Details</CardTitle>
                  <TabsList>
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="work">Work</TabsTrigger>
                    <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" readOnly={!isEditing} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@nestlecameroon.com" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+237 654 321 987" readOnly={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="123 Main Street, Douala, Cameroon" readOnly={!isEditing} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input id="emergency-contact" defaultValue="Jane Doe - +237 654 123 456" readOnly={!isEditing} />
                  </div>
                </TabsContent>

                <TabsContent value="work" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee-id">Employee ID</Label>
                      <Input id="employee-id" defaultValue="EMP001" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" defaultValue="Sales" readOnly />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input id="position" defaultValue="Sales Representative" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">Manager</Label>
                      <Input id="manager" defaultValue="Robert Johnson" readOnly />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="join-date">Join Date</Label>
                      <Input id="join-date" defaultValue="January 15, 2023" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="office-location">Office Location</Label>
                      <Input id="office-location" defaultValue="Douala HQ" readOnly />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="vehicle" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-model">Vehicle Model</Label>
                      <Input id="vehicle-model" defaultValue="Toyota Camry" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-plate">Plate Number</Label>
                      <Input id="vehicle-plate" defaultValue="ABC-1234" readOnly />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fuel-card">Fuel Card Number</Label>
                      <Input id="fuel-card" defaultValue="**** **** **** 1234" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuel-type">Fuel Type</Label>
                      <Input id="fuel-type" defaultValue="Petrol" readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fuel-limits">Fuel Limits</Label>
                    <div className="p-3 bg-muted/30 rounded-md">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">Daily</p>
                          <p>20 Liters</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Weekly</p>
                          <p>100 Liters</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Monthly</p>
                          <p>250 Liters</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="p-4 bg-muted/30 rounded-md space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">OTP Verification</h4>
                          <p className="text-sm text-muted-foreground">Require OTP verification when logging in</p>
                        </div>
                        <Switch checked={true} disabled={!isEditing} />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Verification Method</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="email-otp" checked={true} disabled={!isEditing} />
                            <Label htmlFor="email-otp" className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email OTP
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="sms-otp" checked={true} disabled={!isEditing} />
                            <Label htmlFor="sms-otp" className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              SMS OTP
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Card PIN</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-pin">Current PIN</Label>
                        <Input id="current-pin" type="password" maxLength={4} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-pin">New PIN</Label>
                        <Input id="new-pin" type="password" maxLength={4} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-pin">Confirm New PIN</Label>
                        <Input id="confirm-pin" type="password" maxLength={4} disabled={!isEditing} />
                      </div>
                    </div>
                    {isEditing && (
                      <Button className="bg-nestle-red hover:bg-nestle-darkred">
                        <Save className="mr-2 h-4 w-4" />
                        Update PIN
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Login History</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-muted/30 rounded-md">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Today, 09:15 AM</p>
                            <p className="text-sm text-muted-foreground">Chrome on Windows</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Douala, Cameroon</p>
                            <p className="text-sm text-muted-foreground">IP: 192.168.1.45</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Yesterday, 16:42 PM</p>
                            <p className="text-sm text-muted-foreground">Safari on iPhone</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Douala, Cameroon</p>
                            <p className="text-sm text-muted-foreground">IP: 192.168.1.60</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button className="ml-auto bg-nestle-red hover:bg-nestle-darkred">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Tabs>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your password and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" disabled={!isEditing} />
                </div>
                {isEditing && (
                  <Button className="bg-nestle-red hover:bg-nestle-darkred">
                    <Save className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change PIN</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-pin">Current PIN</Label>
                  <Input id="current-pin" type="password" disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pin">New PIN</Label>
                  <Input id="new-pin" type="password" disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-pin">Confirm New PIN</Label>
                  <Input id="confirm-pin" type="password" disabled={!isEditing} />
                </div>
                {isEditing && (
                  <Button className="bg-nestle-red hover:bg-nestle-darkred">
                    <Save className="mr-2 h-4 w-4" />
                    Update PIN
                  </Button>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Login History</h3>
              <div className="space-y-2">
                <div className="p-3 bg-muted/30 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Today, 09:15 AM</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Douala, Cameroon</p>
                      <p className="text-sm text-muted-foreground">IP: 192.168.1.45</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-muted/30 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Yesterday, 16:42 PM</p>
                      <p className="text-sm text-muted-foreground">Safari on iPhone</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Douala, Cameroon</p>
                      <p className="text-sm text-muted-foreground">IP: 192.168.1.60</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  )
}

