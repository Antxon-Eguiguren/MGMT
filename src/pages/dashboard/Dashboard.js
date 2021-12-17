import React from 'react';
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import './Dashboard.css';

export const Dashboard = () => {
  const { documents: projects, error, isPending } = useCollection('projects');

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {isPending && <p>Loading projects...</p>}
      {error && <p className="error">{error}</p>}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
};
