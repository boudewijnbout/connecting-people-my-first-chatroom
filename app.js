const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 4242;

const users = {};

// Uses
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

// Create a socket
io.on("connection", (socket) => {

  // User send a message
  socket.on("message", (message) => {
    io.emit("message", message);
  }); 
   
  // User connects
  socket.on("new-user", (userName) => {
    users[socket.id] = userName;
    socket.broadcast.emit("user-connected", userName);
  })

  // User disconnects
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Render the index view
app.get("/", (req, res) => {
  res.render("form");
});

app.get("/index", (req, res) => {
  res.render("index");
});

// Listen on port
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
