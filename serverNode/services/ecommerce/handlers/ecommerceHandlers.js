const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./../../../src/config/config.env"),
});
const Event = require("../../../src/events/eventSchema");
const User = require("./../../../src/users/userSchema");
const Ticket = require("./../../../src/tickets/ticketSchema");
const ShoppingCart = require("./../../../src/shoppingCart/shoppingCartSchema");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const QRcode = require("qrcode");
const Handlebars = require("handlebars");
const sendEmail = require("./../../users/utils/email");

Handlebars.create({ allowProtoPropertiesByDefault: true });

const pdf = require("pdf-creator-node");
const fs = require("fs");

const html = fs.readFileSync(`${__dirname}/../template.html`, "utf8");
const options = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "20mm",
  },
  footer: {
    height: "20mm",
  },
};

exports.getCheckoutSession = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(400).json({ message: "Invalid event id" });
    if (event.availableTickets > 0) {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${req.protocol}://${req.get(
          "host"
        )}/api/v1/ecommerce/shopping-cart/?event=${eventId}&user=${
          req.user.id
        }&price=${event.ticketPrice}`,
        cancel_url: `${req.protocol}://${req.get("host")}/events`,
        customer_email: req.user.email,
        client_reference_id: eventId,
        line_items: [
          {
            price_data: {
              product_data: {
                name: event.eventName,
                description: event.description,
                images: [
                  "https://www.pexels.com/photo/people-in-concert-1763075/",
                ],
              },
              unit_amount: event.ticketPrice * 100,
              currency: "eur",
            },
            quantity: 1,
          },
        ],
      });

      res.status(200).json({ status: "success", session });
    } else {
      res.status(400).json({
        message: "There are no tickets left for this event",
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createPaymentIntent = async (req, res) => {
  const { items } = { ...req.body };
  const ids = items.map((el) => el._id);

  try {
    let totalAmount = 0;

    const events = await Event.find({
      _id: { $in: ids },
    });

    if (!events) return res.status(400).json({ message: "Invalid event id" });

    const myCart = events.map((event) => {
      const cartItem = items.find(
        (item) => item._id.toString() === event._id.toString()
      );
      return {
        event: event,
        quantity: cartItem.quantity,
      };
    });

    myCart.forEach((item) => {
      if (
        !item.event.availableTickets ||
        item.event.availableTickets < item.quantity
      ) {
        return res.status(400).json({
          message: "There are no tickets left for this or some of these events",
        });
      }
      const price = item.event.ticketPrice * item.quantity;
      totalAmount += price;
    });

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: "eur",
        payment_method_types: ["card"],
        metadata: {
          items: JSON.stringify(items),
        },
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(400).send(err.message);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.confirmPayment = async (req, res) => {
  const event = req.body;

  // const sig = req.headers["stripe-signature"];

  // let event;
  // try {
  //   event = stripe.webhooks.constructEvent(
  //     req.body,
  //     sig,
  //     process.env.STRIPE_SECRET_KEY
  //   );
  // } catch (err) {
  //   console.error("Webhook signature verification failed:", err.message);
  //   return res.status(400).send(`Webhook Error: ${err.message}`);
  // }

  if (event.type === "payment_intent.succeeded") {
    try {
      const paymentIntent = event.data.object;
      const items = JSON.parse(paymentIntent.metadata.items);
      const ids = items.map((el) => el._id);
      const events = await Event.find({
        _id: { $in: ids },
      });
      const user = await User.findById(req.user.id);
      const myCart = events.map((event) => {
        const cartItem = items.find(
          (item) => item._id.toString() === event._id.toString()
        );
        return {
          event: event,
          quantity: cartItem.quantity,
        };
      });

      myCart.forEach((item) => {
        if (
          !item.event.availableTickets ||
          item.event.availableTickets < item.quantity
        ) {
          return res.status(400).json({
            message:
              "There are no tickets left for this or some of these events. Please, contact us for a refund",
          });
        }
      });

      const updateQuantity = myCart.map((item) => {
        const newAvailability = item.event.availableTickets - item.quantity;
        return Event.findByIdAndUpdate(item.event._id, {
          availableTickets: newAvailability,
        });
      });
      await Promise.all(updateQuantity);

      const createTickets = myCart.map(async (item) => {
        const ticket = await Ticket.create({
          event: item.event._id,
          user: user._id,
          price: item.event.ticketPrice,
          quantity: item.quantity,
        });

        const url = `${req.protocol}://${req.get(
          "host"
        )}/api/v1/ecommerce?ticketId=${ticket._id}&eventId=${
          item.event._id
        }&userId=${user._id}`;

        const qrCode = await QRcode.toDataURL(url);
        ticket.qrCode = qrCode;
        await ticket.save();

        return ticket;
      });

      const tickets = await Promise.all(createTickets);

      const myTimkkkkjkmckets = myCart.map((event) => {
        const cartItem = tickets.find(
          (item) => item.event.toString() === event.event._id.toString()
        );
        const imageMime = event.event.imageCover?.split(".").pop();
        const imagePath = `${__dirname}/../../../public/images/${event.event.imageCover}`;
        const imageBase64 = fs.readFileSync(imagePath, "base64");
        const dateToString = event.event.eventDate.toString();
        const date = dateToString.slice(4, 15);
        const { _id, ...newEvent } = event.event;

        return {
          ...newEvent,
          qr: cartItem.qrCode,
          quantity: cartItem.quantity,
          date,
          image: `data:image/${imageMime};base64,${imageBase64}`,
        };
      });

      const ticketInfo = myTickets.map((event) => ({
        eventName: event._doc.eventName,
        ticketPrice: event._doc.ticketPrice,
        eventDate: event.date,
        location: event._doc.location,
        quantity: event.quantity,
        image: event.image,
        total: event._doc.ticketPrice * event.quantity,
        qrCode: event.qr,
      }));

      const document = {
        html: html,
        data: { tickets: ticketInfo },
        path: `${__dirname}/../cart.pdf`,
        type: "",
      };

      pdf
        .create(document, options)
        .then((res) => {
          sendEmail({
            email: user.email,
            subject: "Thank you for your purchase!",
            message: "Your tickets are in the attached pdf file",
            attachments: [
              {
                filename: "cart.pdf",
                path: `${__dirname}/../cart.pdf`,
                contentType: "application/pdf",
              },
            ],
          });
        })
        .catch((err) => {
          console.error(err.message);
        });

      return res
        .status(200)
        .json({ message: "Payment received, check your email!" });
    } catch (err) {
      res.status(400).send(err.message);
    }
  } else {
    return res.status(400).json({ message: "Payment failed" });
  }
};

// exports.createTicketCheckout = async (req, res, next) => {
//   const { event, user, price } = req.query;

//   if (!event || !user || !price) return next();

//   try {
//     const currentEvent = await Event.findById(event);
//     if (currentEvent.availableTickets > 0) {
//       currentEvent.availableTickets -= 1;
//       await currentEvent.save({ validateBeforeSave: false });
//       try {
//         await Ticket.create({ event, user, price });
//         res.redirect(req.originalUrl.split("?")[0]);
//       } catch (err) {
//         res.status(400).json({ message: "Ticket is not created" });
//       }
//     } else {
//       res.status(400).json({
//         message: "Paymant failed. There are no tickets left for this event",
//       });
//     }
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

exports.getCart = async (req, res) => {
  try {
    const cart = await ShoppingCart.find({ user: req.user.id });
    const eventsIds = cart.map((el) => el.event);
    const events = await Event.find({ _id: { $in: eventsIds } });
    const myCart = events.map((event) => {
      const cartItem = cart.find(
        (item) => item.event.toString() === event._id.toString()
      );
      return {
        event: event,
        quantity: cartItem.quantity,
        id: cartItem._id,
      };
    });
    res.status(200).json({ "my shopping cart": myCart });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addToCart = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user._id;
  const { quantity } = req.body;
  try {
    const item = await ShoppingCart.create({
      event: eventId,
      user: userId,
      quantity,
    });
    res
      .status(201)
      .json({ status: "success", message: "Item added", data: { item } });
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.updateCartQuantity = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  try {
    const item = await ShoppingCart.findByIdAndUpdate(itemId, { quantity });
    res
      .status(201)
      .json({ status: "success", message: "Quantity updated", data: { item } });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id });
    const eventsIds = tickets.map((el) => el.event);
    const events = await Event.find({ _id: { $in: eventsIds } });
    res.status(200).json({ "my tickets": events });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getPrintTicket = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const ticket = await Ticket.findById(ticketId);
    const event = await Event.findById(ticket.event);
    const imageMime = event.imageCover?.split(".").pop();
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      "images",
      event.imageCover
    );

    const imageBase64 = fs.readFileSync(imagePath, "base64");

    const ticketInfo = {
      name: event.eventName,
      date: event.eventDate,
      place: event.location,
      image: `data:image/${imageMime};base64,${imageBase64}`,
      qrCode: ticket.qr,
    };
    res.status(200).json({ ticketInfo });
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.deleteFromCart = async (req, res) => {
  const { itemId } = req.params;
  try {
    await ShoppingCart.findByIdAndUpdate(itemId, { active: false });
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).send(err);
  }
};
