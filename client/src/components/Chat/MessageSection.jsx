import React, { useEffect, useRef, useState } from "react";
import { BASE_URL, BreakPoints } from "../../helpers/Helpers";
import socket from "../../helpers/Socket";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";
import { useChat } from "../../contexts/ChatContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

const MessageSection = () => {
  const [messageField, setMessageField] = useState("");
  const [visible, setVisible] = useState(false);
  const messageBox = useRef();
  const scrollBox = useRef();
  const params = useParams();
  const receiverID = params?.receiver_id;
  const { setReceiverID, messages, setMessages, active, skip, setSkip } =
    useChat();
  const { user, auth } = useAuth();
  const { isMobile } = BreakPoints();
  const options = {
    root: scrollBox.current,
    rootMargin: "1px",
    threshold: 0.5,
  };

  useEffect(() => {
    setReceiverID(receiverID);
    getChatID();
    setMessageField("");
    setTimeout(scrollToBottom, 100);
    return () => socket.off("joinRoom");
  }, [receiverID]);

  useEffect(() => {
    if (auth) {
      getMessages();
    }
  }, [auth, skip, receiverID]);

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);
    if (messageBox.current) observer.observe(messageBox.current);
    if (visible) setSkip(messages.length);
  }, [visible, receiverID]);

  useEffect(() => {
    if (auth) {
      socket.on("get message", ({ message, from }) => {
        let fromSelf = false;
        if (user && from === user._id) {
          fromSelf = true;
        }
        setMessages((prev) => [{ message, fromSelf, time: moment() }, ...prev]);
      });
    }
    return () => socket.off("get message");
  }, [auth]);

  const getMessages = async () => {
    let tempMsg = [];
    const { result } = await (
      await axios.get(`${BASE_URL}/chat/${receiverID}/messages?skip=${skip}`, {
        withCredentials: true,
      })
    ).data;
    result.forEach((r) => {
      let fromSelf = false;
      if (user && r.sender_id === user._id) {
        fromSelf = true;
      }
      tempMsg.push({ message: r.message, fromSelf, time: r.createdAt });
    });
    setMessages([...messages, ...tempMsg]);
  };

  const sendMessage = async () => {
    socket.emit("message", {
      to: receiverID,
      message: messageField,
      activeUsers: active,
    });
    await axios.post(
      `${BASE_URL}/chat/${receiverID}/messages`,
      {
        message: messageField,
      },
      { withCredentials: true }
    );
    scrollToBottom();
    setMessageField("");
  };

  const getChatID = async () => {
    const { result } = (
      await axios.get(`${BASE_URL}/chat/${receiverID}`, {
        withCredentials: true,
      })
    ).data;
    socket.emit("joinRoom", result._id);
  };

  const scrollToBottom = () => {
    scrollBox.current.scrollTop = scrollBox.current.scrollHeight;
  };

  const compareDate = (dateArray, index) => {
    const length = dateArray.length;
    if (length - 1 === index || length === 0) return true;

    if (moment(dateArray[index].time).isSame(dateArray[index + 1].time, "day"))
      return false;

    return true;
  };

  return (
    <>
      <div
        className={`flex dir-col w-100 grow-2 justify-fe chat-body ${
          isMobile ? "mobile-position" : ""
        }`}
      >
        <div
          className="flex dir-col-rev align-fe justify-n w-100 messages-overflow overflow-y"
          ref={scrollBox}
        >
          {messages.map((m, index) => (
            <React.Fragment key={index}>
              <div
                className={
                  m.fromSelf ? "message-align-self" : "message-align-others"
                }
              >
                <div className="flex dir-col">
                  <div
                    className={
                      m.fromSelf ? "message-from-self" : "message-from-others"
                    }
                  >
                    {m.message}
                  </div>
                  <Moment
                    format="hh:mm A"
                    className={m.fromSelf ? "time-self" : "time-others"}
                  >
                    {m.time}
                  </Moment>
                </div>
              </div>
              {compareDate(messages, index) && (
                <Moment
                  format="MMM DD"
                  className="align-s-c font-weight-700 my-05"
                >
                  {m.time}
                </Moment>
              )}
            </React.Fragment>
          ))}
          <div ref={messageBox} className="w-100" />
        </div>
        <div className="flex justify-fs w-100 message-field py-1">
          <input
            type="text"
            className="input-field w-100 ml-1"
            value={messageField}
            onChange={(e) => setMessageField(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && messageField !== "" ? sendMessage() : null
            }
          />
          <button
            className="button-s mx-1"
            onClick={sendMessage}
            disabled={messageField === "" ? true : false}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageSection;
