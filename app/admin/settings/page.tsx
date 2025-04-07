"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Settings, Bell, Fuel, Building, Shield, Save } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">System Settings</h1>
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
            {isEditing ? "Cancel Editing" : "Edit Settings"}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="fuel">Fuel Management</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-nestle-red" />
                  General Settings
                </CardTitle>
                <CardDescription>Configure general system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">System Name</Label>
                    <Input id="system-name" defaultValue="Nestle Cameroon Fuel Management" readOnly={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="system-url">System URL</Label>
                    <Input id="system-url" defaultValue="https://fuel.nestlecameroon.com" readOnly={!isEditing} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select disabled={!isEditing} defaultValue="africa-douala">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="africa-douala">Africa/Douala (GMT+1)</SelectItem>
                        <SelectItem value="africa-lagos">Africa/Lagos (GMT+1)</SelectItem>
                        <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select disabled={!isEditing} defaultValue="dd-mm-yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select disabled={!isEditing} defaultValue="xaf">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xaf">XAF - Central African CFA franc</SelectItem>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">System Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable maintenance mode to prevent user access during updates
                        </p>
                      </div>
                      <Switch id="maintenance-mode" disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="debug-mode">Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable debug mode for detailed error logging</p>
                      </div>
                      <Switch id="debug-mode" disabled={!isEditing} />
                    </div>
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button className="ml-auto bg-nestle-red hover:bg-nestle-darkred">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-nestle-red" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-alerts">Fraud Alerts</Label>
                        <p className="text-sm text-muted-foreground">Send email notifications for new fraud alerts</p>
                      </div>
                      <Switch id="email-alerts" defaultChecked disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-reports">Daily Reports</Label>
                        <p className="text-sm text-muted-foreground">Send daily summary reports via email</p>
                      </div>
                      <Switch id="email-reports" defaultChecked disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-maintenance">Maintenance Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email notifications for upcoming vehicle maintenance
                        </p>
                      </div>
                      <Switch id="email-maintenance" defaultChecked disabled={!isEditing} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">SMS Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-alerts">Fraud Alerts</Label>
                        <p className="text-sm text-muted-foreground">Send SMS notifications for new fraud alerts</p>
                      </div>
                      <Switch id="sms-alerts" disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-maintenance">Maintenance Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Send SMS notifications for upcoming vehicle maintenance
                        </p>
                      </div>
                      <Switch id="sms-maintenance" disabled={!isEditing} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-server">SMTP Server</Label>
                      <Input id="smtp-server" defaultValue="smtp.nestlecameroon.com" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" defaultValue="587" readOnly={!isEditing} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-username">SMTP Username</Label>
                      <Input id="smtp-username" defaultValue="notifications@nestlecameroon.com" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password">SMTP Password</Label>
                      <Input id="smtp-password" type="password" defaultValue="••••••••••••" readOnly={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input id="from-email" defaultValue="fuel-management@nestlecameroon.com" readOnly={!isEditing} />
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button className="ml-auto bg-nestle-red hover:bg-nestle-darkred">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="fuel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-nestle-red" />
                  Fuel Management Settings
                </CardTitle>
                <CardDescription>Configure fuel management settings and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Fuel Prices</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="petrol-price">Petrol Price (per liter)</Label>
                      <Input id="petrol-price" defaultValue="2250" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diesel-price">Diesel Price (per liter)</Label>
                      <Input id="diesel-price" defaultValue="2250" readOnly={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-update-date">Last Price Update</Label>
                    <Input id="price-update-date" defaultValue="2025-03-01" readOnly={!isEditing} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Fuel Limits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-daily-limit">Default Daily Limit (Liters)</Label>
                      <Input id="default-daily-limit" defaultValue="50" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="default-weekly-limit">Default Weekly Limit (Liters)</Label>
                      <Input id="default-weekly-limit" defaultValue="250" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="default-monthly-limit">Default Monthly Limit (Liters)</Label>
                      <Input id="default-monthly-limit" defaultValue="1000" readOnly={!isEditing} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Fraud Detection</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="fraud-detection">Fraud Detection System</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable automatic fraud detection for transactions
                        </p>
                      </div>
                      <Switch id="fraud-detection" defaultChecked disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fraud-threshold">Fraud Detection Threshold (%)</Label>
                    <Input id="fraud-threshold" defaultValue="20" readOnly={!isEditing} />
                    <p className="text-xs text-muted-foreground">
                      Transactions exceeding normal patterns by this percentage will be flagged
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Fuel Stations</h3>
                  <div className="space-y-2">
                    <Label htmlFor="authorized-stations">Authorized Fuel Stations</Label>
                    <Textarea
                      id="authorized-stations"
                      defaultValue="Douala Station 1, Douala Station 2, Douala Station 3, Yaounde Station 1, Yaounde Station 2, Bafoussam Station 1"
                      readOnly={!isEditing}
                    />
                    <p className="text-xs text-muted-foreground">Comma-separated list of authorized fuel stations</p>
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button className="ml-auto bg-nestle-red hover:bg-nestle-darkred">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-nestle-red" />
                  Company Settings
                </CardTitle>
                <CardDescription>Configure company information and structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Nestle Cameroon" readOnly={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-id">Company ID</Label>
                    <Input id="company-id" defaultValue="NESTLE-CM-001" readOnly={!isEditing} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">Company Address</Label>
                  <Textarea
                    id="company-address"
                    defaultValue="123 Nestle Way, Douala, Cameroon"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Phone Number</Label>
                    <Input id="company-phone" defaultValue="+237 233 123 456" readOnly={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Email Address</Label>
                    <Input id="company-email" defaultValue="info@nestlecameroon.com" readOnly={!isEditing} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Departments</h3>
                  <div className="space-y-2">
                    <Label htmlFor="departments">Company Departments</Label>
                    <Textarea
                      id="departments"
                      defaultValue="Sales, Operations, Admin, Management, IT"
                      readOnly={!isEditing}
                    />
                    <p className="text-xs text-muted-foreground">Comma-separated list of departments</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Business Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-hours-start">Start Time</Label>
                      <Input id="business-hours-start" defaultValue="08:00" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-hours-end">End Time</Label>
                      <Input id="business-hours-end" defaultValue="17:00" readOnly={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-days">Business Days</Label>
                    <Input
                      id="business-days"
                      defaultValue="Monday, Tuesday, Wednesday, Thursday, Friday"
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button className="ml-auto bg-nestle-red hover:bg-nestle-darkred">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-nestle-red" />
                  System Integrations
                </CardTitle>
                <CardDescription>Configure third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment Gateway</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="payment-gateway">Payment Gateway Integration</Label>
                        <p className="text-sm text-muted-foreground">Enable integration with payment gateway</p>
                      </div>
                      <Switch id="payment-gateway" defaultChecked disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gateway-api-key">API Key</Label>
                      <Input
                        id="gateway-api-key"
                        type="password"
                        defaultValue="••••••••••••••••••••••••••••••"
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gateway-secret">API Secret</Label>
                      <Input
                        id="gateway-secret"
                        type="password"
                        defaultValue="••••••••••••••••••••••••••••••"
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">SMS Gateway</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-gateway">SMS Gateway Integration</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable integration with SMS gateway for notifications
                        </p>
                      </div>
                      <Switch id="sms-gateway" defaultChecked disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sms-api-key">API Key</Label>
                      <Input
                        id="sms-api-key"
                        type="password"
                        defaultValue="••••••••••••••••••••••••••••••"
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sms-sender-id">Sender ID</Label>
                      <Input id="sms-sender-id" defaultValue="NESTLEFUEL" readOnly={!isEditing} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">ERP Integration</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="erp-integration">ERP System Integration</Label>
                        <p className="text-sm text-muted-foreground">Enable integration with company ERP system</p>
                      </div>
                      <Switch id="erp-integration" defaultChecked disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="erp-endpoint">ERP API Endpoint</Label>
                    <Input
                      id="erp-endpoint"
                      defaultValue="https://erp.nestlecameroon.com/api/v1"
                      readOnly={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="erp-username">API Username</Label>
                      <Input id="erp-username" defaultValue="fuel-system" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="erp-password">API Password</Label>
                      <Input id="erp-password" type="password" defaultValue="••••••••••••••••" readOnly={!isEditing} />
                    </div>
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button className="ml-auto bg-nestle-red hover:bg-nestle-darkred">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

