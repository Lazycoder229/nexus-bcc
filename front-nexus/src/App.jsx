import React from "react";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminPage from "./pages/admin/AdminPage";
import { ModalProvider } from "./components/context/ModalContext";

export default function App() {
  return (
    <ModalProvider>
      {/* 🧩 Everything inside here can use useModal() */}

      <AdminPage />
    </ModalProvider>
  );
}
