"use client";
import type { User } from "next-auth";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

type Props = {
    user: any;
};

const UserAccountNav = ({ user }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    className="w-10 h-10 border-2"
                    user={{
                        name: user?.name || null,
                        image: user?.image || null,
                    }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user?.name && (
                            <p className="font-medium">{user?.name}</p>
                        )}
                        {user?.email && (
                            <p className="w-[200px] truncate text-sm text-zinc-700">
                                {user?.email}
                            </p>
                        )}
                    </div>
                </div>
                {/* <DropdownMenuItem asChild>
                    <Link href="/viewPlan">View Plan</Link>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/contact">Contact Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard-student">Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onSelect={(event) => {
                        signOut().catch(console.error);
                    }}
                    className="text-red-600 cursor-pointer"
                >
                    Sign out
                    <LogOut className="w-4 h-4 ml-2 " />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAccountNav;
