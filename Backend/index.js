const app = require("./app");
const dotenv = require("dotenv");
const path  = require("path");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const http = require("http");
const User = require("./models/user");
const FriendRequest = require("./models/friendRequest");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWPRD);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Listen for when the  client connects via socket.io-client
io.on("connection", async (socket) => {
  console.log(JSON.stringify(socket.handshake.query));
  const user_id = socket.handshake.query["user_id"];

  const socket_id = socket.id;

  console.log(`User connected ${socket_id}`);

  if (user_id != null && Boolean(user_id)) {
    try {
      await User.findByIdAndUpdate(user_id, { socket_id, status: "Online" });
    } catch (error) {
      console.log(error);
    }
  }

  // We can write our socket event listeners here
  socket.on("friend_request", async (data) => {
    console.log(data.to);
    // { data } => {to, from}

    const to_user = await User.findById(data.to).select("socket_id");
    const from_user = await User.findById(data.from).select("socket_id");

    // TODO => create a friend request

    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });

    // emit  event => new friend_request
    io.to(to_user.socket_id).emit("new_friend_request", {
      message: "New Friend Request Recieved",
    });

    //  emit event => request sent
    io.to(from_user.socket_id).emit("request_sent", {
      message: "Request Sent Successfully!",
    });
  });

  socket.on("accept_request", async (data) => {
    console.log(data);

    const request_doc = await FriendRequest.findById(data.request_id);

    console.log(request_doc);

    // request_id

    const sender = await User.findById(request_doc.sender);
    const receiver = await User.findById(request_doc.recipient);

    sender.friends.push(request_doc.recipient);
    receiver.friends.push(request_doc.sender);

    await receiver.save({ new: true, validateModifiedOnly: true });
    await sender.save({ new: true, validateModifiedOnly: true });

    await FriendRequest.findByIdAndDelete(data.request_id);

    io.to(sender.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted!",
    });

    io.to(receiver.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted!",
    });
  });

  // Handle Text or link message

  socket.on("text_message", (data) => {
    console.log("Recieved Message", data);

    // data: {to, from, text}

    // create  a  new conversation if it dosen't exist or add new message to the messages list

    // save db

    // emit incoming message -> to user

    // emit outgoing message -> from user

  });

  socket.on("file_message", (data) => {
    console.log("Received message", data)

    // data: {to, from, text}

    // get the file extension
    const fileExtension = path.extname(data.file.name);

    const  fileName = `${Date.now()}_${Math.floor(Math.random() * 10000)}${fileExtension}`;

    // upload file to aws s3

     // create  a  new conversation if it dosen't exist or add new message to the messages list

    // save db

    // emit incoming message -> to user

    // emit outgoing message -> from user

  });

  socket.on("end", async (data) => {

    // Find user by _id and set the status  to offline

    if (data.user_id) {
      await findByIdAndUpdate(data.user_id, {status: "Offline"});
    }

    // TODO => broadcast user disconnected

    console.log("Closing connection");
    socket.disconnect(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
