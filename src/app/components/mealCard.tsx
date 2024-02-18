import * as React from "react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function MealCard({
    name,
    mealId,
    description,
    school,
    meetTime,
    studentIds,
    imgSrc,
    capacity,
    session,
    price,
    count,
}: any) {
    const [isAlreadySubscribed, setIsAlreadySubscribed] =
        useState<boolean>(false); // Using 'any' type for meals

    const { toast } = useToast();

    useEffect(() => {
        const checkIfMealSubscribed = async () => {
            try {
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mealId,
                        userEmail: session.user.email,
                    }),
                };

                const response = await fetch(
                    `/api/meal/subscribe`,
                    requestOptions
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch meals");
                }

                const { mealExists } = await response.json();

                if (mealExists) {
                    setIsAlreadySubscribed(true);
                }
            } catch (error) {
                throw new Error(
                    `An error occurred while fetching meals: ${error}`
                );
            }
        };

        checkIfMealSubscribed();
    }, []);

    const subscribeToMeal = async () => {
        try {
            const requestOptions = {
                method: "PUT", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mealId, userEmail: session.user.email }),
            };

            const response = await fetch("/api/meal/subscribe", requestOptions);

            if (!response.ok) {
                throw new Error("Failed to fetch meals");
            }

            setIsAlreadySubscribed(true);

            toast({
                title: "Your order has been placed!",
                variant: "default",
                duration: 2000,
            });

            return response.json();
        } catch (error) {
            throw new Error(`An error occurred while fetching meals: ${error}`);
        }
    };

    const descriptionItems = [
        {
            logoSrc: "/location.png",
            attribute: school,
        },
        {
            logoSrc: "/clock.png",
            attribute: meetTime,
        },
        {
            logoSrc: "/dollar.png",
            attribute: price,
        },
    ];
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card
                    className={`${
                        isAlreadySubscribed && "border border-green-500"
                    } rounded-tl-2xl rounded-tr-2xl overflow-hidden h-4/6 relative transition-all 
                    duration-300 ease-in-out
                     hover:shadow-lg hover:cursor-pointer`}
                >
                    <img
                        src={imgSrc}
                        alt="food of image"
                        className="w-full h-2/5 object-cover "
                    />
                    <CardTitle className="px-4 pt-4 text-xl">{name}</CardTitle>
                    <CardDescription className="px-4 py-2">
                        {description}
                    </CardDescription>
                    <div className="px-4 py-2">
                        {descriptionItems.map((item, index) => {
                            return (
                                <p
                                    className="flex gap-2 items-center"
                                    key={index}
                                >
                                    <img
                                        src={item.logoSrc}
                                        className="h-4 w-4"
                                    />
                                    {item.attribute}
                                </p>
                            );
                        })}
                    </div>

                    <p className="absolute right-2 bottom-2 text-xs">
                        Sign Ups: {count}/3
                    </p>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px] h-[150px]">
                <DialogHeader>
                    <DialogTitle>Do you want to place your order?</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex mr-6">
                    <DialogClose>
                        <Button className="w-16 m-0" variant="outline">
                            No
                        </Button>
                    </DialogClose>

                    <DialogClose>
                        <Button
                            className="w-16 rounded"
                            onClick={() => subscribeToMeal()}
                        >
                            Yes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
