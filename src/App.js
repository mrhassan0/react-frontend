import React from 'react';
import { useLogoutFunction, useRedirectFunctions, withAuthInfo } from '@propelauth/react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import UserInfo from './components/UserInfo';
import ListOfOrgs from './components/ListOfOrgs';
import OrgInfo from './components/OrgInfo';
import ManageUsers from './components/ManageUsers';
import RequestRole from './components/RequestRole';
import ManageRoleRequests from './components/ManageRoleRequests';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import PublicProfile from './components/PublicProfile';
import UserList from './components/UserList';
import ReportUser from './components/ReportUser';
import Reports from './components/Reports';
import AuthPrompt from './components/AuthPrompt'; // Import the new component
import { useUser } from './hooks/useUser';

const App = withAuthInfo(({ isLoggedIn, accessToken }) => {
  const logoutFn = useLogoutFunction();
  const { redirectToSignupPage, redirectToLoginPage } = useRedirectFunctions();

  // Use the custom hook to manage user state
  const { userInfo, role, loading } = useUser(accessToken);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching the role
  }

  if (isLoggedIn) {
    return (
      <div>
        <Navbar role={role} logoutFn={logoutFn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user_info" element={<UserInfo />} />
          <Route path="/orgs" element={<ListOfOrgs />} />
          <Route path="/org/:orgName" element={<OrgInfo />} />
          <Route
            path="/manage_users"
            element={
              <ProtectedRoute allowedRoles={['Moderator', 'Admin']} role={role}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route path="/request_role" element={<RequestRole />} />
          <Route path="/profile/:userId" element={<PublicProfile />} />
          <Route path="/users" element={<UserList />} />
          <Route
            path="/manage_role_requests"
            element={
              <ProtectedRoute allowedRoles={['Moderator', 'Admin']} role={role}>
                <ManageRoleRequests />
              </ProtectedRoute>
            }
          />
          <Route path="/report/:userId" element={<ReportUser />} />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={['Moderator', 'Admin']} role={role}>
                <Reports />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    );
  }

  return (
    <AuthPrompt
      redirectToSignupPage={redirectToSignupPage}
      redirectToLoginPage={redirectToLoginPage}
    />
  );
});

export default App;