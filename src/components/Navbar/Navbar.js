import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/temple.svg';
import { useLogout } from '../../hooks/useLogout';

export const Navbar = () => {
  const { logout, isPending } = useLogout();

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
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && <p>Logging out...</p>}
          </li>
        </ul>
      </div>
    </div>
  );
};
