import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: false,
    },

    //  Dataset ID
    student_id: {
      type: String,
      required: true,
      unique: true,
    },

    courseClass: {
      type: String,
      required: true,
      default: "General",
    },

    //  Academic Data (from your CSV)
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

    //  Calculated Risk (OUR LOGIC)
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
      },
    ],

    interventions: [
      {
        type: {
          type: String,
          enum: ["counselling", "extra class", "remarks"],
          required: true,
        },
        remarks: { type: String, required: true },
        date: { type: Date, default: Date.now },
        snapshot: {
          attendance: Number,
          marks: Number,
          assignment: Number,
          lms: Number,
          riskScore: Number,
          riskLevel: String,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Student", studentSchema);
