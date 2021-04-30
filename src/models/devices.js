const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    device: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    lastCheckedOutDate: {
      type: Date,
    },
    lastCheckedOutBy: {
      type: String,
    },
    isCheckedOut: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const devices = mongoose.model("Device", deviceSchema);
module.exports = devices;
