const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myFace.srcObject = myStream;
    // user_usermedia => string
  } catch (err) {
    console.log(err);
  }
}

getMedia();
function handelMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
function handelCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera on";
    cameraOff = true;
  }
}
muteBtn.addEventListener("click", handelMuteClick);
cameraBtn.addEventListener("click", handelCameraClick);
