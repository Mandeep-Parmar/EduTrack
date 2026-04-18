import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_id: "",
    name: "",
    email: "",
    attendance: "",
    marks: "",
    assignment: "",
    lms: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/students", formData);

      alert("✅ Student added successfully");

      navigate("/students");
    } catch (err) {
      console.log(err);
      alert("❌ Error adding student");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white p-6">

      {/* Back */}
      <button
        onClick={() => navigate("/students")}
        className="mb-4 text-blue-400 hover:underline"
      >
        ← Back to Students
      </button>

      {/* Form */}
      <div className="max-w-2xl mx-auto bg-[#111827] p-6 rounded-2xl shadow-lg border border-gray-800">

        <h1 className="text-2xl font-bold mb-6">➕ Add Student</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            value={formData.student_id}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
            required
          />

          <input
            type="number"
            name="marks"
            placeholder="Marks"
            value={formData.marks}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
            required
          />

          <input
            type="number"
            name="attendance"
            placeholder="Attendance (%)"
            value={formData.attendance}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
            required
          />

          <input
            type="number"
            name="assignment"
            placeholder="Assignment Score"
            value={formData.assignment}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
            required
          />

          <input
            type="number"
            name="lms"
            placeholder="LMS Activity"
            value={formData.lms}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Student"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddStudent;