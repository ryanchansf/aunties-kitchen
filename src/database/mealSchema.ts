import mongoose, { Schema } from "mongoose";

const MealSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  school: { type: String, required: true },
  meetTime: { type: Date, required: true },
  studentIds: { type: Array, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
});

export default mongoose.models.Meal || mongoose.model("Meal", MealSchema);