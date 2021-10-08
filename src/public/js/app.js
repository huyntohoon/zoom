const socket = io();

const welcome = document.getElementById("welcome");
const room = document.getElementById("room");
const nickName = document.getElementById("name");
const form = welcome.querySelector("form");

room.hidden = true;
welcome.hidden = true;
nickName.hidden = false;

let roomName;

function handleName(event) {
  event.preventDefault();

  welcome.hidden = false;
  nickName.hidden = true;

  const input = nickName.querySelector("input");
  const value = input.value;
  socket.emit("set_name", value);
  input.value = "";
  form.addEventListener("submit", handleRoomSubmit);
}
function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;

  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}
nickName.addEventListener("submit", handleName);
//

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const open = document.getElementById("open");
  const roomList = open.querySelector("ul");
  roomList.innerHTML = "";
  console.log(roomList);
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});
//same socket.on("room_change", console.log);

// eventListen name, arrange, callback function
// (last arrangement) == function =>server call by front-end
// we can make costom event listener
// can make whatever event name.

/*-------------------------WEBSOCKET----------------------- */
/*const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`); // make socket(reset variable)

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  // if connect to Server
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  // sending message from server
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
  console.log("New message: ", message.data);
  console.log(socket);
});

socket.addEventListener("close", () => {
  // if unconnect
  console.log("Disconnected from Server ❌");
});

setTimeout(() => {
  //socket.send("from browser!"); // send to server
}, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("message", input.value));
  const li = document.createElement("li");
  li.innerText = `You: ${input.value}`;
  messageList.append(li);
  input.value = "";
}
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nick.addEventListener("submit", handleNickSubmit);
*/
