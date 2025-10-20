import React, { useState, useMemo } from "react";
import {
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  HelpCircle,
  BookOpen,
  Users,
  Layers,
  X,
  Search as SearchIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* =========================
   Pagination (same style as DepartmentMngt)
   ========================= */
const Pagination = ({ page, setPage, total }) => (
  <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="px-3 py-1 text-sm bg-white border rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span className="text-sm text-gray-600">
      Page {page} of {total}
    </span>
    <button
      onClick={() => setPage((p) => Math.min(p + 1, total))}
      disabled={page === total}
      className="px-3 py-1 text-sm bg-white border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

/* =========================
   Tooltip for charts
   ========================= */
const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border shadow rounded px-3 py-2 text-sm">
        <div className="font-semibold">{label}</div>
        <div>
          {payload[0].name}: {payload[0].value}
        </div>
      </div>
    );
  }
  return null;
};

export default function CourseManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy departments from DepartmentMngt (simulate relation)
  const [departments] = useState([
    { id: 1, name: "Information Technology" },
    { id: 2, name: "Engineering" },
    { id: 3, name: "Education" },
    { id: 4, name: "Business" },
  ]);

  // Course data (linked to department)
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "IT101",
      title: "Intro to Programming",
      departmentId: 1,
      students: 80,
      units: 3,
    },
    {
      id: 2,
      code: "ENG202",
      title: "Thermodynamics",
      departmentId: 2,
      students: 60,
      units: 4,
    },
    {
      id: 3,
      code: "EDU301",
      title: "Teaching Strategies",
      departmentId: 3,
      students: 45,
      units: 3,
    },
    {
      id: 4,
      code: "BUS105",
      title: "Marketing Principles",
      departmentId: 4,
      students: 50,
      units: 3,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    code: "",
    title: "",
    departmentId: "",
    students: "",
    units: "",
  });

  // Pagination, Search, Sort
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("title_asc");
  const itemsPerPage = 4;

  // KPI cards
  const kpis = [
    {
      title: "Total Courses",
      value: courses.length,
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      help: "Number of active courses.",
    },
    {
      title: "Total Students",
      value: courses.reduce((s, c) => s + c.students, 0),
      icon: <Users className="w-6 h-6 text-green-600" />,
      help: "Total enrolled students.",
    },
    {
      title: "Average Students / Course",
      value: Math.round(
        courses.reduce((s, c) => s + c.students, 0) / courses.length
      ),
      icon: <Layers className="w-6 h-6 text-yellow-600" />,
      help: "Average enrollment per course.",
    },
  ];

  const courseByDepartment = useMemo(() => {
    return departments.map((dep) => ({
      name: dep.name,
      count: courses.filter((c) => c.departmentId === dep.id).length,
    }));
  }, [departments, courses]);

  // Helpers
  const openModal = (type, course = null) => {
    setModalType(type);
    setSelected(course);
    if (type === "add") {
      setForm({
        code: "",
        title: "",
        departmentId: "",
        students: "",
        units: "",
      });
    } else if (type === "edit" && course) {
      setForm({
        code: course.code,
        title: course.title,
        departmentId: course.departmentId,
        students: course.students,
        units: course.units,
      });
    }
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // CRUD
  const handleSave = () => {
    if (!form.code || !form.title || !form.departmentId) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (modalType === "add") {
      setCourses((prev) => [
        {
          id: Date.now(),
          ...form,
          departmentId: Number(form.departmentId),
          students: Number(form.students),
          units: Number(form.units),
        },
        ...prev,
      ]);
      toast.success("Course added");
    } else if (modalType === "edit" && selected) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === selected.id
            ? { ...c, ...form, departmentId: Number(form.departmentId) }
            : c
        )
      );
      toast.success("Course updated");
    }
    closeModal();
  };

  const handleDelete = () => {
    setCourses((prev) => prev.filter((c) => c.id !== selected.id));
    toast.success("Course deleted");
    closeModal();
  };

  // Filtering, sorting, pagination
  const filteredSorted = useMemo(() => {
    const lower = search.toLowerCase();
    let data = courses.filter(
      (c) =>
        !lower ||
        c.title.toLowerCase().includes(lower) ||
        c.code.toLowerCase().includes(lower)
    );
    const [key, dir] = sortOption.split("_");
    data.sort((a, b) => {
      const valA = key === "title" ? a.title : a.students;
      const valB = key === "title" ? b.title : b.students;
      if (typeof valA === "string") {
        return dir === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return dir === "asc" ? valA - valB : valB - valA;
    });
    return data;
  }, [courses, search, sortOption]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSorted.length / itemsPerPage)
  );
  const paginated = filteredSorted.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-4 space-y-6 min-h-screen">
      <ToastContainer position="top-right" />
      <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
      <p className="text-sm text-gray-500">
        Manage courses and link them to departments.
      </p>

      {/* Tabs */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            activeTab === "overview"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            activeTab === "manage"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Manage
        </button>
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {kpis.map((k, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
              >
                <div className="p-2 bg-gray-100 rounded-xl">{k.icon}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500 text-sm">{k.title}</p>
                    <HelpCircle
                      className="w-4 h-4 text-gray-400"
                      title={k.help}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{k.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              Courses Per Department{" "}
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseByDepartment}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Courses"
                    fill="#3b82f6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      {/* Manage */}
      {activeTab === "manage" && (
        <section className="bg-white rounded-2xl shadow-md p-4 space-y-4">
          {/* Top controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <SearchIcon className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  placeholder="Search course..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 pr-3 py-2 border rounded-lg w-full text-sm"
                />
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="title_asc">Title A–Z</option>
                <option value="title_desc">Title Z–A</option>
                <option value="students_desc">Students ↓</option>
                <option value="students_asc">Students ↑</option>
              </select>
            </div>
            <button
              onClick={() => openModal("add")}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4" /> Add Course
            </button>
          </div>

          {/* Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 min-w-[700px]">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Code</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Students</th>
                  <th className="px-4 py-2">Units</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((c) => {
                  const dep = departments.find((d) => d.id === c.departmentId);
                  return (
                    <tr key={c.id} className="border-b">
                      <td className="px-4 py-3">{c.code}</td>
                      <td className="px-4 py-3">{c.title}</td>
                      <td className="px-4 py-3">{dep?.name}</td>
                      <td className="px-4 py-3">{c.students}</td>
                      <td className="px-4 py-3">{c.units}</td>
                      <td className="px-4 py-3 text-right flex justify-end gap-3">
                        <button
                          onClick={() => openModal("view", c)}
                          className="text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal("edit", c)}
                          className="text-yellow-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal("delete", c)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination page={page} setPage={setPage} total={totalPages} />
        </section>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-3">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold capitalize">
                {modalType} Course
              </h2>
              <button onClick={closeModal}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {modalType === "view" && selected && (
              <div className="space-y-2">
                <p>
                  <strong>Code:</strong> {selected.code}
                </p>
                <p>
                  <strong>Title:</strong> {selected.title}
                </p>
                <p>
                  <strong>Department:</strong>{" "}
                  {
                    departments.find((d) => d.id === selected.departmentId)
                      ?.name
                  }
                </p>
                <p>
                  <strong>Students:</strong> {selected.students}
                </p>
                <p>
                  <strong>Units:</strong> {selected.units}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {(modalType === "add" || modalType === "edit") && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-sm">Course Code</label>
                  <input
                    className="w-full border px-3 py-2 rounded"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm">Title</label>
                  <input
                    className="w-full border px-3 py-2 rounded"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm">Department</label>
                  <select
                    className="w-full border px-3 py-2 rounded"
                    value={form.departmentId}
                    onChange={(e) =>
                      setForm({ ...form, departmentId: e.target.value })
                    }
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm">Students</label>
                    <input
                      type="number"
                      className="w-full border px-3 py-2 rounded"
                      value={form.students}
                      onChange={(e) =>
                        setForm({ ...form, students: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Units</label>
                    <input
                      type="number"
                      className="w-full border px-3 py-2 rounded"
                      value={form.units}
                      onChange={(e) =>
                        setForm({ ...form, units: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            {modalType === "delete" && selected && (
              <div>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{selected.title}</strong>?
                </p>
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
