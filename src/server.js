import http from "http"; // http =>
import SocketIO from "socket.io";
import express from "express";

const app = express(); // set express

app.set("view engine", "pug"); // view engine => pug
app.set("views", __dirname + "/views"); // how to view => set dir (on "pug")
app.use("/public", express.static(__dirname + "/public")); // working on client for file => css, html, js
// this meaning => that dir => use to my static file
app.get("/", (_, res) => res.render("home")); // browser => send me '/' => render home(html) // '/' => default
app.get("/*", (_, res) => res.redirect("/")); // '/*' => everything => send '/'

const httpServer = http.createServer(app); // http_Server make using express() moudule
//const wss = new WebSocket.Server({ server }); // make WebSocket_Server on http server
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    console.log(socket.rooms);
    socket.join(roomName);
    console.log(socket.rooms);
    done();
    //socket.to(roomName).emit("welcome", socket.nickname);
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach(
      (room) => socket.to(room).emit("bye"),
      socket.nickname
    );
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on("set_name", (nickname) => {
    socket["nickname"] = nickname;
    //socket.to(roomName).emit("welcome", socket.nickname);
  });
});

/*
const sockets = [];
wss.on("connection", (socket) => {
  // if connection (wss <=> browser(user)), (parameter == socket), and excute this function
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅"); // firsrt console output on Server
  socket.on("close", () => console.log("Disconnected from the Browser ❌")); // on == eventListen, close == unconnected
  socket.on("message", (msg) => {
    // if brower sends message to server => (parameter == messge), and excute this function
    const messageString = msg.toString("utf8");
    const message = JSON.parse(messageString);
    switch (message.type) {
      case "message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        ); // 모든 요소에게 각각 실행
      case "nickname":
        socket["nickname"] = message.payload;
    }
  });
  //socket.send("from Server"); // server send to browser to message
});
*/

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
