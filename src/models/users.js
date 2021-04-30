const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const users = mongoose.model("User", userSchema);
module.exports = users;
