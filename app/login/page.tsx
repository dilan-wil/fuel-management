"use client";

import React from "react";
import { FormEvent, SetStateAction, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FuelIcon as GasPump, ArrowLeft, Shield, Pin } from "lucide-react";
import { OtpVerification } from "@/components/otp-verification";
import { useAuth } from "@/lib/auth-context"; 
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { auth } from "@/lib/firebase";
import {
  getAuth,
  getMultiFactorResolver,
  TotpMultiFactorGenerator,
} from "firebase/auth";
export default function LoginPage({}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePin, setEmployeePin] = useState("");
  const [expectedOtp, setIsExpectedOtp] = useState<any>("")
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [userType, setUserType] = useState("")


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect based on user type
    if (userType === "admin") {
      router.push("/admin/dashboard");
    } else if (userType === "employee") {
      router.push("/employee/dashboard");
    }
  };

  async function handleAdminLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    if (email === 'admin@admin.com'){
    const code = await login(email, password)
      .then(() => {
        router.push("/admin/dashboard");
      })
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
}


  async function handleEmployeeLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    const code = await login(employeeEmail, employeePin)
    setIsExpectedOtp(code)
    if (code){
      setShowOtpVerification (true)
    }
  }

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

          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="admin">Administrator</TabsTrigger>
              <TabsTrigger value="employee">Employee</TabsTrigger>
            </TabsList>

            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Administrator Login</CardTitle>
                  <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAdminLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="name@company.com"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="/forgot-password" className="text-xs text-nestle-red hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="bg-nestle-red hover:bg-nestle-darkred" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Secure login with 256-bit encryption</span>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="employee">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Login</CardTitle>
                  <CardDescription>Enter your employee ID and PIN to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmployeeLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="employee-email">Email</Label>
                        <Input
                          id="employee-email"
                          type="email"
                          placeholder="name@nestlecameroon.com"
                          value={employeeEmail}
                          onChange={(e) => setEmployeeEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="card-pin">Card PIN</Label>
                          <Link href="/forgot-pin" className="text-xs text-nestle-red hover:underline">
                            Forgot PIN?
                          </Link>
                        </div>
                        <Input
                          id="card-pin"
                          type="password"
                          placeholder="Enter your card PIN"
                          value={employeePin}
                          onChange={(e) => setEmployeePin(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="bg-nestle-red hover:bg-nestle-darkred" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                      <div className="text-center mt-4">
                        <p className="text-sm text-muted-foreground">
                          Don't have an account?{" "}
                          <Link href="/register" className="text-nestle-red hover:underline">
                            Register here
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                  {showOtpVerification && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="w-full max-w-md">
                        <OtpVerification expectedOtp={expectedOtp} email={employeeEmail} onCancel={() => setShowOtpVerification(false)} defaultMethod={otpMethod} />
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Secure login with 256-bit encryption</span>
                  </div>
                </CardFooter>
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
  );
}