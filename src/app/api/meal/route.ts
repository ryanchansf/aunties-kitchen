import connectDB from "@/database/db";
import Meal from "@/database/mealSchema";
import { NextApiRequest } from "next";
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

export async function GET(req: Request) {
  try {
    await connectDB();
    const meals = await Meal.find();
    return NextResponse.json({ meals }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `An error occurred while fetching meals: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextApiRequest) {
  try {
    // Parse the URL to get the id query parameter
    const url = new URL(req.url ? req.url: "invalid");
    const id = url.searchParams.get('id');

    // Delete the meal with the provided ID from the database
    await Meal.deleteOne({ _id: id });

    // Return a success message
    return NextResponse.json({ message: "Meal deleted successfully." }, { status: 200 });
  } catch (error) {
    // Return an error message if deletion fails
    return NextResponse.json(
      { message: `An error occurred while deleting the meal: ${error}` },
      { status: 500 }
    );
  }
}