import moment from "moment";
import Moment from "react-moment";
import { useChat } from "../../contexts/ChatContext";
import { BASE_URL, BreakPoints } from "../../helpers/Helpers";

const MessageList = () => {
  const { latestMessages, receiverID, onChangeUser } = useChat();
  const { isDesktop } = BreakPoints();
  return (
    <div className="flex dir-col justify-fs w-100 overflow-y">
      {latestMessages && latestMessages.length > 0 ? (
        latestMessages.map((m, index) => (
          <div
            className={`${
              receiverID === m.user._id ? "bg-color-theme-secondary" : ""
            } flex justify-fs w-100 py-1 pointer latest-message-border`}
            key={index}
            onClick={() => onChangeUser(m.user._id)}
          >
            <img
              className="profile picture w-100 ml-1"
              src={`${BASE_URL}/${m.user.profile_picture}`}
              alt="PP"
            />
            <div className="w-100 ml-1">
              <div className="font-m font-weight-700 color-theme">
                {m.user.firstname} {m.user.lastname}
              </div>
              <div className="flex justify-sb w-100 color-grey">
                <div className="flex">
                  {m.msg.fromSelf && "You:"}
                  <div
                    className={`${
                      isDesktop ? "latest-message" : "latest-message-mobile"
                    }`}
                  >
                    {m.msg.message}
                  </div>
                </div>
                {moment(m.msg.time).diff(moment(), "days") < 1 ? (
                  <Moment format="hh:mm A" className="mr-1">
                    {m.msg.time}
                  </Moment>
                ) : (
                  <Moment format="MMM DD" className="mr-1">
                    {m.msg.time}
                  </Moment>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="my-1">No Messages</div>
      )}
    </div>
  );
};

export default MessageList;
