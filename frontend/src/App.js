import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LogForm from "./components/LogForm";
import LogoutButton from "./components/LogoutButton";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"; 
import ChartsPage from "./components/chartPage";
import "./styles/LoginWithGoogle.css";

const App = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <Router>
      <div>
        {!user ? (
          <div className="login-container">
            <div className="login-box">
              <h2>Login with Google</h2>
              <button className="login-btn" onClick={login}>
              <img className="google-logo" src={require("./logo.png")} alt="Google Logo" />
              <span>Login with Google</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <nav>
              <Link to="/">Home</Link>
              <LogoutButton />
            </nav>
            <h1>Welcome, {user.name}</h1>
            <Routes>
              <Route path="/" element={<><LogForm /></>} />
              <Route path="/logout" element={<Navigate to="/" />} />
              <Route path="/charts" element={<ChartsPage />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
