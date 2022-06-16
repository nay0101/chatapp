import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { BASE_URL } from "../../helpers/Helpers";
import FriendProfile from "./FriendProfile";

const ReceivedRequests = ({ setRequestsCount }) => {
  const [friendRequests, setFriendRequests] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      getFriendRequests();
    }
  }, [auth]);

  const getFriendRequests = async () => {
    const { result } = (
      await axios.get(`${BASE_URL}/friend_requests?request_type=received`, {
        withCredentials: true,
      })
    ).data;
    setRequestsCount(result.length);
    setFriendRequests(result);
  };

  return (
    <>
      {friendRequests && friendRequests.length > 0 ? (
        friendRequests.map((request, index) => (
          <div className="flex w-100 my-05" key={index}>
            <FriendProfile user_id={request.sender_id} searching={true} />
          </div>
        ))
      ) : (
        <p>No Requests</p>
      )}
    </>
  );
};

export default ReceivedRequests;
