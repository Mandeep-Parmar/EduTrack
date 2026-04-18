import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Dashboard route
router.get("/", getDashboardStats);
router.get("/", protect, authorizeRoles("teacher", "faculty_mentor", "faculty_coordinator"), getDashboardStats);

export default router;
