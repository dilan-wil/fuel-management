"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, Mail, Phone, ArrowRight, Loader2 } from "lucide-react";

interface OtpVerificationProps {
  email: string;
  onCancel: () => void;
  defaultMethod?: "email" | "phone";
  expectedOtp: string;
}

export function OtpVerification({
  email,
  onCancel,
  defaultMethod = "email",
  expectedOtp,
}: OtpVerificationProps) {
  const router = useRouter();
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">(defaultMethod);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      const lastInput = document.getElementById("otp-5") as HTMLInputElement;
      if (lastInput) lastInput.focus();
    }
  };

  const verifyOtp = () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter a complete 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    setError("");

    setTimeout(() => {
      setIsVerifying(false);

      if (otpValue === expectedOtp) {
        router.push("/employee/dashboard");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }, 1500);
  };

  const resendOtp = () => {
    setIsResending(true);

    setTimeout(() => {
      setIsResending(false);
      setCountdown(60);
      setCanResend(false);
      setError("");
    }, 1500);
  };

  useEffect(() => {
    if (!canResend && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1****$3");
  const maskedPhone = "+237 65****987";

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-nestle-red" />
          OTP Verification
        </CardTitle>
        <CardDescription>
          Enter the one-time password sent to your{" "}
          {otpMethod === "email" ? "email" : "phone"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={otpMethod}
          onValueChange={(value) => setOtpMethod(value as "email" | "phone")}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
              <Mail className="h-4 w-4" />
              Send OTP to {maskedEmail}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone" className="flex items-center gap-2 cursor-pointer">
              <Phone className="h-4 w-4" />
              Send OTP to {maskedPhone}
            </Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="otp-0">Enter 6-digit OTP</Label>
          <div className="flex gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-lg"
              />
            ))}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="text-center">
          {canResend ? (
            <Button variant="link" onClick={resendOtp} disabled={isResending} className="p-0 h-auto">
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend OTP"
              )}
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Resend OTP in <span className="font-medium">{countdown}</span> seconds
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={verifyOtp}
          disabled={isVerifying || otp.join("").length !== 6}
          className="bg-nestle-red hover:bg-nestle-darkred"
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Verify & Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
