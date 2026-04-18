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
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", protect, authorizeRoles("teacher", "faculty_coordinator"), createStudent); // Create
router.get("/", protect, authorizeRoles("teacher", "faculty_mentor", "faculty_coordinator"), getAllStudents); // Get all
router.get("/search", protect, authorizeRoles("teacher", "faculty_mentor", "faculty_coordinator"), searchStudents); // Search
router.get("/:id", protect, getStudentById); // Get one (handled in controller for specific student access)
router.put("/:id", protect, authorizeRoles("teacher", "faculty_coordinator"), updateStudent); // Update
router.delete("/:id", protect, authorizeRoles("teacher", "faculty_coordinator"), deleteStudent); // Delete
router.post("/:id/interventions", protect, authorizeRoles("faculty_mentor", "faculty_coordinator"), addIntervention); // Add Intervention

export default router;
