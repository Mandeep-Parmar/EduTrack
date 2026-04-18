import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

// Dashboard route
router.get("/", getDashboardStats);

export default router;
