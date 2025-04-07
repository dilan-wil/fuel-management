"use client"
import React, { useEffect, useState } from "react"
import type { Metadata } from "next"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase" // adjust this path to your firebase config
import { useAuth } from "@/lib/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const { setEmployee } = useAuth()
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "employees", user.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          setEmployee(userDocSnap.data())
    
          console.log("User data:", userDocSnap.data())
        } else {
          console.log("No user document found")
        }
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
          {children}
    </>
  )
}
