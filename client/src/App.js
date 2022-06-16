import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import RequiredAuth from "./RequiredAuth";
import LoginPage from "./components/LoginPage/LoginPage";
import ChatHome from "./components/Chat/ChatHome";
import MessagePage from "./components/Chat/MessagePage";
import { useAuth } from "./contexts/Auth";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Navigate to="/chat" replace /> : <LoginPage />}
          />
          <Route
            exact
            path="/chat"
            element={
              <RequiredAuth>
                <ChatHome />
              </RequiredAuth>
            }
          />
          <Route
            exact
            path="/chat/:receiver_id"
            element={
              <RequiredAuth>
                <MessagePage />
              </RequiredAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
