import { BrowserRouter, Routes, Route } from 'react-router-dom';

// styles
import './App.css';

// context
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import { Dashboard } from './pages/dashboard/Dashboard';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import { NewProject } from './pages/new-project/NewProject';
import { ProjectDetails } from './pages/project-details/ProjectDetails';
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';

export const App = () => {
  const { isAuthReady } = useAuthContext();
  return (
    isAuthReady && (
      <div className="App">
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Routes>
              <Route exact="true" path="/" element={<Dashboard />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/new-project" element={<NewProject />}></Route>
              <Route path="/projects/:id" element={<ProjectDetails />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    )
  );
};
