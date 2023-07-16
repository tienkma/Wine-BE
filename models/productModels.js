const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    winery: {
      type: String,
      required: true,
    },
    wine: {
      type: String,
      required: true,
    },
    rating: {
      type: {
        type: String,
      },
      average: {
        type: String,
        default: "0",
      },
      reviews: {
        type: String,
        default: "0 ratings",
      },
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    available: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [false, "Please provide user"],
      // default: "62f3ad071918307b2bbec306",
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
