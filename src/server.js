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

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
