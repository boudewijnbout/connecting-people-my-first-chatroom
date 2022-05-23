const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const port = process.env.PORT || 4242;

// Uses
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

// Create a socket
io.on("connection", (socket) => {
  console.log("A random user connected!");

  // User send a message
  socket.on("message", (message) => {
    io.emit("message", message);
  });

  // User disconnects
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Render the index view
app.get("/", (req, res) => {
  res.render("index");
});

// Listen on port
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
