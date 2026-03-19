const express = require("express");
const { getPublicState, registerWorker, resetState } = require("../utils/state");

const router = express.Router();

router.post("/register", (req, res) => {
  const next = registerWorker(req.body || {});
  res.json(next);
});

router.get("/worker", (_req, res) => {
  res.json(getPublicState().worker);
});

router.get("/coverage", (_req, res) => {
  res.json(getPublicState().coverage);
});

router.get("/conditions", (_req, res) => {
  res.json(getPublicState().conditions);
});

router.get("/history", (_req, res) => {
  res.json(getPublicState().history);
});

router.get("/risk-score", (_req, res) => {
  res.json(getPublicState().risk);
});

router.post("/reset", (_req, res) => {
  res.json(resetState());
});

module.exports = router;
