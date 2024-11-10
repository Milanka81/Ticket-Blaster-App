const express = require("express");
const auth = require("../auth/utils/auth");
const ecommerce = require("./handlers/ecommerceHandlers");
const db = require("../../src/db/index");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const cookieParser = require("cookie-parser");
db.init();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    maxAge: 900000,
  })
);
app.use("/api/v1/ecommerce", auth.tokenVerify);
app.get("/api/v1/ecommerce/shopping-cart", ecommerce.getCart);
app.post("/api/v1/ecommerce/shopping-cart", ecommerce.addToCart);
app.patch(
  "/api/v1/ecommerce/shopping-cart/:itemId",
  ecommerce.updateCartQuantity
);
app.delete("/api/v1/ecommerce/shopping-cart/:itemId", ecommerce.deleteFromCart);
// app.get(
//   "/api/v1/ecommerce/checkout-session/:eventId",
//   ecommerce.getCheckoutSession
// );
app.post("/api/v1/ecommerce/webhook", ecommerce.confirmPayment);
app.post(
  "/api/v1/ecommerce/create-payment-intent",
  ecommerce.createPaymentIntent
);
app.get("/api/v1/ecommerce/tickets-history", ecommerce.getMyTickets);
app.get("/api/v1/ecommerce/print-ticket/:ticketId", ecommerce.getPrintTicket);

app.listen(process.env.PORTECOMMERCE, (err) => {
  if (err) {
    console.log("Could not start service");
  }
  console.log(
    `service started successfully on port ${process.env.PORTECOMMERCE}`
  );
});
