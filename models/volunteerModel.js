const mongoose = require("mongoose");
const volunteerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const volunteerModel = mongoose.model("volunteer", volunteerSchema);
module.exports = volunteerModel;