import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  CheckCircle, 
  Award, 
  BarChart, 
  AlertTriangle,
  Calendar,
  LogOut,
  User as UserIcon
} from "lucide-react";
import axios from "axios";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`http://localhost:5000/api/students/${userInfo._id}`, config);
        setStudentData(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    if (userInfo && userInfo._id) {
      fetchStudentData();
    } else {
      setError("User not found. Please log in again.");
      setLoading(false);
    }
  }, [userInfo?._id, userInfo?.token]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !studentData) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center text-white">
        <div className="bg-red-900/20 p-8 rounded-xl border border-red-900/50 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Determine colors based on risk level
  const getRiskColor = (level) => {
    switch (level) {
      case "High": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "Medium": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      default: return "text-green-500 bg-green-500/10 border-green-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white font-sans">
      {/* Top Navbar */}
      <nav className="bg-[#111827] border-b border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            EduTrack Student
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-gray-300 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50">
            <UserIcon className="w-4 h-4" />
            <span className="font-medium">{userInfo?.name}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-br from-[#1a2236] to-[#111827] p-8 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {studentData.name}!</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5 bg-gray-800/50 px-3 py-1.5 rounded-md border border-gray-700/50">
                <UserIcon className="w-4 h-4" /> ID: {studentData.student_id}
              </span>
              <span className="flex items-center gap-1.5 bg-gray-800/50 px-3 py-1.5 rounded-md border border-gray-700/50">
                <BookOpen className="w-4 h-4" /> Class: {studentData.courseClass}
              </span>
            </div>
          </div>
          
          <div className={`relative z-10 flex flex-col items-end p-4 rounded-xl border ${getRiskColor(studentData.riskLevel)}`}>
            <span className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">Overall Risk Level</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{studentData.riskLevel}</span>
              <span className="text-lg opacity-80">({studentData.riskScore}%)</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Attendance" 
            value={studentData.attendance} 
            icon={<Calendar className="w-6 h-6 text-blue-400" />} 
            color="blue"
          />
          <MetricCard 
            title="Marks / Grades" 
            value={studentData.marks} 
            icon={<Award className="w-6 h-6 text-purple-400" />} 
            color="purple"
          />
          <MetricCard 
            title="Assignments" 
            value={studentData.assignment} 
            icon={<CheckCircle className="w-6 h-6 text-green-400" />} 
            color="green"
          />
          <MetricCard 
            title="LMS Engagement" 
            value={studentData.lms} 
            icon={<BarChart className="w-6 h-6 text-orange-400" />} 
            color="orange"
          />
        </div>

        
        {/* AI Action Plan Section */}
        <div className="bg-gradient-to-br from-[#1a2236] to-[#111827] rounded-2xl border border-gray-800 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="px-6 py-5 border-b border-gray-800 bg-[#151c2b] flex items-center justify-between z-10 relative">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-xl">🎯</span>
              Your Personalized Action Plan
            </h2>
          </div>
          <div className="p-6 z-10 relative">
            {(() => {
              const plans = [];
              if (studentData.attendance < 75) {
                plans.push({
                  title: "Boost Your Attendance",
                  description: `Your attendance is ${studentData.attendance}%. You need to attend the next few classes consistently to reach the safe zone of 75%.`,
                  icon: <Calendar className="w-6 h-6 text-blue-400" />,
                  bg: "bg-blue-500/10 border-blue-500/20"
                });
              }
              if (studentData.marks < 50) {
                plans.push({
                  title: "Improve Exam Scores",
                  description: `Your current marks are ${studentData.marks}. Consider joining a study group or scheduling a 1-on-1 with your mentor.`,
                  icon: <Award className="w-6 h-6 text-purple-400" />,
                  bg: "bg-purple-500/10 border-purple-500/20"
                });
              }
              if (studentData.assignment < 50) {
                plans.push({
                  title: "Complete Missing Assignments",
                  description: `Your assignment score is ${studentData.assignment}. Check the portal for any pending assignments and submit them ASAP.`,
                  icon: <CheckCircle className="w-6 h-6 text-green-400" />,
                  bg: "bg-green-500/10 border-green-500/20"
                });
              }
              if (studentData.lms < 50) {
                plans.push({
                  title: "Increase LMS Activity",
                  description: `Your LMS engagement is ${studentData.lms}. Make sure to log in, read the materials, and participate in discussions.`,
                  icon: <BarChart className="w-6 h-6 text-orange-400" />,
                  bg: "bg-orange-500/10 border-orange-500/20"
                });
              }

              if (plans.length === 0) {
                return (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                      <Award className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-400 mb-2">You are doing fantastic!</h3>
                    <p className="text-gray-400">All your metrics are looking great. Keep up the excellent work and maintain these habits.</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans.map((plan, idx) => (
                    <div key={idx} className={`p-5 rounded-xl border ${plan.bg} bg-[#111827] flex gap-4 items-start hover:-translate-y-1 transition-transform duration-300`}>
                      <div className="p-3 bg-[#1a2236] rounded-xl shrink-0">
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{plan.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{plan.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Interventions/Remarks Section */}
        <div className="bg-[#111827] rounded-2xl border border-gray-800 shadow-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-800 bg-[#151c2b] flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-gray-400" />
              Faculty Remarks & Interventions
            </h2>
            <span className="bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1 rounded-full border border-gray-700">
              {studentData.interventions?.length || 0} Records
            </span>
          </div>
          
          <div className="p-6">
            {!studentData.interventions || studentData.interventions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto text-gray-700 mb-3" />
                <p className="text-lg font-medium">No interventions recorded.</p>
                <p className="text-sm">You are on track!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {studentData.interventions.map((intervention, index) => (
                  <div key={index} className="flex gap-4 relative">
                    {/* Timeline line */}
                    {index !== studentData.interventions.length - 1 && (
                      <div className="absolute top-10 left-6 bottom-[-24px] w-0.5 bg-gray-800"></div>
                    )}
                    
                    <div className="w-12 h-12 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center shrink-0 z-10">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                    </div>
                    
                    <div className="bg-[#1a2236] p-5 rounded-xl border border-gray-700/50 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-800 text-gray-300 uppercase tracking-wider border border-gray-700">
                          {intervention.type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(intervention.date).toLocaleDateString(undefined, {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed mt-3 bg-[#111827] p-4 rounded-lg border border-gray-800">
                        "{intervention.remarks}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

// Helper component for metric cards
const MetricCard = ({ title, value, icon, color }) => {
  // Determine gradient and background colors
  const colorMap = {
    blue: "from-blue-500/20 to-transparent border-blue-500/20 text-blue-400",
    purple: "from-purple-500/20 to-transparent border-purple-500/20 text-purple-400",
    green: "from-green-500/20 to-transparent border-green-500/20 text-green-400",
    orange: "from-orange-500/20 to-transparent border-orange-500/20 text-orange-400",
  };

  const currentColors = colorMap[color];

  return (
    <div className={`bg-gradient-to-br ${currentColors.split(' ')[0]} ${currentColors.split(' ')[1]} bg-[#111827] p-6 rounded-2xl border ${currentColors.split(' ')[2]} shadow-lg hover:shadow-xl transition-all group`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-sm font-medium text-gray-500">/ 100</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-800 h-1.5 rounded-full mt-4 overflow-hidden">
          <div 
            className={`h-full rounded-full ${color === 'blue' ? 'bg-blue-500' : color === 'purple' ? 'bg-purple-500' : color === 'green' ? 'bg-green-500' : 'bg-orange-500'}`}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Import missing icon at the top but defining it here for simplicity
const GraduationCap = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default StudentDashboard;
