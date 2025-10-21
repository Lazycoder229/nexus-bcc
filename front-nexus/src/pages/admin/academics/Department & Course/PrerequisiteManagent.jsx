// src/pages/course/prerequisites/PrerequisitesManagement.js
import React, { useReducer } from "react";
import {
  Eye,
  Pencil,
  Trash,
  Users,
  GraduationCap,
  Activity,
} from "lucide-react";
import { useModal } from "../../../../components/hooks/useModal";
import DataTable from "../../../../components/table/DataTable";
import DeleteConfirmationModal from "./modalForm/DeleteConfirmation";
import CourseForm from "./courseForm/CourseForm";
import CourseView from "./courseForm/CourseView";
import { courseReducer, initialState } from "../../reducer/courseReducer";

export default function PrerequisitesManagement() {
  const [state, dispatch] = useReducer(courseReducer, initialState);
  const { openModal, closeModal } = useModal();

  // --- Filters ---
  const filters = [
    {
      key: "status",
      label: "Status",
      options: ["Active", "Inactive"],
    },
  ];

  // --- CRUD Actions ---
  const handleAdd = () =>
    openModal(
      <CourseForm
        mode="add"
        dispatch={dispatch}
        closeModal={closeModal}
        departments={state.departments}
        courses={state.courses} // for prerequisites
      />
    );

  const handleEdit = (course) =>
    openModal(
      <CourseForm
        mode="edit"
        course={course}
        dispatch={dispatch}
        closeModal={closeModal}
        departments={state.departments}
        courses={state.courses.filter((c) => c.id !== course.id)}
      />
    );

  const handleView = (course) =>
    openModal(
      <CourseView
        course={course}
        departments={state.departments}
        prerequisites={state.courses}
        closeModal={closeModal}
      />
    );

  const handleDelete = (course) =>
    openModal(
      <DeleteConfirmationModal
        itemName={course.title}
        onConfirm={() => {
          dispatch({ type: "DELETE_COURSE", payload: course });
          closeModal();
        }}
        onCancel={closeModal}
      />
    );

  // --- Table columns ---
  const columns = [
    { key: "code", label: "Code" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    {
      key: "departmentId",
      label: "Department",
      render: (value) =>
        state.departments.find((d) => d.id === value)?.name || "—",
    },
    {
      key: "prerequisites",
      label: "Prerequisites",
      render: (_, row) =>
        row.prerequisites && row.prerequisites.length > 0
          ? row.prerequisites.length === 1
            ? row.prerequisites[0]
            : `${row.prerequisites[0]} +${row.prerequisites.length - 1}`
          : "-",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            value === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(row)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  // --- KPI Summary cards ---
  const kpis = [
    {
      label: "Total Courses",
      value: state.courses.length,
      icon: <GraduationCap className="text-blue-500" size={22} />,
    },
    {
      label: "Active Courses",
      value: state.courses.filter((c) => c.status === "Active").length,
      icon: <Activity className="text-green-500" size={22} />,
    },
    {
      label: "Inactive Courses",
      value: state.courses.filter((c) => c.status === "Inactive").length,
      icon: <Users className="text-indigo-500" size={22} />,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Prerequisites Management
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((k, i) => (
          <div
            key={i}
            className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition"
          >
            <div className="bg-gray-50 p-2 rounded-lg">{k.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{k.label}</p>
              <p className="text-lg font-semibold text-gray-800">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={state.courses}
        filters={filters}
        itemsPerPage={10}
        onAddItem={handleAdd}
        addButtonLabel="Add Course"
      />
    </div>
  );
}
