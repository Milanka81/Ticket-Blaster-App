const express = require("express");
const router = express.Router();
const eventController = require("./../controllers/eventController");
const auth = require("./../middleware/auth");
const protectedRoutes = require("./../middleware/protectedRoutes");

router
  .route("/")
  .get(eventController.getAllEvents)
  .post(auth.tokenVerify, protectedRoutes.protected, eventController.postEvent);
router.route("/standup").get(eventController.getAllStandUps);
router.route("/concert").get(eventController.getAllConcerts);
router
  .route("/:id")
  .get(eventController.getEvent)
  .put(auth.tokenVerify, protectedRoutes.protected, eventController.updateEvent)
  .delete(
    auth.tokenVerify,
    protectedRoutes.protected,
    eventController.deleteEvent
  );

module.exports = router;
