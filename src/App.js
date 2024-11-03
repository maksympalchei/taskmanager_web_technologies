import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import WelcomePage from './pages/WelcomePage/WelcomePage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import DashboardPage from './pages/DashboardPage/DashboardPage.js';
import InvitesPage from './pages/InvitesPage/InvitesPage.js';
import SettingsPage from './pages/SettingsPage/SettingsPage.js';
import TeamPage from './pages/TeamPage/TeamPage.js';
import TasksPage from './pages/TasksPage/TasksPage.js';
import ProtectedRoute from './hooks/protectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invites"
          element={
            <ProtectedRoute>
              <InvitesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <TeamPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
