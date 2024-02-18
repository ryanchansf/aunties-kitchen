import * as React from "react";

import {
  Card,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MealCard({name, description, school, meetTime, studentIds, imgSrc, capacity, price}: any)  {

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
    <Card className="rounded-tl-2xl rounded-tr-2xl overflow-hidden h-4/5 relative">
      <img
        src={imgSrc}
        alt="food of image"
        className="w-full h-2/5 object-cover"
      />
      <CardTitle className="px-4 pt-4">{name}</CardTitle>
      <CardDescription className="px-4 py-2">{description}</CardDescription>
      <div className="px-4 py-2">
        {descriptionItems.map((item, index) => {
          return (
            <p className="flex gap-2 items-center" key={index}>
              <img src={item.logoSrc} className="h-4 w-4" />
              {item.attribute}
            </p>
          );
        })}
      </div>

      <p className="absolute right-2 bottom-2 text-xs"> Sign-ups: 2 / 3</p>
    </Card>
  );
}
