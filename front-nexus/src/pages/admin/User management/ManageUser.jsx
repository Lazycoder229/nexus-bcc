import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  Edit,
  Trash2,
  Eye,
  FileText,
  AlertTriangle,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const dummyUsers = [
  {
    id: 1,
    name: "Alvin Santos",
    email: "alvin.santos@example.com",
    role: "Administrator",
    status: "Active",
    lastLogin: "2025-10-09 14:32",
  },
  {
    id: 2,
    name: "Maria Dela Cruz",
    email: "maria.dc@example.com",
    role: "Faculty",
    status: "Inactive",
    lastLogin: "2025-10-07 09:21",
  },
  {
    id: 3,
    name: "Juan Reyes",
    email: "juan.reyes@example.com",
    role: "Student",
    status: "Active",
    lastLogin: "2025-10-11 10:03",
  },
  {
    id: 4,
    name: "Juan Reyes",
    email: "juan.reyes@example.com",
    role: "Student",
    status: "Active",
    lastLogin: "2025-10-11 10:03",
  },
  {
    id: 5,
    name: "Juan Reyes",
    email: "juan.reyes@example.com",
    role: "Student",
    status: "Active",
    lastLogin: "2025-10-11 10:03",
  },
  {
    id: 6,
    name: "Juan Reyes",
    email: "juan.reyes@example.com",
    role: "Student",
    status: "Active",
    lastLogin: "2025-10-11 10:03",
  },
];

export default function ManageUsers() {
  const [users, setUsers] = useState(dummyUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleSaveUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password?.value.trim();
    const role = form.role.value;
    const status = form.status.value;

    if (!name || !email) {
      toast.error("⚠️ Please fill in all required fields!");
      return;
    }

    const newUser = {
      id: modalType === "add" ? Date.now() : selectedUser.id,
      name,
      email,
      role,
      status,
      lastLogin: modalType === "add" ? "—" : selectedUser.lastLogin,
      ...(password && { password }),
    };

    if (modalType === "add") {
      setUsers([...users, newUser]);
      toast.success("✅ User added successfully!");
    } else {
      setUsers(users.map((u) => (u.id === newUser.id ? newUser : u)));
      toast.info("✏️ User updated successfully!");
    }

    setShowModal(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      toast.error("🗑️ User deleted!");
    }
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const exportToExcel = () => {
    const exportData = users.map(({ ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(new Blob([excelBuffer]), "users.xlsx");
    toast.success("📊 Exported to Excel!");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.text("User List", 14, 10);
    const tableColumn = ["Full Name", "Email", "Role", "Status", "Last Login"];
    const tableRows = users.map((u) => [
      u.name,
      u.email,
      u.role,
      u.status,
      u.lastLogin,
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 133, 244] },
    });
    doc.save("users.pdf");
    toast.success("📄 Exported to PDF!");
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-[70vh] flex flex-col gap-4">
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
        Manage Users
      </h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-56">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full text-sm"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm w-full sm:w-auto"
          >
            <option>All</option>
            <option>Administrator</option>
            <option>Faculty</option>
            <option>Student</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={exportToExcel}
            className="p-2 border rounded-lg hover:bg-gray-100 transition"
          >
            <Download size={18} />
          </button>
          <button
            onClick={exportToPDF}
            className="p-2 border rounded-lg hover:bg-gray-100 transition"
          >
            <FileText size={18} />
          </button>
          <button
            onClick={() => {
              setModalType("add");
              setSelectedUser(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm transition"
          >
            <Plus size={16} /> Add User
          </button>
        </div>
      </div>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-gray-700 table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-3 sm:px-4 py-2 text-left w-[30%]">Full Name</th>
              <th className="px-3 sm:px-4 py-2 text-left">Email</th>
              <th className="px-3 sm:px-4 py-2 text-left">Role</th>
              <th className="px-3 sm:px-4 py-2 text-left">Status</th>
              <th className="px-3 sm:px-4 py-2 text-left">Last Login</th>
              <th className="px-3 sm:px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-3 sm:px-4 py-2 font-medium">{user.name}</td>
                  <td className="px-3 sm:px-4 py-2">{user.email}</td>
                  <td className="px-3 sm:px-4 py-2">{user.role}</td>
                  <td className="px-3 sm:px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-center">
                    <div className="flex justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setModalType("view");
                          setShowModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => {
                          setModalType("edit");
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteModal(true);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden flex flex-col gap-3">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg p-3 bg-white shadow-sm flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{user.name}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-gray-500 text-xs">
                <strong>Last Login:</strong> {user.lastLogin}
              </p>
              <div className="flex justify-end gap-2 mt-1 flex-wrap">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setModalType("view");
                    setShowModal(true);
                  }}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Eye size={15} />
                </button>
                <button
                  onClick={() => {
                    setModalType("edit");
                    setSelectedUser(user);
                    setShowModal(true);
                  }}
                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                  }}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500 italic">
            No users found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600 gap-2">
        <span>
          Showing {startIndex + 1}–
          {Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
          {filteredUsers.length}
        </span>
        <div className="flex gap-2 flex-wrap">
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
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>

            <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">
              {modalType === "add"
                ? "Add New User"
                : modalType === "edit"
                ? "Edit User"
                : "View User"}
            </h3>

            {modalType === "view" ? (
              <div className="space-y-2 text-sm text-gray-700 text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border">
                    <ImageIcon className="text-gray-400" size={30} />
                  </div>
                </div>
                <p>
                  <strong>Name:</strong> {selectedUser?.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser?.email}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser?.role}
                </p>
                <p>
                  <strong>Status:</strong> {selectedUser?.status}
                </p>
                <p>
                  <strong>Last Login:</strong> {selectedUser?.lastLogin}
                </p>
                <div className="text-center mt-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveUser} className="space-y-3 text-sm">
                <div>
                  <label className="block text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedUser?.name || ""}
                    className="mt-1 w-full border rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedUser?.email || ""}
                    className="mt-1 w-full border rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="mt-1 w-full border rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-600">Role</label>
                    <select
                      name="role"
                      defaultValue={selectedUser?.role || "Student"}
                      className="mt-1 w-full border rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Administrator</option>
                      <option>Faculty</option>
                      <option>Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600">Status</label>
                    <select
                      name="status"
                      defaultValue={selectedUser?.status || "Active"}
                      className="mt-1 w-full border rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-3 py-1.5 border rounded-lg text-gray-600 hover:bg-gray-100 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
                  >
                    {modalType === "add" ? "Save" : "Update"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xs p-5 text-center animate-fadeIn">
            <AlertTriangle className="mx-auto text-red-500 mb-2" size={28} />
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Confirm Delete
            </h3>
            <p className="text-gray-600 text-xs mb-3">
              Delete <strong>{selectedUser?.name}</strong> permanently?
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1.5 border rounded-lg text-gray-600 hover:bg-gray-100 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
