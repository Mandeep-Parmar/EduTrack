import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const formatRole = (role) => {
    if (!role) return "";
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex justify-end items-center p-4 border-b border-gray-800 gap-6">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-white">
            {userInfo.name || "Guest User"}
          </p>
          <p className="text-xs text-blue-400">{formatRole(userInfo.role)}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          <User className="text-gray-300" />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
};

export default Topbar;
