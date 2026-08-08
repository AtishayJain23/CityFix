const adminService = require("../services/admin.service");

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await adminService.getAllComplaints();

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const assignComplaint = async (req, res) => {
  try {
    const complaint = await adminService.assignComplaint(
      req.params.id,
      req.body.employeeId,
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

const getAllEmployees = async (
  req,
  res
) => {
  try {
    const employees =
      await adminService.getAllEmployees();

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  getAllComplaints,
  assignComplaint,
  getAllEmployees,
};
