import React, { useState, useMemo } from "react";

// Dummy data
const dummyLoginHistory = [
  {
    user: "Alvin Santos",
    time: "2025-10-11 10:03",
    ip: "192.168.0.1",
    status: "Success",
  },
  {
    user: "Maria Dela Cruz",
    time: "2025-10-10 09:21",
    ip: "192.168.0.2",
    status: "Failed",
  },
];

const dummyActivityLogs = [
  { user: "Alvin Santos", action: "Added User", time: "2025-10-11 10:10" },
  { user: "Maria Dela Cruz", action: "Deleted Role", time: "2025-10-10 09:30" },
];

const Table = ({ columns, data }) => (
  <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
    <table className="min-w-full text-sm text-gray-700 table-auto">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
        <tr>
          {columns.map((col) => (
            <th key={col} className="px-4 py-3 text-left">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50 transition">
              {columns.map((col) => (
                <td key={col} className="px-4 py-3 text-gray-700">
                  {row[col.toLowerCase()] || row[col]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className="text-center py-6 text-gray-500 italic"
            >
              No records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default function AuditLogs() {
  const [activeTab, setActiveTab] = useState("login");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dataRaw = activeTab === "login" ? dummyLoginHistory : dummyActivityLogs;
  const columns =
    activeTab === "login"
      ? ["User", "Time", "IP", "Status"]
      : ["User", "Action", "Time"];

  const filteredData = useMemo(() => {
    return dataRaw.filter((item) =>
      Object.values(item).some((val) =>
        val.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [dataRaw, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <button
          className={`px-3 py-1 rounded ${
            activeTab === "login" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setActiveTab("login");
            setCurrentPage(1);
            setSearch("");
          }}
        >
          Login History
        </button>
        <button
          className={`px-3 py-1 rounded ${
            activeTab === "activity" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setActiveTab("activity");
            setCurrentPage(1);
            setSearch("");
          }}
        >
          Activity Logs
        </button>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded-lg w-full sm:w-64 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Table for medium+ screens */}
      <Table columns={columns} data={paginatedData} />

      {/* Card layout for small screens */}
      <div className="md:hidden flex flex-col gap-3">
        {paginatedData.length > 0 ? (
          paginatedData.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition flex flex-col gap-2"
            >
              {columns.map((col) => (
                <p key={col} className="text-gray-700 text-sm">
                  <span className="font-semibold">{col}:</span>{" "}
                  {item[col.toLowerCase()] || item[col]}
                </p>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500 italic">
            No records found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600 flex-wrap gap-2">
        <span>
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length}
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
    </div>
  );
}
