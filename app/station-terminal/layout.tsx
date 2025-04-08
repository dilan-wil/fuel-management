"use client";
import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

export default function StationTerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setEmployees, setVehicles, setCards } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const allEmployees = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEmployees(allEmployees); // make sure your setEmployees handles arrays
      } catch (error) {
        console.error("Error getting employee collection:", error);
      }
    };

    fetchEmployees();
  }, [setEmployees]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vehicles"));
        const allVehicles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVehicles(allVehicles); // make sure your setEmployees handles arrays
      } catch (error) {
        console.error("Error getting employee collection:", error);
      }
    };

    fetchVehicles();
  }, [setVehicles]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cards"));
        const allCards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCards(allCards); // make sure your setEmployees handles arrays
      } catch (error) {
        console.error("Error getting employee collection:", error);
      }
    };

    fetchCards();
  }, [setCards]);

  return <>{children}</>;
}
