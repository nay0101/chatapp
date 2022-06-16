import { useNavbar } from "../../contexts/NavBar";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helpers/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { BreakPoints } from "../../helpers/Helpers";
import { useState } from "react";
import logo from "../../assets/images/chitchatlogo.png";

const NavBar = ({ handleLoginForm, handleSignupForm }) => {
  const { loggedIn } = useNavbar();
  const { user, logout } = useAuth();
  const { isDesktop, isMobile } = BreakPoints();
  const [loginItems, setLoginItems] = useState(false);
  const [logoutMenu, setLogoutMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const showLoginItems = () => {
    setLoginItems((prev) => !prev);
  };

  return (
    <nav
      className={`nav-wrapper bg-color-secondary ${
        isDesktop ? "grid-area-nav" : ""
      }`}
    >
      <div className={`nav flex justify-sb mx-1`}>
        <div className={`flex`}>
          <img src={logo} alt="logo" width={32} height={32} />
          <div
            className={`font-weight-700 color-theme ml-02 ${
              isDesktop ? "font-m" : "font-m"
            }`}
          >
            Chit-Chat
          </div>
        </div>
        <div className="flex justify-fe">
          {loggedIn ? (
            user && (
              <div
                className="dropdown"
                onClick={() => setLogoutMenu((prev) => !prev)}
              >
                <div className="flex">
                  <img
                    src={`${BASE_URL}/${user.profile_picture}`}
                    className="profile picture"
                    alt="NA"
                  />
                  {isDesktop ? (
                    <div className="profile name color-theme font-weight-700 font-m ml-05">
                      {user.username}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="dropdown-y align-stre mt-05"
                  data-dropdown={logoutMenu}
                >
                  <div className="flex login-item">
                    <img
                      src={`${BASE_URL}/${user.profile_picture}`}
                      className="profile picture"
                      alt="NA"
                    />
                    <div className="profile name color-theme font-weight-700 font-m ml-1">
                      {user.username}
                    </div>
                  </div>
                  <div
                    className="login-item font-m color-theme color-secondary_hover bg-color-secondary bg-color-theme_hover"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              </div>
            )
          ) : (
            <>
              {isDesktop && (
                <>
                  <button
                    className="login-item font-m color-theme color-secondary_hover bg-color-secondary bg-color-theme_hover"
                    onClick={handleLoginForm}
                  >
                    Login
                  </button>
                  <button
                    className="login-item font-m color-theme color-secondary_hover bg-color-secondary bg-color-theme_hover"
                    onClick={handleSignupForm}
                  >
                    Sign Up
                  </button>
                </>
              )}
              {isMobile && (
                <div className="dropdown">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="color-theme font-weight-700 font-l"
                    onClick={showLoginItems}
                  />
                  <div className="dropdown-xy mr-1" data-dropdown={loginItems}>
                    <button
                      className="login-item font-m color-theme color-secondary_hover bg-color-secondary bg-color-theme_hover"
                      onClick={handleLoginForm}
                    >
                      Login
                    </button>
                    <button
                      className="login-item font-m color-theme color-secondary_hover bg-color-secondary bg-color-theme_hover"
                      onClick={handleSignupForm}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
