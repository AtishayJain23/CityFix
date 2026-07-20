const employeeRepository = require("../repositories/employee.repository");

const getAssignedComplaints = async (employeeId) => {
  return await employeeRepository.findAssignedComplaints(employeeId);
};

const updateComplaintStatus = async (complaintId, employeeId, status) => {
  const complaint = await employeeRepository.findComplaintById(complaintId);

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  if (!complaint.assignedTo) {
    throw new Error("Complaint not assigned");
  }

  if (!complaint.assignedTo.equals(employeeId)) {
    throw new Error("You are not assigned to this complaint");
  }

  complaint.status = status;

  return await employeeRepository.saveComplaint(complaint);
};

module.exports = {
  getAssignedComplaints,
  updateComplaintStatus,
};
