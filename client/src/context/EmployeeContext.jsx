import { createContext, useContext, useState } from "react";
import * as employeeService from "../services/employee.service";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAssignedComplaints = async () => {
    try {
      setLoading(true);

      const response = await employeeService.getAssignedComplaints();

      setComplaints(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = async (complaintId, status) => {
    return await employeeService.updateComplaintStatus(complaintId, status);
  };

  const value = {
    complaints,
    loading,
    getAssignedComplaints,
    updateComplaintStatus,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  return useContext(EmployeeContext);
};
