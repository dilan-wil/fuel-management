"use client";

import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  employee: any;
  employees: any;
  vehicles: any;
  cards: any;
  login: (email: string, password: string) => Promise<string>; // now returns 6-digit code
  logout: () => Promise<void>;
  setupTotp: () => Promise<string>;
  setEmployee: React.Dispatch<React.SetStateAction<any>>;
  setEmployees: React.Dispatch<React.SetStateAction<any>>;
  setVehicles: React.Dispatch<React.SetStateAction<any>>;
  setCards: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<any>(null);
  const [employees, setEmployees] = useState<any>([]);
  const [vehicles, setVehicles] = useState<any>([]);
  const [cards, setCards] = useState<any>([]);
  const [admin, setAdmin] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Function to generate a random 6-digit code
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Login function that sends a 6-digit code to user's email
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      if (!userEmail) throw new Error("User email not found");

      const code = generateCode();

      // Call API to send email
      await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, code }),
      });

      return code;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to set up a TOTP (we just return a random 6-digit code)
  const setupTotp = async () => {
    const code = generateCode();
    return code;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setupTotp, employee, setEmployee, employees, setEmployees, vehicles, setVehicles, cards, setCards }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
