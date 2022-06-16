import axios from "axios";
import { useMediaQuery } from "react-responsive";

const BASE_URL = "https://chitchat-chatapp.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";

const getUser = async (id) => {
  try {
    const { result } = (
      await axios.get(`${BASE_URL}/users/${id}`, {
        withCredentials: true,
      })
    ).data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

const getAllUsers = async () => {
  try {
    const { result } = (
      await axios.get(`${BASE_URL}/users`, {
        withCredentials: true,
      })
    ).data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

const BreakPoints = () => {
  const isBigScreen = useMediaQuery({ minWidth: 1201 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 991 });

  return { isBigScreen, isDesktop, isTablet, isMobile };
};

export { getUser, getAllUsers, BASE_URL, BreakPoints };
