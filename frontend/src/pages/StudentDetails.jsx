import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const res = await API.get(`/students/${id}`);
      setStudent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  if (!student) {
    return (
      <div className="text-white p-6">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/students")}
        className="mb-4 text-blue-400 hover:underline"
      >
        ← Back to Students
      </button>

      {/* Card */}
      <div className="bg-[#111827] p-6 rounded-2xl shadow-lg border border-gray-800">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-gray-400">{student.email}</p>
            <p className="text-sm text-gray-500">ID: {student.student_id}</p>
          </div>

          {/* Risk Badge */}
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold
              ${
                student.riskLevel === "High"
                  ? "bg-red-500/20 text-red-400"
                  : student.riskLevel === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }
            `}
          >
            {student.riskLevel} Risk
          </span>
        </div>

        {/* Academic Data */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-[#1F2937] p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Marks</p>
            <h2 className="text-xl font-bold">{student.marks}</h2>
          </div>

          <div className="bg-[#1F2937] p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Attendance</p>
            <h2 className="text-xl font-bold">{student.attendance}%</h2>
          </div>

          <div className="bg-[#1F2937] p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Assignment</p>
            <h2 className="text-xl font-bold">{student.assignment}</h2>
          </div>

          <div className="bg-[#1F2937] p-4 rounded-xl text-center">
            <p className="text-gray-400 text-sm">LMS</p>
            <h2 className="text-xl font-bold">{student.lms}</h2>
          </div>

        </div>

        {/* Risk Score */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Risk Score</h2>
          <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
            <div
              className="bg-red-500 h-4"
              style={{ width: `${student.riskScore}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {student.riskScore}% risk level
          </p>
        </div>

        {/* Reasons */}
        <div>
          <h2 className="text-lg font-semibold mb-3">⚠️ Risk Reasons</h2>

          {student.reasons && student.reasons.length > 0 ? (
            <ul className="space-y-2">
              {student.reasons.map((reason, index) => (
                <li
                  key={index}
                  className="bg-[#1F2937] p-3 rounded-lg text-sm text-gray-300"
                >
                  • {reason}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-400">No risk factors detected 🎉</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentDetails;