import React, { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
export default function DepartmentForm({
  mode = "add",
  department,
  dispatch,
  closeModal,
}) {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    image: null,
    code: "",
    name: "",
    head: "",
    faculty: "",
    programs: "",
    status: "Active",
    description: "",
  });

  useEffect(() => {
    if (department) setFormData(department);
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: isEdit ? "UPDATE_DEPARTMENT" : "ADD_DEPARTMENT",
      payload: formData,
    });
    closeModal();
  };

  return (
    <div className="p-2 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-blue-500" />
        {isView
          ? "View Department"
          : isEdit
          ? "Edit Department"
          : "Add New Department"}
      </h2>
      <hr className="border-t border-gray-300 mb-3" />

      <form onSubmit={handleSubmit} className="space-y-2 text-sm text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Department Image */}
          <div>
            <label className="block font-medium mb-1">Department Image</label>
            <label className="flex items-center gap-2 px-2 py-1 border rounded-md cursor-pointer hover:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400">
              <span className="text-gray-500 text-sm">
                {formData.image ? formData.image.name : "Choose file..."}
              </span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleChange({
                      target: { name: "image", value: e.target.files[0] },
                    });
                  }
                }}
                disabled={isView}
                className="hidden"
              />
            </label>
          </div>

          {/* Department Code */}
          <div>
            <label className="block font-medium mb-1">Department Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              disabled={isView}
              placeholder="e.g. CS"
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
              required
            />
          </div>

          {/* Department Name */}
          <div>
            <label className="block font-medium mb-1">Department Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isView}
              placeholder="e.g. Computer Science"
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
              required
            />
          </div>

          {/* Head */}
          <div>
            <label className="block font-medium mb-1">Head</label>
            <input
              type="text"
              name="head"
              value={formData.head}
              onChange={handleChange}
              disabled={isView}
              placeholder="e.g. Dr. Jane Doe"
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
            />
          </div>

          {/* Faculty & Programs (small width) */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block font-medium mb-1">Faculty</label>
              <input
                type="number"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                disabled={isView}
                placeholder="0"
                className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Programs</label>
              <input
                type="number"
                name="programs"
                value={formData.programs}
                onChange={handleChange}
                disabled={isView}
                placeholder="0"
                className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
              />
            </div>
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

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isView}
              placeholder="Short description about the department..."
              rows={3}
              className="w-full border rounded-md px-2 py-1 focus:ring focus:ring-blue-200 disabled:bg-gray-100 text-sm"
            />
          </div>
        </div>

        {/* Action Buttons */}
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
