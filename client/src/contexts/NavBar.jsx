import { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import { useAuth } from "./Auth";

const navbarContext = createContext();

const useNavbar = () => {
  return useContext(navbarContext);
};

const NavProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      setLoggedIn(true);
    }
  }, [auth]);

  return (
    <navbarContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </navbarContext.Provider>
  );
};

export { useNavbar, NavProvider };
