import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
import { OnlineUsers } from './components/OnlineUsers/OnlineUsers';

export const App = () => {
  const { user, isAuthReady } = useAuthContext();
  return (
    <div className="App">
      {isAuthReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route exact="true" path="/" element={user ? <Dashboard /> : <Navigate to="/login" />}></Route>
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}></Route>
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />}></Route>
              <Route path="/new-project" element={user ? <NewProject /> : <Navigate to="/login" />}></Route>
              <Route path="/projects/:id" element={user ? <ProjectDetails /> : <Navigate to="/login" />}></Route>
              <Route path="*" element={user ? <Dashboard /> : <Navigate to="/login" />}></Route>
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
};
