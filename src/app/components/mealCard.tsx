import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MealCard({name, description, school, meetTime, studentIds, capacity, price}: any)  {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Pickup Location: {school}</p>
        <p>Pickup Time: {meetTime}</p>
        <p>Max Students: {capacity}</p>
        <p>Price: {price}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  );
}
