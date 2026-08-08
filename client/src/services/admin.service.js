import api from "../api/axios";

export const getAllComplaints = async () => {
  return await api.get("/admin/complaints");
};

export const assignComplaint = async (complaintId, employeeId) => {
  return await api.patch(`/admin/complaints/${complaintId}/assign`, {
    employeeId,
  });
};


export const getAllEmployees = async () => {
  return await api.get("/admin/employees");
};