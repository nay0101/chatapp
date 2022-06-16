import { io } from "socket.io-client";

const socket = io("https://chitchat-chatapp.herokuapp.com", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
