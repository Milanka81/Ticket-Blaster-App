const express = require("express");
const router = express.Router();
const tokenVerify = require("./../middleware/auth");
const eventController = require("./../controllers/eventController");

router
  .route("/")
  .get(tokenVerify, eventController.getAllEvents)
  .post(eventController.postEvent);
router.route("/standup").get(eventController.getAllStandUps);
router.route("/concert").get(eventController.getAllConcerts);
router
  .route("/:id")
  .get(eventController.getEvent)
  .put(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
