import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import CitizenDashboard from "./pages/citizen/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import ComplaintDetails from "./pages/citizen/ComplaintDetails";
import CreateComplaint from "./pages/citizen/CreateComplaint";
import EditComplaint from "./pages/citizen/EditComplaint";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/citizen/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["citizen"]}>
            <CitizenDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/employee/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["employee"]}>
            <EmployeeDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/complaints/:id"
        element={
          <RoleProtectedRoute allowedRoles={["citizen"]}>
            <ComplaintDetails />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/citizen/create-complaint"
        element={
          <RoleProtectedRoute allowedRoles={["citizen"]}>
            <CreateComplaint />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/complaints/:id/edit"
        element={
          <RoleProtectedRoute allowedRoles={["citizen"]}>
            <EditComplaint />
          </RoleProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
