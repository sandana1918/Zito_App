const express = require("express");
const { triggerScenario } = require("../utils/state");

const router = express.Router();

router.post("/events/aqi", (_req, res) => {
  res.json(triggerScenario("aqi"));
});

router.post("/events/platform-outage", (_req, res) => {
  res.json(triggerScenario("platform"));
});

router.post("/events/heat", (_req, res) => {
  res.json(triggerScenario("heat"));
});

module.exports = router;
