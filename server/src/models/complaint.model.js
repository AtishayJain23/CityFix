const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    category: {
      type: String,
      enum: [
        "Road",
        "Electricity",
        "Water",
        "Garbage",
        "Street Light",
        "Drainage",
      ],
      required: true,
    },

    photos: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: String,
      },
    ],

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (value) => value.length === 2,
          message: "Coordinates must contain longitude and latitude.",
        },
      },
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Rejected"],
      default: "Open",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    complaintNumber: {
      type: String,
      //unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

complaintSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model("Complaint", complaintSchema);
