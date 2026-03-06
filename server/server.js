console.log("Starting server setup...");

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

console.log("Dependencies loaded");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

console.log("Server objects created");

app.use(express.static(path.join(__dirname, "../client")));

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("motion-data", (data) => {
    socket.broadcast.emit("motion-data", data);
  });
});

console.log("About to start listening on port 3000...");

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Press Ctrl+C to stop");
});