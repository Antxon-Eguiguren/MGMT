import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Timestamp } from 'firebase/firestore';
import './NewProject.css';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export const NewProject = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const { documents } = useCollection('users');
  const { user } = useAuthContext();
  const { createDocument, response } = useFirestore('projects');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a project category!');
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least one user!');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });

    const project = {
      name,
      details,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await createDocument(project);

    if (!response.error) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return {
          value: user,
          label: user.displayName,
        };
      });
      setUsers(options);
    }
  }, [documents]);

  return (
    <div className="new-project-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name</span>
          <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span>Project details</span>
          <textarea required type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
        </label>
        <label>
          <span>Due date</span>
          <input required type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <label>
          <span>Project category</span>
          <Select options={categories} onChange={(option) => setCategory(option)} />
        </label>
        <label>
          <span>Assign to</span>
          <Select options={users} onChange={(option) => setAssignedUsers(option)} isMulti="true" />
        </label>
        <button className="btn">Create Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};
