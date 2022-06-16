import { useAuth } from "../../contexts/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import { BreakPoints } from "../../helpers/Helpers";
import { useState } from "react";
import { useEffect } from "react";

const Login = ({
  loginForm,
  handleLoginForm,
  handleSignupForm,
  firstname,
  setFirstname,
  lastname,
  setLastname,
  username,
  setUsername,
  password,
  setPassword,
  image,
  setImage,
  inputErrors,
  setInputErrors,
}) => {
  const { user, login, sign_up, errorMsg, setErrorMsg } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isDesktop, isMobile } = BreakPoints();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup === true) {
      setTimeout(() => setShowPopup(false), 3000);
    }
  }, [showPopup]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setInputErrors({});
    if (username === "") {
      setInputErrors((prev) => ({
        ...prev,
        username: "Please Enter Username",
      }));
    }
    if (password === "") {
      setInputErrors((prev) => ({
        ...prev,
        password: "Please Enter Password",
      }));
    }
    if (username !== "" && password !== "") {
      login(username, password).then((result) => {
        if (result === true) {
          navigate(state?.path || "/chat");
        }
      });
    }
  };

  const handleSignup = (e) => {
    if (user) return navigate(state?.path || "/chat");
    e.preventDefault();
    setErrorMsg(null);
    setInputErrors({});
    if (firstname === "") {
      setInputErrors((prev) => ({
        ...prev,
        firstname: "Please Enter Firstname.",
      }));
    }
    if (lastname === "") {
      setInputErrors((prev) => ({
        ...prev,
        lastname: "Please Enter Lastname.",
      }));
    }

    if (username.length < 6) {
      setInputErrors((prev) => ({
        ...prev,
        username: "Username must have at least 6 characters.",
      }));
    }

    if (password.length < 6) {
      setInputErrors((prev) => ({
        ...prev,
        password: "Password must have at least 6 characters.",
      }));
    }

    if (
      username.length >= 6 &&
      password.length >= 6 &&
      firstname !== "" &&
      lastname !== ""
    ) {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("image", image);
      sign_up(formData).then((result) => {
        if (result === true) {
          handleLoginForm();
          setShowPopup(true);
        }
      });
    }
  };

  if (loginForm)
    return (
      <>
        {showPopup === true && (
          <div className="popup">Successfully Registered. Please Login.</div>
        )}

        <div
          className={`flex col-gap-10 justify-se ${
            isDesktop ? "mx-1 grid-area-form" : "dir-col"
          }`}
        >
          <div className="flex">
            <h1 className={`title-font-s ${isMobile && "justify-s-c"}`}>
              {isDesktop && (
                <>
                  <span>Welcome To</span>
                  <br />
                </>
              )}
              <span
                className={`color-theme ${
                  isDesktop ? "title-font-l" : "title-font-xs"
                }`}
              >
                Chit-Chat
              </span>
            </h1>
          </div>
          <div className="flex dir-col grow-02">
            <h1 className="font-xl color-theme">Login</h1>
            <form
              className={`flex dir-col py-2 ${
                isDesktop ? "login-form" : "login-form-mobile"
              }`}
              onSubmit={(e) => handleLogin(e)}
            >
              <label htmlFor="username" className="input-label mb-1">
                Username
              </label>
              <input
                type="text"
                className={`w-75 ${
                  inputErrors?.username ? "input-field-error" : "input-field"
                }`}
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {inputErrors?.username ? (
                <div className="mt-05 color-danger">
                  {inputErrors?.username}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="password" className="input-label mt-2 mb-1">
                Password
              </label>
              <input
                type="password"
                className={`w-75 ${
                  inputErrors?.password ? "input-field-error" : "input-field"
                }`}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {inputErrors?.password ? (
                <div className="mt-05 color-danger">
                  {inputErrors?.password}
                </div>
              ) : (
                ""
              )}
              <button type="submit" className="button w-50 mt-3">
                Login
              </button>
              {errorMsg ? (
                <div className="color-danger mt-05">{errorMsg}</div>
              ) : null}
            </form>
            <p className="align-s-fs">
              Don't have an account? <br />
              Sign Up
              <button
                className="color-text bg-color-secondary color-theme"
                onClick={handleSignupForm}
              >
                Here
              </button>
            </p>
          </div>
        </div>
      </>
    );

  return (
    <div className={`flex ${isDesktop ? "mx-1" : "dir-col mx-2 mb-1"}`}>
      <div className="flex dir-col w-100">
        <h1 className="font-xl color-theme">Sign Up</h1>
        <form
          className={`py-2 px-2 ${
            isDesktop ? "signup-form" : "signup-form-mobile"
          }`}
          onSubmit={(e) => handleSignup(e)}
          encType="multipart/form-data"
        >
          <div className={`flex mb-2 ${isDesktop ? "align-fs" : "dir-col"}`}>
            <div className="flex justify-fs w-100">
              <label htmlFor="firstname" className="input-label">
                Firstname
              </label>
            </div>
            <div
              className={`flex dir-col align-fs w-100 ${
                isMobile ? "mt-05" : ""
              }`}
            >
              <input
                type="text"
                className={`w-100 ${
                  inputErrors?.firstname ? "input-field-error" : "input-field"
                }`}
                name="firstname"
                id="firstname"
                onChange={(e) => setFirstname(e.target.value)}
              />
              {inputErrors?.firstname ? (
                <div className="flex color-danger mt-02">
                  {inputErrors?.firstname}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={`flex mb-2 ${isDesktop ? "align-fs" : "dir-col"}`}>
            <div className="flex justify-fs w-100">
              <label htmlFor="lastname" className="input-label">
                Lastname
              </label>
            </div>
            <div
              className={`flex dir-col align-fs w-100 ${
                isMobile ? "mt-05" : ""
              }`}
            >
              <input
                type="text"
                className={`w-100 ${
                  inputErrors?.lastname ? "input-field-error" : "input-field"
                }`}
                name="lastname"
                id="lastname"
                onChange={(e) => setLastname(e.target.value)}
              />
              {inputErrors?.lastname ? (
                <div className="flex color-danger mt-02">
                  {inputErrors?.lastname}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={`flex mb-2 ${isDesktop ? "align-fs" : "dir-col"}`}>
            <div className="flex justify-fs w-100">
              <label htmlFor="username" className="input-label">
                Username
              </label>
            </div>
            <div
              className={`flex dir-col align-fs w-100 ${
                isMobile ? "mt-05" : ""
              }`}
            >
              <input
                type="text"
                className={`w-100 ${
                  inputErrors?.username || errorMsg
                    ? "input-field-error"
                    : "input-field"
                }`}
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />

              {inputErrors?.username ? (
                <div className="flex color-danger mt-02">
                  {inputErrors?.username}
                </div>
              ) : (
                ""
              )}
              {errorMsg ? (
                <div className="flex color-danger mt-02">{errorMsg}</div>
              ) : null}
            </div>
          </div>

          <div className={`flex mb-2 ${isDesktop ? "align-fs" : "dir-col"}`}>
            <div className="flex justify-fs w-100">
              <label htmlFor="password" className="input-label">
                Password
              </label>
            </div>
            <div
              className={`flex dir-col align-fs w-100 ${
                isMobile ? "mt-05" : ""
              }`}
            >
              <input
                type="password"
                className={`w-100 ${
                  inputErrors?.password ? "input-field-error" : "input-field"
                }`}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {inputErrors?.password ? (
                <div className="flex color-danger mt-02">
                  {inputErrors?.password}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* <div className={`flex mb-2 ${isDesktop ? "align-fs" : "dir-col"}`}>
            <div className="flex justify-fs w-100">
              <label htmlFor="Profile Picture" className="input-label">
                Profile Picture
              </label>
            </div>
            <div
              className={`flex dir-col align-fs w-100 ${
                isMobile ? "mt-05" : ""
              }`}
            >
              <input
                type="file"
                className={`input-field w-100`}
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div> */}

          <button type="submit" className="button mt-1">
            Sign Up
          </button>
        </form>
        <p className="font-m">
          Aready have an account?
          <button
            type="button"
            className="color-text bg-color-secondary color-theme"
            onClick={handleLoginForm}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
