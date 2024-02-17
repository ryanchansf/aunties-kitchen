import connectDB from "@/database/db";
import Student from "@/database/studentSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, school } = await req.json();

        const meals: string[] = [];
        await connectDB();
        await Student.create({ name, email, school, meals });

        return NextResponse.json(
            { message: "Student registered." },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `An error occurred while registering: ${error}` },
            { status: 500 }
        );
    }
}
