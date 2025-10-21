import React, { useState, useMemo } from "react";
import { FileSpreadsheet, FileText, CirclePlus } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function DataTable({
  columns,
  data,
  itemsPerPage = 10,
  filters,
  onAddItem, // optional callback for "Add" button
  addButtonLabel = "Add", // label for the button
}) {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState(
    filters ? Object.fromEntries(filters.map((f) => [f.key, ""])) : {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  // Filtered Data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // 1️⃣ Search filter: check if any row value matches search text
      const matchesSearch = Object.values(row)
        .map((v) => (v !== null && v !== undefined ? v.toString() : ""))
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      // 2️⃣ Dropdown filters: only filter if a value is selected and not "All"
      const matchesFilters = filters
        ? filters.every((f) => {
            const filterVal = filterValues[f.key];
            if (!filterVal || filterVal === "All") return true;

            // Convert row value to string safely
            const rowVal =
              row[f.key] !== undefined ? row[f.key].toString() : "";
            return rowVal === filterVal.toString();
          })
        : true;

      return matchesSearch && matchesFilters;
    });
  }, [data, search, filterValues, filters]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Export functions
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((row) => {
        const obj = {};
        columns.forEach((col) => {
          obj[col.label] = col.render ? row[col.key] : row[col.key];
        });
        return obj;
      })
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((c) => c.label);
    const tableRows = filteredData.map((row) =>
      columns.map((c) => (c.render ? row[c.key] : row[c.key]))
    );
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("data.pdf");
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Search, Filters, Export, Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-3 border-b border-gray-200">
        <div className="flex gap-2 items-center w-full md:w-auto flex-wrap">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-full md:w-auto"
          />
          {filters &&
            filters.map((f) => (
              <select
                key={f.key}
                value={filterValues[f.key]}
                onChange={(e) => {
                  setFilterValues((prev) => ({
                    ...prev,
                    [f.key]: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                <option value="">All</option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ))}
        </div>

        <div className="flex gap-2 mt-2 md:mt-0 items-center mb-2 flex-wrap">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          >
            <FileSpreadsheet size={16} />
            Excel
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          >
            <FileText size={16} />
            PDF
          </button>
          {onAddItem && (
            <button
              onClick={onAddItem}
              className="flex items-center gap-1 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              <CirclePlus size={16} />
              {addButtonLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-2 py-1 text-left text-gray-600 font-bold ${
                    col.className || ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className={`px-2 py-1 ${col.tdClass || ""}`}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden grid grid-cols-1 gap-3 p-2">
        {currentItems.map((row, idx) => (
          <div
            key={idx}
            className="bg-white shadow-sm border rounded-lg p-3 space-y-2"
          >
            {columns.map((col) => {
              if (col.key === "actions") return null; // actions rendered separately
              return (
                <div key={col.key} className="flex justify-between">
                  <span className="font-medium text-gray-500">{col.label}</span>
                  <span className="text-gray-800 text-sm">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </span>
                </div>
              );
            })}
            {/* Actions */}
            <div className="flex justify-end gap-2 pt-1">
              {columns.find((c) => c.key === "actions")?.render?.(null, row)}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2 border-t border-gray-200 bg-gray-50">
        <p className="text-gray-600 text-sm">
          Showing {totalItems === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
          {totalItems} entries
        </p>
        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          <button
            className="px-2 py-1 border rounded-l hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-2 py-1 border-t border-b text-gray-700">
            {currentPage} of {totalPages}
          </span>
          <button
            className="px-2 py-1 border rounded-r hover:bg-gray-100 disabled:opacity-50"
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
