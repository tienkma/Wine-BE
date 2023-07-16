const mongoose = require("mongoose");
const Products = require("./productModels");

const orderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  products: {
    type: [Products.schema],
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  postCode: {
    type: String,
    // required: true,
  },

  status: {
    type: String,
    default: "processing",
  },
  notes: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  createAt: {
    type: String,
    default: `${Date()}`,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

module.exports = mongoose.model("Orders", orderSchema);
