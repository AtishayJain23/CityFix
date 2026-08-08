import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ComplaintProvider } from "./context/ComplaintContext";
import { AdminProvider } from "./context/AdminContext";
import "./index.css";
import App from "./App";
import { EmployeeProvider } from "./context/EmployeeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ComplaintProvider>
          <AdminProvider>
            <EmployeeProvider>
              <App />
            </EmployeeProvider>
          </AdminProvider>
        </ComplaintProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
