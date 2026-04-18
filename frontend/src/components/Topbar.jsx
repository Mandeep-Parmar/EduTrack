import { User } from "lucide-react";

const Topbar = () => {
  return (
    <div className="flex justify-end items-center p-4 border-b border-gray-800">
      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
        <User />
      </div>
    </div>
  );
};

export default Topbar;