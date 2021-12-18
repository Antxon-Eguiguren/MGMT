import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectComments } from '../../components/ProjectComments/ProjectComments';
import { ProjectSummary } from '../../components/ProjectSummary/ProjectSummary';
import { useDocument } from '../../hooks/useDocument';
import './ProjectDetails.css';

export const ProjectDetails = () => {
  const { id } = useParams();
  const { document: project, isPending, error } = useDocument('projects', id);

  return (
    <div className="project-details">
      {project && (
        <>
          <ProjectSummary project={project} />
          <ProjectComments project={project} />
        </>
      )}
      {error && <div className="error">{error}</div>}
      {isPending && <p>Loading data...</p>}
    </div>
  );
};
