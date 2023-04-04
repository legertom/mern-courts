import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import useAuth  from '../../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();

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
        <button onClick={signOut} className="nav-item">
          Sign Out
        </button>
      ) : (
        <Link to="/login" className="nav-item">
          Log In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
