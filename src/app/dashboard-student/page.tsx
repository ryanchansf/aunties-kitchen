import { MealCard } from "../components/mealCard";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import connectDB from "@/database/db";
import Student from "@/database/studentSchema";
import Auntie from "@/database/auntieSchema";

export const metadata = {
    title: "Dashboard | Auntie",
};

export default async function StudentsView() {
    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/login");
    }

    await connectDB();

    const email = session.user.email;

    const auntie = await Auntie.findOne({ email });

    // completed onboarding process
    if (auntie) {
        redirect("/dashboard-auntie");
    }

    const meals = [
        {
            name: "Porota Manksho",
            description:
                "an authentic bengali chicken that is made with lots of love!",
            school: "Standford",
            meetTime: "6:00pm",
            capacity: "2/3 students",
            imgSrc: "/manksho.jpeg",
        },
        {
            name: "Porota Manksho",
            school: "Standford",
            meetTime: "6:00pm",
            description:
                "an authentic bengali chicken that is made with lots of love!",
            capacity: "2/3 students",
            imgSrc: "/manksho.jpeg",
        },
        {
            name: "Porota Manksho",
            school: "Standford",
            meetTime: "6:00pm",
            description:
                "an authentic bengali chicken that is made with lots of love!",
            capacity: "2/3 students",
            imgSrc: "/manksho.jpeg",
        },
        {
            name: "Porota Manksho",
            school: "Standford",
            meetTime: "6:00pm",
            capacity: "2/3 students",
            description:
                "an authentic bengali chicken that is made with lots of love!",
            imgSrc: "/manksho.jpeg",
        },
    ];

    return (
        <div className="flex flex-col gap-4 pt-20 px-28">
            <h1 className="text-4xl self-center p-4">Upcoming Meals</h1>

            <div className="grid grid-cols-4 gap-4">
                {meals.map((meal, index) => {
                    return (
                        <MealCard
                            name={meal.name}
                            school={meal.school}
                            meetTime={meal.meetTime}
                            capacity={meal.capacity}
                            description={meal.description}
                            imgSrc={meal.imgSrc}
                            key={index}
                            price="$30"
                        />
                    );
                })}
            </div>
        </div>
    );
}
