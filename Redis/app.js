const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const { databaseConnection } = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("tiny"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

const { connectRedis } = require("./redis");
const cacheMiddleware = require("./redisMiddleware");
const studentCtrl = require("./studentCtrl");

databaseConnection();
connectRedis();

app.get("/", (req, res) => {
  res.send("Server is live!");
});

app.post("/createStudent", studentCtrl.createStudent);
app.get("/getStudent", cacheMiddleware, studentCtrl.getStudent);

app.listen(port, () => {
  console.log(`Listening on port ${port}, http://localhost:${port}`);
});