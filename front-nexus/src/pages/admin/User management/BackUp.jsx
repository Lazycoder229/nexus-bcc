import React, { useState, useMemo } from "react";
import { Eye, Trash2, X, RefreshCw, Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dummy backup data
const dummyBackups = [
  {
    id: 1,
    name: "backup_2025_10_10",
    datetime: "2025-10-10 23:59",
    type: "Full",
    size: "150MB",
    user: "admin",
    status: "Success",
  },
  {
    id: 2,
    name: "backup_2025_10_11",
    datetime: "2025-10-11 23:59",
    type: "Incremental",
    size: "30MB",
    user: "admin",
    status: "Success",
  },
  {
    id: 3,
    name: "backup_2025_10_12",
    datetime: "2025-10-12 23:59",
    type: "Differential",
    size: "50MB",
    user: "admin",
    status: "Failed",
  },
];

export default function DataBackupRestore() {
  const [backups, setBackups] = useState(dummyBackups);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewBackup, setViewBackup] = useState(null);
  const itemsPerPage = 5;

  // Filter backups
  const filteredBackups = useMemo(
    () =>
      backups.filter((b) =>
        Object.values(b).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      ),
    [backups, search]
  );

  const totalPages = Math.ceil(filteredBackups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBackups = filteredBackups.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = (backup) => {
    if (window.confirm(`Delete backup "${backup.name}"?`)) {
      setBackups(backups.filter((b) => b.id !== backup.id));
      toast.error("🗑️ Backup deleted!");
    }
  };

  const handleRestore = (backup) => {
    toast.info(`🔄 Restoring ${backup.name}...`);
    setTimeout(() => {
      toast.success(`✅ Backup ${backup.name} restored successfully!`);
    }, 1500);
  };

  const handleAddBackup = () => {
    const newBackup = {
      id: Date.now(),
      name: `backup_${new Date().toISOString().slice(0, 10)}`,
      datetime: new Date().toLocaleString(),
      type: "Full",
      size: `${Math.floor(Math.random() * 200) + 20}MB`,
      user: "admin",
      status: "Success",
    };
    setBackups([newBackup, ...backups]);
    toast.success(`✅ Backup "${newBackup.name}" created!`);
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Data Backup & Restore
        </h1>
        <button
          onClick={handleAddBackup}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
        >
          <Plus size={16} /> Add Backup
        </button>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search backups..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded-lg w-full sm:w-64 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Table for medium+ screens */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full text-sm text-gray-700 table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Backup Name</th>
              <th className="px-4 py-3 text-left">Date & Time</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Size</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBackups.length > 0 ? (
              paginatedBackups.map((b) => (
                <tr key={b.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium">{b.name}</td>
                  <td className="px-4 py-3">{b.datetime}</td>
                  <td className="px-4 py-3">{b.type}</td>
                  <td className="px-4 py-3">{b.size}</td>
                  <td className="px-4 py-3">{b.user}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      b.status === "Success"
                        ? "text-green-600"
                        : b.status === "Failed"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {b.status}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => setViewBackup(b)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleRestore(b)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(b)}
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
                  colSpan="7"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No backups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden flex flex-col gap-3">
        {paginatedBackups.length > 0 ? (
          paginatedBackups.map((b) => (
            <div
              key={b.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition flex flex-col gap-2"
            >
              <p className="font-medium text-gray-800">{b.name}</p>
              <p className="text-gray-600 text-sm">
                <strong>Date & Time:</strong> {b.datetime}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Type:</strong> {b.type}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Size:</strong> {b.size}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>User:</strong> {b.user}
              </p>
              <p
                className={`text-sm font-semibold ${
                  b.status === "Success"
                    ? "text-green-600"
                    : b.status === "Failed"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                <strong>Status:</strong> {b.status}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setViewBackup(b)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleRestore(b)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={() => handleDelete(b)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500 italic">
            No backups found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600 flex-wrap gap-2">
        <span>
          Showing {startIndex + 1}–
          {Math.min(startIndex + itemsPerPage, filteredBackups.length)} of{" "}
          {filteredBackups.length}
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

      {/* View Modal */}
      {viewBackup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewBackup(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
            <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">
              Backup Details
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Name:</strong> {viewBackup.name}
              </p>
              <p>
                <strong>Date & Time:</strong> {viewBackup.datetime}
              </p>
              <p>
                <strong>Type:</strong> {viewBackup.type}
              </p>
              <p>
                <strong>Size:</strong> {viewBackup.size}
              </p>
              <p>
                <strong>User:</strong> {viewBackup.user}
              </p>
              <p>
                <strong>Status:</strong> {viewBackup.status}
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setViewBackup(null)}
                className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
