import api from "../api/axios";

export const getAssignedComplaints = async () => {
  return await api.get("/employee/complaints");
};

export const updateComplaintStatus = async (complaintId, status) => {
  return await api.patch(`/employee/complaints/${complaintId}/status`, {
    status,
  });
};
