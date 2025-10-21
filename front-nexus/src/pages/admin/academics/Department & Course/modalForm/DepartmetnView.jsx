import React from "react";
import { Building2, X } from "lucide-react";
import { motion } from "framer-motion";

export default function DepartmentViewCard({ department, closeModal }) {
  if (!department) return null;

  return (
    <motion.div
      className="p-1 text-gray-700"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={closeModal}
    >
      {/* Header */}
      <div className="bg-gray-400 h-28 relative rounded-t-lg">
        <div className="absolute inset-x-0 -bottom-10 flex justify-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center shadow">
            <Building2 className="w-10 h-10 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pt-12 pb-6 px-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {department.name}
        </h2>
        <p className="text-sm text-gray-500 mb-4">{department.code}</p>

        {/* Info Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left grid grid-cols-2 gap-y-3 shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium">Head</p>
            <p className="text-gray-800">{department.head || "—"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Faculty</p>
            <p className="text-gray-800">{department.faculty || "—"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Programs</p>
            <p className="text-gray-800">{department.programs || "—"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Status</p>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                department.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {department.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="text-left">
          <p className="text-gray-500 text-sm font-medium mb-1">Description</p>
          <p className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm shadow-sm">
            {department.description || "No description provided."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
