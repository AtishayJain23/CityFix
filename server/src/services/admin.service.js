const adminRepository = require("../repositories/admin.repository");

const getAllComplaints = async () => {
  return await adminRepository.findAllComplaints();
};

const assignComplaint = async (complaintId, employeeId) => {

  const complaint =
    await adminRepository.findComplaintById(complaintId);

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  const employee =
    await adminRepository.findEmployeeById(employeeId);

  if (!employee) {
    throw new Error("Employee not found");
  }

  if (employee.role !== "employee") {
    throw new Error("Selected user is not an employee");
  }

  complaint.assignedTo = employee._id;
  complaint.status = "In Progress";

  return await adminRepository.saveComplaint(complaint);
};

module.exports = {
  getAllComplaints,
  assignComplaint,
};
