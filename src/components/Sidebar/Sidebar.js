import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../assets/dashboard.svg';
import AddIcon from '../../assets/add.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Avatar } from '../Avatar/Avatar';

export const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}!</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact="true" to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/new-project">
                <img src={AddIcon} alt="new project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
