// app/api/fuel-records/route.ts
import { NextResponse } from "next/server";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

// Fetch fuel records (GET request)
export async function GET() {
  try {
    const fuelCollection = collection(db, "fuelRecords");
    const snapshot = await getDocs(fuelCollection);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch fuel records" }, { status: 500 });
  }
}

// Add new fuel record (POST request)
export async function POST(req: Request) {
  try {
    const { employee, department, fuelAmount, location, date } = await req.json();
    
    if (!employee || !department || !fuelAmount || !location || !date) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "fuelRecords"), {
      employee,
      department,
      fuelAmount,
      location,
      date,
    });

    return NextResponse.json({ id: docRef.id, message: "Fuel record added successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add fuel record" }, { status: 500 });
  }
}
