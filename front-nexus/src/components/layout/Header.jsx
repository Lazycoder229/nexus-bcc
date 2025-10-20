import React from "react";
import { Menu, X, Bell, Globe, User } from "lucide-react";

function Header({
  toggleSidebar,
  toggleMobileSidebar,
  isSidebarCollapsed,
  isMobileSidebarOpen,
}) {
  return (
    <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200 shadow-sm sticky top-0">
      {/* Left: Menu toggle */}
      <div className="flex items-center">
        {/* Mobile */}
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors md:hidden"
        >
          {isMobileSidebarOpen ? (
            <X size={20} className="text-gray-700" />
          ) : (
            <Menu size={20} className="text-gray-700" />
          )}
        </button>
        {/* Desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden md:inline-flex p-2 ml-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isSidebarCollapsed ? (
            <X size={20} className="text-gray-700" />
          ) : (
            <Menu size={20} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Right icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md hover:bg-gray-100 transition-colors relative">
          <Bell size={20} className="text-gray-700" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <Globe size={20} className="text-gray-700" />
        </button>
        <div className="relative">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center">
            <User size={19} className="text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
