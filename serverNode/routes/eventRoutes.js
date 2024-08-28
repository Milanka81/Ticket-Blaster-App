const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const eventController = require("./../controllers/eventController");
const protectedRoutes = require("./../middleware/protectedRoutes");

router
  .route("/")
  .get(
    auth.tokenVerify,
    protectedRoutes.protected,
    eventController.getAllEvents
  )
  .post(eventController.postEvent);
router.route("/standup").get(eventController.getAllStandUps);
router.route("/concert").get(eventController.getAllConcerts);
router
  .route("/:id")
  .get(eventController.getEvent)
  .put(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
