import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // 🔹 Dataset ID
    student_id: {
      type: String,
      required: true,
      unique: true,
    },

    // 🔹 Academic Data (from your CSV)
    attendance: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    assignment: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    lms: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    // 🔹 Calculated Risk (OUR LOGIC)
    riskScore: {
      type: Number,
      default: 0,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    reasons: [
      {
        type: String,
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);