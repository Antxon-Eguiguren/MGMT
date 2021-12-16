import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/temple.svg';
import { useAuthContext } from '../../hooks/useAuthContext';

export const Navbar = () => {
  const { dispatch } = useAuthContext();
  return (
    <div className="navbar">
      <div className="navbar-content">
        <ul>
          <li className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
              <span>M G M T.</span>
            </Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <button className="btn" onClick={() => dispatch({ type: 'LOGOUT' })}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
