import React from "react";
import {
  Users,
  BookOpen,
  Layers,
  UserCheck,
  CirclePlus,
  Eye,
  Pencil,
  Trash,
} from "lucide-react";

import DataTable from "../../../../components/table/DataTable";

const stats = [
  { id: 1, label: "Faculty", icon: Users, count: 45, color: "text-blue-500" },
  {
    id: 2,
    label: "Departments",
    icon: BookOpen,
    count: 12,
    color: "text-green-500",
  },
  {
    id: 3,
    label: "Active Courses",
    icon: Layers,
    count: 8,
    color: "text-yellow-500",
  },
  {
    id: 4,
    label: "Enrolled Students",
    icon: UserCheck,
    count: 1200,
    color: "text-purple-500",
  },
];

const departmentsData = [
  {
    code: "CS",
    name: "Computer Science",
    head: "Dr. Smith",
    faculty: 10,
    programs: 5,
    status: "Active",
  },
  {
    code: "ENG",
    name: "Engineering",
    head: "Dr. Brown",
    faculty: 12,
    programs: 4,
    status: "Active",
  },
  {
    code: "MATH",
    name: "Mathematics",
    head: "Dr. Lee",
    faculty: 8,
    programs: 3,
    status: "Inactive",
  },
  // ... add other rows as needed
];

export default function DepartmentMngt() {
  // Columns for DataTable
  const columns = [
    { label: "Code", key: "code" },
    { label: "Department", key: "name" },
    { label: "Head", key: "head" },
    { label: "Faculty", key: "faculty" },
    { label: "Programs", key: "programs" },
    {
      label: "Status",
      key: "status",
      render: (value) => (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      label: "Actions",
      key: "actions",
      render: () => (
        <div className="flex justify-center gap-1">
          <button className="text-gray-500 hover:text-gray-700">
            <Eye size={16} />
          </button>
          <button className="text-blue-500 hover:text-blue-700">
            <Pencil size={16} />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Handle "Add Department" action
  const handleAddDepartment = () => {
    alert("Add Department clicked!"); // Replace with modal or form
  };

  return (
    <div className="p-2 sm:p-4 space-y-4 bg-gray-50">
      <h1 className="text-xl text-gray-800">Department Management</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white shadow rounded-lg p-3 flex items-center hover:shadow-md transition"
            >
              <div className="p-2 bg-gray-100 rounded-full flex-shrink-0">
                <Icon size={24} className={stat.color} />
              </div>
              <div className="ml-3 flex flex-col">
                <p className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-lg font-semibold">{stat.count}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={departmentsData}
        itemsPerPage={15}
        filters={[{ key: "status", options: ["Active", "Inactive"] }]}
        onAddItem={handleAddDepartment}
        addButtonLabel="Department"
      />
    </div>
  );
}
