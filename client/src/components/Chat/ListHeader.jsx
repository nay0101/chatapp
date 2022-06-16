import { faComments, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChat } from "../../contexts/ChatContext";
import { BreakPoints } from "../../helpers/Helpers";

const ListHeader = () => {
  const { handleListChange, messageList } = useChat();
  const { isDesktop } = BreakPoints();

  return (
    <div className="flex justify-sb w-100 chat-header py-1">
      <div
        className={`font-weight-700 color-theme ml-1 ${
          isDesktop ? "font-l" : "font-l"
        }`}
      >
        {messageList ? "Messages" : "Friends"}
      </div>
      {messageList ? (
        <FontAwesomeIcon
          className="font-l color-theme mr-1 pointer"
          icon={faUserFriends}
          onClick={handleListChange}
        />
      ) : (
        <FontAwesomeIcon
          className="font-l color-theme mr-1 pointer"
          icon={faComments}
          onClick={handleListChange}
        />
      )}
    </div>
  );
};

export default ListHeader;
