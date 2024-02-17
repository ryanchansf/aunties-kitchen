import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  school: { type: String, required: true },
  meals: { type: Array, required: true },
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
