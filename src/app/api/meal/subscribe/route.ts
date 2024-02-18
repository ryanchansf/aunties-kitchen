import connectDB from "@/database/db";
import Student from "@/database/studentSchema";
import Meal from "@/database/mealSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Accessing query parameters directly
    const { userEmail, mealId } = await req.json();

    await connectDB();

    // Find the student document without updating it
    const studentDocument = await Student.findOne({ email: userEmail });

    let mealExists = false;
    // Check if the mealId exists in the student's meals array
    if (studentDocument && studentDocument.meals.includes(mealId)) {
      mealExists = true;
    }
    // Return the boolean result
    return NextResponse.json({ mealExists }, { status: 200 });
  } catch (error) {
    console.error("Error checking meal in student:", error);
    return NextResponse.json(
      {
        message: `An error occurred while checking if meal exists: ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { userEmail, mealId, action } = await req.json();

    const studentIds: string[] = [];

    await connectDB();

    let newDocument;
    let updatedMeal;
    if (action === "subscribe") {
      newDocument = await Student.findOneAndUpdate(
        { email: userEmail }, // Find a document with this email
        { $addToSet: { meals: mealId } }, // Add the mealId to the meals array only if it's not already present
        { new: true, upsert: false } // Options: return the updated document, do not insert a new one if it doesn't exist
      );
      updatedMeal =
        // Find the meal and increment the count
        await Meal.findByIdAndUpdate(
          mealId,
          { $inc: { count: 1 } }, // Increment the count by 1
          { new: true, upsert: false }
        );
    } else if (action === "unsubscribe") {
      newDocument = await Student.findOneAndUpdate(
        { email: userEmail },
        { $pull: { meals: mealId } },
        { new: true, upsert: false }
      );
      updatedMeal =
        // Find the meal and decrement the count
        await Meal.findByIdAndUpdate(
          mealId,
          { $inc: { count: -1 } }, // decrement the count by 1
          { new: true, upsert: false }
        );
    } else {
      throw new Error("Invalid action");
    }

    return NextResponse.json({ message: "Meal updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `An error occurred while creating meal: ${error}` },
      { status: 500 }
    );
  }
}
