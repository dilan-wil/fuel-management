"use client";
import React, { useEffect, useState } from "react";
import type { Metadata } from "next";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase"; // adjust this path to your firebase config
import { useAuth } from "@/lib/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setEmployee, setEmployees, setVehicles, setCards, setTransactions } =
    useAuth();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "employees", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setEmployee(userDocSnap.data());

          console.log("User data:", userDocSnap.data());
        } else {
          console.log("No user document found");
        }
      }
    });

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const querySnapshot = await getDocs(collection(db, "employees"));
            const allEmployees = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(allEmployees);
            setEmployees(allEmployees); // make sure your setEmployee handles arrays
            console.log("All employee data:", allEmployees);
          } catch (error) {
            console.error("Error getting employee collection:", error);
          }
        }
      });

      return () => unsubscribe();
    }, [setEmployees]);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const querySnapshot = await getDocs(collection(db, "vehicles"));
            const allVehicles = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(allVehicles);
            setVehicles(allVehicles); // make sure your setEmployee handles arrays
            console.log("All employee data:", allVehicles);
          } catch (error) {
            console.error("Error getting employee collection:", error);
          }
        }
      });

      return () => unsubscribe();
    }, [setVehicles]);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const querySnapshot = await getDocs(collection(db, "cards"));
            const allCards = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(allCards);
            setCards(allCards); // make sure your setEmployee handles arrays
            console.log("All employee data:", allCards);
          } catch (error) {
            console.error("Error getting employee collection:", error);
          }
        }
      });

      return () => unsubscribe();
    }, [setCards]);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const querySnapshot = await getDocs(collection(db, "transactions"));
            const allTransactions = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(allTransactions);
            setTransactions(allTransactions); // make sure your setEmployee handles arrays
            console.log("All employee data:", allTransactions);
          } catch (error) {
            console.error("Error getting employee collection:", error);
          }
        }
      });

      return () => unsubscribe();
    }, [setTransactions]);

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}
