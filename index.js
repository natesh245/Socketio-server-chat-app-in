const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const conversationRoutes = require("./routes/conversation.route");
const messageRoutes = require("./routes/messsage.route");

require("dotenv").config();
require("./db")();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("some-event", (message) => {
    console.log(message);
    io.emit("hi", "hello from socket server");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
