import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_id: "",
    name: "",
    email: "",
    courseClass: "",
    attendance: "",
    marks: "",
    assignment: "",
    lms: "",
  });

  // 🔹 Fetch existing student
  const fetchStudent = async () => {
    try {
      const res = await API.get(`/students/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  // 🔹 Handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/students/${id}`, formData);
      navigate("/students");
    } catch (err) {
      console.log(err);
    }
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
        <h1 className="text-2xl font-bold mb-6">✏️ Edit Student</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID */}
          <input
            type="text"
            name="student_id"
            value={formData.student_id}
            placeholder="Student id"
            disabled
            className="w-full p-3 rounded-lg bg-gray-700 cursor-not-allowed"
          />

          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Student Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
          />

          {/* Course/Class */}
          <input
            type="text"
            name="courseClass"
            placeholder="Course/Class"
            value={formData.courseClass}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Student email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
          />

          {/* Marks */}
          <input
            type="number"
            name="marks"
            value={formData.marks}
            placeholder="Student marks"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
          />

          {/* Attendance */}
          <input
            type="number"
            name="attendance"
            placeholder="Attendance"
            value={formData.attendance}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
          />

          {/* Assignment */}
          <input
            type="number"
            name="assignment"
            placeholder="Assignment"
            value={formData.assignment}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
          />

          {/* LMS */}
          <input
            type="number"
            name="lms"
            placeholder="Assignment"
            value={formData.lms}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-600 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition"
          >
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
