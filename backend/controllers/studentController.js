import Student from "../models/Student.js";
import calculateRisk from "../utils/riskCalculator.js";

// ➕ CREATE STUDENT (from dataset format)
export const createStudent = async (req, res) => {
  try {
    const {
      student_id,
      name,
      email,
      courseClass,
      attendance,
      marks,
      assignment,
      lms,
    } = req.body;

    // check existing
    const existing = await Student.findOne({ student_id });
    if (existing) {
      return res.status(400).json({ msg: "Student already exists" });
    }

    // calculate risk
    const riskData = calculateRisk({
      attendance,
      marks,
      assignment,
      lms,
    });

    const student = await Student.create({
      student_id,
      name,
      email,
      courseClass,
      attendance,
      marks,
      assignment,
      lms,
      ...riskData,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📥 GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📄 GET SINGLE STUDENT
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    // Check if the user is a student requesting someone else's data
    if (req.user && req.user.role === "student" && req.user._id.toString() !== student._id.toString()) {
      return res.status(403).json({ msg: "Not authorized to view this student's data" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✏️ UPDATE STUDENT + RECALCULATE RISK
export const updateStudent = async (req, res) => {
  try {
    const { name, email, courseClass, attendance, marks, assignment, lms } =
      req.body;

    const riskData = calculateRisk({
      attendance,
      marks,
      assignment,
      lms,
    });

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        courseClass,
        attendance,
        marks,
        assignment,
        lms,
        ...riskData,
      },
      { new: true },
    );

    if (!updatedStudent) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json({ msg: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔍 SEARCH (by student_id)
export const searchStudents = async (req, res) => {
  try {
    const { query } = req.query;

    const students = await Student.find({
      student_id: { $regex: query, $options: "i" },
    });

    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//  ADD INTERVENTION
export const addIntervention = async (req, res) => {
  try {
    const { type, remarks } = req.body;
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    // Capture snapshot of current metrics
    const snapshot = {
      attendance: student.attendance,
      marks: student.marks,
      assignment: student.assignment,
      lms: student.lms,
      riskScore: student.riskScore,
      riskLevel: student.riskLevel,
    };

    student.interventions.push({ type, remarks, snapshot });
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
