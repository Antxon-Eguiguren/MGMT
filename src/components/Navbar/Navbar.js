import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/temple.svg';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

export const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className={user ? 'navbar' : 'navbar-100'}>
      <div className="navbar-content">
        <ul>
          <li className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
              <span>M G M T.</span>
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
          {user && (
            <li>
              {!isPending && (
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              )}
              {isPending && <p>Logging out...</p>}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
