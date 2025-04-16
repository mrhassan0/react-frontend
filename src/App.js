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
import AuthPrompt from './components/AuthPrompt'; 
import CourseList from './components/Discussion/CourseList';
import DiscussionThreads from './components/Discussion/DiscussionThreads';
import AddCourse from './components/Course/AddCourse';
import Sidebar from './components/Sidebar';
import UploadNote from './components/Discussion/UploadNote';
import CourseNotes from './components/Discussion/CourseNotes';
import NoteViewer from './components/Discussion/NoteViewer';
import { useUser } from './hooks/useUser';

const App = withAuthInfo(({ isLoggedIn, accessToken }) => {
  const logoutFn = useLogoutFunction();
  const { redirectToSignupPage, redirectToLoginPage } = useRedirectFunctions();

  // Use the custom hook to manage user state
  const { userInfo, role, loading } = useUser(accessToken);

  if (loading) {
    return <div className="text-gray-200 bg-gray-900 h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isLoggedIn) {
    return (
      <div className="flex bg-gray-900 text-gray-200 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 ml-64">
          {/* Top Navbar */}
          <Navbar role={role} logoutFn={logoutFn} />

          {/* Routes */}
          <div className="p-4">
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
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/:courseId/upload-note" element={<UploadNote />} />
              <Route path="/courses/:courseId/notes" element={<CourseNotes />} />
              <Route path="/courses/:courseId/notes/:noteId" element={<NoteViewer />} />
              <Route path="/courses/:courseId/threads" element={<DiscussionThreads />} />
              <Route
                path="/add_course"
                element={
                  <ProtectedRoute allowedRoles={['Admin']} role={role}>
                    <AddCourse />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
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