import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import { Avatar } from '../Avatar/Avatar';
import './OnlineUsers.css';

export const OnlineUsers = () => {
  const { documents: users, error, isPending } = useCollection('users');

  return (
    <div className="user-list">
      <div className="user-list-content">
        <h2>All Users</h2>
        {error && <div className="error">{error}</div>}
        {isPending && <p className="loading">Loading users...</p>}
        {users &&
          users.map((user) => (
            <div className="user-list-item" key={user.id}>
              {user.isOnline ? <span className="online-user"></span> : <span className="offline-user"></span>}
              <span> {user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          ))}
      </div>
    </div>
  );
};
