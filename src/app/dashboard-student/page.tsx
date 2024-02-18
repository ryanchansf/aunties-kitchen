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
        <div className="flex flex-col gap-4 pt-32 px-28">
            <div className="flex flex-row gap-14 items-center justify-center">
                <div
                    className="flex flex-col items-center justify-center gap-3 cursor-pointer
                 hover:-translate-y-1 transition"
                >
                    <Image
                        src={"/foodPics/bibimbap.png"}
                        alt={""}
                        height={45}
                        width={45}
                    />
                    <h1 className="text-sm text-zinc-500">Korean</h1>
                </div>
                <div
                    className="flex flex-col items-center justify-center gap-3 cursor-pointer
                 hover:-translate-y-1 transition"
                >
                    <Image
                        src={"/foodPics/dimsum.png"}
                        alt={""}
                        height={45}
                        width={45}
                    />
                    <h1 className="text-sm text-zinc-500">Chinese</h1>
                </div>
                <div
                    className="flex flex-col items-center justify-center gap-3 cursor-pointer
                 hover:-translate-y-1 transition"
                >
                    <Image
                        src={"/foodPics/Samosa.png"}
                        alt={""}
                        height={45}
                        width={45}
                    />
                    <h1 className="text-sm text-zinc-500">Bengali</h1>
                </div>
                <div
                    className="flex flex-col items-center justify-center gap-3 cursor-pointer
                 hover:-translate-y-1 transition"
                >
                    <Image
                        src={"/foodPics/tendon.png"}
                        alt={""}
                        height={45}
                        width={45}
                    />
                    <h1 className="text-sm text-zinc-500">Japanese</h1>
                </div>
            </div>
            <h1 className="text-2xl font-semibold pt-2">This Weeks Meals</h1>
            <p className="text-zinc-500 text-sm">
                Click on one to sign up for that meal!
            </p>
            <div className="grid grid-cols-4 gap-4">
                <StudentMealList session={session} />
            </div>
        </div>
    );
}
