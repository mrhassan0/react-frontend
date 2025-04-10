import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthInfo } from '@propelauth/react'; // Import useAuthInfo

function ReportUser() {
  const { userId } = useParams(); // Reported user's ID
  const [issue, setIssue] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { user, accessToken } = useAuthInfo(); // Retrieve user and access token

  const reporterId = user?.userId; // Safely access userId from the user object

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reporterId) {
      setMessage('Unable to retrieve reporter ID. Please log in again.');
      return;
    }
    try {
      await axios.post(
        'http://localhost:3001/users/report_user',
        {
          reported_user_id: userId,
          reporter_user_id: reporterId,
          issue,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the access token from useAuthInfo
          },
        }
      );
      setMessage('Report submitted successfully!');
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error submitting report:', error);
      setMessage(error.response?.data?.error || 'Failed to submit report.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Report User</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-semibold mb-2">
            Describe the issue:
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition"
          >
            Submit Report
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ReportUser;