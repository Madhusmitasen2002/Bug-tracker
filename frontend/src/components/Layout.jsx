import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-black flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex justify-center">
        {/* SINGLE WIDTH CONTAINER */}
        <div className="w-full max-w-7xl px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
