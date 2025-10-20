import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import API from "../../api";
function StudentDashboardLayout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("Logout function triggered");

    try {
      // Call backend to remove refresh token and clear cookies
      const res = await API.post("/auth/logout");
      console.log("Logout response:", res.data);

      // Redirect to login page
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      // Even on error, redirect to login
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hello from Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Nested routes */}
      <Outlet />
    </div>
  );
}

export default StudentDashboardLayout;
