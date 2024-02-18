import Link from "next/link";
import React from "react";
import UserAccountNav from "./UserAccountNav";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SignInButton from "./SignInButton";

const Navbar = async () => {
    const session = await getServerSession();

    return (
        <div className="fixed inset-x-0 top-0  bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-3 md:pb-3 pb-7">
            <div className="flex items-center justify-between h-full gap-2 md:px-8 px-3 mx-auto max-w-7xl pt-2 md:pt-0">
                {/* Logo */}
                <Link href={"/"} className="flex items-center flex-row ">
                    <p className="font-outfit ml-1 md:text-3xl text-2xl transition-all hover:-translate-y-[2px] md:block dark:text-white1">
                        <span className="md:text-3xl text-[18px]">
                            Aunties Meal
                        </span>
                    </p>
                </Link>

                <div className="flex items-center ">
                    {session?.user ? (
                        <>
                            <UserAccountNav user={session.user} />
                            <div className="md:block hidden ml-3 border-l-2 pl-3">
                                <h1 className="text-lg font-semibold ">
                                    {session.user.name}
                                </h1>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-row items-center text-center text-sm md:text-lg justify-center space-x-2 md:space-x-6 font-outfit">
                            <Link href={"/contact"}>
                                <p>Contact</p>
                            </Link>
                            <Link href={"/demo"}>
                                <p>Book Demo</p>
                            </Link>

                            <SignInButton text={"Sign In"} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
