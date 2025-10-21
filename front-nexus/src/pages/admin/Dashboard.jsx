import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { HelpCircle, ArrowUpDown } from "lucide-react";

// Dummy data (same as before)
const analyticsData = [
  {
    month: "Jan",
    students: 200,
    faculty: 10,
    parents: 180,
    staff: 25,
    finance: 12000,
  },
  {
    month: "Feb",
    students: 250,
    faculty: 12,
    parents: 200,
    staff: 28,
    finance: 15000,
  },
  {
    month: "Mar",
    students: 300,
    faculty: 14,
    parents: 220,
    staff: 30,
    finance: 18000,
  },
  {
    month: "Apr",
    students: 280,
    faculty: 13,
    parents: 210,
    staff: 29,
    finance: 16000,
  },
  {
    month: "May",
    students: 350,
    faculty: 15,
    parents: 250,
    staff: 32,
    finance: 20000,
  },
];

const enrollmentStats = [
  { department: "Computer Science", total: 300, completed: 280, pending: 20 },
  { department: "Business", total: 200, completed: 190, pending: 10 },
  { department: "Engineering", total: 250, completed: 230, pending: 20 },
  { department: "Arts", total: 150, completed: 145, pending: 5 },
  { department: "Education", total: 170, completed: 165, pending: 5 },
  { department: "Health Sciences", total: 200, completed: 185, pending: 15 },
  { department: "Mathematics", total: 190, completed: 180, pending: 10 },
];

const activityFeed = [
  {
    user: "John Doe",
    action: "enrolled in Physics 101",
    time: "2025-10-11 10:20",
  },
  { user: "Jane Smith", action: "paid tuition", time: "2025-10-11 10:15" },
  { user: "Prof. Alan", action: "submitted grades", time: "2025-10-11 09:50" },
  {
    user: "Mark Cruz",
    action: "requested transcript",
    time: "2025-10-11 09:45",
  },
  { user: "Lisa Chan", action: "updated profile", time: "2025-10-11 09:40" },
  { user: "Dean Thomas", action: "approved budget", time: "2025-10-11 09:30" },
];

const performanceMetrics = [
  {
    title: "Faculty Attendance",
    value: "95%",
    info: "Percentage of faculty attendance this month",
  },
  {
    title: "Finance Performance",
    value: "92%",
    info: "Revenue vs expenses this month",
  },
  {
    title: "Student Performance",
    value: "88%",
    info: "Average student performance scores",
  },
];

const alerts = [
  {
    type: "system",
    message: "Scheduled maintenance at 11 PM",
    date: "2025-10-10",
  },
  {
    type: "finance",
    message: "3 overdue payments pending",
    date: "2025-10-11",
  },
  {
    type: "academic",
    message: "Low attendance alert for Physics 101",
    date: "2025-10-11",
  },
  { type: "system", message: "Server update completed", date: "2025-10-09" },
  { type: "academic", message: "New assignment added", date: "2025-10-08" },
  { type: "finance", message: "Invoice #1234 processed", date: "2025-10-07" },
];

const performanceTrendData = [
  { month: "Jan", engagement: 200 },
  { month: "Feb", engagement: 300 },
  { month: "Mar", engagement: 250 },
  { month: "Apr", engagement: 400 },
  { month: "May", engagement: 350 },
  { month: "Jun", engagement: 500 },
];

const completionRateData = [
  { department: "IT", rate: 85 },
  { department: "Engineering", rate: 92 },
  { department: "Business", rate: 78 },
  { department: "Education", rate: 88 },
];

const usageData = [
  { name: "Faculty", value: 45 },
  { name: "Students", value: 35 },
  { name: "Parents", value: 15 },
  { name: "Admin", value: 5 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const CardHelpTooltip = ({ text, isLast }) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="relative inline-block group">
      <HelpCircle
        size={18}
        className="text-gray-400 cursor-pointer"
        onClick={() => isMobile && setOpen((prev) => !prev)}
      />
      <div
        className={`absolute bottom-full mb-2 w-max max-w-xs bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50
          ${isLast ? "right-0" : "left-1/2 -translate-x-1/2"}
          ${
            isMobile
              ? open
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
              : "opacity-0 pointer-events-none group-hover:opacity-100"
          } 
          transition-opacity duration-200`}
      >
        {text}
      </div>
    </div>
  );
};

const ChartHelpTooltip = ({ text }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block ml-2 group">
      <HelpCircle
        size={18}
        className="text-gray-400 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      <div
        className={`absolute bottom-full mb-2 w-max max-w-xs bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50 left-1/2 -translate-x-1/2
          opacity-0 pointer-events-none md:group-hover:opacity-100 ${
            open ? "opacity-100 pointer-events-auto" : ""
          } transition-opacity duration-200`}
      >
        {text}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [enrollPage, setEnrollPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const [alertPage, setAlertPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const itemsPerPage = 4;
  const paginate = (data, page) =>
    data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const sortData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) =>
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));

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

  const renderCard = ({ title, value, info }, index, total) => (
    <div
      key={title}
      className="bg-white p-4 rounded shadow hover:shadow-lg transition relative"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-500 font-semibold">{title}</h3>
        <CardHelpTooltip text={info} isLast={index === total - 1} />
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
        {["overview", "enrollment", "activity", "performance", "alerts"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded shadow font-semibold text-sm md:text-base transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {tab === "overview"
                ? "Overview"
                : tab === "enrollment"
                ? "Enrollment Stats"
                : tab === "activity"
                ? "Activity Feed"
                : tab === "performance"
                ? "Performance"
                : "Alerts & Notifications"}
            </button>
          )
        )}
      </div>

      {/* ---------------------- Overview Tab ---------------------- */}
      {activeTab === "overview" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Live Analytics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {[
              {
                title: "Students",
                value: analyticsData.at(-1).students,
                info: "Total students",
              },
              {
                title: "Faculty",
                value: analyticsData.at(-1).faculty,
                info: "Total faculty",
              },
              {
                title: "Parents",
                value: analyticsData.at(-1).parents,
                info: "Parent accounts",
              },
              {
                title: "Staff",
                value: analyticsData.at(-1).staff,
                info: "Total staff",
              },
              {
                title: "Finance",
                value: `$${analyticsData.at(-1).finance}`,
                info: "Finance collected",
              },
            ].map((c, i, arr) => renderCard(c, i, arr.length))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                Monthly Trends{" "}
                <ChartHelpTooltip text="Trends of student, faculty, parent, and staff" />
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="faculty" stroke="#10b981" />
                  <Line type="monotone" dataKey="parents" stroke="#f59e0b" />
                  <Line type="monotone" dataKey="staff" stroke="#ef4444" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                Finance Overview{" "}
                <ChartHelpTooltip text="Monthly finance distribution" />
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData}
                    dataKey="finance"
                    nameKey="month"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    isAnimationActive={false}
                  >
                    {analyticsData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: "10px" }}
                  />
                  <RechartsTooltip formatter={(v) => `$${v}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------- Enrollment Tab ---------------------- */}
      {activeTab === "enrollment" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Enrollment Statistics</h2>

          {/* Table (md+) */}
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200 hidden md:block">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {["department", "total", "completed", "pending"].map(
                    (key) => (
                      <th
                        key={key}
                        onClick={() => handleSort(key)}
                        className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase border-b cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                          <ArrowUpDown size={14} />
                        </div>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginate(sortData(enrollmentStats), enrollPage).map(
                  (dept, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-2 py-1.5 font-medium text-gray-700">
                        {dept.department}
                      </td>
                      <td className="px-2 py-1.5 text-gray-600">
                        {dept.total}
                      </td>
                      <td className="px-2 py-1.5 text-green-700">
                        {dept.completed}
                      </td>
                      <td className="px-2 py-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            dept.pending > 15
                              ? "bg-red-100 text-red-800"
                              : dept.pending > 5
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {dept.pending}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <Pagination
              page={enrollPage}
              setPage={setEnrollPage}
              total={totalPages(enrollmentStats)}
            />
          </div>

          {/* Card view (sm) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginate(sortData(enrollmentStats), enrollPage).map(
              (dept, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Department:</span>
                    <span>{dept.department}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total:</span>
                    <span>{dept.total}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Completed:</span>
                    <span className="text-green-700">{dept.completed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Pending:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        dept.pending > 15
                          ? "bg-red-100 text-red-800"
                          : dept.pending > 5
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {dept.pending}
                    </span>
                  </div>
                </div>
              )
            )}
            <Pagination
              page={enrollPage}
              setPage={setEnrollPage}
              total={totalPages(enrollmentStats)}
            />
          </div>
        </section>
      )}

      {/* ---------------------- Performance Tab ---------------------- */}
      {activeTab === "performance" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {performanceMetrics.map((m, i, arr) =>
              renderCard(m, i, arr.length)
            )}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Engagement Trend */}
            <div className="bg-white p-6 rounded-xl shadow min-h-[300px]">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                Engagement Trend{" "}
                <ChartHelpTooltip text="Tracks user engagement over months" />
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    dataKey="engagement"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Completion Rate */}
            <div className="bg-white p-6 rounded-xl shadow min-h-[300px]">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                Completion Rate by Department{" "}
                <ChartHelpTooltip text="Performance comparison per department" />
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="rate" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Usage Breakdown */}
            <div className="bg-white p-6 rounded-xl shadow lg:col-span-2 min-h-[350px]">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                System Usage Breakdown{" "}
                <ChartHelpTooltip text="User group distribution of platform usage" />
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usageData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {usageData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: "10px" }}
                  />
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------- Activity Tab ---------------------- */}
      {activeTab === "activity" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>

          {/* Table (md+) */}
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200 hidden md:block">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {["user", "action", "time"].map((key) => (
                    <th
                      key={key}
                      className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase border-b cursor-pointer"
                    >
                      <div className="flex items-center gap-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginate(activityFeed, activityPage).map((a, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-2 py-1.5 font-medium text-gray-700">
                      {a.user}
                    </td>
                    <td className="px-2 py-1.5 text-gray-600">{a.action}</td>
                    <td className="px-2 py-1.5 text-gray-500">{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              page={activityPage}
              setPage={setActivityPage}
              total={totalPages(activityFeed)}
            />
          </div>

          {/* Card view (sm) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginate(activityFeed, activityPage).map((a, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">User:</span>
                  <span>{a.user}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Action:</span>
                  <span>{a.action}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Time:</span>
                  <span className="text-gray-500">{a.time}</span>
                </div>
              </div>
            ))}
            <Pagination
              page={activityPage}
              setPage={setActivityPage}
              total={totalPages(activityFeed)}
            />
          </div>
        </section>
      )}
      {/* ---------------------- Alerts Tab ---------------------- */}
      {activeTab === "alerts" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Alerts & Notifications
          </h2>

          {/* Table (md+) */}
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200 hidden md:block">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {["type", "message", "date"].map((key) => (
                    <th
                      key={key}
                      className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase border-b"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginate(alerts, alertPage).map((a, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-2 py-1.5 font-medium text-gray-700">
                      {a.type.charAt(0).toUpperCase() + a.type.slice(1)}
                    </td>
                    <td className="px-2 py-1.5 text-gray-600">{a.message}</td>
                    <td className="px-2 py-1.5 text-gray-500">{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              page={alertPage}
              setPage={setAlertPage}
              total={totalPages(alerts)}
            />
          </div>

          {/* Card view (sm) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginate(alerts, alertPage).map((a, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Type:</span>
                  <span>{a.type}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Message:</span>
                  <span>{a.message}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Date:</span>
                  <span className="text-gray-500">{a.date}</span>
                </div>
              </div>
            ))}
            <Pagination
              page={alertPage}
              setPage={setAlertPage}
              total={totalPages(alerts)}
            />
          </div>
        </section>
      )}
    </div>
  );
}
