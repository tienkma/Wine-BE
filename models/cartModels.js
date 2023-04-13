const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    wine: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [false, "Please provide user"],
    },
  }
);

module.exports = mongoose.model("Carts", cartSchema);
