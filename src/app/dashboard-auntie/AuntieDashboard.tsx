"use client"
import AddMeal from './AddMeal';
import AuntieMealsList from './AuntieMealsList';
import { useState } from 'react';

interface AuntieDashboardProps {
  session: any;
}

const AuntieDashboard = ({ session }: AuntieDashboardProps) => {
  const [reload, setReload] = useState(false);

  return (
    <div className="flex flex-col gap-4 pt-24 px-28">
        <div className="grid grid-cols-3 w-full items-center justify-center">
            <h1 className="text-2xl font-semibold  p-4">Upcoming Meals</h1>

            <h1 className="flex flex-col w-full items-center justify-center">
                <AddMeal reload={reload} setReload={setReload} />
            </h1>
            <h1 className="text-2xl font-semibold  p-4"></h1>
        </div>
        <AuntieMealsList reload={reload} setReload={setReload} session={session} />
    </div>
  );
};

export default AuntieDashboard;