import Image from "next/image";
import Link from "next/link";

import { CheckIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const accordionItems = [
    {
      value: "item-1",
      title: "Authentic Homemade Meals",
      content:
        "Enjoy delicious homemade meals cooked with love and care by experienced aunties.",
    },
    {
      value: "item-2",
      title: "Convenience",
      content:
        "No need to worry about cooking with Auntie's Kitchen. Just place your order and enjoy!",
    },
    {
      value: "item-3",
      title: "Variety",
      content:
        "Explore a wide range of cuisines and dishes offered by our talented aunties.",
    },
    {
      value: "item-4",
      title: "Affordable",
      content:
        "Delicious meals at affordable prices, perfect for students on a budget.",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Auntie's Kitchen!
        </h1>
        <p className="text-lg text-gray-600">
          Connecting students with experienced aunties who love to cook
          delicious meals.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/auntie-cooking.jpg"
            alt="Auntie cooking"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">
            Why Choose Auntie's Kitchen?
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {accordionItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="flex items-center">
                  <CheckIcon className="w-6 h-6" />
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button asChild className="mt-4" variant="brown">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
