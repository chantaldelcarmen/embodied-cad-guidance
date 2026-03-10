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

  socket.on("highlight", (data) => {
    console.log("Highlight event:", data.object);
    socket.broadcast.emit("highlight", data);
  });

  // snap-to-view — expert locks current viewpoint, broadcast to all viewers
  socket.on("snap-view", (data) => {
    console.log("Snap-to-view event:", data);
    socket.broadcast.emit("snap-view", data);
  });

  socket.on("unlock-view", () => {
    socket.broadcast.emit("unlock-view");
  });

  socket.on("reset-view", () => {
    socket.broadcast.emit("reset-view");
  });

  socket.on("explode-view", () => {
    console.log("explode-view received, broadcasting");
    socket.broadcast.emit("explode-view");
  });

  socket.on("assemble-view", () => {
    console.log("assemble-view received, broadcasting");
    socket.broadcast.emit("assemble-view");
  });

  socket.on("scrub-animation", (data) => {
    socket.broadcast.emit("scrub-animation", data);
  });

  socket.on("view-update", (data) => {
    socket.broadcast.emit("view-update", data);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

const PORT = process.env.PORT || 3000;

console.log(`About to start listening on port ${PORT}...`);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Press Ctrl+C to stop");
});