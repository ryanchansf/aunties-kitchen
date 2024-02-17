"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    name: string;
    email: string;
};
const OnboardCards = ({ name, email }: Props) => {
    const [currStep, setCurrStep] = useState(0);
    const [isStudent, setIsStudent] = useState(true);
    const [school, setSchool] = useState("");
    const [cuisine, setCuisine] = useState("");

    const router = useRouter();

    const handleStudentRegistration = async () => {
        try {
            const res = await fetch("/api/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    school: school,
                }),
            });
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await res.json();
            console.log(data);
            router.push("/dashboard-student");
        } catch (e) {
            console.error("Error:", e);
        }
    };

    const handleAuntieRegistration = async () => {
        try {
            const res = await fetch("/api/auntie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    cuisine: cuisine,
                }),
            });

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await res.json();
            console.log(data);
            router.push("/dashboard-auntie");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (currStep === 0) {
        return (
            <div>
                <Card className="w-[550px]">
                    <CardHeader>
                        <CardTitle>Are you a student or an Auntie?</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-row w-full items-center justify-center gap-1">
                            <Button
                                onClick={() => setIsStudent(true)}
                                variant={isStudent ? "default" : "outline"}
                            >
                                Here to eat! (Student)
                            </Button>
                            <Button
                                onClick={() => setIsStudent(false)}
                                variant={!isStudent ? "default" : "outline"}
                            >
                                Making the food! (Auntie)
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {currStep > 0 ? (
                            <Button
                                onClick={() => {
                                    setCurrStep(currStep - 1);
                                }}
                                variant="outline"
                            >
                                Back
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        <Button
                            onClick={() => {
                                setCurrStep(currStep + 1);
                            }}
                        >
                            Next
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    } else if (currStep === 1 && isStudent) {
        return (
            <div>
                <Card className="w-[550px]">
                    <CardHeader>
                        <CardTitle>What school to you attend?</CardTitle>
                        <CardDescription className="text-sm font-light ">
                            We'll connect you with homecooked meals near your
                            school!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select
                            onValueChange={(value) => setSchool(value)}
                            defaultValue={""}
                        >
                            <SelectTrigger className="active:border-none active:focus">
                                <SelectValue placeholder="Select the school you attend" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Stanford">
                                    Stanford
                                </SelectItem>
                                <SelectItem value="Dartmouth">
                                    Georgia Tech
                                </SelectItem>
                                <SelectItem value="UC Berkeley">
                                    UC Berkeley
                                </SelectItem>
                                <SelectItem value="Cal Tech">
                                    Cal Tech
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {currStep > 0 ? (
                            <Button
                                onClick={() => {
                                    setCurrStep(currStep - 1);
                                }}
                                variant="outline"
                            >
                                Back
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        <Button onClick={handleStudentRegistration}>
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    } else if (currStep === 1 && !isStudent) {
        return (
            <div>
                <Card className="w-[550px]">
                    <CardHeader>
                        <CardTitle>
                            What cuisine do you specialize in?
                        </CardTitle>
                        <CardDescription className="text-sm font-light ">
                            We'll connect you with students missing a taste of
                            their home
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select
                            onValueChange={(value) => setCuisine(value)}
                            defaultValue={""}
                        >
                            <SelectTrigger className="active:border-none active:focus">
                                <SelectValue placeholder="Select a cuisine" />
                            </SelectTrigger>

                            <SelectContent>
                                {/*TODO — put hardcoded values into list later */}
                                <SelectItem value="Chinese">Chinese</SelectItem>
                                <SelectItem value="Bengali">Bengali</SelectItem>
                                <SelectItem value="Mexican">Mexican</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {currStep > 0 ? (
                            <Button
                                onClick={() => {
                                    setCurrStep(currStep - 1);
                                }}
                                variant="outline"
                            >
                                Back
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        <Button onClick={handleAuntieRegistration}>
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
};
export default OnboardCards;
