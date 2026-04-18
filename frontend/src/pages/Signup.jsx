import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, BookOpen, GraduationCap } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [userType, setUserType] = useState("student"); // "student" or "faculty"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // Student specific
    student_id: "",
    courseClass: "General",
    // Faculty specific
    role: "teacher",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = userType === "student" ? "/api/auth/register-student" : "/api/auth/register-faculty";
    
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      toast.success("Account created successfully!");
      
      if (response.data.role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join EduTrack today
          </p>
        </div>

        {/* User Type Toggle */}
        <div className="flex justify-center mt-6">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                userType === "student" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setUserType("student")}
            >
              <GraduationCap className="inline-block w-4 h-4 mr-2" />
              Student
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                userType === "faculty" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setUserType("faculty")}
            >
              <BookOpen className="inline-block w-4 h-4 mr-2" />
              Faculty
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            {/* Common Fields */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name" name="name" type="text" required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe" value={formData.name} onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email" name="email" type="email" required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com" value={formData.email} onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password" name="password" type="password" required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••" value={formData.password} onChange={handleChange}
                />
              </div>
            </div>

            {/* Student Specific Fields */}
            {userType === "student" && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="student_id">Student ID</label>
                  <input
                    id="student_id" name="student_id" type="text" required={userType === "student"}
                    className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. S12345" value={formData.student_id} onChange={handleChange}
                  />
                </div>
              </>
            )}

            {/* Faculty Specific Fields */}
            {userType === "faculty" && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="role">Faculty Role</label>
                <select
                  id="role" name="role"
                  className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={formData.role} onChange={handleChange}
                >
                  <option value="teacher">Teacher</option>
                  <option value="faculty_mentor">Faculty Mentor</option>
                  <option value="faculty_coordinator">Faculty Coordinator</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit" disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
