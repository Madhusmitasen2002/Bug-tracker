import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-60 bg-white border-r p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Bug Tracker</h2>

      {/* USER */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border flex items-center justify-center font-semibold">
          {user?.name?.[0]?.toUpperCase() ||
            user?.email?.[0]?.toUpperCase() ||
            "U"}
        </div>
        <div className="text-sm truncate">
          {user?.name || user?.email}
        </div>
      </div>

      {/* NAV */}
      <button
        onClick={() => navigate("/workspace")}
        className="text-left px-3 py-2 rounded hover:bg-gray-100"
      >
        Workspace
      </button>
    </div>
  );
}
