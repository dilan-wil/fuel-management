"use client"
import React, { useState } from "react"
import { db } from "@/lib/firebase"
import { getAuth } from "firebase/auth"
import { collection, addDoc, doc, setDoc, Timestamp } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const FuelRequest = () => {
  const [liters, setLiters] = useState("")
  const [odometer, setOdometer] = useState("")
  const [fuelType, setFuelType] = useState("")
  const [station, setStation] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
      console.error("User not authenticated")
      return
    }

    const refillData = {
      liters: Number(liters),
      odometer: Number(odometer),
      fuelType,
      station,
      timestamp: Timestamp.now(),
      userId: user.uid,
      email: user.email,
    }
    console.log(refillData)

    // try {
    //   // Add to global collection
    //   await addDoc(collection(db, "refill"), refillData)

    //   // Add to user subcollection
    //   const userRefillRef = collection(db, "employees", user.uid, "refills")
    //   await addDoc(userRefillRef, refillData)

    //   console.log("Refill added successfully")
    //   // Reset fields
    //   setLiters("")
    //   setOdometer("")
    //   setFuelType("")
    //   setStation("")
    // } catch (err) {
    //   console.error("Error saving refill:", err)
    // }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        placeholder="Liters"
        value={liters}
        onChange={(e) => setLiters(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Odometer"
        value={odometer}
        onChange={(e) => setOdometer(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Fuel Type (e.g. Diesel, Petrol)"
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Fuel Station"
        value={station}
        onChange={(e) => setStation(e.target.value)}
        required
      />
      <Button type="submit">Submit Request</Button>
    </form>
  )
}
