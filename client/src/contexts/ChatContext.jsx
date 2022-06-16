import axios from "axios";
import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, getUser } from "../helpers/Helpers";
import socket from "../helpers/Socket";
import { useAuth } from "./Auth";

const chatContext = createContext();

const useChat = () => {
  return useContext(chatContext);
};

const ChatProvider = ({ children }) => {
  const [messageList, setMessageList] = useState(true);
  const [receiverID, setReceiverID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [latestMessages, setLatestMessages] = useState([]);
  const [active, setActive] = useState([]);
  const [skip, setSkip] = useState(0);
  const { user, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      socket.auth = { userID: user._id };
      socket.connect();
    }
    return () => socket.close();
  }, [auth]);

  useEffect(() => {
    if (auth) {
      getLatestMessages();
    }
  }, [messageList, auth]);

  useEffect(() => {
    let tempActive = [];
    socket.on("message notification", () => {
      getLatestMessages();
    });

    socket.on("message update", (message) => {
      getLatestMessages();
    });

    socket.on("user connected", ({ userID, socketID }) => {
      setActive((prev) => [...prev, { userID, socketID }]);
    });

    socket.on("user disconnected", ({ userID, socketID }) => {
      setActive((prev) => prev.filter((r) => r.socketID !== socketID));
    });

    socket.on("users", (users) => {
      users.forEach((user) => {
        tempActive.push({ userID: user.userID, socketID: user.socketID });
      });
      setActive(tempActive);
    });

    return () => {
      socket.off("message notification");
      socket.off("message update");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("users");
    };
  }, [auth]);

  const onChangeUser = (id) => {
    navigate(`/chat/${id}`);
    setSkip(0);
    setReceiverID(id);
    setMessageList(true);
    if (id !== receiverID) {
      setMessages([]);
    }
  };

  const handleListChange = () => {
    setMessageList((prev) => !prev);
  };

  const leaveRoom = () => {
    navigate("/chat");
    socket.emit("leaveRoom");
    setReceiverID(null);
  };

  const getLatestMessages = async () => {
    let tempMsg = [];
    const { rooms } = (
      await axios.get(`${BASE_URL}/chat/rooms`, {
        withCredentials: true,
      })
    ).data;
    if (rooms.length < 1) return setLatestMessages([]);
    for (const room of rooms) {
      let receiver = room.user1_id;
      if (user._id === room.user1_id) receiver = room.user2_id;
      const { result } = (
        await axios.get(`${BASE_URL}/chat/${receiver}/messages?skip=${0}`, {
          withCredentials: true,
        })
      ).data;
      if (result.length > 0) {
        const tempResult = result[0];
        let fromSelf = true;
        const user = await getUser(receiver);
        if (tempResult.sender_id === user._id) {
          fromSelf = false;
        }
        const msg = {
          message: tempResult.message,
          fromSelf,
          time: tempResult.createdAt,
        };
        tempMsg.push({ user, msg });
        tempMsg.sort((a, b) => {
          if (moment(a.msg.time).isBefore(moment(b.msg.time), "second"))
            return 1;
          if (moment(a.msg.time).isAfter(moment(b.msg.time), "second"))
            return -1;
          return 0;
        });
      }
    }
    setLatestMessages(tempMsg);
  };

  return (
    <chatContext.Provider
      value={{
        messageList,
        setMessageList,
        handleListChange,
        receiverID,
        setReceiverID,
        messages,
        setMessages,
        leaveRoom,
        latestMessages,
        active,
        setActive,
        setLatestMessages,
        getLatestMessages,
        skip,
        setSkip,
        onChangeUser,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export { useChat, ChatProvider };
