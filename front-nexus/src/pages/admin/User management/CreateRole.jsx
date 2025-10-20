import React, { useState } from "react";
import { Plus, Edit, Trash2, X, Eye } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyRoles = [
  {
    id: 1,
    name: "Administrator",
    permissions: ["Manage Users", "Access Control", "Backup/Restore"],
  },
  {
    id: 2,
    name: "Faculty",
    permissions: ["View Login History", "Activity Logs"],
  },
];

const allPermissions = [
  "Manage Users",
  "Access Control",
  "Login History",
  "Activity Logs",
  "Two-Factor Auth Setup",
  "Data Backup & Restore",
  "Account Lock/Unlock",
];

export default function RolesPermissions() {
  const [roles, setRoles] = useState(dummyRoles);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // add | edit | view
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(roles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoles = roles.slice(startIndex, startIndex + itemsPerPage);

  const openAddModal = () => {
    setModalType("add");
    setSelectedRole(null);
    setRoleName("");
    setPermissions([]);
    setShowModal(true);
  };

  const openEditModal = (role) => {
    setModalType("edit");
    setSelectedRole(role);
    setRoleName(role.name);
    setPermissions(role.permissions);
    setShowModal(true);
  };

  const openViewModal = (role) => {
    setModalType("view");
    setSelectedRole(role);
    setRoleName(role.name);
    setPermissions(role.permissions);
    setShowModal(true);
  };

  const handleSaveRole = (e) => {
    e.preventDefault();
    if (!roleName) return toast.error("Role name is required!");
    const newRole = {
      id: modalType === "add" ? Date.now() : selectedRole.id,
      name: roleName,
      permissions,
    };
    if (modalType === "add") {
      setRoles([...roles, newRole]);
      toast.success("Role added!");
    } else {
      setRoles(roles.map((r) => (r.id === newRole.id ? newRole : r)));
      toast.info("Role updated!");
    }
    setShowModal(false);
  };

  const handleDeleteRole = (role) => {
    if (window.confirm(`Delete role "${role.name}"?`)) {
      setRoles(roles.filter((r) => r.id !== role.id));
      toast.error("Role deleted!");
    }
  };

  const togglePermission = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Roles & Permissions
        </h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm"
        >
          <Plus size={16} /> Add Role
        </button>
      </div>

      {/* Table for medium+ screens */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full text-sm text-gray-700 table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Role Name</th>
              <th className="px-4 py-3 text-left">Permissions</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRoles.length > 0 ? (
              paginatedRoles.map((role) => (
                <tr
                  key={role.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{role.name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {role.permissions.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => openViewModal(role)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => openEditModal(role)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-md transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden flex flex-col gap-3">
        {paginatedRoles.length > 0 ? (
          paginatedRoles.map((role) => (
            <div
              key={role.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition flex flex-col gap-2"
            >
              <p className="font-medium text-gray-800">{role.name}</p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Permissions:</span>{" "}
                {role.permissions.join(", ")}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => openViewModal(role)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                  title="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => openEditModal(role)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-md transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteRole(role)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500 italic">
            No roles found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600 flex-wrap gap-2">
        <span>
          Showing {startIndex + 1}–
          {Math.min(startIndex + itemsPerPage, roles.length)} of {roles.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages || totalPages === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add / Edit / View Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
            <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">
              {modalType === "add"
                ? "Add Role"
                : modalType === "edit"
                ? "Edit Role"
                : "View Role"}
            </h3>

            {modalType === "view" ? (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 font-semibold">Role Name</p>
                  <p className="mt-1 text-gray-800">{roleName}</p>
                </div>

                <div>
                  <p className="text-gray-600 font-semibold mb-1">
                    Permissions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {permissions.length > 0 ? (
                      permissions.map((perm) => (
                        <span
                          key={perm}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {perm}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 italic text-xs">
                        No permissions assigned
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveRole} className="space-y-3 text-sm">
                <div>
                  <label className="block text-gray-600">Role Name</label>
                  <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Permissions
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded">
                    {allPermissions.map((perm) => (
                      <label
                        key={perm}
                        className="flex items-center gap-1 text-gray-700 text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={permissions.includes(perm)}
                          onChange={() => togglePermission(perm)}
                        />
                        {perm}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
                  >
                    {modalType === "add" ? "Save" : "Update"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
