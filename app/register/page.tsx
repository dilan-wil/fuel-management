"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FuelIcon as GasPump, ArrowLeft, Shield, User, Mail, Phone, Building, CreditCard, Loader2, Lock } from "lucide-react"
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { auth, db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { OtpVerification } from "@/components/otp-verification"
  

export default function RegisterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("employee")
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpVerification, setShowOtpVerification] = useState(false)
  
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [tel, setTel] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [role, setRole] = useState("")
const [loading, setLoading] = useState(false)
const { toast } = useToast()
const [expectedOtp, setIsExpectedOtp] = useState("")
  
  // Employee registration form state
  const [employeeForm, setEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    position: "",
    password: "",
  })
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user 
  // Fetch user role from Firestore
  const userDoc = await getDoc(doc(db, "users", user.uid))
  if (userDoc.exists()) {
    const userData = userDoc.data()
    console.log("User Role:", userData.role) // Expected to be 'admin' or 'employee'
    
    if (userData.role === "admin") {
      router.push("/admin/dashboard")
    } else if (userData.role === "employee") {
      router.push("/employee/dashboard")
    }
  } else {
    console.error("User document not found")
  }
} catch (error) {
  console.error("Login failed:", error)
}
}
  // Handle employee form change
  const handleEmployeeFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmployeeForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle department selection
  const handleDepartmentChange = (value: string) => {
    setEmployeeForm((prev) => ({ ...prev, department: value }))
  }

  // Handle employee registration
  const handleEmployeeRegistration = async (e: React.FormEvent) => {
    e.preventDefault() 
      setIsLoading(true)
  
      if(password !== confirmPassword){
        toast({
          variant: "destructive",
          title: "Incorrect Password.",
          description: "Passwords do not match.",
        })
  
        return
      }
     
      const newEmployee= {
        name: employeeForm.firstName, 
        tel: employeeForm.phone,
        address: "",
        department: employeeForm.department,
        position: employeeForm.position,
        email : employeeForm.email,
        role: employeeForm.position,
        profilePicture: "",
        accepted: role === "employee" ? true : false,
        isApproved: false
      }
      console.log(newEmployee)
  
      try {
        // Register the user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, employeeForm.email, employeeForm.password);
        const user = userCredential.user;
    
        // Send email verification
        await sendEmailVerification(user);
    
        // Save employee details to Firestore
        await setDoc(doc(db, "employees", user.uid), newEmployee);
        
        if (role === "admin") {
          await setDoc(doc(db, "admin", user.uid), newEmployee);
        }
    
        toast({
          title: "Successful.",
          description: "You have registered successfully. Redirecting to dashboard...",
        });
    
        router.push("/dashboard");
    
      } catch (error) {
        console.error("Registration Error:", error);
        toast({
          variant: "destructive",
          title: "Registration Failed.",
          description: "An error occurred while registering. Please try again.",
        });
      } finally {
        setIsLoading(false);
        setName("");
        setEmail("");
        setTel("");
        setPassword("");
        setConfirmPassword("");
      }
    };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <GasPump className="h-8 w-8 text-nestle-red" />
              <span className="font-bold text-2xl">Nestle Cameroon</span>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="employee">Employee</TabsTrigger>
              <TabsTrigger value="admin">Administrator</TabsTrigger>
            </TabsList>

            <TabsContent value="employee">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Registration</CardTitle>
                  <CardDescription>Create your employee account to access the fuel management system</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmployeeRegistration}>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            value={employeeForm.firstName}
                            onChange={handleEmployeeFormChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            value={employeeForm.lastName}
                            onChange={handleEmployeeFormChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email" 
                            name="email"
                            placeholder="john.doe@nestlecameroon.com"
                            value={employeeForm.email}
                            onChange={handleEmployeeFormChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="+237 654 321 987"
                            value={employeeForm.phone}
                            onChange={handleEmployeeFormChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="employeeId"
                            name="employeeId"
                            placeholder="EMP12345"
                            value={employeeForm.employeeId}
                            onChange={handleEmployeeFormChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employeeId">Password</Label>
                        <div className="flex items-center">
                          <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            name="password"
                            placeholder=""
                            
                            value={employeeForm.password}
                            onChange={handleEmployeeFormChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select onValueChange={handleDepartmentChange} value={employeeForm.department}>
                            <SelectTrigger id="department" className="flex items-center">
                              <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="operations">Operations</SelectItem>
                              <SelectItem value="logistics">Logistics</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="hr">Human Resources</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="position"
                              name="position"
                              placeholder="Sales Representative"
                              value={employeeForm.position}
                              onChange={handleEmployeeFormChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-3 rounded-md">
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Your registration will be verified by an administrator. Once approved, you will receive your
                            fuel card PIN via email.
                          </span>
                        </div>
                      </div>

                      <Button type="submit" className="bg-nestle-red hover:bg-nestle-darkred" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          "Register"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-nestle-red hover:underline">
                      Login here
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Administrator Registration</CardTitle>
                  <CardDescription>
                    Administrator accounts can only be created by the system administrator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-amber-800">Administrator Access</h3>
                        <p className="text-sm text-amber-700 mt-1">
                          To request administrator access, please contact the system administrator at{" "}
                          <a href="mailto:admin@nestlecameroon.com" className="underline">
                            admin@nestlecameroon.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">Go to Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Need help? Contact{" "}
              <a href="mailto:support@nestlecameroon.com" className="text-nestle-red hover:underline">
                support@nestlecameroon.com
              </a>
            </p>
          </div>
        </div>
      </main>

    </div>
  )
}

