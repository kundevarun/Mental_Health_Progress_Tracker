import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <button onClick={logout} className="logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
