import { ChatProvider } from "../../contexts/ChatContext";
import { NavProvider } from "../../contexts/NavBar";
import { BreakPoints } from "../../helpers/Helpers";
import NavBar from "../NavBar/NavBar";
import Chat from "./Chat";

const ChatHome = () => {
  const { isDesktop } = BreakPoints();

  const handleRefresh = () => {
    if (!localStorage.getItem("user")) {
      return window.location.reload(false);
    }
    return null;
  };

  return (
    <NavProvider>
      <div
        className={`${isDesktop ? "wrapper" : "mobile-wrapper"}`}
        onClick={handleRefresh}
      >
        <ChatProvider>
          <NavBar />
          {isDesktop ? (
            <Chat>
              <div className="flex dir-col">
                <p className="font-m">Start a conversation.</p>
              </div>
            </Chat>
          ) : (
            <Chat />
          )}
        </ChatProvider>
      </div>
    </NavProvider>
  );
};

export default ChatHome;
