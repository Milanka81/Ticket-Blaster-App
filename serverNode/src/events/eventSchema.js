const mongoose = require("mongoose");
const validator = require("validator");
const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, "An event must have a name"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "The event name must have less or equal then 40 characters",
    ],
    minlength: [4, "The event name must have more or equal then 10 characters"],
  },

  category: {
    type: String,
    required: true,
    enum: {
      values: ["concert", "stand-up"],
      message: "Category is either: concert or stand-up",
    },
  },
  genre: {
    type: String,
  },
  ticketPrice: {
    type: Number,
    required: [true, "An event must have a price"],
  },
  totalTickets: {
    type: Number,
  },
  availableTickets: {
    type: Number,
    default: this.totalTickets,
    validate: {
      validator: function (value) {
        return value <= this.totalTickets;
      },
      message:
        "Amount of available tickets must be less or equal total tickets",
    },
  },
  description: {
    type: String,
    trim: true,
    required: [true, "An event must have a description"],
  },
  imageCover: {
    type: String,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  eventDate: {
    type: Date,
    required: [true, "An event must have a start date and time"],
  },
  location: {
    type: String,
    required: [true, "An event must have a location"],
  },
  active: { type: Boolean, default: true, select: false },
});

eventSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
