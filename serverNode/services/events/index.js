const express = require("express");
const db = require("../../src/db/index");
const cors = require("cors");
const auth = require("../auth/utils/auth");
const protected = require("../auth/utils/adminRoutes");
const events = require("./handlers/eventsHandlers");
const helmet = require("helmet");
const app = express();
const path = require("path");

db.init();
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    maxAge: 900000,
  })
);

app.get("/api/v1/events", events.getFilteredEvents);
app.get("/api/v1/events/:id", events.getEvent);

app.use("/api/v1/events", auth.tokenVerify, protected.adminRoutes);

app.post("/api/v1/events", events.postEvent);
app.patch("/api/v1/events/:id", events.updateEvent);
app.delete("/api/v1/events/:id", events.deleteEvent);

app.listen(process.env.PORTEVENTS, (err) => {
  if (err) {
    console.log("Could not start service");
  }
  console.log(`service started successfully on port ${process.env.PORTEVENTS}`);
});
