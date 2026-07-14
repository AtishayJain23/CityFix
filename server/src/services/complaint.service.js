const complaintRepository = require("../repositories/complaint.repository");
//console.log(complaintRepository);
const createComplaint = async (complaintData) => {
  const { latitude, longitude, ...rest } = complaintData;
 
  const complaint = await complaintRepository.create({
    ...rest,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
    
  });


  return complaint;
};

const getMyComplaints = async (userId) => {
  return await complaintRepository.findByCreatedBy(userId);
};

const getComplaintById = async (complaintId, userId) => {
  const complaint = await complaintRepository.findById(complaintId);

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  // Owner check
  if (!complaint.createdBy.equals(userId)) {
    throw new Error("You are not allowed to access this complaint");
  }

  return complaint;
};

const updateComplaint = async (complaintId, userId, updateData) => {
  const complaint = await complaintRepository.findById(complaintId);

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  if (!complaint.createdBy.equals(userId)) {
    throw new Error("Unauthorized");
  }

  if (complaint.status !== "Open") {
    throw new Error("Only open complaints can be updated");
  }

  const allowedFields = ["title", "description", "photos"];

  const filteredData = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  }

  return await complaintRepository.update(complaint, filteredData);
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
};
