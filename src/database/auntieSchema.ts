import mongoose, { Schema } from "mongoose";

const AuntieSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cuisine: { type: String, required: true },
  meals: { type: Array, required: true },
});

export default mongoose.models.Auntie || mongoose.model("Auntie", AuntieSchema);