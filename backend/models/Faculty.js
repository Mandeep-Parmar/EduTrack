import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["faculty_mentor", "teacher", "faculty_coordinator"],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Faculty", facultySchema);
