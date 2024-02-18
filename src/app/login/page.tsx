import SignInButton from "../components/SignInButton";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getServerSession();

    if (session?.user) {
        redirect("/onboard");
    }

    return (
        <main className="mt-10">
            <div className="flex items-center justify-center min-h-screen">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>
                            Click below to sign in with Google
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <SignInButton text={"Sign In"} />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
