const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    content: {
      title: { type: String },
      message: { type: String },
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notifications", notificationSchema);
