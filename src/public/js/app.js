const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`); // make socket(reset variable)

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}
/* */
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
