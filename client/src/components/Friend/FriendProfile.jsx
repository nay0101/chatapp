import {
  faCheck,
  faCircleDot,
  faCircleXmark,
  faUserPlus,
  faUserXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { BASE_URL, getUser } from "../../helpers/Helpers";

const FriendProfile = ({ user_id, searching = false, online = true }) => {
  const [userProfile, setUserProfile] = useState();
  const [sent, setSent] = useState(false);
  const [received, setReceived] = useState(false);
  const [friended, setFriended] = useState(false);
  const [requestID, setRequestID] = useState();
  const { user } = useAuth();

  useEffect(() => {
    getUser(user_id).then((result) => setUserProfile(result));
    getFriends();
    getSentRequests();
    getReceivedRequests();
  }, [sent, received, friended, requestID]);

  const getFriends = async () => {
    try {
      const { friends } = (
        await axios.get(`${BASE_URL}/friends/${user._id}`, {
          withCredentials: true,
        })
      ).data;
      if (friends.includes(user_id)) setFriended(true);
    } catch (e) {
      console.log(e);
    }
  };

  const getSentRequests = async () => {
    try {
      const { result } = (
        await axios.get(`${BASE_URL}/friend_requests?request_type=sent`, {
          withCredentials: true,
        })
      ).data;
      const temp_request = result.filter(
        (request) => request.receiver_id === user_id
      );

      if (temp_request.length > 0) {
        setSent(true);
        setRequestID(temp_request[0]._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getReceivedRequests = async () => {
    try {
      const { result } = (
        await axios.get(`${BASE_URL}/friend_requests?request_type=received`, {
          withCredentials: true,
        })
      ).data;
      const temp_request = result.filter(
        (request) => request.sender_id === user_id
      );

      if (temp_request.length > 0) {
        setReceived(true);
        setRequestID(temp_request[0]._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSendRequest = async (id) => {
    try {
      const result = await axios.post(
        `${BASE_URL}/friend_requests/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setRequestID(result._id);
      setSent(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAcceptRequest = async (request_id) => {
    try {
      await axios.post(
        `${BASE_URL}/friend_requests/accept/${request_id}`,
        {},
        { withCredentials: true }
      );
      setFriended(true);
      setReceived(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteRequest = async (request_id) => {
    try {
      await axios.delete(`${BASE_URL}/friend_requests/delete/${request_id}`, {
        withCredentials: true,
      });
      setSent(false);
      setReceived(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveFriend = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/friends/${id}`, {
        withCredentials: true,
      });
      setFriended(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (userProfile)
    return (
      <div className="flex justify-sb w-100 px-1">
        <div className="flex col-gap-05">
          <img
            className="profile picture"
            src={`${BASE_URL}/${userProfile.profile_picture}`}
            alt="PP"
          />
          <p className="profile name">
            {userProfile.firstname} {userProfile.lastname}
          </p>
        </div>
        {searching ? (
          <div className="flex col-gap-06 font-m pointer">
            {friended ? (
              <>
                <FontAwesomeIcon
                  className="color-danger"
                  icon={faUserXmark}
                  onClick={() => handleRemoveFriend(user_id)}
                />
              </>
            ) : sent ? (
              <>
                <FontAwesomeIcon
                  className="color-danger"
                  icon={faCircleXmark}
                  onClick={() => handleDeleteRequest(requestID)}
                />
              </>
            ) : received ? (
              <>
                <FontAwesomeIcon
                  className="color-confirm"
                  icon={faCheck}
                  onClick={() => handleAcceptRequest(requestID)}
                />
                <FontAwesomeIcon
                  className="color-danger"
                  icon={faXmark}
                  onClick={() => handleDeleteRequest(requestID)}
                />
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  className="color-theme"
                  icon={faUserPlus}
                  onClick={() => handleSendRequest(user_id)}
                />
              </>
            )}
          </div>
        ) : (
          <FontAwesomeIcon
            className={online ? "font-s color-confirm" : "font-s color-grey"}
            icon={faCircleDot}
          />
        )}
      </div>
    );
  return;
};

export default FriendProfile;
