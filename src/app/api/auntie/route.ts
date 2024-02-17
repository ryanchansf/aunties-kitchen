import connectDB from "@/database/db";
import Auntie from "@/database/auntieSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, cuisine } = await req.json();
    const meals: string[] = [];
    await connectDB();
    await Auntie.create({ name, email, cuisine, meals });

    return NextResponse.json({ message: "Auntie registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `An error occurred while registering: ${error}` },
      { status: 500 },
    );
  }
}