const express = require("express");
const cors = require("cors");
const coreRoutes = require("./routes/coreRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "zito-local-backend",
    timestamp: new Date().toISOString()
  });
});

app.use("/", coreRoutes);
app.use("/", eventRoutes);

app.listen(port, () => {
  console.log(`Zito backend listening on http://localhost:${port}`);
});
