import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChat } from "../../contexts/ChatContext";
import { BreakPoints, getUser } from "../../helpers/Helpers";

const MessageSectionHeaderBar = () => {
  const { leaveRoom } = useChat();
  const [receiver, setReceiver] = useState();
  const params = useParams();
  const receiverID = params?.receiver_id;
  const { isDesktop } = BreakPoints();

  useEffect(() => {
    if (receiverID) {
      getUser(receiverID).then((result) => {
        setReceiver(result);
      });
    }
  }, [receiverID]);

  return (
    <div className={`flex justify-sb w-100 chat-header bg-color-theme py-1`}>
      <FontAwesomeIcon
        className={`color-secondary mr-1 ml-1 pointer ${
          isDesktop ? "font-l" : "font-m"
        }`}
        icon={faArrowLeft}
        onClick={leaveRoom}
      />
      <div
        className={`font-weight-700 color-secondary mr-1 ${
          isDesktop ? "font-l" : "font-l"
        }`}
      >
        {receiver && `${receiver.firstname} ${receiver.lastname}`}
      </div>
    </div>
  );
};

export default MessageSectionHeaderBar;
