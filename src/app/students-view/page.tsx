
import { MealCard } from "../components/mealCard";

export default function StudentsView() {

  return (
    <div className="flex p-10 flex-col gap-4">
      <h1 className="text-2xl ">Upcoming Meals</h1>
      <div className="grid grid-cols-4 gap-4">
        <MealCard
          name="Porota Manksho"
          school="Stanford"
          meetTime="6:00pm"
          capacity="2/3 students"
        />
        <MealCard
          name="Porota Manksho"
          school="Stanford"
          meetTime="6:00pm"
          capacity="2/3 students"
        />
        <MealCard
          name="Porota Manksho"
          school="Stanford"
          meetTime="6:00pm"
          capacity="2/3 students"
        />
        <MealCard
          name="Porota Manksho"
          school="Stanford"
          meetTime="6:00pm"
          capacity="2/3 students"
        />
        <MealCard
          name="Porota Manksho"
          school="Stanford"
          meetTime="6:00pm"
          capacity="2/3 students"
        />
        <MealCard
          name="Porota Manksho"
          school="Stanford"
          meetTime="6:00pm"
          capacity="2/3 students"
        />
      </div>
    </div>
  );
}
