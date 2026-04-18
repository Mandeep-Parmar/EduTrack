import { useEffect, useState } from "react";
import API from "../services/api";
import AttendanceChart from "./AttendanceChart";

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    avgAttendance: 0,
    avgMarks: 0,
  });

  const fetchData = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log("Error fetching dashboard:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Average Marks */}
      <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] p-6 rounded-xl shadow-lg border border-gray-800">
        <p className="text-gray-400 text-sm">Average Marks</p>
        <h2 className="text-3xl font-bold mt-4">
          {stats.avgMarks ? Math.round(stats.avgMarks) : 0}%
        </h2>

        <p className="text-gray-500 text-xs mt-2">Based on all students</p>
      </div>

      {/* Attendance */}
      <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] p-6 rounded-xl shadow-lg border border-gray-800 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-sm mb-4">Average Attendance</p>

        <AttendanceChart value={Math.round(stats.avgAttendance || 0)} />
      </div>

      {/* Risk Overview */}
      <div className="bg-gradient-to-br from-red-900/30 to-black p-6 rounded-xl shadow-lg border border-red-500/30">
        <p className="text-gray-400 text-sm">Risk Overview</p>

        <div className="mt-4 space-y-2 text-sm">
          <p>🔴 High Risk: {stats.highRisk}</p>
          <p>🟡 Medium Risk: {stats.mediumRisk}</p>
          <p>🟢 Low Risk: {stats.lowRisk}</p>
        </div>

        <h2 className="text-lg font-bold text-red-400 mt-4">
          Total: {stats.totalStudents}
        </h2>
      </div>
    </div>
  );
};

export default StatsCards;
