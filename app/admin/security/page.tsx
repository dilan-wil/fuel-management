"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  UserCog,
  LogOut,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [loginNotificationsEnabled, setLoginNotificationsEnabled] = useState(true)
  const [sessionTimeoutEnabled, setSessionTimeoutEnabled] = useState(true)

  const securityLogs = [
    {
      event: "Password Changed",
      user: "Admin User",
      ip: "192.168.1.45",
      date: "2025-03-24 14:32:15",
      status: "success",
    },
    { event: "Login Attempt", user: "Admin User", ip: "192.168.1.45", date: "2025-03-24 09:15:22", status: "success" },
    { event: "Login Attempt", user: "Admin User", ip: "41.202.219.76", date: "2025-03-23 18:45:10", status: "failed" },
    {
      event: "Security Settings Updated",
      user: "Admin User",
      ip: "192.168.1.45",
      date: "2025-03-22 11:20:05",
      status: "success",
    },
    { event: "2FA Enabled", user: "Admin User", ip: "192.168.1.45", date: "2025-03-20 10:05:33", status: "success" },
  ]

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Security Settings</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="password" className="space-y-4">
          <TabsList>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="2fa">Two-Factor Authentication</TabsTrigger>
            <TabsTrigger value="sessions">Sessions & Privacy</TabsTrigger>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="password" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-nestle-red" />
                  Change Password
                </CardTitle>
                <CardDescription>Update your password to maintain account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter your current password"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Password Strength</div>
                  <Progress value={85} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Weak</span>
                    <span>Strong</span>
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-md space-y-2">
                  <div className="text-sm font-medium">Password Requirements</div>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Minimum 8 characters</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>At least one uppercase letter</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>At least one number</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>At least one special character</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-nestle-red hover:bg-nestle-darkred">Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="2fa" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-nestle-red" />
                  Two-Factor Authentication (2FA)
                </CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa-toggle">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                  </div>
                  <Switch id="2fa-toggle" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="text-sm font-medium">Verification Methods</div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 border rounded-md">
                      <div className="bg-nestle-lightred rounded-full p-2 mt-1">
                        <Smartphone className="h-5 w-5 text-nestle-red" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Authenticator App</h3>
                            <p className="text-sm text-muted-foreground">
                              Use an app like Google Authenticator or Authy
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Key className="mr-2 h-4 w-4" />
                          Setup
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 border rounded-md">
                      <div className="bg-muted rounded-full p-2 mt-1">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">SMS Verification</h3>
                            <p className="text-sm text-muted-foreground">Receive a code via text message</p>
                          </div>
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            Not Set Up
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Key className="mr-2 h-4 w-4" />
                          Setup
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 border rounded-md">
                      <div className="bg-muted rounded-full p-2 mt-1">
                        <Key className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Backup Codes</h3>
                            <p className="text-sm text-muted-foreground">Generate one-time use backup codes</p>
                          </div>
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            Not Generated
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Key className="mr-2 h-4 w-4" />
                          Generate Codes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-nestle-red hover:bg-nestle-darkred">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5 text-nestle-red" />
                  Sessions & Privacy
                </CardTitle>
                <CardDescription>Manage your active sessions and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy Settings</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="login-notifications">Login Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email notifications for new logins</p>
                      </div>
                      <Switch
                        id="login-notifications"
                        checked={loginNotificationsEnabled}
                        onCheckedChange={setLoginNotificationsEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="session-timeout">Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after 30 minutes of inactivity
                        </p>
                      </div>
                      <Switch
                        id="session-timeout"
                        checked={sessionTimeoutEnabled}
                        onCheckedChange={setSessionTimeoutEnabled}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Active Sessions</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 border rounded-md bg-muted/10">
                      <div className="bg-green-100 rounded-full p-2 mt-1">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Current Session</h3>
                            <p className="text-sm text-muted-foreground">Chrome on Windows • 192.168.1.45</p>
                            <p className="text-xs text-muted-foreground">Started: March 24, 2025 at 09:15</p>
                          </div>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active Now</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 border rounded-md">
                      <div className="bg-muted rounded-full p-2 mt-1">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Mobile Session</h3>
                            <p className="text-sm text-muted-foreground">Safari on iPhone • 192.168.1.60</p>
                            <p className="text-xs text-muted-foreground">Last active: March 23, 2025 at 16:42</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 border rounded-md">
                      <div className="bg-muted rounded-full p-2 mt-1">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Tablet Session</h3>
                            <p className="text-sm text-muted-foreground">Chrome on iPad • 192.168.1.72</p>
                            <p className="text-xs text-muted-foreground">Last active: March 22, 2025 at 10:15</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Revoke All Other Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-nestle-red" />
                  Security Logs
                </CardTitle>
                <CardDescription>Review recent security events for your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityLogs.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{log.event}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.ip}</TableCell>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>
                          {log.status === "success" ? (
                            <Badge className="bg-green-100 text-green-700">Success</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700">Failed</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Export Logs</Button>
                <Button variant="outline">View All Logs</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-nestle-red" />
                  Security Alerts
                </CardTitle>
                <CardDescription>Important security notifications for your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 border rounded-md bg-yellow-50">
                    <div className="bg-yellow-100 rounded-full p-2 mt-1">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-yellow-800">Unusual Login Attempt Detected</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        We detected a login attempt from an unusual location (Douala, Cameroon) on March 23, 2025. If
                        this wasn't you, please change your password immediately and enable two-factor authentication.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                        >
                          It Was Me
                        </Button>
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                          Secure Account
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 border rounded-md">
                    <div className="bg-blue-100 rounded-full p-2 mt-1">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Security Recommendation</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        We recommend enabling two-factor authentication for enhanced account security. This adds an
                        extra layer of protection to your account.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

