import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCards from "../components/StatCard";

const Dashboard = () => {
  const [highRiskStudents, setHighRiskStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get("/students");
        const highRisk = res.data.filter((s) => s.riskLevel === "High");
        setHighRiskStudents(highRisk);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="flex bg-[#0B0F1A] text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Topbar />

        <div className="p-8">
          <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

          <StatCards />

          {/* Action Required: High Risk Alerts */}
          <div className="mt-8 bg-[#111827] rounded-2xl shadow-lg border border-red-900/50 overflow-hidden">
            <div className="bg-red-900/20 px-6 py-4 border-b border-red-900/30 flex justify-between items-center">
              <h2 className="text-xl font-bold text-red-400 flex items-center gap-2">
                ⚠️ Action Required: High Risk Alerts
              </h2>
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {highRiskStudents.length} Students
              </span>
            </div>
            <div className="p-0">
              {highRiskStudents.length > 0 ? (
                <ul className="divide-y divide-gray-800">
                  {highRiskStudents.slice(0, 5).map((student) => (
                    <li
                      key={student._id}
                      className="p-6 hover:bg-[#1a2236] transition flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-lg text-white">
                          {student.name || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-400">
                          ID: {student.student_id} • Class:{" "}
                          {student.courseClass || "General"}
                        </p>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Risk Score</p>
                          <p className="text-red-400 font-bold">
                            {student.riskScore}%
                          </p>
                        </div>
                        <Link
                          to={`/students/${student._id}`}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                          Intervene
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <p className="text-green-400 font-medium mb-2">
                    🎉 No high-risk students found!
                  </p>
                  <p className="text-sm">Everyone is doing great.</p>
                </div>
              )}
              {highRiskStudents.length > 5 && (
                <div className="p-4 text-center border-t border-gray-800 bg-[#151c2b]">
                  <Link
                    to="/students"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    View all {highRiskStudents.length} high-risk students →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
