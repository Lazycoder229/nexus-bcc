import React, { useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

function AdminLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Desktop collapsed
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Mobile overlay

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        toggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
      />

      {/* Main content */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          md:ml-0
          ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"}
        `}
      >
        {/* Header */}
        <Header
          toggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
          toggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          isSidebarCollapsed={isSidebarCollapsed}
          isMobileSidebarOpen={isMobileSidebarOpen}
        />

        {/* Content */}
        <main className="flex-1 p-4 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
