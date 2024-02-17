import * as React from "react";
import {Image} from "@chakra-ui/react";

import {
  Card,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export function MealCard({name, description, school, meetTime, studentIds, imgSrc, capacity, price}: any)  {
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
        <p className="flex gap-2">
          <Image src="/location.png" h={20} w={20} />
          {school}
        </p>
        <p className="flex gap-2">
          {" "}
          <Image src="/clock.png" h={20} w={20} />
          {meetTime}
        </p>

        <p className="flex gap-2">
          {" "}
          <Image src="/dollar.png" h={20} w={20} />
          {price}
        </p>
      </div>

      <p className="absolute right-2 bottom-2 text-xs"> Sign-ups: 2 / 3</p>
    </Card>
  );
}
