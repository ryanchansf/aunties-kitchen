import { redirect } from "next/navigation";
import Card from "../components/Card";

import { getServerSession } from "next-auth";

type Props = {};

export const metadata = {
    title: "Dashboard | Auntie",
};

const Dashboard = async (props: Props) => {
    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/login");
    }

    return (
        <main className="p-8 mx-auto max-w-7xl">
            <div className="flex items-center mt-12">
                <div className="flex flex-col gap-1">
                    <h2 className="mr-2 text-[28px] font-bold tracking-tight">
                        Local Meals
                    </h2>
                    <h1 className="text-zinc-500 text-[15px] dark:text-zinc-300">
                        Find local meals from aunties nearby
                    </h1>
                </div>
            </div>
        </main>
    );
};
export default Dashboard;
