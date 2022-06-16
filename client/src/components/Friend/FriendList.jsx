import SearchFriends from "./SearchFriends";
import FriendProfile from "./FriendProfile";
import AlreadyFriends from "./AlreadyFriends";
import { useState } from "react";
import ReceivedRequests from "./ReceivedRequests";

const FriendList = () => {
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [onlineFriendsCount, setOnlineFriendsCount] = useState(0);
  const [offlineFriendsCount, setOfflineFriendsCount] = useState(0);
  const [requestsCount, setRequestsCount] = useState(0);
  return (
    <>
      <SearchFriends setFilteredUsers={setFilteredUsers} />
      {filteredUsers ? (
        filteredUsers.map((user, index) => (
          <div className="flex w-100 mt-1 justify-n overflow-y" key={index}>
            <FriendProfile user_id={user._id} searching={true} />
          </div>
          // <div key={index}>{user.username}</div>
        ))
      ) : (
        <div className="flex dir-col w-100 mt-1 justify-fs overflow-y">
          <div className="flex justify-sb bg-color-theme-secondary w-100">
            <p className="ml-1">Online</p>
            <p className="mr-1">{onlineFriendsCount}</p>
          </div>
          <AlreadyFriends setOnlineFriendsCount={setOnlineFriendsCount} />

          <div className="flex justify-sb bg-color-theme-secondary w-100">
            <p className="ml-1">Offline</p>
            <p className="mr-1">{offlineFriendsCount}</p>
          </div>
          <AlreadyFriends
            online={false}
            setOfflineFriendsCount={setOfflineFriendsCount}
          />

          <div className="flex justify-sb bg-color-theme-secondary w-100">
            <p className="ml-1">Friend Requests</p>
            <p className="mr-1">{requestsCount}</p>
          </div>
          <ReceivedRequests setRequestsCount={setRequestsCount} />
        </div>
      )}
    </>
  );
};

export default FriendList;
