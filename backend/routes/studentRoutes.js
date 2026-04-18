import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
  addIntervention,
} from "../controllers/studentController.js";

const router = express.Router();

// Routes
router.post("/", createStudent); // Create
router.get("/", getAllStudents); // Get all
router.get("/search", searchStudents); // Search
router.get("/:id", getStudentById); // Get one
router.put("/:id", updateStudent); // Update
router.delete("/:id", deleteStudent); // Delete
router.post("/:id/interventions", addIntervention); // Add Intervention

export default router;
