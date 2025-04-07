"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FuelIcon as GasPump,
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  Car,
  BarChart3,
  LineChart,
  Calendar,
  HelpCircle,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Employees", href: "/admin/employees", icon: Users },
    { name: "Vehicles", href: "/admin/vehicles", icon: Car },
    { name: "Transactions", href: "/admin/transactions", icon: FileText },
    { name: "Fraud Alerts", href: "/admin/alerts", icon: AlertTriangle },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Profile", href: "/admin/profile", icon: User },
  ]

  const reportLinks = [
    { name: "Monthly Report", href: "/admin/monthly-report", icon: Calendar },
    { name: "Usage Analytics", href: "/admin/usage-analytics", icon: LineChart },
  ]

  const utilityLinks = [
    { name: "Help & Support", href: "/admin/help", icon: HelpCircle },
    { name: "Security", href: "/admin/security", icon: Shield },
  ]

  // Mock notifications
  const notifications = [
    {
      id: "notif-1",
      title: "New Fraud Alert",
      description: "Unusual fuel volume detected for Toyota Camry",
      time: "10 minutes ago",
      read: false,
      type: "alert",
    },
    {
      id: "notif-2",
      title: "Maintenance Due",
      description: "Vehicle Honda Civic is due for maintenance",
      time: "2 hours ago",
      read: false,
      type: "maintenance",
    },
    {
      id: "notif-3",
      title: "Monthly Report Ready",
      description: "February 2025 monthly report is now available",
      time: "Yesterday",
      read: true,
      type: "report",
    },
    {
      id: "notif-4",
      title: "New Employee Added",
      description: "Michael Johnson has been added to the system",
      time: "2 days ago",
      read: true,
      type: "employee",
    },
  ]

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would clear the session/token
    router.push("/login")
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        {/* Sidebar for desktop */}
        <Sidebar className="hidden md:flex" collapsible="icon">
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2">
              <GasPump className="h-6 w-6 text-nestle-red" />
              <span className="font-bold text-lg">Nestle Cameroon</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {reportLinks.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Utilities</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {utilityLinks.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Logout" onClick={() => setShowLogoutDialog(true)}>
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@company.com</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile sidebar */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full">
              <div className="p-4 bg-nestle-red text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GasPump className="h-6 w-6" />
                    <span className="font-bold text-lg">Admin Panel</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 py-2">
                <nav className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
                        pathname === item.href
                          ? "bg-nestle-lightred text-nestle-red"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-2 pb-1 px-3 text-xs font-semibold text-muted-foreground">Reports</div>
                  {reportLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
                        pathname === item.href
                          ? "bg-nestle-lightred text-nestle-red"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-2 pb-1 px-3 text-xs font-semibold text-muted-foreground">Utilities</div>
                  {utilityLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
                        pathname === item.href
                          ? "bg-nestle-lightred text-nestle-red"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-2 pb-1 px-3 text-xs font-semibold text-muted-foreground">Account</div>
                  <button
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted w-full text-left"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setShowLogoutDialog(true)
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </nav>
              </div>
              <div className="p-4 border-t">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Admin User</span>
                    <span className="text-xs text-muted-foreground">admin@company.com</span>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <div className="flex w-full flex-col flex-1">
          {/* Top Navigation Bar */}
          <header className="bg-background border-b h-14 px-4 flex items-center justify-between md:justify-end">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center gap-4">
              <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-nestle-red"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex justify-between items-center">
                    <span>Notifications</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-sm font-normal">
                      Mark all as read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer",
                          !notification.read && "bg-muted/30",
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-full p-1.5 mt-0.5",
                            notification.type === "alert"
                              ? "bg-red-100"
                              : notification.type === "maintenance"
                                ? "bg-amber-100"
                                : notification.type === "report"
                                  ? "bg-blue-100"
                                  : "bg-green-100",
                          )}
                        >
                          {notification.type === "alert" ? (
                            <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                          ) : notification.type === "maintenance" ? (
                            <Car className="h-3.5 w-3.5 text-amber-600" />
                          ) : notification.type === "report" ? (
                            <FileText className="h-3.5 w-3.5 text-blue-600" />
                          ) : (
                            <User className="h-3.5 w-3.5 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/security">
                      <Shield className="h-4 w-4 mr-2" />
                      Security
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/help">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help & Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto bg-muted/30">{children}</main>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of the Nestle Cameroon Fuel Management System?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}

