const express = require("express");
const emergencyControllers = require("../controllers/emergenciesControllers");

const router = express.Router();

router
  .route("/")
  .get(emergencyControllers.fetchEmergency)
  .post(emergencyControllers.createEmergency);

router
  .route("/:id")
  .get(emergencyControllers.getEmergency)
  .delete(emergencyControllers.deleteEmergency)
  .patch(emergencyControllers.updateEmergency);

module.exports = router;
