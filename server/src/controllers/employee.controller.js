const employeeService = require("../services/employee.service");

const getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await employeeService.getAssignedComplaints(
      req.user._id,
    );

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await employeeService.updateComplaintStatus(
      req.params.id,
      req.user._id,
      req.body.status,
    );

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAssignedComplaints,
  updateComplaintStatus,
};
