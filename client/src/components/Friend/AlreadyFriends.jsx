import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { useChat } from "../../contexts/ChatContext";
import { BASE_URL } from "../../helpers/Helpers";
import FriendProfile from "./FriendProfile";

const AlreadyFriends = ({
  setOfflineFriendsCount,
  setOnlineFriendsCount,
  online = true,
}) => {
  const [friends, setFriends] = useState();
  const { active, onChangeUser } = useChat();
  const { user, auth } = useAuth();

  useEffect(() => {
    if (auth) {
      getFriends();
    }
  }, [active, auth]);

  const getFriends = async () => {
    try {
      let tempActive = [];
      const { friends } = (
        await axios.get(`${BASE_URL}/friends/${user._id}`, {
          withCredentials: true,
        })
      ).data;
      const { result } = (
        await axios.post(
          `${BASE_URL}/users/chunk`,
          { id_list: friends },
          {
            withCredentials: true,
          }
        )
      ).data;
      active.forEach((user) => {
        tempActive.push(user.userID);
      });
      const filtered_friends = result.filter(
        (friend) => tempActive.includes(friend._id) === online
      );
      if (online) {
        setOnlineFriendsCount(filtered_friends.length);
      } else {
        setOfflineFriendsCount(filtered_friends.length);
      }
      setFriends(filtered_friends);
    } catch (e) {
      console.log(e);
    }
  };

  if (friends)
    return (
      <>
        {friends && friends.length > 0 ? (
          friends.map((friend, index) => (
            <div
              className="flex w-100 my-05"
              key={index}
              onClick={() => onChangeUser(friend._id)}
            >
              <FriendProfile user_id={friend._id} online={online} />
            </div>
          ))
        ) : (
          <p>No Friends</p>
        )}
      </>
    );
  return;
};

export default AlreadyFriends;
