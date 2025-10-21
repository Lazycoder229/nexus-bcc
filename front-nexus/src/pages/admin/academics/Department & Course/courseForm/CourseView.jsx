// src/pages/course/modalForm/CourseView.js
import React from "react";
import { GraduationCap, Book, Users, Layers, CheckCircle } from "lucide-react";

export default function CourseView({ course, departments = [] }) {
  if (!course) return null;

  const courseDepartment =
    departments.find((d) => d.id === course.departmentId)?.name || "—";

  const prerequisitesList =
    course.prerequisitesText
      ?.split("\n")
      .map((p) => p.trim())
      .filter(Boolean) || [];

  return (
    <div className="max-w-md mx-auto p-6 ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <GraduationCap className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
      </div>

      {/* Grid info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
        <div className="flex items-center gap-1">
          <Book className="w-4 h-4 text-gray-400" />
          <span className="font-medium">Type:</span>
          <span className="ml-1">{course.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Book className="w-4 h-4 text-gray-400" />
          <span className="font-medium">Code:</span>
          <span className="ml-1">{course.code}</span>
        </div>
        <div className="flex items-center gap-1">
          <Layers className="w-4 h-4 text-gray-400" />
          <span className="font-medium">Department:</span>
          <span className="ml-1">{courseDepartment}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="font-medium">Students:</span>
          <span className="ml-1">{course.students || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <Layers className="w-4 h-4 text-gray-400" />
          <span className="font-medium">Units:</span>
          <span className="ml-1">{course.units || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4 text-gray-400" />
          <span className="font-medium">Status:</span>
          <span
            className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
              course.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {course.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h3 className="font-medium text-gray-800 mb-1">Description</h3>
        <p className="text-gray-600 text-sm">{course.description || "—"}</p>
      </div>

      {/* Prerequisites */}
      <div className="mt-4">
        <h3 className="font-medium text-gray-800 mb-1">Prerequisites</h3>
        {prerequisitesList.length > 0 ? (
          <ul className="ml-4 list-disc text-gray-700 text-sm">
            {prerequisitesList.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">None</p>
        )}
      </div>
    </div>
  );
}
