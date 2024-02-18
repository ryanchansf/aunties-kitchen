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
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex items-center">
                <CheckIcon className="w-6 h-6" />
                Authentic Homemade Meals
              </AccordionTrigger>
              <AccordionContent>
                Enjoy delicious homemade meals cooked with love and care by
                experienced aunties.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <CheckIcon className="w-6 h-6" />
                Convenience
              </AccordionTrigger>
              <AccordionContent className="flex flex-wrap items-end justify-end">
                {/* <p className="max-w-[80%] overflow-wrap break-word"> */}
                No need to worry about cooking when you have Auntie's Kitchen.
                Just place your order and enjoy!
                {/* </p> */}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <CheckIcon className="w-6 h-6" />
                Variety
              </AccordionTrigger>
              <AccordionContent>
                Explore a wide range of cuisines and dishes offered by our
                talented aunties.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <CheckIcon className="w-6 h-6" />
                Affordable
              </AccordionTrigger>
              <AccordionContent>
                Delicious meals at affordable prices, perfect for students on a
                budget.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button asChild className="mt-4">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
