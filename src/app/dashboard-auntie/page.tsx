"use client";
import { useState, useEffect } from 'react';
import Card from './card';

const Dashboard = () => {
  const [meals, setMeals] = useState<any[]>([]); // Using 'any' type for meals
  const [newMeal, setNewMeal] = useState<Partial<any>>({
    name: '',
    description: '',
    school: '',
    meetTime: new Date().toISOString().slice(0, 16), // Setting meetTime to current time in the required format
    capacity: 0,
    price: 0
  });

  useEffect(() => {
    // Fetch meals when the component mounts
    fetchMeals()
      .then(fetchedMeals => setMeals(fetchedMeals.meals)) 
      .catch(error => console.error('Failed to fetch meals:', error));
  }, []); // Empty dependency array to run the effect only once

  const handleAddMeal = async () => {
    if (newMeal.meetTime && newMeal.name && newMeal.school) {
      try {
        const createdMeal = await createMeal(newMeal);
        setNewMeal({
          name: '',
          description: '',
          school: '',
          meetTime: new Date().toISOString().slice(0, 16),
          capacity: 0,
          price: 0
        });
        await fetchMeals()
          .then(fetchedMeals => setMeals(fetchedMeals.meals)) 
          .catch(error => console.error('Failed to fetch meals:', error));
      } catch (error) {
        console.error('Failed to create meal:', error);
      }
    }
  };  

  const handleRemoveMeal = (id: string) => {
    // Call API to delete meal with id
    deleteMeal(id)
      .then(() => {
        // Refetch the available meals after successful deletion
        fetchMeals()
          .then((meals) => {
            // Update the meals state with the updated list of meals
            setMeals(meals.meals);
          })
          .catch(error => console.error('Failed to fetch meals:', error));
      })
      .catch(error => console.error('Failed to delete meal:', error));
  };

  const createMeal = async (mealData: Partial<any>) => {
    try {
      const response = await fetch('/api/meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mealData)
      });
      if (!response.ok) {
        throw new Error('Failed to create meal');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`An error occurred while creating meal: ${error}`);
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/meal');
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`An error occurred while fetching meals: ${error}`);
    }
  };

  const deleteMeal = async (id: string) => {
    try {
      const response = await fetch(`/api/meal/?id=${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        console.log(await response.json());
        throw new Error('Failed to delete meal');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`An error occurred while deleting meal: ${error}`);
    }
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Meal Planner</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create New Meal</h2>
        <input
          type="text"
          placeholder="Name"
          value={newMeal.name}
          onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newMeal.description}
          onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <input
          type="text"
          placeholder="School"
          value={newMeal.school}
          onChange={(e) => setNewMeal({ ...newMeal, school: e.target.value })}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <input
          type="datetime-local"
          placeholder="Meet Time"
          value={newMeal.meetTime ? new Date(newMeal.meetTime).toISOString().slice(0, 16) : ''}
          onChange={(e) => setNewMeal({ ...newMeal, meetTime: new Date(e.target.value) })}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newMeal.capacity}
          onChange={(e) => setNewMeal({ ...newMeal, capacity: parseInt(e.target.value) || 0 })}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newMeal.price}
          onChange={(e) => setNewMeal({ ...newMeal, price: parseFloat(e.target.value) || 0 })}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <button onClick={handleAddMeal} className="bg-blue-500 text-white rounded-md py-2 px-4">Add Meal</button>
      </div>
      <div>
      {meals.map((meal) => (
        <Card
          key={meal._id} // Using the index as the key
          name={meal.name}
          description={meal.description}
          school={meal.school}
          meetTime={meal.meetTime}
          capacity={meal.capacity}
          price={meal.price}
          onRemove={() => handleRemoveMeal(meal._id)}
        />
      ))}
      </div>
    </div>
  );
};

export default Dashboard;