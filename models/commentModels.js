const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    currentId: {
      default: null,
      type: mongoose.Types.ObjectId,
      ref: "Comments",
    },
    content: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", CommentSchema);
