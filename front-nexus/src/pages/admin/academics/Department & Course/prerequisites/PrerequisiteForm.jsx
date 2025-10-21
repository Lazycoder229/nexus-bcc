import React, { useState, useEffect } from "react";

export default function PrerequisiteForm({
  mode = "add",
  prerequisite,
  dispatch,
  closeModal,
  departments = ["BSIT", "BSED"],
  types = ["Major", "Minor", "GenEd"],
}) {
  const isEdit = mode === "edit";
  const isView = mode === "view";

  const [formData, setFormData] = useState({
    code: "",
    title: "",
    type: "Major",
    department: "",
    status: "Active",
    prerequisitesText: "", // multi-line input
  });

  useEffect(() => {
    if (prerequisite) setFormData(prerequisite);
  }, [prerequisite]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: isEdit ? "EDIT_PREREQUISITE" : "ADD_PREREQUISITE",
      payload: formData,
    });
    closeModal();
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3">
        {isView
          ? "View Prerequisite"
          : isEdit
          ? "Edit Prerequisite"
          : "Add Prerequisite"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-2 text-sm text-gray-700">
        <div>
          <label className="block font-medium mb-1">Code</label>
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            disabled={isView}
            className="w-full border rounded-md px-2 py-1 text-sm"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isView}
            className="w-full border rounded-md px-2 py-1 text-sm"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={isView}
            className="w-full border rounded-md px-2 py-1 text-sm"
            required
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            disabled={isView}
            className="w-full border rounded-md px-2 py-1 text-sm"
            required
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isView}
            className="w-full border rounded-md px-2 py-1 text-sm"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Prerequisites</label>
          <textarea
            name="prerequisitesText"
            value={formData.prerequisitesText}
            onChange={handleChange}
            disabled={isView}
            placeholder="Enter each prerequisite on a new line..."
            rows={4}
            className="w-full border rounded-md px-2 py-1 text-sm"
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
