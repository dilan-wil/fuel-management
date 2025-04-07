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
  FileText,
  Car,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  HelpCircle,
  CreditCard,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EmployeeLayoutProps {
  children: React.ReactNode
}

export default function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Update the navigation array to include Quick Actions
  const navigation = [
    { name: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
    { name: "Quick Actions", href: "/employee/quick-actions", icon: GasPump },
    { name: "Eligibility Check", href: "/employee/eligibility-check", icon: AlertCircle },
    { name: "My Transactions", href: "/employee/transactions", icon: FileText },
    { name: "My Vehicle", href: "/employee/vehicle", icon: Car },
    { name: "Fuel Card", href: "/employee/fuel-card", icon: CreditCard },
    { name: "Reports", href: "/employee/reports", icon: FileText },
    { name: "Usage Analytics", href: "/employee/usage-analytics", icon: LayoutDashboard },
    { name: "Monthly Reports", href: "/employee/monthly-report", icon: FileText },
    { name: "Profile", href: "/employee/profile", icon: User },
    { name: "Help & Support", href: "/employee/help", icon: HelpCircle },
    {
      name: "Logout",
      href: "#",
      icon: LogOut,
      onClick: () => setShowLogoutDialog(true),
    },
  ]

  // Mock notifications
  const notifications = [
    {
      id: "notif-1",
      title: "Fuel Limit Update",
      description: "Your monthly fuel limit has been updated to 250 liters",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "notif-2",
      title: "Transaction Completed",
      description: "Fuel transaction of 45.2L completed at Douala Station 1",
      time: "Yesterday",
      read: false,
    },
    {
      id: "notif-3",
      title: "Vehicle Maintenance",
      description: "Your vehicle is due for maintenance in 5 days",
      time: "2 days ago",
      read: true,
    },
  ]

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would clear the session/token
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/employee/dashboard" className="flex items-center gap-2">
              <GasPump className="h-6 w-6 text-nestle-red" />
              <span className="font-bold text-lg hidden md:inline">Nestle Cameroon</span>
            </Link>
          </div>

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
                      <div className="rounded-full p-1.5 mt-0.5 bg-nestle-lightred">
                        <GasPump className="h-3.5 w-3.5 text-nestle-red" />
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
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/employee/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/employee/transactions">
                    <FileText className="h-4 w-4 mr-2" />
                    Transactions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/employee/fuel-card">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Fuel Card
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/employee/help">
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
        </div>
      </header>

      {/* Mobile sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full">
            <div className="p-4 bg-nestle-red text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GasPump className="h-6 w-6" />
                  <span className="font-bold text-lg">Employee Portal</span>
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
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault()
                        item.onClick()
                      }
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">Sales Department</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setShowLogoutDialog(true)
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 bg-muted/30">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nestle Cameroon. All rights reserved.</p>
        </div>
      </footer>

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
    </div>
  )
}

