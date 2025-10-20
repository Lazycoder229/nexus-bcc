import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import AdminDashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";

import ManageUsers from "./User management/ManageUser";
import RolesPermissions from "./User management/CreateRole";
import AuditLogs from "./User management/AuditLogs";
import DataBackupRestore from "./User management/BackUp";
import DepartmentMngt from "./academics/Department & Course/DepartmentMngt";
import CourseManagement from "./academics/Department & Course/CourseManagement";

function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/roles" element={<RolesPermissions />} />
        <Route path="/admin/audit-logs" element={<AuditLogs />} />
        <Route path="/admin/backup" element={<DataBackupRestore />} />
        <Route path="/admin/departments" element={<DepartmentMngt />} />

        <Route path="/admin/courses/new" element={<CourseManagement />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminPage;
