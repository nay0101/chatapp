import { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { NavProvider } from "../../contexts/NavBar";
import { BreakPoints } from "../../helpers/Helpers";
import NavBar from "../NavBar/NavBar";
import Login from "./Login";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(true);
  const { setErrorMsg } = useAuth();
  const { isDesktop } = BreakPoints();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const handleLoginForm = () => {
    setErrorMsg(null);
    setFirstname("");
    setLastname("");
    setImage(null);
    setUsername("");
    setPassword("");
    setInputErrors({});
    setLoginForm(true);
  };

  const handleSignupForm = () => {
    setErrorMsg(null);
    setFirstname("");
    setLastname("");
    setImage(null);
    setUsername("");
    setPassword("");
    setInputErrors({});
    setLoginForm(false);
  };

  const handleRefresh = () => {
    if (localStorage.getItem("user")) {
      return window.location.reload(false);
    }
    return null;
  };

  return (
    <NavProvider>
      <div
        className={`${isDesktop ? "wrapper-login" : "mobile-wrapper"}`}
        onClick={handleRefresh}
      >
        <NavBar
          handleLoginForm={handleLoginForm}
          handleSignupForm={handleSignupForm}
        />
        <Login
          loginForm={loginForm}
          handleLoginForm={handleLoginForm}
          handleSignupForm={handleSignupForm}
          firstname={firstname}
          setFirstname={setFirstname}
          lastname={lastname}
          setLastname={setLastname}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          image={image}
          setImage={setImage}
          inputErrors={inputErrors}
          setInputErrors={setInputErrors}
        />
      </div>
    </NavProvider>
  );
};

export default LoginPage;
