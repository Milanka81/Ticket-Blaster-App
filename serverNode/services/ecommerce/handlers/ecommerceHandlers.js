const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./../../../src/config/config.env"),
});
const Event = require("../../../src/events/eventSchema");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(400).json({ message: "Invalid event id" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${req.protocol}://${req.get("host")}/events`,
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
            unit_amount: event.ticketPrice,
            currency: "eur",
          },
          quantity: 1,
        },
      ],
    });

    res.status(200).json({ status: "success", session });
  } catch (err) {
    res.status(400).send(err);
  }
};
