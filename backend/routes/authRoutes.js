import express from "express";
import { login, registerStudent, registerFaculty } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register-student", registerStudent);
router.post("/register-faculty", registerFaculty);

export default router;
