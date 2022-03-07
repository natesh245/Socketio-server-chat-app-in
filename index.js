const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const conversationRoutes = require("./routes/conversation.route");
const messageRoutes = require("./routes/messsage.route");
const messageModel = require("./models/message.model.js");

// const messageModel = require("./models/message.model");
require("dotenv").config();
require("./db")();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.use("/api/chat/conversation", conversationRoutes);
app.use("/api/chat/message", messageRoutes);

const userToSocketMap = {};
io.on("connection", (socket) => {
  const user_id = socket.handshake.query.user_id;
  socket.user_id = user_id;

  userToSocketMap[user_id] = socket.id;

  console.log("--------connected--------");
  console.log(`A user connected with socket-id = ${socket.id}`);
  console.log(userToSocketMap);
  console.log("--------connected--------");
  socket.on("disconnect", () => {
    delete userToSocketMap[socket.user_id];
    console.log("-----disconnected--------------");
    console.log(`user with socket id=${socket.id} disconnected`);
    console.log(userToSocketMap);
    console.log("-----disconnected--------------");
  });

  socket.on("send-message", async (message) => {
    console.log(message);
    const messageDoc = new messageModel(message);
    await messageDoc.save();
    const receiverSocketId = userToSocketMap[message.receiverID];
    if (!receiverSocketId) return;
    io.to(receiverSocketId).emit("receive-message", message);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
