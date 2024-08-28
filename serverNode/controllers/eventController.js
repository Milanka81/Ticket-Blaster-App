const Event = require("./../models/eventModel");

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
  try {
    const event = await Event.create(req.body);

    res
      .status(201)
      .json({ status: "success", message: "Event created", data: { event } });
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(event);
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
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send();
    }
    res.status(200).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).send(err);
  }
};
