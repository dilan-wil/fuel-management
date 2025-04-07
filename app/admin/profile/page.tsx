"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Mail, Phone, MapPin, Building, Calendar, Shield, Camera } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
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
                  {imagePreview ? (
                    <AvatarImage src={imagePreview} alt="Admin User" />
                  ) : (
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Admin User" />
                  )}
                  <AvatarFallback className="text-2xl">AU</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      id="profile-picture"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0]
                          setSelectedImage(file)
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            if (e.target && typeof e.target.result === "string") {
                              setImagePreview(e.target.result)
                            }
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background border-2 border-muted"
                      onClick={() => document.getElementById("profile-picture")?.click()}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              {selectedImage && isEditing && (
                <div className="mt-2 mb-4">
                  <Button
                    variant="default"
                    className="bg-nestle-red hover:bg-nestle-darkred"
                    disabled={isUploading}
                    onClick={() => {
                      setIsUploading(true)
                      // Simulate upload process
                      setTimeout(() => {
                        setIsUploading(false)
                        toast({
                          title: "Profile picture uploaded",
                          description: "Your profile picture has been uploaded successfully.",
                        })
                        // In a real app, you would upload the file to a server here
                      }, 1500)
                    }}
                  >
                    {isUploading ? "Uploading..." : "Upload Picture"}
                  </Button>
                </div>
              )}
              <h3 className="text-xl font-bold">Admin User</h3>
              <p className="text-muted-foreground">System Administrator</p>
              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>admin@nestlecameroon.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+237 654 321 987</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Nestle Cameroon - Head Office</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Douala, Cameroon</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined January 2022</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              {isEditing ? (
                <Button
                  className="bg-nestle-red hover:bg-nestle-darkred"
                  onClick={() => {
                    setIsEditing(false)
                    setSelectedImage(null) // Clear selected image if not uploaded
                    toast({
                      title: "Profile updated",
                      description: "Your profile has been updated successfully.",
                    })
                  }}
                >
                  Save Changes
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/admin/security">
                    <Shield className="mr-2 h-4 w-4" />
                    Security Settings
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card className="lg:col-span-2">
            <Tabs defaultValue="personal">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Account Details</CardTitle>
                  <TabsList>
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="work">Work</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Admin" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="User" readOnly={!isEditing} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="admin@nestlecameroon.com" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+237 654 321 987" readOnly={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="Douala, Cameroon" readOnly={!isEditing} />
                  </div>
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button
                        className="bg-nestle-red hover:bg-nestle-darkred"
                        onClick={() => {
                          toast({
                            title: "Personal information updated",
                            description: "Your personal information has been updated successfully.",
                          })
                        }}
                      >
                        Save Personal Info
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="work" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input id="job-title" defaultValue="System Administrator" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select disabled={!isEditing} defaultValue="it">
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee-id">Employee ID</Label>
                      <Input id="employee-id" defaultValue="EMP-001" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Office Location</Label>
                      <Input id="location" defaultValue="Head Office - Douala" readOnly={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="System Administrator with over 5 years of experience in fuel management systems."
                      readOnly={!isEditing}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked disabled={!isEditing} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                        <Switch id="sms-notifications" defaultChecked disabled={!isEditing} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">System Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="language">Language</Label>
                          <p className="text-sm text-muted-foreground">Select your preferred language</p>
                        </div>
                        <Select disabled={!isEditing} defaultValue="en">
                          <SelectTrigger id="language" className="w-[180px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="theme">Theme</Label>
                          <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                        </div>
                        <Select disabled={!isEditing} defaultValue="light">
                          <SelectTrigger id="theme" className="w-[180px]">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button className="ml-auto bg-nestle-red hover:bg-nestle-darkred">Save Changes</Button>
                </CardFooter>
              )}
            </Tabs>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

