import { createContext, useContext, useState } from "react";
import * as complaintService from "../services/complaint.service";

const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyComplaints = async () => {
    try {
      setLoading(true);

      const response = await complaintService.getMyComplaints();

      setComplaints(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getComplaintById = async (id) => {
  try {
    const response = await complaintService.getComplaintById(id);

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

  const value = {
    complaints,
    loading,
    getMyComplaints,
    getComplaintById,
  };

  return (
    <ComplaintContext.Provider value={value}>
      {children}
    </ComplaintContext.Provider>
  );
};



export const useComplaint = () => {
  return useContext(ComplaintContext);
};
