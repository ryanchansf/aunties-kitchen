"use client"
import MealsList from "./AuntieMealsList";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function AddMeal(){
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [meetTime, setMeetTime] = useState('')
  const [school, setSchool] = useState('')
  const [capacity, setCapacity] = useState('')
  const [price, setPrice] = useState('')
  const [open, setOpen] = useState(false)

  const handleAddMeal = async () => {

    const newMeal = {
        name,
        description,
        meetTime,
        school,
        capacity: parseInt(capacity),
        price: parseFloat(price)
    };

    // Send new meal data to the server
    try {
        const response = await fetch('/api/meal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMeal)
        });
        if (!response.ok) {
            throw new Error('Failed to create meal');
        }
        // Handle success response if needed
    } catch (error) {
        console.error('Error creating meal:', error);
        // Handle error if needed
    }
};

return (

    <div >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="brown">Add Meal</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add Meal</DialogTitle>
                <DialogDescription>
                    Add new meals for students to enjoy! Click
                    Add Meal when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                        htmlFor="name"
                        className="text-right"
                    >
                        Name
                    </Label>
                    <Input
                        type="string"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        defaultValue="Auntie Jemima"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                        htmlFor="description"
                        className="text-right"
                    >
                        Description
                    </Label>
                    <Input
                        type="string"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue="Home style biryani"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                        htmlFor="meetTime"
                        className="text-right"
                    >
                        Meeting Time
                    </Label>
                    <Input
                        type="datetime-local"
                        id="meetTime"
                        value={meetTime}
                        onChange={(e) => setMeetTime(e.target.value)}
                        defaultValue="6:00 PM"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                        htmlFor="school"
                        className="text-right"
                    >
                        School
                    </Label>
                    <Input
                        type="string"
                        id="school"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        defaultValue="Stanford University"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                        htmlFor="capacity"
                        className="text-right"
                    >
                        Capacity
                    </Label>
                    <Input
                        type="number"
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        defaultValue="2"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                        htmlFor="price"
                        className="text-right"
                    >
                        Price
                    </Label>
                    <Input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        defaultValue="5.00"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogTrigger asChild>
            <DialogFooter>
              <Button type="submit" onClick={handleAddMeal} variant="brown">Add Meal</Button>
            </DialogFooter>
            

        </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  )
}