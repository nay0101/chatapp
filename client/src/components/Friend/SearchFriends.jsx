import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { getAllUsers } from "../../helpers/Helpers";
import { useAuth } from "../../contexts/Auth";

const SearchFriends = ({ setFilteredUsers }) => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState();
  const { user } = useAuth();

  const getUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers.filter((u) => user._id !== u._id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = (e) => {
    const search_value = e.target.value.toLowerCase();
    const filtered_items = users.filter((user) => {
      const name = user.firstname + " " + user.lastname;
      return name.toLowerCase().includes(search_value);
    });
    if (search_value === "") return setFilteredUsers();
    setFilteredUsers(filtered_items);
  };

  const resetList = () => {
    setFilteredUsers();
    setSearchValue("");
  };

  return (
    <div className="flex w-100 mt-05">
      <FontAwesomeIcon className="font-l color-theme" icon={faSearch} />
      <input
        type="text"
        className="search-box mr-1 ml-05"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleSearch}
        onFocus={getUsers}
      />
      <FontAwesomeIcon
        className="font-l color-danger pointer"
        icon={faTimes}
        onClick={resetList}
      />
    </div>
  );
};

export default SearchFriends;
