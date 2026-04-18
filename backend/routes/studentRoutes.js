import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents
} from "../controllers/studentController.js";

const router = express.Router();

// Routes
router.post("/", createStudent);          // Create
router.get("/", getAllStudents);          // Get all
router.get("/search", searchStudents);    // Search
router.get("/:id", getStudentById);       // Get one
router.put("/:id", updateStudent);        // Update
router.delete("/:id", deleteStudent);     // Delete

export default router;