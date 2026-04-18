import { LayoutDashboard, UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-[#111827] p-6 flex flex-col gap-6 border-r border-gray-800">
      <h2 className="text-xl font-bold text-blue-400">EduGuard AI</h2>

      <nav className="flex flex-col gap-4 mt-6">
        <div className="flex items-center gap-3 bg-blue-600/20 p-3 rounded-lg cursor-pointer">
          <LayoutDashboard size={18} />
          Dashboard
        </div>

        <div
          onClick={() => navigate("/add-student")}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          <UserPlus size={18} />
          Add Student
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
          <Users size={18} />
          Teacher Panel
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
