import connectDB from "@/database/db";
import Meal from "@/database/mealSchema";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
    try {
        // Accessing query parameters directly
        const { userEmail, mealId } = await req.json();
        console.log("MEAL ID", mealId);

        // Connect to the database
        await connectDB();

        // Find the meal by ID and delete it
        const deletedMeal = await Meal.findByIdAndDelete(mealId);

        if (deletedMeal) {
            return NextResponse.json(
                {
                    message: `Deleted`,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    message: `Error deleting meal. Meal not found.`,
                },
                { status: 500 }
            );
        }
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
