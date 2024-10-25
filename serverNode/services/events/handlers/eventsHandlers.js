const Event = require("../../../src/events/eventSchema");

exports.getFilteredEvents = async (req, res) => {
  try {
    let { page, limit, input, category } = req.query;

    input = input ?? "";
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    const ticketPriceQuery = !isNaN(Number(input))
      ? { ticketPrice: { $lte: Number(input) } }
      : {};

    let query = {
      $or: [
        { eventName: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        ticketPriceQuery,
      ],
    };

    if (category) {
      query.category = category;
    }

    const events = await Event.find(query)
      .sort({ eventDate: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: events.length,
      data: {
        events,
      },
    });
  } catch (err) {
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
