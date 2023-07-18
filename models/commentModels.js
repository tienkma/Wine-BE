const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    currentId: {
      default: null,
      type: mongoose.Types.ObjectId,
      ref: "Comments",
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Comments",
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    user: {
      userId: String,
      name: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", CommentSchema);
