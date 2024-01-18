const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 5050;
const apiRoutes = require("./Routes/Route");
const mongoUser = process.env.DBUSER;
const mongoPass = process.env.DBPASS;
const mongoURL = `mongodb+srv://${mongoUser}:${mongoPass}@cluster102.ypdq1ih.mongodb.net/Message?retryWrites=true&w=majority`;

console.log(mongoURL);

app.use(cors()); // TO Enable CORS for all routes
app.use(bodyParser.json());

mongoose.connect(mongoURL);
const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Welcome to App!");
});

app.use("/api", apiRoutes); // Mount API routes under /api

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.   localhost:${PORT} `);
});
