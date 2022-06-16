import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { BASE_URL } from "../../helpers/Helpers";
import FriendProfile from "./FriendProfile";

const SentRequests = () => {
  const [requests, setRequests] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      getSentRequests();
    }
  }, [auth]);

  const getSentRequests = async () => {
    const { result } = (
      await axios.get(`${BASE_URL}/friend_requests?request_type=sent`, {
        withCredentials: true,
      })
    ).data;
    setRequests(result);
  };

  return (
    <>
      {requests &&
        requests.map((request, index) => (
          <div className="flex dir-col justify-sb" key={index}>
            <FriendProfile user_id={request.receiver_id} />
          </div>
        ))}
    </>
  );
};

export default SentRequests;
