import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";

export default function CourseForm({
  mode = "add",
  course,
  dispatch,
  closeModal,
  departments = [],
}) {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    type: "Major",
    code: "",
    title: "",
    departmentId: "",
    students: "",
    units: "",
    status: "Active",
    description: "",
    prerequisitesText: "", // multi-line input
  });

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        prerequisitesText: course.prerequisites?.join("\n") || "",
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      departmentId: Number(formData.departmentId),
      students: Number(formData.students),
      units: Number(formData.units),
      prerequisites: formData.prerequisitesText
        .split("\n")
        .map((p) => p.trim())
        .filter((p) => p), // remove empty lines
    };

    dispatch({
      type: isEdit ? "EDIT_COURSE" : "ADD_COURSE",
      payload,
    });

    closeModal();
  };

  return (
    <div className="p-2 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-blue-500" />
        {isView ? "View Course" : isEdit ? "Edit Course" : "Add New Course"}
      </h2>
      <hr className="border-t border-gray-300 mb-3" />

      <form onSubmit={handleSubmit} className="space-y-2 text-sm text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Type */}
          <div>
            <label className="block font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={isView}
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
              required
            >
              <option value="Major">Major</option>
              <option value="Minor">Minor</option>
              <option value="Course">Course</option>
            </select>
          </div>

          {/* Code */}
          <div>
            <label className="block font-medium mb-1">Course Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              disabled={isView}
              placeholder="e.g. HC1"
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isView}
              placeholder="Course Title"
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block font-medium mb-1">Department</label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              disabled={isView}
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
              required
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Units */}
          <div>
            <label className="block font-medium mb-1">Units</label>
            <input
              type="number"
              name="units"
              value={formData.units}
              onChange={handleChange}
              disabled={isView}
              placeholder="0"
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isView}
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isView}
            placeholder="Short description about the course..."
            rows={3}
            className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
          />
        </div>

        {/* Prerequisites */}
        <div>
          <label className="block font-medium mb-1">Prerequisites</label>
          <textarea
            name="prerequisitesText"
            value={formData.prerequisitesText}
            onChange={handleChange}
            disabled={isView}
            placeholder="Enter each prerequisite on a new line..."
            rows={4}
            className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
          />
        </div>

        {!isView && (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
