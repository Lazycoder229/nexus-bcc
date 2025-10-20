import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, GraduationCap } from "lucide-react";
import sidebarSections from "./ds";

function Sidebar({
  collapsed = false, // Desktop collapsed state
  isMobileOpen = false, // Mobile overlay state
  toggleMobileSidebar, // Function to toggle mobile sidebar
}) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({}); // Tracks collapsible sections
  const [isHovered, setIsHovered] = useState(false); // Tracks hover state for mini sidebar

  // Toggle collapsible section
  const toggleSection = useCallback(
    (id) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] })),
    []
  );

  // Determine if sidebar is in mini mode (collapsed but not hovered)
  const isMini = collapsed && !isHovered;

  // Determine if a section or sub-section is active
  const isActive = useCallback(
    (section) => {
      if (location.pathname === "/" && section.path === "/dashboard")
        return true;
      if (section.path && location.pathname === section.path) return true;
      if (section.items)
        return section.items.some((sub) => location.pathname === sub.path);
      return false;
    },
    [location.pathname]
  );

  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleMobileSidebar} // Close sidebar if overlay is clicked
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl flex flex-col overflow-hidden transition-all duration-300
          ${isMini ? "w-16 z-50" : "w-64 z-40"}
          ${
            !isMini && collapsed
              ? "md:absolute md:top-0 md:left-0 md:h-full md:z-50"
              : ""
          }
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          transform
        `}
        onMouseEnter={() => setIsHovered(true)} // Expand mini sidebar on hover
        onMouseLeave={() => setIsHovered(false)} // Collapse sidebar when mouse leaves
      >
        {/* ================= SIDEBAR HEADER ================= */}
        <div className="flex items-center px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          {isMini ? (
            // Show only icon in mini mode
            <GraduationCap size={24} className="text-amber-600 mx-auto" />
          ) : (
            // Show full title when expanded
            <h1 className="text-xl font-bold text-amber-600 truncate">
              NEXUS ERP
            </h1>
          )}
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 overflow-y-auto mt-2 px-2 scrollbar-thin scrollbar-thumb-gray-300/60 scrollbar-track-gray-50 hover:scrollbar-thumb-gray-200">
          {sidebarSections.map((group) => (
            <div key={group.group} className="mb-4">
              {!isMini && (
                <h2 className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-white rounded-t-lg sticky -top-1 z-5">
                  {group.group}
                </h2>
              )}

              <ul className="mt-2 space-y-0.5">
                {group.items.map((section) => {
                  const Icon = section.icon;
                  const isCollapsible = !!section.items && !section.path;
                  const isSectionOpen = openSections[section.id];
                  const active = isActive(section);

                  return (
                    <li key={section.id} className="relative group">
                      {isCollapsible ? (
                        <>
                          {/* ================= COLLAPSIBLE SECTION ================= */}
                          <button
                            onClick={() => toggleSection(section.id)}
                            className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-lg transition-all duration-200 focus:outline-none ${
                              active
                                ? "text-amber-700"
                                : "text-gray-700 hover:text-amber-700"
                            }`}
                            aria-expanded={isSectionOpen}
                          >
                            <div className="flex items-center">
                              {Icon && (
                                <Icon
                                  size={18}
                                  className={`flex-shrink-0 ${
                                    active
                                      ? "text-amber-700"
                                      : "text-gray-600 opacity-80"
                                  }`}
                                />
                              )}
                              {!isMini && (
                                <span className="ml-3 truncate font-medium">
                                  {section.title}
                                </span>
                              )}
                            </div>
                            {!isMini && (
                              <ChevronDown
                                size={16}
                                className={`flex-shrink-0 transition-transform duration-200 ${
                                  isSectionOpen
                                    ? "rotate-180 text-amber-500"
                                    : "text-gray-500"
                                }`}
                              />
                            )}
                          </button>

                          {/* ================= SUBMENU ================= */}
                          {isSectionOpen && !isMini && section.items && (
                            <ul className="relative pl-6 mt-1 space-y-1 text-sm overflow-hidden bg-white rounded-b-lg">
                              <span className="absolute left-3 top-0 bottom-0 w-px bg-gray-300" />
                              {section.items.map((sub) => (
                                <li
                                  key={sub.id}
                                  className="relative flex items-center"
                                >
                                  <Link
                                    to={sub.path}
                                    onClick={() =>
                                      isMobileOpen && toggleMobileSidebar()
                                    } // CLOSE ON MOBILE
                                    className={`ml-6 py-2 w-full transition-colors duration-200 ${
                                      location.pathname === sub.path
                                        ? "text-amber-700"
                                        : "text-gray-600 hover:text-amber-700"
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        // ================= NORMAL LINK =================
                        <Link
                          to={section.path}
                          onClick={() => isMobileOpen && toggleMobileSidebar()} // CLOSE ON MOBILE
                          className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors duration-200 ${
                            active
                              ? "text-amber-700"
                              : "text-gray-700 hover:text-amber-700"
                          }`}
                        >
                          {Icon && (
                            <Icon
                              size={18}
                              className={`flex-shrink-0 ${
                                active
                                  ? "text-amber-700"
                                  : "text-gray-600 opacity-80"
                              }`}
                            />
                          )}
                          {!isMini && (
                            <span className="ml-3 truncate">
                              {section.title}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
