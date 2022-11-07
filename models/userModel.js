const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: Number,
      required: true,
    },

    spokenLanguage: {
      type: Array,
      default: [],
    },
    availability:{
        type:String,
        required:true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;