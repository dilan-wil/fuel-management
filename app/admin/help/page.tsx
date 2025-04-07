"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, HelpCircle, FileText, Mail, Phone, MessageSquare, ChevronRight, Play } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I add a new employee to the system?",
      answer:
        "To add a new employee, navigate to the Employees page and click the 'Add Employee' button. Fill in the required information including name, ID, department, and contact details. You can also assign vehicles and set fuel limits at this stage.",
    },
    {
      question: "How can I generate custom reports?",
      answer:
        "Custom reports can be generated from the Reports page. Select the 'Custom Report' option, choose your desired parameters such as date range, departments, and metrics. You can preview the report before exporting it as PDF, Excel, or sending it via email.",
    },
    {
      question: "What should I do if I detect fraudulent activity?",
      answer:
        "If you detect fraudulent activity, first verify the details on the Fraud Alerts page. You can then take action by clicking the 'Investigate' button, which will allow you to document findings and take appropriate measures such as suspending cards or adjusting limits.",
    },
    {
      question: "How do I update fuel price in the system?",
      answer:
        "Fuel prices can be updated from the Settings page. Navigate to the 'Fuel Management' tab and click on 'Update Prices'. Enter the new price and effective date, then save your changes. The system will automatically apply the new prices from the specified date.",
    },
    {
      question: "Can I set different fuel limits for different employees?",
      answer:
        "Yes, you can set different fuel limits for employees based on their role, department, or individual needs. Go to the Employees page, select the employee, and click on 'Edit Fuel Limits'. You can set daily, weekly, or monthly limits as required.",
    },
    {
      question: "How do I reset a user's password?",
      answer:
        "To reset a user's password, go to the Employees page, find the user, and click on the 'Reset Password' option in the actions menu. You can either set a temporary password or send an automatic reset link to their registered email address.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <Button variant="outline" size="sm" asChild className="flex items-center">
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <HelpCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help topics..."
            className="pl-10 w-full md:w-1/2 lg:w-1/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="faqs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="faqs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-nestle-red" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find answers to common questions about the fuel management system</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <div className="py-4 text-center text-muted-foreground">
                      <p>No results found for "{searchQuery}"</p>
                      <p className="text-sm mt-1">Try a different search term or browse the documentation</p>
                    </div>
                  )}
                </Accordion>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Employee Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Adding new employees
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Setting fuel limits
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Managing access rights
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Employee reports
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Vehicle Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Adding new vehicles
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Maintenance scheduling
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Fuel efficiency tracking
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Vehicle assignment
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reporting & Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Generating reports
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Understanding analytics
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Exporting data
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-nestle-red" />
                      <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Custom dashboards
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-nestle-red" />
                  System Documentation
                </CardTitle>
                <CardDescription>Comprehensive guides and documentation for the fuel management system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-muted rounded-md p-2">
                        <FileText className="h-6 w-6 text-nestle-red" />
                      </div>
                      <div>
                        <h3 className="font-medium">Administrator Guide</h3>
                        <p className="text-sm text-muted-foreground mb-2">Complete guide for system administrators</p>
                        <Button variant="outline" size="sm">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="bg-muted rounded-md p-2">
                        <FileText className="h-6 w-6 text-nestle-red" />
                      </div>
                      <div>
                        <h3 className="font-medium">Reporting Manual</h3>
                        <p className="text-sm text-muted-foreground mb-2">Learn how to create and customize reports</p>
                        <Button variant="outline" size="sm">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="bg-muted rounded-md p-2">
                        <FileText className="h-6 w-6 text-nestle-red" />
                      </div>
                      <div>
                        <h3 className="font-medium">Security Protocols</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Security best practices and fraud prevention
                        </p>
                        <Button variant="outline" size="sm">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-muted rounded-md p-2">
                        <FileText className="h-6 w-6 text-nestle-red" />
                      </div>
                      <div>
                        <h3 className="font-medium">Quick Start Guide</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Get started with the fuel management system
                        </p>
                        <Button variant="outline" size="sm">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="bg-muted rounded-md p-2">
                        <FileText className="h-6 w-6 text-nestle-red" />
                      </div>
                      <div>
                        <h3 className="font-medium">API Documentation</h3>
                        <p className="text-sm text-muted-foreground mb-2">Technical guide for system integration</p>
                        <Button variant="outline" size="sm">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="bg-muted rounded-md p-2">
                        <FileText className="h-6 w-6 text-nestle-red" />
                      </div>
                      <div>
                        <h3 className="font-medium">Troubleshooting Guide</h3>
                        <p className="text-sm text-muted-foreground mb-2">Solutions for common issues and errors</p>
                        <Button variant="outline" size="sm">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-muted/30 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Video Tutorials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-background rounded-md p-3 border">
                      <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
                        <Play className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h4 className="text-sm font-medium">System Overview</h4>
                      <p className="text-xs text-muted-foreground">5:32 mins</p>
                    </div>
                    <div className="bg-background rounded-md p-3 border">
                      <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
                        <Play className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h4 className="text-sm font-medium">Reporting Basics</h4>
                      <p className="text-xs text-muted-foreground">7:15 mins</p>
                    </div>
                    <div className="bg-background rounded-md p-3 border">
                      <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
                        <Play className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h4 className="text-sm font-medium">Advanced Analytics</h4>
                      <p className="text-xs text-muted-foreground">9:48 mins</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-nestle-red" />
                  Contact Support
                </CardTitle>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="Enter the subject of your inquiry" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Describe your issue or question in detail"
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="priority" className="text-sm font-medium">
                        Priority
                      </label>
                      <select
                        id="priority"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="low">Low - General inquiry</option>
                        <option value="medium">Medium - Issue affecting work</option>
                        <option value="high">High - Critical issue</option>
                      </select>
                    </div>
                    <Button className="bg-nestle-red hover:bg-nestle-darkred">Submit Request</Button>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h3 className="font-medium mb-3">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-nestle-lightred rounded-full p-2">
                            <Phone className="h-4 w-4 text-nestle-red" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Phone Support</p>
                            <p className="text-sm text-muted-foreground">+237 123 456 789</p>
                            <p className="text-xs text-muted-foreground">Available Mon-Fri, 8am-5pm</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-nestle-lightred rounded-full p-2">
                            <Mail className="h-4 w-4 text-nestle-red" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Email Support</p>
                            <p className="text-sm text-muted-foreground">support@nestlefuel.cm</p>
                            <p className="text-xs text-muted-foreground">24/7 response within 24 hours</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Support Team</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Support Agent" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">Technical Support Lead</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Support Agent" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Jane Smith</p>
                            <p className="text-xs text-muted-foreground">Customer Success Manager</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Support Agent" />
                            <AvatarFallback>RJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Robert Johnson</p>
                            <p className="text-xs text-muted-foreground">System Administrator</p>
                          </div>
                        </div>
                      </div>
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

