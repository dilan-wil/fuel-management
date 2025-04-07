"use client"
import React, { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setEmployees, setVehicles, setCards } = useAuth()

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "employees"))
          const allEmployees = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          console.log(allEmployees)
          setEmployees(allEmployees) // make sure your setEmployee handles arrays
          console.log("All employee data:", allEmployees)
        } catch (error) {
          console.error("Error getting employee collection:", error)
        }
      }
    })

    return () => unsubscribe()
  }, [setEmployees])

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "vehicles"))
          const allVehicles = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          console.log(allVehicles)
          setVehicles(allVehicles) // make sure your setEmployee handles arrays
          console.log("All employee data:", allVehicles)
        } catch (error) {
          console.error("Error getting employee collection:", error)
        }
      }
    })

    return () => unsubscribe()
  }, [setVehicles])

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "cards"))
          const allCards = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          console.log(allCards)
          setCards(allCards) // make sure your setEmployee handles arrays
          console.log("All employee data:", allCards)
        } catch (error) {
          console.error("Error getting employee collection:", error)
        }
      }
    })

    return () => unsubscribe()
  }, [setCards])

  return <>{children}</>
}
