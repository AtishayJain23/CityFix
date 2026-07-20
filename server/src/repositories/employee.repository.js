const Complaint = require("../models/complaint.model");

const findAssignedComplaints = async (employeeId) => {
  return await Complaint.find({
    assignedTo: employeeId,
  })
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
};

const findComplaintById = async (complaintId) => {
  return await Complaint.findById(complaintId);
};

const saveComplaint = async (complaint) => {
  return await complaint.save();
};
module.exports = {
  findAssignedComplaints,
  findComplaintById,
  saveComplaint,
};
