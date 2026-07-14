const Complaint = require("../models/complaint.model");

const create = async (complaintData) => {
  console.log("Repository Data:", complaintData);
  return await Complaint.create(complaintData);
};


const findByCreatedBy = async (userId) => {
  return await Complaint.find({
    createdBy: userId,
  }).sort({
    createdAt: -1,
  });
};

const findById = async (id) => {
  return await Complaint.findById(id);
};

const update = async (complaint, updateData) => {
  Object.assign(complaint, updateData);

  return await complaint.save();
};

module.exports = {
  create,
  findByCreatedBy,
  findById,
  update,
};
