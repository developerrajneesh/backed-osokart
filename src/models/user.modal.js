const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    zip: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    orders: [
      { productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" } },
    ],
    cart: [
      { productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" } },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
