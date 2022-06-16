import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "./contexts/Auth";

const RequiredAuth = ({ children }) => {
  const [cookies] = useCookies();
  const { auth } = useAuth();
  const location = useLocation();
  return cookies.UID || auth ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
};

export default RequiredAuth;
