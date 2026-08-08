import { createContext, useContext, useState } from "react";
import * as adminService from "../services/admin.service";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const getAllComplaints = async () => {
    try {
      setLoading(true);

      const response = await adminService.getAllComplaints();

      setComplaints(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllEmployees = async () => {
    try {
      const response = await adminService.getAllEmployees();
  //console.log(response.data);

      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const assignComplaint = async (complaintId, employeeId) => {
    return await adminService.assignComplaint(complaintId, employeeId);
  };

  const value = {
    complaints,
    loading,
    getAllComplaints,
    employees,
    getAllEmployees,
    assignComplaint,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
