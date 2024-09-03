const Event = require("../../../src/events/eventSchema");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    const eventsSort = events.sort((a, b) => b.eventDate - a.eventDate);

    res.status(200).json({
      status: "success",
      data: {
        eventsSort,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.getAllConcerts = async (req, res) => {
  try {
    const concerts = await Event.find({ category: "concert" });
    const concertsSort = concerts.sort((a, b) => b.eventDate - a.eventDate);
    return res.status(200).json({ status: "success", data: { concertsSort } });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllStandUps = async (req, res) => {
  try {
    const standups = await Event.find({ category: "stand-up" });
    const standupsSort = standups.sort((a, b) => b.eventDate - a.eventDate);
    res.status(200).json({ status: "success", data: { standupsSort } });
  } catch (error) {
    res.status(400).send(err);
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json({ status: "success", data: { event } });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.postEvent = async (req, res) => {
  const {
    eventName,
    category,
    genre,
    ticketPrice,
    totalTickets,
    description,
    imageCover,
    location,
    images,
    eventDate,
  } = req.body;
  try {
    const event = await Event.create({
      eventName,
      category,
      genre,
      ticketPrice,
      totalTickets,
      description,
      imageCover,
      location,
      images,
      eventDate,
    });

    res
      .status(201)
      .json({ status: "success", message: "Event created", data: { event } });
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.updateEvent = async (req, res) => {
  const {
    eventName,
    category,
    genre,
    ticketPrice,
    totalTickets,
    description,
    imageCover,
    location,
    images,
    eventDate,
  } = req.body;
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        eventName,
        category,
        genre,
        ticketPrice,
        totalTickets,
        description,
        imageCover,
        location,
        images,
        eventDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).send();
    }
    res.status(200).json({ status: "success", data: { event } });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, {
      active: false,
    });
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).send(err);
  }
};
