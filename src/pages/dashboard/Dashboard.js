import React, { useState } from 'react';
import { ProjectFilter } from '../../components/ProjectFilter/ProjectFilter';
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Dashboard.css';

export const Dashboard = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { documents: projects, error, isPending } = useCollection('projects');
  const { user } = useAuthContext();

  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredProjects = projects?.filter((project) => {
    switch (currentFilter) {
      case 'all':
        return true;
      case 'mine':
        let assignedToMe = false;
        project.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
      case 'development':
      case 'design':
      case 'marketing':
      case 'sales':
        return project.category === currentFilter;
      default:
        return true;
    }
  });

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {isPending && <p>Loading projects...</p>}
      {error && <p className="error">{error}</p>}
      {filteredProjects && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  );
};
