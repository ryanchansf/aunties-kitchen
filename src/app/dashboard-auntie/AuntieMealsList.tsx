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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {};
const AuntieMealsList = (props: Props) => {
    const [meals, setMeals] = useState<any[]>([]); // Using 'any' type for meals

    useEffect(() => {
        // Fetch meals when the component mounts
        fetchMeals()
            .then((fetchedMeals) => setMeals(fetchedMeals.meals))
            .catch((error) => console.error("Failed to fetch meals:", error));
    }, []); // Empty dependency array to run the effect only once

    const fetchMeals = async () => {
        try {
            const response = await fetch("/api/meal");
            if (!response.ok) {
                throw new Error("Failed to fetch meals");
            }
            return await response.json();
        } catch (error) {
            throw new Error(`An error occurred while fetching meals: ${error}`);
        }
    };

    return (
        <div className="flex flex-row gap-3">
            {meals.map((meal, id) => {
                return (
                    <Card key={id} className="w-[350px]">
                        <CardHeader>
                            <CardTitle>{meal.name}</CardTitle>
                            <CardDescription>
                                {meal.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>Location: {meal.location}</div>
                            <div>Time: {meal.meetTime}</div>
                        </CardContent>
                        <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                );
            })}
        </div>
    );
};
export default AuntieMealsList;
