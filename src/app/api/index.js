//18.117.188.105
import {localhost} from "./local"
var socket = new WebSocket("ws://"+localhost+":8080/ws");

let connect = cb => {
  console.log("Attempting Connection...");
  const usernameCookie = document.cookie;
  socket.onopen = () => {
    socket.send(usernameCookie);
    console.log("Successfully Connected");
  };

  socket.onmessage = msg => {
    console.log(msg);
    cb(msg);
  };

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = error => {
    console.log("Socket Error: ", error);
  };
};

let sendMsg = msg => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };