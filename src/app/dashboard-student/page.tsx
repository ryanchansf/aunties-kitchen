import { MealCard } from "../components/MealCard";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import StudentMealList from "../components/StudentMealList";
import Image from "next/image";
import connectDB from "@/database/db";
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

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-4 pt-20 px-28">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col items-center justify-center">
          <Image src={""} alt={""} height={100} width={100} />
          <h1>Korean</h1>
        </div>
      </div>
      <h1 className="text-2xl font-semibold   p-4 pb-2">This Weeks Meals</h1>
      <div className="grid grid-cols-4 gap-4">
        <StudentMealList session={session} />
      </div>
    </div>
  );
}
