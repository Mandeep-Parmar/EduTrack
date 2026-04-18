import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Student from "./models/Student.js";
import Faculty from "./models/Faculty.js";
import calculateRisk from "./utils/riskCalculator.js";
import connectDB from "./config/mongodb.js";

dotenv.config();

const seedDB = async () => {
  try {
    await connectDB();
    console.log("Connected to database. Clearing old data...");
    await Student.deleteMany({});
    await Faculty.deleteMany({});

    // Create Faculties
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const faculties = [
      {
        name: "Dr. Alice (Mentor)",
        email: "mentor@example.com",
        password: hashedPassword,
        role: "faculty_mentor",
      },
      {
        name: "Prof. Bob (Teacher)",
        email: "teacher@example.com",
        password: hashedPassword,
        role: "teacher",
      },
      {
        name: "Dr. Carol (Coordinator)",
        email: "coordinator@example.com",
        password: hashedPassword,
        role: "faculty_coordinator",
      },
    ];
    await Faculty.insertMany(faculties);
    console.log("Faculties seeded successfully.");

    // Generate 100 Students
    const studentsData = [];
    const firstNames = [
      "John",
      "Jane",
      "Mike",
      "Emily",
      "Chris",
      "Sarah",
      "David",
      "Laura",
      "James",
      "Anna",
      "Robert",
      "Linda",
      "William",
      "Barbara",
      "Richard",
      "Susan",
      "Joseph",
      "Jessica",
      "Thomas",
      "Margaret",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Hernandez",
      "Lopez",
      "Gonzalez",
      "Wilson",
      "Anderson",
      "Thomas",
      "Taylor",
      "Moore",
      "Jackson",
      "Martin",
    ];
    const classes = ["CS101", "CS102", "CS103", "IT201", "IT202"];

    for (let i = 1; i <= 100; i++) {
      const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];

      // Random base to cluster scores around, to ensure a good mix of high, medium, and low performers
      const basePerformance = Math.random() * 100;

      const generateScore = () => {
        let score = basePerformance + (Math.random() * 30 - 15);
        return Math.min(100, Math.max(0, Math.round(score)));
      };

      studentsData.push({
        name: `${fName} ${lName}`,
        email: `student${i}@example.com`,
        password: hashedPassword,
        student_id: `STU${String(i).padStart(3, "0")}`,
        courseClass: classes[Math.floor(Math.random() * classes.length)],
        attendance: generateScore(),
        marks: generateScore(),
        assignment: generateScore(),
        lms: generateScore(),
      });
    }

    const studentsToInsert = studentsData.map((data) => {
      const { riskScore, riskLevel, reasons } = calculateRisk({
        attendance: data.attendance,
        marks: data.marks,
        assignment: data.assignment,
        lms: data.lms,
      });
      return {
        ...data,
        riskScore,
        riskLevel,
        reasons,
        interventions:
          data.attendance < 60
            ? [
                {
                  type: "counselling",
                  remarks: "Initial counselling session.",
                  date: new Date(),
                  snapshot: {
                    attendance: data.attendance,
                    marks: data.marks,
                    assignment: data.assignment,
                    lms: data.lms,
                    riskScore,
                    riskLevel,
                  },
                },
              ]
            : [],
      };
    });

    await Student.insertMany(studentsToInsert);
    console.log("Students seeded successfully.");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
