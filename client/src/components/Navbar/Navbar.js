import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isAuthenticated, signOut } = auth;
  const location = useLocation();

  const handleSignOut = () => {
    signOut(navigate);
   
  }
  
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/courts" className="nav-item">
        All Courts
      </Link>
      {isAuthenticated && (
        <Link to="/addCourt" className="nav-item">
          Add Court
        </Link>
      )}
      {isAuthenticated ? (
        <button onClick={handleSignOut} className="nav-item">
          Sign Out
        </button>
      ) : (
        !isAuthenticated && location.pathname !== '/login' && (
          <Link to="/login" className="nav-item">
            Log In
          </Link>
        )
      )}
    </nav>
  );
};

export default Navbar;
