"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FuelIcon as GasPump, ArrowRight, Shield, BarChart3, Users, ChevronRight } from "lucide-react"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GasPump className="h-6 w-6 text-nestle-red" />
            <span className="font-bold text-lg">Nestle Cameroon Fuel Management</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-nestle-red">
              Login
            </Link>
            <Button asChild variant="outline">
              <Link href="/register">Register</Link>
            </Button>
            <Button asChild className="bg-nestle-red hover:bg-nestle-darkred">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Efficient Fuel Management for Your Fleet
              </h1>
              <p className="text-lg text-muted-foreground">
                Streamline your fuel operations, prevent fraud, and gain valuable insights with our comprehensive fuel
                management system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-nestle-red hover:bg-nestle-darkred">
                  <Link href="/login">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-nestle-lightred rounded-lg"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-nestle-lightred rounded-lg"></div>
                <Card className="w-full relative z-10">
                  <CardHeader>
                    <CardTitle>Login to Your Account</CardTitle>
                    <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-nestle-red hover:bg-nestle-darkred" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <p className="text-muted-foreground mt-2">
              Our fuel management system offers comprehensive tools to optimize your operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="bg-nestle-lightred w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-nestle-red" />
                </div>
                <CardTitle>Fraud Prevention</CardTitle>
                <CardDescription>
                  Advanced fraud detection algorithms to identify suspicious activities in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-nestle-red" />
                    <span>Real-time transaction monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-nestle-red" />
                    <span>Anomaly detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-nestle-red" />
                    <span>Customizable alert thresholds</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 p-0 h-auto text-nestle-red">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-nestle-lightred w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-nestle-red" />
                </div>
                <CardTitle>Comprehensive Analytics</CardTitle>
                <CardDescription>Detailed reports and analytics to help you make data-driven decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-nestle-red" />
                    <span>Consumption trends and patterns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-nestle-red" />
                    <span>Department-wise breakdown</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-nestle-red" />
                    <span>Exportable custom reports</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 p-0 h-auto text-nestle-red">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-nestle-lightred w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-nestle-red" />
                </div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Comprehensive tools to manage employees, vehicles, and access rights</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-nestle-red" />
                    <span>Role-based access control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-nestle-red" />
                    <span>Customizable fuel limits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-nestle-red" />
                    <span>Vehicle assignment and tracking</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 p-0 h-auto text-nestle-red">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">Simple and efficient fuel management in four easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-nestle-lightred w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-nestle-red">1</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Register</h3>
              <p className="text-sm text-muted-foreground">Set up your account with employee and vehicle information</p>
            </div>

            <div className="text-center">
              <div className="bg-nestle-lightred w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-nestle-red">2</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Assign</h3>
              <p className="text-sm text-muted-foreground">Assign fuel cards to employees and set appropriate limits</p>
            </div>

            <div className="text-center">
              <div className="bg-nestle-lightred w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-nestle-red">3</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Monitor</h3>
              <p className="text-sm text-muted-foreground">
                Track fuel consumption and receive alerts for suspicious activities
              </p>
            </div>

            <div className="text-center">
              <div className="bg-nestle-lightred w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-nestle-red">4</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Analyze</h3>
              <p className="text-sm text-muted-foreground">Generate reports and gain insights to optimize fuel usage</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-nestle-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Fuel Management?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that have streamlined their operations and saved costs with our system.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-nestle-red hover:bg-gray-100 border-white">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GasPump className="h-6 w-6 text-white" />
                <span className="font-bold text-lg text-white">Nestle Cameroon</span>
              </div>
              <p className="text-sm">
                Comprehensive fuel management solutions for businesses of all sizes across Cameroon.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>123 Nestle Way, Douala, Cameroon</li>
                <li>+237 233 123 456</li>
                <li>info@nestlecameroon.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Nestle Cameroon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

