import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import InvitesPage from './pages/InvitesPage';
import SettingsPage from './pages/SettingsPage';
import TeamPage from './pages/TeamPage';
import TasksPage from './pages/TasksPage';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/invites" element={<InvitesPage/>}/>
        <Route path="/team" element={<TeamPage/>}/>
        <Route path="/tasks" element={<TasksPage/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
