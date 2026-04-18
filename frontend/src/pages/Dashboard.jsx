import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCards from "../components/StatCard";

const Dashboard = () => {
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
        </div>
      </div>

    </div>
  );
};

export default Dashboard;