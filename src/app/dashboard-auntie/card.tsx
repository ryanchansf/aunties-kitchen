import React from 'react';

interface CardProps {
  name: string;
  description: string;
  meetTime: string;
  school: string;
  capacity: number;
  price: number;
  onRemove: () => void;
}

const Card: React.FC<CardProps> = ({ name, description, meetTime, school, capacity, price, onRemove }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Meeting Time:</strong> {meetTime}</p>
        <p><strong>School:</strong> {school}</p>
        <p><strong>Capacity:</strong> {capacity}</p>
        <p><strong>Price:</strong> {price}</p>
      </div>
      <button onClick={onRemove} className="mt-2 bg-red-500 text-white rounded-md py-1 px-2">Remove</button>
    </div>
  );
};

export default Card;