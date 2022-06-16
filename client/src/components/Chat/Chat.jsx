import { useEffect } from "react";
import { useNavbar } from "../../contexts/NavBar";
import FriendList from "../Friend/FriendList";
import MessageList from "./MessageList";
import { useChat } from "../../contexts/ChatContext";
import { BreakPoints } from "../../helpers/Helpers";
import ListHeader from "./ListHeader";

const Chat = ({ children }) => {
  const { setLoggedIn } = useNavbar();
  const { messageList } = useChat();
  const { isDesktop, isMobile } = BreakPoints();

  useEffect(() => {
    setLoggedIn(true);
  }, []);

  if (isDesktop)
    return (
      <>
        <div className=" flex dir-col grow-03 shrink-0 justify-n chat-portion-left grid-area-list">
          <ListHeader />
          <div className="flex dir-col chat-body justify-fs">
            {messageList ? (
              <MessageList />
            ) : (
              <>
                <FriendList />
              </>
            )}
          </div>
        </div>
        <div className=" flex dir-col grow-17 shrink-1 grid-area-message">
          {children}
        </div>
      </>
    );
  if (isMobile)
    return children ? (
      children
    ) : (
      <>
        <ListHeader />
        {messageList ? <MessageList /> : <FriendList />}
      </>
    );
};

export default Chat;
