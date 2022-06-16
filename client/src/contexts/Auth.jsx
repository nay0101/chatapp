import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/Helpers";

const authContext = createContext();

const useAuth = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    window.addEventListener(
      "storage",
      getCurrentUser().then((result) => setUser(result))
    );

    return () =>
      window.removeEventListener(
        "storage",
        getCurrentUser().then((result) => setUser(result))
      );
  }, []);

  useEffect(() => {
    if (user) {
      setAuth(true);
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      if (localStorage.getItem("user")) return true;
      const { error } = (
        await axios.post(
          `${BASE_URL}/login`,
          { username, password },
          { withCredentials: true }
        )
      ).data;
      if (error) {
        setErrorMsg(error);
        return false;
      }
      const { user_id } = (
        await axios.post(
          `${BASE_URL}/login`,
          { username, password },
          { withCredentials: true }
        )
      ).data;
      const { result } = (
        await axios.get(`${BASE_URL}/users/${user_id}`, {
          withCredentials: true,
        })
      ).data;
      setUser(result);
      setAuth(true);
      setErrorMsg(null);
      localStorage.setItem("user", result._id);
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const sign_up = async (user_data) => {
    try {
      if (localStorage.getItem("user")) return true;
      const { error } = (
        await axios.post(`${BASE_URL}/signup`, user_data, {
          withCredentials: true,
        })
      ).data;
      if (error) {
        setErrorMsg(error);
        return false;
      }
      const { user_id } = (
        await axios.post(`${BASE_URL}/signup`, user_data, {
          withCredentials: true,
        })
      ).data;
      setErrorMsg(null);
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    setAuth(false);
    setUser(null);
    localStorage.removeItem("user");
    await axios.get(`${BASE_URL}/logout`, { withCredentials: true });
  };

  const getCurrentUser = async () => {
    try {
      if (localStorage.getItem("user")) {
        const user_info = localStorage.getItem("user");
        const { result } = (
          await axios.get(`${BASE_URL}/users/${user_info}`, {
            withCredentials: true,
          })
        ).data;
        return result;
        // setUser(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <authContext.Provider
      value={{
        auth,
        user,
        login,
        logout,
        sign_up,
        setAuth,
        setUser,
        errorMsg,
        setErrorMsg,
        getCurrentUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { useAuth, AuthProvider };
