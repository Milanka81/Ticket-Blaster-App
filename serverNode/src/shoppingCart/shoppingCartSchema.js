const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  added: {
    type: Date,
    default: Date.now(),
  },
});

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;
