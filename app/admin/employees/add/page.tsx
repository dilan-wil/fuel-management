"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, UserPlus, Shield, CreditCard } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AddEmployeePage() {
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otpValue, setOtpValue] = useState("")

  // Verify OTP and perform action
  const verifyOtpAndPerformAction = () => {
    // In a real app, you would verify the OTP with a server
    // For this demo, we'll just check if it's "123456"
    if (otpValue === "123456") {
      alert("Employee added successfully!")
      setShowOtpDialog(false)
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Add New Employee</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/employees">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Employees
              </Link>
            </Button>
          </div>
          <Button className="bg-nestle-red hover:bg-nestle-darkred" onClick={() => setShowOtpDialog(true)}>
            <Save className="mr-2 h-4 w-4" />
            Save Employee
          </Button>
        </div>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="access">Access</TabsTrigger>
            <TabsTrigger value="card">Access Card</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-nestle-red" />
                  Basic Information
                </CardTitle>
                <CardDescription>Enter the basic details of the new employee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter last name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-id">Employee ID</Label>
                    <Input id="employee-id" placeholder="Enter employee ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="Enter position" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
                <CardDescription>Enter the contact information for the employee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input id="emergency-contact" placeholder="Enter emergency contact" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Emergency Phone</Label>
                    <Input id="emergency-phone" placeholder="Enter emergency phone" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter address" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Access & Permissions</CardTitle>
                <CardDescription>Configure system access and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter username" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initial-password">Initial Password</Label>
                  <Input id="initial-password" type="password" placeholder="Enter initial password" />
                  <p className="text-xs text-muted-foreground">
                    The employee will be required to change this password on first login.
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Authentication Method</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="otp-auth">OTP Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require OTP verification for sensitive actions</p>
                    </div>
                    <Switch id="otp-auth" defaultChecked />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">System Access</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="user">
                        <SelectTrigger id="role" className="w-[180px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="user">Regular User</SelectItem>
                          <SelectItem value="readonly">Read Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fuel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Limits & Allowances</CardTitle>
                <CardDescription>Set fuel consumption limits for the employee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="daily-limit">Daily Limit (Liters)</Label>
                    <Input id="daily-limit" type="number" placeholder="Enter daily limit" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weekly-limit">Weekly Limit (Liters)</Label>
                    <Input id="weekly-limit" type="number" placeholder="Enter weekly limit" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthly-limit">Monthly Limit (Liters)</Label>
                    <Input id="monthly-limit" type="number" placeholder="Enter monthly limit" />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Vehicle Assignment</h3>
                  <div className="space-y-2">
                    <Label htmlFor="assigned-vehicle">Assigned Vehicle</Label>
                    <Select>
                      <SelectTrigger id="assigned-vehicle">
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v001">Toyota Camry (ABC-1234)</SelectItem>
                        <SelectItem value="v002">Honda Civic (DEF-5678)</SelectItem>
                        <SelectItem value="v003">Nissan Altima (JKL-3456)</SelectItem>
                        <SelectItem value="v004">Ford Focus (GHI-9012)</SelectItem>
                        <SelectItem value="v005">Toyota Corolla (MNO-7890)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Fuel Card</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Fuel Card Number</Label>
                      <Input id="card-number" placeholder="Enter card number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-pin">PIN (Last 4 digits)</Label>
                      <Input id="card-pin" placeholder="Enter PIN" maxLength={4} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button className="bg-nestle-red hover:bg-nestle-darkred" onClick={() => setShowOtpDialog(true)}>
                  Save Employee
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="card" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-nestle-red" />
                  Access Card Information
                </CardTitle>
                <CardDescription>Configure the employee's access card settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-type">Card Type</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="card-type">
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Access</SelectItem>
                      <SelectItem value="limited">Limited Access</SelectItem>
                      <SelectItem value="full">Full Access</SelectItem>
                      <SelectItem value="temporary">Temporary Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-expiry">Card Expiry</Label>
                  <Input
                    id="card-expiry"
                    type="date"
                    defaultValue={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="card-active">Card Active</Label>
                      <p className="text-sm text-muted-foreground">Enable or disable the access card</p>
                    </div>
                    <Switch id="card-active" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="fuel-access">Fuel Access</Label>
                      <p className="text-sm text-muted-foreground">Allow employee to request fuel</p>
                    </div>
                    <Switch id="fuel-access" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-access">Maintenance Access</Label>
                      <p className="text-sm text-muted-foreground">Allow employee to request maintenance</p>
                    </div>
                    <Switch id="maintenance-access" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* OTP Verification Dialog */}
        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-nestle-red" />
                OTP Verification Required
              </DialogTitle>
              <DialogDescription>
                Please enter the one-time password sent to your registered email or phone to continue.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password (OTP)</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
                <p className="text-xs text-muted-foreground">
                  For demo purposes, use OTP: <span className="font-mono font-bold">123456</span>
                </p>
              </div>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>This action requires verification for security purposes.</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowOtpDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-nestle-red hover:bg-nestle-darkred" onClick={verifyOtpAndPerformAction}>
                Verify & Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

