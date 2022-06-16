import React from "react";
import { ChatProvider } from "../../contexts/ChatContext";
import { NavProvider } from "../../contexts/NavBar";
import { BreakPoints } from "../../helpers/Helpers";
import NavBar from "../NavBar/NavBar";
import Chat from "./Chat";
import MessageSection from "./MessageSection";
import MessageSectionHeaderBar from "./MessageSectionHeaderBar";

const MessagePage = () => {
  const { isDesktop, isMobile } = BreakPoints();

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
          {isDesktop && (
            <>
              <NavBar />
              <Chat>
                <MessageSectionHeaderBar />
                <MessageSection />
              </Chat>
            </>
          )}
          {isMobile && (
            <>
              <MessageSectionHeaderBar />
              <Chat>
                <MessageSection />
              </Chat>
            </>
          )}
        </ChatProvider>
      </div>
    </NavProvider>
  );
};

export default MessagePage;
