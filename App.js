const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();

const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origins: ["*"],
    methods: ["GET", "POST"],
  },
});

app.set("io", io);
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 5009;
const apiRoutes = require("./Routes/Route");
const mongoUser = process.env.DBUSER;
const mongoPass = process.env.DBPASS;
const mongoURL = `mongodb+srv://${mongoUser}:${mongoPass}@cluster102.ypdq1ih.mongodb.net/Message?retryWrites=true&w=majority`;

console.log(mongoURL);

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use("/api", apiRoutes); // Mount API routes under /api

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.   localhost:${PORT} `);
});
