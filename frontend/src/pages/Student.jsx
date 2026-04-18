import { useEffect, useState } from "react";
import API from "../services/api";
import { Eye, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.student_id?.toLowerCase().includes(search.toLowerCase()) ||
      s.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 Students</h1>

        <button
          onClick={() => navigate("/add-student")}
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
        >
          + Add Student
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by ID or Name..."
        className="w-full p-3 mb-5 rounded-xl bg-[#111827] border border-gray-700 focus:border-blue-500 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto bg-[#111827] rounded-2xl shadow-lg border border-gray-800">
        <table className="w-full text-left">
          {/* Head */}
          <thead className="bg-[#1F2937] text-gray-300 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-4">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Marks</th>
              <th>Attendance</th>
              <th>LMS</th>
              <th>Risk</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr
                  key={s._id}
                  className="border-t border-gray-800 hover:bg-[#1a2236] transition duration-200"
                >
                  <td className="p-4 font-medium">{s.student_id}</td>
                  <td>{s.name || "N/A"}</td>
                  <td className="text-gray-400">{s.email || "N/A"}</td>
                  <td>{s.marks}</td>
                  <td>{s.attendance}%</td>
                  <td>{s.lms}</td>

                  {/* Risk Badge */}
                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold
                        ${
                          s.riskLevel === "High"
                            ? "bg-red-500/20 text-red-400"
                            : s.riskLevel === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }
                      `}
                    >
                      {s.riskLevel}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="flex justify-center gap-4 py-3">
                    <Eye
                      size={18}
                      className="cursor-pointer hover:text-blue-400 transition"
                      onClick={() => navigate(`/students/${s._id}`)}
                    />

                    <Pencil
                      size={18}
                      className="cursor-pointer hover:text-yellow-400 transition"
                      onClick={() => navigate(`/edit/${s._id}`)}
                    />

                    <Trash2
                      size={18}
                      className="cursor-pointer hover:text-red-400 transition"
                      onClick={() => handleDelete(s._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
