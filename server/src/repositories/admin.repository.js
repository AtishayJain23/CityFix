const Complaint = require("../models/complaint.model");
const User = require("../models/user.model");

const findAllComplaints = async () => {
  return await Complaint.find()
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role")
    .sort({ createdAt: -1 });
};
////////
const findEmployeeById = async (employeeId) => {
  return await User.findById(employeeId);
};

const findComplaintById = async (complaintId) => {
  return await Complaint.findById(complaintId);
};

const saveComplaint = async (complaint) => {
  return await complaint.save();
};

module.exports = {
  findAllComplaints,
  findEmployeeById,
  findComplaintById,
  saveComplaint,
};
