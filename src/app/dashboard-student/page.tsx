import { MealCard } from "../components/MealCard";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import StudentMealList from "../components/StudentMealList";
import Image from "next/image";

async function getData() {
  const res = await fetch("http://localhost:3000/api/meal", {
    method: "GET", // Explicitly stating that this is a GET request
  });
  if (!res.ok) return notFound();
  return res.json();
}

export const metadata = {
  title: "Dashboard | Auntie",
};

export default async function StudentsView() {
  const session = await getServerSession();
  const { meals } = await getData();

  if (!session || !session.user) {
    redirect("/login");
  }

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
    <div className="flex flex-col gap-4 pt-20 px-28">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={""}
            alt={""}
            height={100}
            width={100}
          />
          <h1>Korean</h1>
        </div>
      </div>
      <h1 className="text-2xl font-semibold   p-4 pb-2">This Weeks Meals</h1>
      <div className="grid grid-cols-4 gap-4">
        <StudentMealList session={session} />
      </div>
    </div>
  );
}
