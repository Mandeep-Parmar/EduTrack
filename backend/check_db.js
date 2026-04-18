import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import Student from "./models/Student.js";
import Faculty from "./models/Faculty.js";

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB");

  const students = await Student.find({ name: /ranger/i });
  console.log("Ranger Students:", students);

  const faculties = await Faculty.find({ name: /ranger/i });
  console.log("Ranger Faculties:", faculties);

  const allFaculties = await Faculty.find({});
  console.log("All Faculties:", allFaculties);

  const allStudentsRecent = await Student.find().sort({ createdAt: -1 }).limit(5);
  console.log("Recent Students:", allStudentsRecent);

  process.exit();
}

check();
