import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle, FileText, MessageSquare, AlertTriangle, Search, Phone, Mail, Clock } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Help & Support | Nestle Cameroon Fuel Management",
  description: "Get help and support for the Nestle Cameroon Fuel Management System",
}

export default function HelpPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Get help and support for the Nestle Cameroon Fuel Management System</p>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find answers to common questions about the fuel management system</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search FAQs..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I request fuel?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To request fuel, follow these steps:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Go to the "Quick Actions" page from the main menu</li>
                      <li>Select the "Request Fuel" tab</li>
                      <li>
                        Fill in the required information including amount, station, purpose, and current odometer
                        reading
                      </li>
                      <li>Click "Check Eligibility" to verify if you're eligible for the requested amount</li>
                      <li>If eligible, click "Submit Request" to complete your request</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Note: Your eligibility is determined by your mileage since last refill and your monthly
                      consumption limits.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the eligibility criteria for fuel requests?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To be eligible for a fuel request, you must meet the following criteria:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>You must have driven at least 150 km since your last refill (unless it's an emergency)</li>
                      <li>The requested amount must not exceed your remaining monthly allocation</li>
                      <li>The requested amount must not exceed your vehicle's available tank capacity</li>
                      <li>Your odometer reading must be greater than your last recorded reading</li>
                    </ul>
                    <p className="mt-2 text-sm text-muted-foreground">
                      These criteria help ensure responsible fuel usage and prevent misuse of company resources.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How is my monthly fuel limit determined?</AccordionTrigger>
                  <AccordionContent>
                    <p>Your monthly fuel limit is determined based on several factors:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Your department's allocation</li>
                      <li>Your job role and responsibilities</li>
                      <li>The type of vehicle assigned to you</li>
                      <li>Historical usage patterns</li>
                    </ul>
                    <p className="mt-2">
                      The standard monthly limit for most employees is 250 liters, but this can be adjusted based on
                      your specific needs and usage patterns. If you believe your limit needs adjustment, please contact
                      your supervisor or the fleet management department.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What should I do if my fuel card is lost or stolen?</AccordionTrigger>
                  <AccordionContent>
                    <p>If your fuel card is lost or stolen, follow these steps immediately:</p>
                    <ol className="list-decimal pl-5 space-y-1 mt-2">
                      <li>Report the loss to your supervisor immediately</li>
                      <li>Contact the fleet management department at +237 123 456 789</li>
                      <li>Submit a formal report through the "Contact Support" tab</li>
                      <li>The card will be deactivated and a new one will be issued</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Important: You are responsible for all transactions made with your card until it is reported lost
                      or stolen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I report a vehicle issue or maintenance need?</AccordionTrigger>
                  <AccordionContent>
                    <p>To report a vehicle issue or maintenance need:</p>
                    <ol className="list-decimal pl-5 space-y-1 mt-2">
                      <li>Go to the "My Vehicle" page from the main menu</li>
                      <li>Click on the "Report Issue" button</li>
                      <li>
                        Fill in the details of the issue including description, severity, and photos if applicable
                      </li>
                      <li>Submit the report</li>
                    </ol>
                    <p className="mt-2">
                      For urgent issues that affect vehicle safety, please also call the fleet management department
                      directly at +237 123 456 789.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>Get in touch with our support team for assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Enter the subject of your inquiry" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a category</option>
                      <option value="fuel_request">Fuel Request Issues</option>
                      <option value="card_issues">Fuel Card Issues</option>
                      <option value="vehicle_issues">Vehicle Issues</option>
                      <option value="account_issues">Account Issues</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Describe your issue in detail..." className="min-h-[150px]" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="attachment" className="text-sm font-medium">
                      Attachment (optional)
                    </label>
                    <Input id="attachment" type="file" />
                    <p className="text-xs text-muted-foreground">
                      Max file size: 5MB. Supported formats: JPG, PNG, PDF
                    </p>
                  </div>

                  <Button className="w-full">Submit Support Request</Button>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>+237 123 456 789</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>support@nestlecameroon.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Monday - Friday, 8:00 AM - 5:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Support Response Times</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Our team typically responds to support requests within:
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Urgent issues: 1-2 hours</li>
                      <li>• Standard issues: 24 hours</li>
                      <li>• General inquiries: 48 hours</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
                    <h3 className="font-medium text-yellow-800 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      For Emergencies
                    </h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      For urgent issues such as vehicle breakdowns or fuel card emergencies, please call our emergency
                      hotline at +237 987 654 321.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                User Guides & Documentation
              </CardTitle>
              <CardDescription>Access guides and documentation for the fuel management system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <h3 className="font-medium mb-1">Employee User Manual</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete guide to using the fuel management system as an employee
                  </p>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>

                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <h3 className="font-medium mb-1">Fuel Request Guide</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Step-by-step guide to requesting fuel and checking eligibility
                  </p>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>

                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <h3 className="font-medium mb-1">Vehicle Maintenance Guide</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Guidelines for vehicle maintenance and reporting issues
                  </p>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>

                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <h3 className="font-medium mb-1">Fuel Card Usage Policy</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Official policy on fuel card usage and responsibilities
                  </p>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Video Tutorials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-medium mb-1">How to Request Fuel</h4>
                    <p className="text-sm text-muted-foreground mb-3">Video tutorial on the fuel request process</p>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <Button variant="ghost">Play Video</Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-medium mb-1">Understanding Your Fuel Card</h4>
                    <p className="text-sm text-muted-foreground mb-3">Video tutorial on fuel card features and usage</p>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <Button variant="ghost">Play Video</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

