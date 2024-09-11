const express = require("express");
const auth = require("../auth/utils/auth");
const ecommerce = require("./handlers/ecommerceHandlers");
const db = require("../../src/db/index");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

db.init();
app.use(helmet());
app.use(express.json());
app.use(cors());

app.get(
  "/api/v1/ecommerce",
  ecommerce.createTicketCheckout,
  auth.tokenVerify,
  ecommerce.getCart
);
// app.get("/api/v1/ecommerce", auth.tokenVerify, ecommerce.getCart);
app.get(
  "/api/v1/ecommerce/checkout-session/:eventId",
  auth.tokenVerify,
  ecommerce.getCheckoutSession
);
app.get(
  "/api/v1/ecommerce/shopping-cart",
  auth.tokenVerify,
  ecommerce.getMyCart
);
app.listen(process.env.PORTECOMMERCE, (err) => {
  if (err) {
    console.log("Could not start service");
  }
  console.log(
    `service started successfully on port ${process.env.PORTECOMMERCE}`
  );
});
