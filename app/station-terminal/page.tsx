"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import {
  FuelIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Printer,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Mock data for fuel types and prices
const fuelTypes = [
  { id: "petrol", name: "Petrol", price: 840 },
  { id: "diesel", name: "Diesel", price: 860 },
  { id: "premium", name: "Premium Petrol", price: 2350 },
];

// Mock data for stations
const stations = [
  { id: "ST001", name: "Douala Station 1", address: "123 Main St, Douala" },
  { id: "ST002", name: "Douala Station 2", address: "456 Central Ave, Douala" },
  { id: "ST003", name: "Yaounde Station 1", address: "789 North Rd, Yaounde" },
];

export default function StationTerminalPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [fuelAmount, setFuelAmount] = useState<number>(0);
  const [odometer, setOdometer] = useState("");
  const [selectedStation, setSelectedStation] = useState("ST001");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [transactionData, setTransactionData] = useState<any>(null);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const { cards, vehicles, employees } = useAuth();
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  // Handle card verification
  const verifyCard = () => {
    if (!cardNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a card number",
        variant: "destructive",
      });
      return;
    }

    setVerificationStatus("verifying");

    // Simulate API call
    setTimeout(() => {
      const card = cards.find((c: any) =>
        c.cardNumber.replace(/\s/g, "").includes(cardNumber.replace(/\s/g, ""))
      );
      console.log(card);

      if (card && card.status === "active") {
        setSelectedCard(card);
        setVerificationStatus("success");
        toast({
          title: "Card Verified",
          description: `Card verified for ${card.employeeName}`,
        });
        setActiveTab("fuel");
      } else if (card && card.status === "inactive") {
        setVerificationStatus("error");
        toast({
          title: "Card Inactive",
          description:
            "This card is inactive and cannot be used for transactions",
          variant: "destructive",
        });
      } else {
        setVerificationStatus("error");
        toast({
          title: "Verification Failed",
          description: "Card not found or invalid",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  // Handle fuel selection
  const handleFuelSelection = () => {
    if (!selectedFuelType) {
      toast({
        title: "Error",
        description: "Please select a fuel type",
        variant: "destructive",
      });
      return;
    }

    if (!fuelAmount || fuelAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid fuel amount",
        variant: "destructive",
      });
      return;
    }

    if (selectedCard && fuelAmount > selectedCard.remaining) {
      toast({
        title: "Limit Exceeded",
        description: `Amount exceeds monthly remaining limit of ${selectedCard.remaining}L`,
        variant: "destructive",
      });
      return;
    }

    if (!odometer) {
      toast({
        title: "Error",
        description: "Please enter the current odometer reading",
        variant: "destructive",
      });
      return;
    }

    setActiveTab("confirm");
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    if (!selectedFuelType || !fuelAmount) return 0;
    const fuelType = fuelTypes.find((f) => f.id === selectedFuelType);
    return fuelType ? fuelType.price * fuelAmount : 0;
  };

  // Handle transaction confirmation
  const confirmTransaction = () => {
    setShowConfirmDialog(true);
  };

  // Process transaction
  const processTransaction = async () => {
    setIsProcessing(true);

    // Simulate API call
    try {
      setIsProcessing(false);
      setShowConfirmDialog(false);

      const fuelType = fuelTypes.find((f) => f.id === selectedFuelType);
      const station = stations.find((s) => s.id === selectedStation);
      const selectedVehicle = vehicles?.find(
        (vehicle: any) => vehicle.id === selectedCard?.vehicleId
      );

      const transaction = {
        id: `TRX-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        date: new Date().toISOString(),
        cardId: selectedCard?.id,
        employeeId: selectedCard?.employeeId,
        employeeName: selectedCard?.employee.name,
        vehiclePlate: selectedCard?.vehicleId ?? "",
        vehicleModel: selectedVehicle?.plate ?? "",
        fuelType: fuelType?.name,
        amount: fuelAmount,
        pricePerLiter: fuelType?.price,
        totalCost: calculateTotalCost(),
        odometer: Number(odometer),
        station: station?.name,
        status: "completed",
      };

      console.log(transaction);

      setTransactionData(transaction);
      setTransactionComplete(true);
      // await setDoc(doc(db, "transactions", transaction.id), transaction)
      toast({
        title: "Transaction Successful",
        description: `Dispensed ${fuelAmount}L of ${
          fuelType?.name
        } for ${formatCurrency(calculateTotalCost())}`,
      });
    } catch (error) {}
  };

  // Reset the form
  const resetForm = () => {
    setCardNumber("");
    setSelectedCard(null);
    setVerificationStatus("idle");
    setSelectedFuelType("");
    setFuelAmount(0);
    setOdometer("");
    setTransactionComplete(false);
    setTransactionData(null);
    setActiveTab("card");
  };

  // Print receipt
  const printReceipt = () => {
    setShowReceiptDialog(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-nestle-red text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FuelIcon className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">
                Nestle Cameroon Fuel Station
              </h1>
              <p className="text-sm opacity-80">Point of Sale Terminal</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {stations.find((s) => s.id === selectedStation)?.name}
            </p>
            <p className="text-sm opacity-80">
              {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-2xl">Fuel Dispensing Terminal</CardTitle>
            <CardDescription>Process fuel card transactions</CardDescription>
          </CardHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="px-6 pt-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger
                  value="card"
                  disabled={activeTab !== "card" && !transactionComplete}
                >
                  Card Verification
                </TabsTrigger>
                <TabsTrigger
                  value="fuel"
                  disabled={!selectedCard || activeTab === "card"}
                >
                  Fuel Selection
                </TabsTrigger>
                <TabsTrigger
                  value="confirm"
                  disabled={activeTab !== "confirm" && !transactionComplete}
                >
                  Confirmation
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="card" className="p-6">
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Fuel Card Number</Label>
                    <div className="flex gap-2">
                      <Input
                        id="card-number"
                        placeholder="Enter card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={verifyCard}
                        disabled={verificationStatus === "verifying"}
                      >
                        {verificationStatus === "verifying"
                          ? "Verifying..."
                          : "Verify Card"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Station</Label>
                    <Select
                      value={selectedStation}
                      onValueChange={setSelectedStation}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select station" />
                      </SelectTrigger>
                      <SelectContent>
                        {stations.map((station) => (
                          <SelectItem key={station.id} value={station.id}>
                            {station.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {verificationStatus === "success" && selectedCard && (
                  <div className="space-y-4">
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">
                        Card Verified Successfully
                      </AlertTitle>
                      <AlertDescription className="text-green-700">
                        Card is valid and ready for transaction
                      </AlertDescription>
                    </Alert>

                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">Card Information</h3>
                          <p className="text-sm text-muted-foreground">
                            Card ID: {selectedCard.id}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Employee
                          </p>
                          <p className="font-medium">
                            {selectedCard.employeeName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {selectedCard.employeeId} •{" "}
                            {selectedCard.department}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Vehicle
                          </p>
                          <p className="font-medium">
                            {selectedCard.vehicleModel}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {selectedCard.vehiclePlate}
                          </p>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Monthly Limit</span>
                          <span className="font-medium">
                            {selectedCard.monthlyLimit}L
                          </span>
                        </div>
                        <Progress
                          value={
                            (selectedCard.consumed /
                              selectedCard.monthlyLimit) *
                            100
                          }
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            Used: {selectedCard.consumed}L (
                            {(
                              (selectedCard.consumed /
                                selectedCard.monthlyLimit) *
                              100
                            ).toFixed(0)}
                            %)
                          </span>
                          <span className="text-muted-foreground">
                            Remaining: {selectedCard.remaining}L
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 text-right">
                        <p className="text-sm text-muted-foreground">
                          Card Balance
                        </p>
                        <p className="text-lg font-bold">
                          {formatCurrency(selectedCard.balance)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCardNumber("");
                          setSelectedCard(null);
                          setVerificationStatus("idle");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setActiveTab("fuel")}>
                        Continue to Fuel Selection
                      </Button>
                    </div>
                  </div>
                )}

                {verificationStatus === "error" && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Verification Failed</AlertTitle>
                    <AlertDescription>
                      The card could not be verified. Please check the card
                      number and try again.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            <TabsContent value="fuel" className="p-6">
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuel-type">Fuel Type</Label>
                    <Select
                      value={selectedFuelType}
                      onValueChange={setSelectedFuelType}
                    >
                      <SelectTrigger id="fuel-type">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((fuel) => (
                          <SelectItem key={fuel.id} value={fuel.id}>
                            {fuel.name} - {formatCurrency(fuel.price)}/L
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="amount">Amount (Liters)</Label>
                      {selectedCard && (
                        <span className="text-xs text-muted-foreground">
                          Max available: {selectedCard.remaining}L
                        </span>
                      )}
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      max={selectedCard?.remaining || 100}
                      value={fuelAmount || ""}
                      onChange={(e) => setFuelAmount(Number(e.target.value))}
                      placeholder="Enter amount in liters"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="odometer">
                      Current Odometer Reading (km)
                    </Label>
                    <Input
                      id="odometer"
                      type="number"
                      min="1"
                      value={odometer}
                      onChange={(e) => setOdometer(e.target.value)}
                      placeholder="Enter current odometer reading"
                    />
                  </div>
                </div>

                {selectedFuelType && fuelAmount > 0 && (
                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h3 className="font-medium mb-2">Transaction Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Fuel Type:
                        </span>
                        <span>
                          {
                            fuelTypes.find((f) => f.id === selectedFuelType)
                              ?.name
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Price per Liter:
                        </span>
                        <span>
                          {formatCurrency(
                            fuelTypes.find((f) => f.id === selectedFuelType)
                              ?.price || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span>{fuelAmount} Liters</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total Cost:</span>
                        <span>{formatCurrency(calculateTotalCost())}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("card")}
                  >
                    Back
                  </Button>
                  <Button onClick={handleFuelSelection}>
                    Continue to Confirmation
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="confirm" className="p-6">
              {!transactionComplete ? (
                <div className="space-y-6">
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">
                      Confirm Transaction Details
                    </AlertTitle>
                    <AlertDescription className="text-amber-700">
                      Please verify all details before proceeding with the
                      transaction
                    </AlertDescription>
                  </Alert>

                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h3 className="font-medium mb-4">Transaction Details</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Employee
                        </p>
                        <p className="font-medium">
                          {selectedCard?.employeeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedCard?.employeeId}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vehicle</p>
                        <p className="font-medium">
                          {selectedCard?.vehicleModel}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedCard?.vehiclePlate}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Fuel Type
                        </p>
                        <p className="font-medium">
                          {
                            fuelTypes.find((f) => f.id === selectedFuelType)
                              ?.name
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-medium">{fuelAmount} Liters</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Price per Liter
                        </p>
                        <p className="font-medium">
                          {formatCurrency(
                            fuelTypes.find((f) => f.id === selectedFuelType)
                              ?.price || 0
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Odometer Reading
                        </p>
                        <p className="font-medium">{odometer} km</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Station</p>
                        <p className="font-medium">
                          {stations.find((s) => s.id === selectedStation)?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Total Cost
                        </p>
                        <p className="text-xl font-bold">
                          {formatCurrency(calculateTotalCost())}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("fuel")}
                    >
                      Back
                    </Button>
                    <Button onClick={confirmTransaction}>
                      Process Transaction
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-green-600 mb-4" />
                    <h2 className="text-2xl font-bold text-green-800 mb-2">
                      Transaction Successful
                    </h2>
                    <p className="text-green-700 mb-4">
                      Transaction ID: {transactionData?.id}
                    </p>
                    <div className="max-w-sm mx-auto bg-white rounded p-4 border border-green-100">
                      <div className="text-left space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Date & Time:
                          </span>
                          <span>
                            {new Date(transactionData?.date).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Fuel Type:
                          </span>
                          <span>{transactionData?.fuelType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span>{transactionData?.amount} Liters</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Total Cost:
                          </span>
                          <span>
                            {formatCurrency(transactionData?.totalCost)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={printReceipt}>
                      <Printer className="mr-2 h-4 w-4" />
                      Print Receipt
                    </Button>
                    <Button onClick={resetForm}>New Transaction</Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <CardFooter className="bg-slate-50 border-t flex justify-between">
            <div className="text-sm text-muted-foreground">
              <p>Nestle Cameroon Fuel Management System</p>
              <p>Terminal ID: POS-{selectedStation}</p>
            </div>
            <div className="text-sm text-right">
              <p className="font-medium">Operator: Admin</p>
              <p className="text-muted-foreground">
                Session: {Math.floor(Math.random() * 10000)}
              </p>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-slate-800 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Nestle Cameroon. All rights
            reserved.
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Fuel Station Terminal Simulation
          </p>
        </div>
      </footer>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to process this transaction?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Employee:</p>
                  <p className="font-medium">{selectedCard?.employeeName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Vehicle:</p>
                  <p className="font-medium">{selectedCard?.vehiclePlate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fuel Type:</p>
                  <p className="font-medium">
                    {fuelTypes.find((f) => f.id === selectedFuelType)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount:</p>
                  <p className="font-medium">{fuelAmount} Liters</p>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total Cost:</span>
                <span>{formatCurrency(calculateTotalCost())}</span>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                By confirming, you authorize the dispensing of fuel and the
                deduction of the corresponding amount from the card balance.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={processTransaction} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Confirm & Dispense Fuel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Transaction Receipt
            </DialogTitle>
          </DialogHeader>

          {transactionData && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-lg">
                  Nestle Cameroon Fuel Station
                </h3>
                <p className="text-sm">{transactionData.station}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(transactionData.date).toLocaleDateString()}{" "}
                  {new Date(transactionData.date).toLocaleTimeString()}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span>{transactionData.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Employee:</span>
                  <span>{transactionData.employeeName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span>
                    {transactionData.vehicleModel} (
                    {transactionData.vehiclePlate})
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Odometer:</span>
                  <span>{transactionData.odometer} km</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fuel Type:</span>
                  <span>{transactionData.fuelType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span>{transactionData.amount} Liters</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Price per Liter:
                  </span>
                  <span>{formatCurrency(transactionData.pricePerLiter)}</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between font-medium">
                  <span>Total Amount:</span>
                  <span>{formatCurrency(transactionData.totalCost)}</span>
                </div>
              </div>

              <Separator />

              <div className="text-center text-xs text-muted-foreground">
                <p>
                  Thank you for using Nestle Cameroon Fuel Management System
                </p>
                <p>This is an electronically generated receipt</p>
                <div className="mt-4 flex justify-center">
                  <div className="h-20 w-20 bg-muted flex items-center justify-center text-xs">
                    QR Code
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReceiptDialog(false)}
            >
              Close
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
