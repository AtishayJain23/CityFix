const complaintService = require("../services/complaint.service");
const createComplaint = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files received",
      });
    }

    const photos = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    const complaintData = {
      ...req.body,
      photos,
      createdBy: req.user._id,
    };

    const complaint = await complaintService.createComplaint(complaintData);

    res.status(201).json({
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

const getMyComplaints = async (req, res) => {
  try {
    const userId = req.user._id;

    const complaints = await complaintService.getMyComplaints(userId);

    res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaint = await complaintService.getComplaintById(
      req.params.id,
      req.user._id,
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

const updateComplaint = async (req, res) => {
  try {
    const complaint = await complaintService.updateComplaint(
      req.params.id,
      req.user._id,
      req.body,
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

const deleteComplaint = async (req, res) => {
  try {
    await complaintService.deleteComplaint(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
};
