import { io } from "socket.io-client";

const BASE_URL = "https://chitchat-chatapp.herokuapp.com";
// const BASE_URL = "http://localhost:4000";

const socket = io(BASE_URL, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
