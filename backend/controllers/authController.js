import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user (Student or Faculty) & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check Student collection
    let user = await Student.findOne({ email });
    let role = "student";

    // 2. If not found in Student, check Faculty collection
    if (!user) {
      user = await Faculty.findOne({ email });
      if (user) {
        role = user.role;
      }
    }

    // 3. Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role,
        token: generateToken(user._id, role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Register a new student
// @route   POST /api/auth/register-student
// @access  Public (for testing)
export const registerStudent = async (req, res) => {
  const { name, email, password, student_id, courseClass } = req.body;

  try {
    const studentExists = await Student.findOne({ email });

    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      student_id,
      courseClass: courseClass || "General",
      // Default academic fields so creation doesn't fail
      attendance: 0,
      marks: 0,
      assignment: 0,
      lms: 0,
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        role: "student",
        token: generateToken(student._id, "student"),
      });
    } else {
      res.status(400).json({ message: "Invalid student data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Register a new faculty
// @route   POST /api/auth/register-faculty
// @access  Public (for testing)
export const registerFaculty = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const facultyExists = await Faculty.findOne({ email });

    if (facultyExists) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const validRoles = ["faculty_mentor", "teacher", "faculty_coordinator"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const faculty = await Faculty.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (faculty) {
      res.status(201).json({
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        role: faculty.role,
        token: generateToken(faculty._id, faculty.role),
      });
    } else {
      res.status(400).json({ message: "Invalid faculty data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
