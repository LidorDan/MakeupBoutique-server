const mongoose = require("mongoose");
const order = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    client_name: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    credit_card_number: {
      type: String,
      required: true,
    },
    items: {
      type: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId },
          amount: { type: Number },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", order);
module.exports = Order;
