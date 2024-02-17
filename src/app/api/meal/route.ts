import connectDB from "@/database/db";
import Meal from "@/database/mealSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, description, school, meetTime, capacity, price } =
      await req.json();

    const studentIds: string[] = [];

    await connectDB();
    await Meal.create({ name, description, school, meetTime, studentIds, capacity, price});

    return NextResponse.json({ message: "Meal created." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `An error occurred while creating meal: ${error}` },
      { status: 500 }
    );
  }
}
