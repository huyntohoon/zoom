import express from "express";
import WebSocket from "ws";
import http from "http";
const app = express();

app.set("view engine", "pug"); // 템플릿 렌더링, pug로 하겠다.
app.set("views", __dirname + "/views"); // 디렉토리 위치 설정
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home")); // if (user => url) => (get req, res) and (render "home")
app.get("/*", (_, res) => res.redirect("/"));
console.log("hello");

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function handleConnection(socket) {
  console.log(socket);
}
wss.on("connection", handleConnection);

server.listen(3000, handleListen);
