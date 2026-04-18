import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const userRole = userInfo.role;

  // Intervention form state
  const [showInterventionForm, setShowInterventionForm] = useState(false);
  const [interventionType, setInterventionType] = useState("counselling");
  const [interventionRemarks, setInterventionRemarks] = useState("");
  const [loadingIntervention, setLoadingIntervention] = useState(false);

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
  }, [id]);

  const handleAddIntervention = async (e) => {
    e.preventDefault();
    setLoadingIntervention(true);
    try {
      await API.post(`/students/${id}/interventions`, {
        type: interventionType,
        remarks: interventionRemarks,
      });
      setShowInterventionForm(false);
      setInterventionRemarks("");
      fetchStudent(); // refresh data
    } catch (err) {
      console.log(err);
      alert("Failed to add intervention");
    } finally {
      setLoadingIntervention(false);
    }
  };

  if (!student) {
    return <div className="text-white p-6">Loading...</div>;
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

        {/* Intervention History */}
        <div className="mt-8 border-t border-gray-800 pt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">🛠️ Intervention History</h2>
            {userRole !== "teacher" && (
            <button
              onClick={() => setShowInterventionForm(!showInterventionForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              {showInterventionForm ? "Cancel" : "+ Log Intervention"}
            </button>
          )}
          </div>

          {showInterventionForm && (
            <form
              onSubmit={handleAddIntervention}
              className="mb-8 bg-[#1a2236] p-5 rounded-xl border border-gray-700"
            >
              <h3 className="font-semibold mb-4 text-gray-200">
                New Intervention Record
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Type
                  </label>
                  <select
                    className="w-full p-3 rounded-lg bg-[#111827] border border-gray-700 outline-none focus:border-blue-500"
                    value={interventionType}
                    onChange={(e) => setInterventionType(e.target.value)}
                  >
                    <option value="counselling">Counselling</option>
                    <option value="extra class">Extra Class</option>
                    <option value="remarks">General Remarks</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Remarks
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 rounded-lg bg-[#111827] border border-gray-700 outline-none focus:border-blue-500"
                    placeholder="E.g. Discussed low attendance..."
                    value={interventionRemarks}
                    onChange={(e) => setInterventionRemarks(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loadingIntervention}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
              >
                {loadingIntervention ? "Saving..." : "Save Record"}
              </button>
            </form>
          )}

          {student.interventions && student.interventions.length > 0 ? (
            <div className="space-y-6">
              {student.interventions.map((intv, idx) => (
                <div
                  key={idx}
                  className="bg-[#1F2937] rounded-xl p-5 border border-gray-700 relative"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">
                        {intv.type}
                      </span>
                      <p className="text-gray-200 mt-2 font-medium">
                        {intv.remarks}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(intv.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Pre/Post Comparison */}
                  {intv.snapshot && (
                    <div className="mt-4 bg-[#111827] rounded-lg p-4 border border-gray-800">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                        Performance Comparison
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Risk Score
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-gray-400 line-through">
                              {intv.snapshot.riskScore}%
                            </span>
                            <span className="text-white">→</span>
                            <span
                              className={`${student.riskScore < intv.snapshot.riskScore ? "text-green-400" : student.riskScore > intv.snapshot.riskScore ? "text-red-400" : "text-gray-300"}`}
                            >
                              {student.riskScore}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Attendance
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-gray-400 line-through">
                              {intv.snapshot.attendance}%
                            </span>
                            <span className="text-white">→</span>
                            <span
                              className={`${student.attendance > intv.snapshot.attendance ? "text-green-400" : student.attendance < intv.snapshot.attendance ? "text-red-400" : "text-gray-300"}`}
                            >
                              {student.attendance}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Marks</p>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-gray-400 line-through">
                              {intv.snapshot.marks}
                            </span>
                            <span className="text-white">→</span>
                            <span
                              className={`${student.marks > intv.snapshot.marks ? "text-green-400" : student.marks < intv.snapshot.marks ? "text-red-400" : "text-gray-300"}`}
                            >
                              {student.marks}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-[#1F2937]/50 rounded-xl border border-dashed border-gray-700">
              <p className="text-gray-400">No interventions recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
