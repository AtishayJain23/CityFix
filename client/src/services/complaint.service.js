import api from "../api/axios";

export const getMyComplaints = () => {
  return api.get("/complaints");
};

export const getComplaintById = (id) => {
  return api.get(`/complaints/${id}`);
};



export const createComplaint = async (formData) => {
  const response = await api.post(
    "/complaints",
    formData
  );

  return response.data;
};