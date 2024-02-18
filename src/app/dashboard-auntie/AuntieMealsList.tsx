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
import { MealCard } from "../components/mealCardAuntie";

type Props = {
    session: any;
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuntieMealsList = ({ session, reload, setReload }: Props) => {
    const [meals, setMeals] = useState<any[]>([]); // Using 'any' type for meals

    useEffect(() => {
        // Fetch meals when the component mounts
        fetchMeals()
            .then((fetchedMeals) => setMeals(fetchedMeals.meals))
            .then(() => console.log(meals))
            .catch((error) => console.error("Failed to fetch meals:", error));
    }, []); // Empty dependency array to run the effect only once

    useEffect(() => {
        fetchMeals()
            .then((fetchedMeals) => setMeals(fetchedMeals.meals))
            .then(() => console.log(meals))
            .catch((error) => console.error("Failed to fetch meals:", error));
    }, [reload]);

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

    function formatDateString(isoString: Date) {
        const date = new Date(isoString);

        const options: Intl.DateTimeFormatOptions = {
            weekday: "long", // 'long', 'short', 'narrow'
            hour: "numeric", // 'numeric', '2-digit'
            minute: "numeric", // 'numeric', '2-digit'
            hour12: true,
        };

        // The 'en-US' locale is used as an example; you can adjust it to your needs
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    function formatPrice(price: number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {meals.map((meal, id) => {
                return (
                    <MealCard
                        name={meal.name}
                        school={meal.school}
                        meetTime={formatDateString(meal.meetTime)}
                        price={formatPrice(meal.price)}
                        capacity={meal.capacity}
                        description={meal.description}
                        imgSrc={meal.imageSrc}
                        count={meal.count}
                        key={id}
                        mealId={meal._id}
                        setReload={setReload}
                        reload={reload}
                    />
                );
            })}
        </div>
    );
};
export default AuntieMealsList;
