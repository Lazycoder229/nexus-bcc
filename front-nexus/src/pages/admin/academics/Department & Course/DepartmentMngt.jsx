import React, { useReducer } from "react";
import {
  Eye,
  Pencil,
  Trash,
  CirclePlus,
  Building2,
  Users,
  GraduationCap,
  Activity,
} from "lucide-react";
import { useModal } from "../../../../components/hooks/useModal";
import DataTable from "../../../../components/table/DataTable";
import DeleteConfirmationModal from "./modalForm/DeleteConfirmation";
import {
  departmentReducer,
  initialState,
} from "../../reducer/departmentReducer";
import DepartmentForm from "./modalForm/DepartmentForm";
import DepartmentView from "./modalForm/DepartmetnView";

export default function DepartmentMngt() {
  const [state, dispatch] = useReducer(departmentReducer, initialState);
  const { openModal, closeModal } = useModal();

  // --- CRUD + View Actions ---
  const handleAdd = () => {
    openModal(
      <DepartmentForm mode="add" dispatch={dispatch} closeModal={closeModal} />
    );
  };

  const handleEdit = (dep) => {
    openModal(
      <DepartmentForm
        mode="edit"
        department={dep}
        dispatch={dispatch}
        closeModal={closeModal}
      />
    );
  };
  const handleView = (dep) => {
    dispatch({ type: "SET_SELECTED", payload: dep });
    openModal(
      <DepartmentView
        department={dep}
        closeModal={() => {
          dispatch({ type: "CLEAR_SELECTED" });
          closeModal();
        }}
      />
    );
  };

  const handleDelete = (dep) => {
    // Open a small confirmation modal instead of using window.confirm
    openModal(
      <DeleteConfirmationModal
        itemName={dep.name} // show department name
        onConfirm={() => {
          dispatch({ type: "DELETE_DEPARTMENT", payload: dep });
          closeModal(); // close modal after deletion
        }}
        onCancel={closeModal} // just close modal if cancelled
      />
    );
  };

  // --- Table columns ---
  const columns = [
    { key: "code", label: "Code" },
    { key: "name", label: "Department" },
    { key: "head", label: "Head" },
    { key: "faculty", label: "Faculty" },
    { key: "programs", label: "Programs" },
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

  // --- Filters ---
  const filters = [
    {
      key: "status",
      label: "Status",
      options: ["Active", "Inactive"],
    },
  ];

  // --- KPI Summary cards ---
  const kpis = [
    {
      label: "Total Departments",
      value: state.departments.length,
      icon: <Building2 className="text-blue-500" size={22} />,
    },
    {
      label: "Active Departments",
      value: state.departments.filter((d) => d.status === "Active").length,
      icon: <Activity className="text-green-500" size={22} />,
    },
    {
      label: "Faculty Members",
      value: state.departments.reduce(
        (sum, d) => sum + (parseInt(d.faculty) || 0),
        0
      ),
      icon: <Users className="text-indigo-500" size={22} />,
    },
    {
      label: "Programs Offered",
      value: state.departments.reduce(
        (sum, d) => sum + (parseInt(d.programs) || 0),
        0
      ),
      icon: <GraduationCap className="text-yellow-500" size={22} />,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Department Management
      </h1>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition"
          >
            <div className="bg-gray-50 p-2 rounded-lg">{kpi.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="text-lg font-semibold text-gray-800">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={state.departments}
        filters={filters}
        itemsPerPage={10}
        onAddItem={handleAdd}
        addButtonLabel="Add Department"
      />
    </div>
  );
}
