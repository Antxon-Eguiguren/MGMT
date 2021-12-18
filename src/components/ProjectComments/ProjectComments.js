import React, { useState } from 'react';
import { ProjectCommentsList } from '../ProjectCommentsList/ProjectCommentsList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import './ProjectComments.css';

export const ProjectComments = ({ project }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore('projects');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      id: Math.random(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, comment],
    });

    if (!response.error) {
      setNewComment('');
    }
  };

  return (
    <div className="project-comments">
      {project && <ProjectCommentsList project={project} />}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea required onChange={(e) => setNewComment(e.target.value)} value={newComment} />
        </label>
        <button className="btn">Add Comment</button>
        {response.error && <div className="error">{response.error}</div>}
      </form>
    </div>
  );
};
