import { redirect } from "next/navigation";
import Card from "../components/Card";
import connectDB from "@/database/db";
import Student from "@/database/studentSchema";
import Auntie from "@/database/auntieSchema";

import { getServerSession } from "next-auth";
import OnboardCards from "../components/OnboardCards";

type Props = {};

export const metadata = {
    title: "Onboard | Auntie",
};

const Onboard = async (props: Props) => {
    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/login");
    }

    const email = session.user.email;

    await connectDB();
    const auntie = await Auntie.findOne({ email });
    const student = await Student.findOne({ email });

    // completed onboarding process
    if (auntie) {
        redirect("/dashboard-auntie");
    }
    if (student) {
        redirect("/dashboard-student");
    }

    return (
        <main className="p-8 mx-auto max-w-7xl">
            <div className="flex w-full items-center justify-center text-center mt-12">
                <div className="flex flex-col gap-1">
                    <h2 className="mr-2 text-[28px] font-bold tracking-tight">
                        Welcome to Auntie&apos;s Kitchen!
                    </h2>
                    <h1 className="text-zinc-500 mb-10 text-[15px] dark:text-zinc-300">
                        Just a few more steps and you&apos;ll be ready to go!
                    </h1>
                    <OnboardCards
                        name={session.user.name!}
                        email={session.user.email!}
                    />
                </div>
            </div>
        </main>
    );
};
export default Onboard;
