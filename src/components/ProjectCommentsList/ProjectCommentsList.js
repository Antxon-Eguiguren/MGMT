import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import './ProjectCommentsList.css';

export const ProjectCommentsList = ({ project }) => {
  return (
    <>
      <h4>Comments</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
