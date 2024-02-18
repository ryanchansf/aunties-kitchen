"use client";
import { MealCard } from "./MealCard";
import { useState, useEffect } from "react";

export const metadata = {
  title: "Dashboard | Auntie",
};

export default function StudentMealList({session} : any) {
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
    <>
      {meals.map((meal: any, index: any) => {
        return (
          <MealCard
            name={meal.name}
            school={meal.school}
            meetTime={formatDateString(meal.meetTime)}
            price={formatPrice(meal.price)}
            capacity={meal.capacity}
            description={meal.description}
            imgSrc={meal.imageSrc}
            key={index}
            mealId={meal._id}
            session={session}
          />
        );
      })}
    </>
  );
}
