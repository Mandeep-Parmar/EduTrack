import Student from "../models/Student.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const highRisk = await Student.countDocuments({ riskLevel: "High" });
    const mediumRisk = await Student.countDocuments({ riskLevel: "Medium" });
    const lowRisk = await Student.countDocuments({ riskLevel: "Low" });

    // ✅ Aggregate for averages
    const avgStats = await Student.aggregate([
      {
        $group: {
          _id: null,
          avgAttendance: { $avg: "$attendance" },
          avgMarks: { $avg: "$marks" },
        },
      },
    ]);

    res.json({
      totalStudents,
      highRisk,
      mediumRisk,
      lowRisk,
      avgAttendance: avgStats[0]?.avgAttendance || 0,
      avgMarks: avgStats[0]?.avgMarks || 0,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
